import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import classNames from 'classnames'

// Components
import Card from '../../components/cards/Card'

// Styles
import animation from '../../../css/animation.css'

export default class Cards extends React.Component {
  componentWillMount() {
    this.setState({
      selectedCards: []
    })
  }

  componentDidMount() {
    if(this.props.setElements) {
      this.props.setElements(
        _.map(this.props.cards, ({ mark, name, num }) => (
          ReactDOM.findDOMNode(this.refs[`card_${name}_${num}`])
        ))
      )
    }
  }

  changeSelectedCards({ name, num }) {
    let selectedCards = _.reject(this.state.selectedCards, { name, num })

    if(selectedCards.length === this.state.selectedCards.length) {
      selectedCards = this.state.selectedCards.concat({ name, num })
    }

    this.setState({
      selectedCards
    })
  }

  render() {
    const { cards, animationType, cardAnimations, className } = this.props

    return (
      <div className={animation.wrap}>
        <ul className={classNames(
          {
            [animation[animationType]]: animationType,
            [animation[className]]: className,
          },
          [animation.cards]
        )}
        >
          {
            _.map(cards, ({ mark, name, num }, i) => (
              <Card
                ref={`card_${name}_${num}`}
                {...{
                  style: cardAnimations && cardAnimations[i],
                  mark,
                  name,
                  num,
                  key: `${name}${num}`,
                  selected: _.some(this.state.selectedCards, { name, num }),
                  onClick: ::this.changeSelectedCards
                }}
              />
            ))
           }
        </ul>
      </div>
    )
  }
}
