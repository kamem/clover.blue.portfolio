import React from 'react'
import _ from 'lodash'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Css
import styles from '../../../css/list.css'

export default class List extends React.Component {
  render() {
    const { items, path } = this.props

    return (
      <ul className={styles.list}>
        {_.map(items, ({ title, uuid: id, tags }) => {
          return (
            <li key={id} className={styles.item}>
              <Link to={`/${path}/${id}`}>{title}</Link>
              <p className={styles.tags}>
                {_.map(tags, (tag) => <span className={styles.tag} key={tag}>{ tag }</span>)}
              </p>
            </li>
          )
        })}
      </ul>
    )
  }
}
