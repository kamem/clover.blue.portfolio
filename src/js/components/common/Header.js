import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

import { Link } from 'react-router'

// Css
import styles from '../../../css/header.css'

export default class Header extends React.Component {
  render() {
    return (
      <header {...{ className: styles.header }}>
        <nav>
          <ul className={styles.nav}>
            <li className={styles.item}>
              <Link to={'/'}>Home</Link>
            </li>
            <li className={styles.item}>
              <Link to={'/about'}>About</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}
