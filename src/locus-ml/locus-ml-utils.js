/*
  LocusML Expression Recursive Logic

  if "raw value" (e.g. String, Number) RETURN

  Columns, OrderBy, GroupBy are just directly mapped with parseExpression
  Filters & Joins have an exception. If the top-level element is an array it is treated as shorthand for [argA, operator, argB].
  -- argA and argB are ran through parseExpression() and operator is included directly
  Joins have the further uniqueness of a structure: { joinType, view, on }, where 'on' contains the expression(s)
  Limit, Distinct are "tacked on"
*/

class LocusMLObjectError extends Error {
  constructor(type = 'Unknown', details = 'Generic Error', exp = {}, ...params) {
    super(...params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LocusMLObjectError)
    }

    this.name = 'LocusMLObjectError'
    this.type = type
    this.details = details
    this.exp = exp
  }
}


const COMPLEX_TYPES = ['column', 'array', 'function', 'operator', 'AND', 'OR', 'case']
const TYPE_KEY_FNS = {
  // ====[NOTE] pass whole exp for error logging
  column: exp => {
    if (exp.values.length !== 2) {
      throw new LocusMLObjectError('Column', "'column' requires 2 arguments", exp)
    }
    return `column:${exp.values[1]}.${exp.values[0]}`
  },
  array: exp => {
    if (!exp.values.every(o => ['string', 'number'].includes(typeof o))) {
      throw new LocusMLObjectError('Array', 'array values must all be a primitive type', exp)
    }
    return `array:${exp.values}`
  },
  // values[1:] are recursed
  function: exp => {
    const { values: [fn, ...args] } = exp
    // if (!functions[fn]) {
    //   throw new LocusMLObjectError('Function', 'unknown function type', exp)
    // }
    // ====[TODO] remove for the above
    if (typeof fn !== 'string') {
      throw new LocusMLObjectError('Function', 'unknown function type', exp)
    }
    // ====[TODO] make this more readable
    return `function:${fn}[${args.map(parseExpression).join()}]`
  },
  // values[1:] are recursed
  operator: exp => {
    const { values: [op, ...args] } = exp
    // if (!operators[op]) {
    //   throw new LocusMLObjectError('operator', 'unknown operator type', exp)
    // }
    // ====[TODO] remove for the above
    if (typeof op !== 'string') {
      throw new LocusMLObjectError('Operator', 'unknown operator type', exp)
    }
    if (['between', 'not between'].includes(op) && !args[2]) {
      throw new LocusMLObjectError('Operator', "'(not) between' requires 3 arguments", exp)
    }
    // ====[TODO] make this more readable
    return `operator:${op}[${args.map(parseExpression).join()}]`
  },
  // values[] are recursed
  AND: exp => {
    if (exp.values.length !== 2) {
      throw new LocusMLObjectError('And', "'and' requires 2 arguments", exp)
    }
    return `and:[${exp.values.map(parseExpression).join()}]`
  },
  OR: exp => {
    if (exp.values.length !== 2) {
      throw new LocusMLObjectError('Or', "'or' requires 2 arguments", exp)
    }
    return `or:[${exp.values.map(parseExpression).join()}]`
  },
  case: exp => {
    const { values: [defaultResult, ...statements] } = exp
    if (!['string', 'number'].includes(typeof defaultResult)) {
      throw new LocusMLObjectError('Case', 'default return should be a primitive type', exp)
    }
    if (!statements.length || !statements.every(o => Array.isArray(o) && o.length === 2)) {
      throw new LocusMLObjectError('Case', "'case' requires valid WHEN/THEN statements (array of length 2)", exp)
    }
    return `case:[default:${defaultResult}${statements.map(([when, then]) => `when:${parseExpression(when)}|then:${then}`)}]`
  },
}

const parseComplexExpression = exp => {
  const { type, values, cast, as } = exp
  if (!COMPLEX_TYPES.includes(type)) {
    throw new LocusMLObjectError('Expression Type', 'unknown expression type', exp)
  }
  if (!Array.isArray(values) || !values.length) {
    throw new LocusMLObjectError('Values', 'values must be a non-empty array', exp)
  }
  // ====[TODO] does it make sense to have a nested cast/as, or can they only be top-level?
  if (cast && typeof cast !== 'string') {
    throw new LocusMLObjectError('Cast', 'cast must be a string', exp)
  }
  if (as && typeof as !== 'string') {
    throw new LocusMLObjectError('Alias', 'alias must be a string', exp)
  }

  return `|__|${TYPE_KEY_FNS[type](exp)}|cast:${cast}|as:${as}`
}

const parseExpression = exp => {
  const type = typeof exp

  // raw value
  if (['string', 'number'].includes(type)) {
    return `|__|${exp}`
  }

  // column shorthand
  if (Array.isArray(exp)) {
    if (exp.length !== 2) {
      throw new LocusMLObjectError('Column Shorthand', 'incorrect number of arguments', exp)
    }
    return `|__|${exp[1]}.${exp[0]}`
  }

  // complex
  if (type === 'object') {
    return parseComplexExpression(exp)
  }

  throw new LocusMLObjectError('Expression Structure', 'invalid expression object', exp)
  
}

// ====[TODO] join structure validation
const joinKey = joins => joins.map(({ joinType, view, on }) => `joinType:${joinType}|view:${view}|${parseExpression(on)}`).join('|##|')

const generateLocusMLQueryKey = ({ query, views }) => [
  `type:${query.type}`,
  // ====[TODO] aggregate + groupBy validation!
  `columns:${query.columns.map(parseExpression).join('|##|')}`,
  `from:${query.from}`,
  `joins:${joinKey(query.joins)}`,
  `where:${query.where.map(parseExpression).join('|##|')}`,
  // ====[TODO] these have to be columns
  `groupBy:${query.groupBy.map(parseExpression).join('|##|')}`,
  // ====[TODO] these have to be columns, proper sorting
  `orderBy:${query.orderBy.map(parseExpression).join('|##|')}}`,
  `views:${views.map(({ id }) => id).join('|##|')}`
].join('/__/')

module.exports = { LocusMLObjectError, generateLocusMLQueryKey }
