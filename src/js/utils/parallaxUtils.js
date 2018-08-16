export class StyleValue {
  constructor(styleValue) {
    this.myRegExp = /([-]?([1-9]\d*|0)(\.\d+)?)(deg|\)|px|em|rem|%|$|\,)/g
    this.colorStringRegExp = /red|blue|green|yellow/g
    this.colorRegExp = /#[0-9a-fA-F]{3,6}/g
    this.value = this.changeColor(styleValue)
  }

  changeColor(styleValue) {
    const colors = { red: 'FF0000', blue: '0000FF', yellow: 'FFFF00', green: '008000' }
    const c = styleValue.replace(this.colorStringRegExp, (color) => {
      return `#${colors[color]}`
    })
    return c.replace(this.colorRegExp, (color) => {
      let c = color

      if(c.length === 4) {
        const firstNum = c.slice(1, 2) + c.slice(1, 2)
        const secondNum = c.slice(2, 3) + c.slice(2, 3)
        const thirdNum = c.slice(3, 4) + c.slice(3, 4)
        c = firstNum + secondNum + thirdNum
      }
      const rgbNum = c.substring(1)
      const r = parseInt(rgbNum.substring(0, 2), 16)
      const g = parseInt(rgbNum.substring(2, 4), 16)
      const b = parseInt(rgbNum.substring(4, 6), 16)

      return `rgb(${r},${g},${b})`
    })
  }
  getValueAry() {
    let valueRegAry
    const valueAry = []
    while((valueRegAry = this.myRegExp.exec(this.value)) !== null) {
      valueAry.push(parseInt(valueRegAry[1]))
    }
    return valueAry
  }
  setValue(ary) {
    let i = 0
    return this.value.replace(this.myRegExp, (styleValue) => {
      return styleValue.replace(/[-]?([1-9]\d*|0)(\.\d+)?/, ary[i++])
    })
  }
}
