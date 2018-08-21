import React from 'react'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

// Actions
import * as QiitaActions from '../actions/QiitaActions'
import * as DropboxActions from '../actions/DropboxActions'

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

        {React.cloneElement(this.props.children, {
          scrollPosition
        })}
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
    dropboxActions: bindActionCreators(DropboxActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
