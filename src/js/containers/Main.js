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
            items: _.slice(dropbox, 0, 8),
            path: 'doc'
          }}
          />
        </div>
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
