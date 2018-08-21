import React from 'react'
import classNames from 'classNames'
import { Link } from 'react-router'

// Css
import styles from '../../../css/tags.css'

export default class Tags extends React.Component {
  render() {
    return (
      <ul className={styles.tags}>
        {_.map(this.props.tags, (tag, i) => (
          <Tag key={i} active={this.props.activeId === tag}>{tag}</Tag>
        ))}
      </ul>
    )
  }
}

export class Tag extends React.Component {
  render() {
    return (
      <li className={classNames(styles.tag, {[styles.active]: this.props.active})}><Link to={`/tags/${this.props.children}`}>{this.props.children}</Link></li>
    )
  }
}
