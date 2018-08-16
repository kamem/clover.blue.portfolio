import { StyleValue } from './parallaxUtils'

export class ScrollFit {
  constructor(element) {
    this.element = element;
    this.styleValues = {};
    this.motions = [];
    this.rangeMotions = [];
  }
  setMotions({ start, end, fromStyle, toStyle, easing = 'linear' }) {
    this.motions.push({ start, end, fromStyle, toStyle, easing });
  }

  setRangeMotions(scrollPosition) {
    const range = [];
    this.motions.forEach((motion) => {
      const isMotion = motion.start <= scrollPosition;
      if(isMotion) range.push(motion);
    })

    this.rangeMotions = range;
  }

  setDefaultStyles() {
    const defaultStyles = {};
    this.motions.forEach(({ fromStyle }) => {
      for(const style in fromStyle) {
        if(defaultStyles[style] === undefined) defaultStyles[style] = fromStyle[style];
      }
    });

    this.styleValues = defaultStyles;
  }

  setFromStyle() {
    this.motions.forEach((motion, i) => {
      for(const style in motion.toStyle) {
        if(motion.fromStyle === undefined) motion.fromStyle = {};
        if(motion.fromStyle[style] === undefined) {
          motion.fromStyle[style] = this.getLastToStyle(style, i);
        }
      }
    });
  }
  getLastToStyle(style, i) {
    let fromStyle = '';
    const k = Math.max(i - 1, 0);
    for(let j = k; j >= 0; j--) {
      const motion = this.motions[j];
      if(motion.fromStyle[style] !== undefined) {
        fromStyle = motion.toStyle[style];
        break;
      }
    }
    if(fromStyle === '') fromStyle = window.getComputedStyle(this.element).getPropertyValue(style);

    return fromStyle;
  }


  setStart() {
    this.motions.forEach((motion, i) => {
      if(motion.start === undefined) {
        motion.start = this.getLastStart(i);
      }
    });
  }
  getLastStart(i) {
    let start = '';
    const k = Math.max(i - 1, 0);
    for(let j = k; j >= 0; j--) {
      const motion = this.motions[j];
      if(motion.start !== undefined) {
        start = motion.end;
        break;
      }
    }

    return start;
  }
}

export const ParallaxFit = (ops) => {
  const Fit = new ScrollFit(ops.element)

  const { start, end, fromStyle, toStyle, easing } = ops
  if(ops.end !== undefined) {
    Fit.setMotions({ start, end, fromStyle, toStyle, easing });
  }
  for(let i = 1; ops[`motion${i}End`] !== undefined; i++) {
    const motion = `motion${i}`;
    Fit.setMotions({
      start: ops[`${motion}Start`],
      end: ops[`${motion}End`],
      fromStyle: ops[`${motion}FromStyle`],
      toStyle: ops[`${motion}ToStyle`],
      easing: ops[`${motion}Easing`]
    });
  }
  Fit.setFromStyle();
  Fit.setStart();

  return (scrollPosition) => {
    Fit.setRangeMotions(scrollPosition);
    Fit.setDefaultStyles();

    Fit.rangeMotions.forEach(({ start, end, fromStyle, easing }, j) => {
      const isInRange = start < scrollPosition && scrollPosition < end;
      const range = end - start;
      const scrollPercent = isInRange ? (scrollPosition - start) / range :
          (scrollPosition > start) ? 1 :
          (scrollPosition < end) ? 0 : '';

      for(const style in fromStyle) {
        const from = new StyleValue(fromStyle[style].toString())
        const to = new StyleValue(toStyle[style].toString())
        const fromStyles = from.getValueAry()
        const toStyles = to.getValueAry()
        const values = []

        for(let i = 0; i < fromStyles.length; i++) {
          const abs = Math.abs(fromStyles[i] - toStyles[i])
          const fixAbs = fromStyles[i] < toStyles[i] ? abs : -abs

          values[i] = easingObj[easing](scrollPercent, fromStyles[i], fixAbs, 1)

          if(style.indexOf('background') >= 0) {
            values[i] = values[i] >= 1 ?
              parseInt(values[i]) :
              values[i] < 0 ? 0 : values[i];
          }
        }

        Fit.styleValues[style] = from.setValue(values)
      }
    })

    return Fit.styleValues
  }
}

const easingObj = {
  linear(t, b, c, d) { return b + c * t },
  easeInQuad(i, b, c, d) { return c * (i /= d) * i + b; },
  easeOutQuad(i, b, c, d) { return -c * (i /= d) * (i - 2) + b; },
  easeInOutQuad(i, b, c, d) { if((i /= d / 2) < 1) { return c / 2 * i * i + b; }return -c / 2 * ((--i) * (i - 2) - 1) + b; },
  easeInCubic(i, b, c, d) { return c * (i /= d) * i * i + b; },
  easeOutCubic(i, b, c, d) { return c * ((i = i / d - 1) * i * i + 1) + b; },
  easeInOutCubic(i, b, c, d) { if((i /= d / 2) < 1) { return c / 2 * i * i * i + b; }return c / 2 * ((i -= 2) * i * i + 2) + b; },
  easeInQuart(i, b, c, d) { return c * (i /= d) * i * i * i + b; },
  easeOutQuart(i, b, c, d) { return -c * ((i = i / d - 1) * i * i * i - 1) + b; },
  easeInOutQuart(i, b, c, d) { if((i /= d / 2) < 1) { return c / 2 * i * i * i * i + b; }return -c / 2 * ((i -= 2) * i * i * i - 2) + b; },
  easeInQuint(i, b, c, d) { return c * (i /= d) * i * i * i * i + b; },
  easeOutQuint(i, b, c, d) { return c * ((i = i / d - 1) * i * i * i * i + 1) + b; },
  easeInOutQuint(i, b, c, d) { if((i /= d / 2) < 1) { return c / 2 * i * i * i * i * i + b; }return c / 2 * ((i -= 2) * i * i * i * i + 2) + b; },
  easeInSine(i, b, c, d) { return -c * Math.cos(i / d * (Math.PI / 2)) + c + b; },
  easeOutSine(i, b, c, d) { return c * Math.sin(i / d * (Math.PI / 2)) + b; },
  easeInOutSine(i, b, c, d) { return -c / 2 * (Math.cos(Math.PI * i / d) - 1) + b; },
  easeInExpo(i, b, c, d) { return(i == 0) ? b : c * Math.pow(2, 10 * (i / d - 1)) + b; },
  easeOutExpo(i, b, c, d) { return(i == d) ? b + c : c * (-Math.pow(2, -10 * i / d) + 1) + b; },
  easeInOutExpo(i, b, c, d) { if(i == 0) { return b; }if(i == d) { return b + c; }if((i /= d / 2) < 1) { return c / 2 * Math.pow(2, 10 * (i - 1)) + b; }return c / 2 * (-Math.pow(2, -10 * --i) + 2) + b; },
  easeInCirc(i, b, c, d) { return -c * (Math.sqrt(1 - (i /= d) * i) - 1) + b; },
  easeOutCirc(i, b, c, d) { return c * Math.sqrt(1 - (i = i / d - 1) * i) + b; },
  easeInOutCirc(i, b, c, d) { if((i /= d / 2) < 1) { return -c / 2 * (Math.sqrt(1 - i * i) - 1) + b; }return c / 2 * (Math.sqrt(1 - (i -= 2) * i) + 1) + b; },
  easeInElastic(m, p, a, b) { var d = 1.70158; let c = 0; let n = a; if(m == 0) { return p; }if((m /= b) == 1) { return p + a; }if(!c) { c = b * 0.3; }if(n < Math.abs(a)) { n = a; var d = c / 4; }else{ var d = c / (2 * Math.PI) * Math.asin(a / n); }return -(n * Math.pow(2, 10 * (m -= 1)) * Math.sin((m * b - d) * (2 * Math.PI) / c)) + p; },
  easeOutElastic(m, p, a, b) { var d = 1.70158; let c = 0; let n = a; if(m == 0) { return p; }if((m /= b) == 1) { return p + a; }if(!c) { c = b * 0.3; }if(n < Math.abs(a)) { n = a; var d = c / 4; }else{ var d = c / (2 * Math.PI) * Math.asin(a / n); }return n * Math.pow(2, -10 * m) * Math.sin((m * b - d) * (2 * Math.PI) / c) + a + p; },
  easeInOutElastic(m, p, a, b) { var d = 1.70158; let c = 0; let n = a; if(m == 0) { return p; }if((m /= b / 2) == 2) { return p + a; }if(!c) { c = b * (0.3 * 1.5); }if(n < Math.abs(a)) { n = a; var d = c / 4; }else{ var d = c / (2 * Math.PI) * Math.asin(a / n); }if(m < 1) { return -0.5 * (n * Math.pow(2, 10 * (m -= 1)) * Math.sin((m * b - d) * (2 * Math.PI) / c)) + p; }return n * Math.pow(2, -10 * (m -= 1)) * Math.sin((m * b - d) * (2 * Math.PI) / c) * 0.5 + a + p; },
  easeInBack(k, b, c, d, j) { if(j == undefined) { j = 1.70158; }return c * (k /= d) * k * ((j + 1) * k - j) + b; },
  easeOutBack(k, b, c, d, j) { if(j == undefined) { j = 1.70158; }return c * ((k = k / d - 1) * k * ((j + 1) * k + j) + 1) + b; },
  easeInOutBack(k, b, c, d, j) { if(j == undefined) { j = 1.70158; }if((k /= d / 2) < 1) { return c / 2 * (k * k * (((j *= (1.525)) + 1) * k - j)) + b; }return c / 2 * ((k -= 2) * k * (((j *= (1.525)) + 1) * k + j) + 2) + b; },
  easeInBounce(i, b, c, d) { return c - easingObj.easeOutBounce(d - i, 0, c, d) + b; },
  easeOutBounce(i, b, c, d) { if((i /= d) < (1 / 2.75)) { return c * (7.5625 * i * i) + b; }if(i < (2 / 2.75)) { return c * (7.5625 * (i -= (1.5 / 2.75)) * i + 0.75) + b; }if(i < (2.5 / 2.75)) { return c * (7.5625 * (i -= (2.25 / 2.75)) * i + 0.9375) + b; }return c * (7.5625 * (i -= (2.625 / 2.75)) * i + 0.984375) + b; },
  easeInOutBounce(i, b, c, d) { if(i < d / 2) { return easingObj.easeInBounce(i * 2, 0, c, d) * 0.5 + b; }return easingObj.easeOutBounce(i * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b; }
}
