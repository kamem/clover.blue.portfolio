import React from 'react'
import _ from 'lodash'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Css
import styles from '../../../css/photos.css'

export default class Photos extends React.Component {
  render() {
    const { items, path } = this.props

    return (
      <ul className={styles.photos}>
        {_.map(items, ({ thumbnail, uuid: id, tags }) => {
          return (
            <li key={id} className={styles.item}>
              <Link to={`/${path}/${id}`}>
                <img src={thumbnail} />
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }
}
