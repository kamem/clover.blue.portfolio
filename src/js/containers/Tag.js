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

// Cass
import styles from '../../css/main.css'

export class Tag extends React.Component {
  render() {
    const {
      route: {
        category
      },
      qiita,
      dropbox,
      filteredQiita,
      filteredDropbox
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


        {
          !!filteredQiita.length && (
            <div {...{ className: classNames(styles.item, styles.qiita) }}>
              <List {...{
                items: _.slice(filteredQiita, 0, 8),
                path: 'items'
              }}
              />
            </div>
          )
        }

        {
          !!filteredDropbox.length && (
            <div {...{ className: classNames(styles.item, styles.dropbox) }}>
              <List {...{
                items: filteredDropbox,
                path: 'doc'
              }}
              />
            </div>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  console.log(_.filter(state.dropbox.items, ({ tags }) => _.some(tags, (tag) => tag === props.params.tag_id)))
  return {
    qiita: state.qiita.items,
    dropbox: state.dropbox.items,
    filteredQiita: _.filter(state.qiita.items, ({ tags }) => _.some(tags, (tag) => tag === props.params.tag_id)),
    filteredDropbox: _.filter(state.dropbox.items, ({ tags }) => _.some(tags, (tag) => tag === props.params.tag_id)),
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag)
