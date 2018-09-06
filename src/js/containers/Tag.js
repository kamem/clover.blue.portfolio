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
import Photos from '../components/common/Photos'

// Cass
import styles from '../../css/main.css'

export class Tag extends React.Component {
  render() {
    const {
      tagId,
      qiita,
      dropbox,
      instagram,
      filteredQiita,
      filteredDropbox,
      filteredInstagram
    } = this.props

    return (
      <div>
        <Tags {...{
          tags: _.chain([...qiita, ...dropbox, ...instagram]).map('tags').flatten().uniq().value(),
          activeId: tagId
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

        {
          !!filteredInstagram.length && (
            <div {...{ className: classNames(styles.item, styles.instagram) }}>
              <Photos {...{
                items: filteredInstagram,
                path: 'p'
              }}
              />
            </div>
          )
        }
      </div>
    )
  }
}

function mapStateToProps({ qiita, dropbox, instagram}, props) {
  const tagId = props.params.tag_id
  return {
    tagId: props.params.tag_id,
    qiita: qiita.items,
    dropbox: dropbox.items,
    instagram: instagram.items,
    filteredQiita: _.filter(qiita.items, ({ tags }) => _.some(tags, (tag) => tag === tagId)),
    filteredDropbox: _.chain(dropbox.items)
    .filter(({ tags }) => _.some(tags, (tag) => tag === tagId))
    .sortBy((item) => {
      if(tagId === 'Javascript講座') {
        return parseInt(item.title.match(/[+-]?\d+/))
      }
    })
    .value(),
    filteredInstagram: _.filter(instagram.items, ({ tags }) => _.some(tags, (tag) => tag === tagId)),
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag)
