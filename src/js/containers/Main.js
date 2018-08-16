import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as env from '../env'

// Components
import Header from '../components/common/Header'
import List from '../components/common/List'
import Tags from '../components/common/Tags'
import About from '../containers/About'

// Cass
import styles from '../../css/main.css'

// Constants
import { MARKS } from '../constants/cards'

// Utils
import { parallaxSpeed } from '../utils/parallax'
import { ParallaxFit } from '../utils/parallaxFit'
import { createCards } from '../utils/cards'

export class Main extends React.Component {
  componentWillMount() {
    window.addEventListener('scroll', ::this.setWindowInfo)
    window.addEventListener('load', ::this.setWindowInfo)
    window.addEventListener('resize', ::this.setWindowInfo)

    this.setState({
      aboutAnimationsStyles: () => {}
    })
  }

  componentDidMount() {
    const card = ReactDOM.findDOMNode(this.refs.card);
    const cardOffsetTop = ReactDOM.findDOMNode(this.refs.card).offsetTop;
    this.setState({
      cardHeight: window.getComputedStyle(card).getPropertyValue('height')
    })
  }

  setWindowInfo() {
    const { scrollPosition } = this.props

    const card = ReactDOM.findDOMNode(this.refs.card)
    const cardOffsetTop = card && card.offsetTop

    if(card) {
      const value = parallaxSpeed({
        fixStyleValue: this.state.cardHeight,
        cardOffsetTop,
        scrollPosition
      })

      const valueCSS = new ParallaxFit({
        element: card,
        start: 0,
        end: 300,
        fromStyle: {
          top: '0px'
        },
        toStyle: {
          top: '200px'
        }
      })

      this.setState({
        cardValue: valueCSS(scrollPosition)
      })

      this.aboutAnimation(scrollPosition)
    }
  }

  aboutAnimation(scrollPosition) {
    if(this.state.aboutAnimations) {
      const aboutAnimationsStyles = this.state.elements.map((element, i) => {
        return this.state.aboutAnimations[i](scrollPosition)
      })
      return this.setState({
        aboutAnimationsStyles
      })
    }

    const about = ReactDOM.findDOMNode(this.refs.about)
    const aboutOffsetTop = about && about.offsetTop

    const aboutAnimations = this.state.elements.map((element, i) => {
      const comutedStyle = window.getComputedStyle(element)
      const top = comutedStyle.getPropertyValue('top')
      const bottom = comutedStyle.getPropertyValue('bottom')
      const right = comutedStyle.getPropertyValue('right')
      const left = comutedStyle.getPropertyValue('left')
      const className = element.className

      let fromStyle = {}
      let toStyle = {}
      const move = '-230px'
      if(~className.indexOf('clover')) {
        fromStyle = {
          transform: 'rotate(-20deg)',
          top: move,
          right: move
        }
        toStyle = {
          transform: 'rotate(-40deg)',
          top,
          right
        }
      } else if(~className.indexOf('heart')) {
        fromStyle = {
          transform: 'rotate(50deg)',
          top: move,
          left: move
        }
        toStyle = {
          transform: 'rotate(30deg)',
          top,
          left
        }
      } else if(~className.indexOf('spade')) {
        fromStyle = {
          bottom: move,
          left: move
        }
        toStyle = {
          bottom,
          left
        }
      } else if(~className.indexOf('dia')) {
        fromStyle = {
          bottom: move,
          right: move
        }
        toStyle = {
          bottom,
          right
        }
      }

      return new ParallaxFit({
        element,
        start: aboutOffsetTop - 300 + (i * -80),
        end: aboutOffsetTop - 100,
        fromStyle,
        toStyle,
        easing: 'easeInOutSine'
      })
    })

    this.setState({
      aboutAnimations
    })
  }

  aboutCardElements(elements) {
    this.setState({ elements })
  }

  render() {
    const {
      route: {
        category
      },
      qiita,
      dropbox
    } = this.props

    return (
      <div>
        <Header />

        <div {...{ className: styles.main }}>
          <h1 className={styles.title}>clover.blue</h1>
        </div>

        <Tags {...{
          tags: _.chain([...qiita, ...dropbox]).map('tags').flatten().uniq().value(),
        }}
        />

        <div {...{ className: classNames(styles.item, styles.qiita) }}>
          <List {...{
            items: _.slice(qiita, 0, 8),
            path: 'items'
          }}
          />
        </div>

        <div {...{ className: classNames(styles.item, styles.dropbox) }}>
          <List {...{
            items: dropbox,
            path: 'doc'
          }}
          />
        </div>

        <About
          ref="about"
          {...{
            cardAnimations: this.state.aboutAnimationsStyles,
            aboutCardElements: ::this.aboutCardElements
          }}
        />

        <div
          ref="card"
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.test,
    qiita: state.qiita.items,
    dropbox: state.dropbox.items,
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
