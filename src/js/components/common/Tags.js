import React from 'react'
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
      <li className={([styles.tag, this.props.active ? styles.active : '']).join(' ')}><Link to={`/tags/${this.props.children}`}>{this.props.children}</Link></li>
    )
  }
}
