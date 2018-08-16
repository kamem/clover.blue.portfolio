import React from 'react'
import _ from 'lodash'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Css
import styles from '../../css/about.css'

// Components
import Cards from '../components/cards/Cards'

// Constants
import { MARKS } from '../constants/cards'

// Constants
import { createCards } from '../utils/cards'

export default class About extends React.Component {
  render() {
    return (
      <section {...{ className: styles.about }}>
        <h1 className={styles.title}>このサイトについて</h1>

        <div className="content">
          <p>HTML, CSS, Javascript, デザインの記事や日記を書いたり。写真やイラストを載せています。</p>
          <section>
            <h2>kamem: かめ</h2>
            <p>Design / Photoshop / Illustrator / HTML / CSS / Sass / PostCss / Javascript / jQuery / Typescript / AngularJS / Babel / React / Node</p>
            <p>フリーでWebを制作する仕事をしています。
          学校で講師をしています。
          HTML,CSS,Javascriptを使ったフロントエンドな仕事からデザインまでを担当。
          主にプロジェクトに参加してサイトを作っています。
          自分でひらめいたことを作ったりするのが好きです。
          読書、絵、カラオケ、カメラ、お酒とか好きです。スポーツはテニスとか、野球とかが好きです。</p>
          </section>
        </div>

        <Cards
          {...{
            cardAnimations: this.props.cardAnimations,
            setElements: this.props.aboutCardElements,
            cards: createCards(
              _.map(MARKS, 'name'),
              [1, 1]
            ),
            className: 'yotukado'
          }}
        />
      </section>
    )
  }
}
