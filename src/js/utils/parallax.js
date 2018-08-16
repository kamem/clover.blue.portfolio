import { StyleValue } from './parallaxUtils'

export const parallaxSpeed = ({
  speed = 2,
  min = -999999,
  max = 999999,
  fixStyleValue,
  fixScrollPosition = 0,
  scrollPosition
}) => {
  const styleVal = new StyleValue(fixStyleValue)
  const styleValues = styleVal.getValueAry()

  const values = []
  styleValues.forEach((value, j) => {
    let val = -parseInt((-scrollPosition / speed) + (fixScrollPosition / speed)) + value
    val = Math.max(val, min)
    val = Math.min(val, max)
    values[j] = val
  })

  return styleVal.setValue(values)
}
