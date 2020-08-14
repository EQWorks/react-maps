import React, { useState } from 'react'

import Loader from '../src/components/loader'


export default {
  component: Loader,
  title: 'Loader',
}

export const normal = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState()

  return (
    <>
      <div style={{ padding: '1rem', border: '1px dashed black' }}>
        <Loader setData={setData} />
      </div>
      {data && (
        <>
          <h3>Loaded data</h3>
          <pre>
            {JSON.stringify(JSON.parse(data), null, 2)}
          </pre>
        </>
      )}
    </>
  )
}