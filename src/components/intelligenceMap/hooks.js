import { hslToRgbConverter } from '../../hooks'

export const getProvinceFillColor = (value, max, min) => {
  const totalDiff = max - min
  if (!value) {
    return hslToRgbConverter(203, 93, 90)
  }
  if (totalDiff === 0) {
    return hslToRgbConverter(203, 93, 55)
  }

  const minLightness = 55
  const maxLightness = 90
  const totalLightnessDiff = maxLightness - minLightness
  const lightness = maxLightness - ((value - min) / totalDiff * totalLightnessDiff)
  return hslToRgbConverter(203, 93, lightness)
}

export const getCityFillColor = (value, max, min) => {
  const totalDiff = max - min
  if (!value) {
    return hslToRgbConverter(210, 63, 55)
  }
  if (totalDiff === 0) {
    return hslToRgbConverter(210, 63, 26)
  }

  const minLightness = 26
  const maxLightness = 55
  const totalLightnessDiff = maxLightness - minLightness
  const lightness = maxLightness - ((value - min) / totalDiff * totalLightnessDiff)
  return hslToRgbConverter(210, 63, lightness)
}