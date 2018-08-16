import React, { Fragment } from 'react'
import moment from 'moment'

// Components
import {Tag} from '../../components/common/Tags'

// Css
import styles from '../../../css/content.css'

export class Section extends React.Component {
  render() {
    return (
      <section className={styles.content}>
        {this.props.children}
      </section>
    )
  }
}

export class Title extends React.Component {
  render() {
    return (
      <h1 className={styles.title}>{this.props.children}</h1>
    )
  }
}

export class Data extends React.Component {
  render() {
    const { item } = this.props

    return item ? (
      <dl className={styles.data}>
        <dt>Data</dt>
        <dd>{moment.unix(item.updated).format('YYYY/MM/DD')}</dd>
        <dt>Tag</dt>
        <dd><Tags tags={item.tags} /></dd>
      </dl>
    ) : <div />
  }
}

export class Tags extends React.Component {
  render() {
    const { tags } = this.props
    return (
      <ul className={styles.tags}>
        {_.map(tags, (tag, i) => <Tag key={i}>{tag}</Tag>)}
      </ul>
    )
  }
}

export class Content extends React.Component {
  render() {
    return (
      <div className="content" dangerouslySetInnerHTML={{ __html: this.props.children }} />
    )
  }
}




