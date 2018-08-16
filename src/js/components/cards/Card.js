import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

// Styles
import animation from '../../../css/animation.css'
import card from '../../../css/card.css'

export default class Card extends React.Component {
  render() {
    const { mark, name, num, selected, onClick, style } = this.props
    const cardClassNames = classNames(
      { [animation.selected]: selected },
      animation.card,
      animation[name],
      animation[`${mark}_${num}`],
      animation[`num_${num}`],

      card.card,
      card[mark],
      card[`${mark}_${num}`],
      card[`num_${num}`]
    )

    return (
      <li
        {...{
          style,
          className: cardClassNames,
          onClick: () => onClick({ name, num })
        }}
      >
        <div className={classNames(
          animation.inner,
          card.inner
        )}
        >
          <div className={card.front}>
            <i className={card.mark}>{mark}</i>
          </div>
          <div className={card.back} />
        </div>
      </li>
    )
  }
}
