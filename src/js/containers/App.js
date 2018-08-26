import React from 'react'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

// Actions
import * as QiitaActions from '../actions/QiitaActions'
import * as DropboxActions from '../actions/DropboxActions'
import * as InstagramActions from '../actions/InstagramActions'

// Constants
import { MARKS } from '../constants/cards'

// Components
import Cards from '../components/cards/Cards'
import Header from '../components/common/Header'

// utils
import { createCards } from '../utils/cards'

// styles
import styles from '../../css/main.css'

export class App extends React.Component {
  componentWillMount() {
    this.setWindowInfo()
    window.addEventListener('scroll', ::this.setWindowInfo)
    window.addEventListener('load', ::this.setWindowInfo)
    window.addEventListener('resize', ::this.setWindowInfo)

    this.props.qiitaActions.featchItesm()
    this.props.dropboxActions.featchItesm()
    this.props.instagramActions.featchItesm()
  }

  setWindowInfo() {
    const scrollPosition = window.pageYOffset
    this.setState({
      scrollPosition
    })
  }

  render() {
    const { scrollPosition } = this.state
    const { route: { category } } = this.props.children.props

    return (
      <div {...{ className: styles.containers }}>
        <Header />

        <main>
          {React.cloneElement(this.props.children, {})}
        </main>
        <Cards
          {...{
            cards: createCards(
              _.map(MARKS, 'name'),
              [1, 3]
            ).concat(createCards(
              ['clover'],
              [4, 5]
            )),
            animationType: category,
            className: 'main'
          }}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.test,
    qiita: state.qiita,
    dropbox: state.dropbox,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    qiitaActions: bindActionCreators(QiitaActions, dispatch),
    dropboxActions: bindActionCreators(DropboxActions, dispatch),
    instagramActions: bindActionCreators(InstagramActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
