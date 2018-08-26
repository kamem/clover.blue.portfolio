import React, { Fragment } from 'react'
import _ from 'lodash'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'

// Css
import styles from '../../css/about.css'

// Components
import Cards from '../components/cards/Cards'
import {Section, Title, Content, Data} from '../components/common/Content'

// Constants
import { MARKS } from '../constants/cards'

// Constants
import { createCards } from '../utils/cards'

export default class About extends React.Component {
  render() {
    return (
      <section {...{ className: styles.about }}>
        <Title>clover.blueについて</Title>

        <Content>
          <Fragment>
            <p>HTML, CSS, Javascript, デザインの記事や日記を書いたり。写真や作品を載せています。</p>
            <section>
              <h2>kamem: かめ</h2>
              <p>Design / Photoshop / Illustrator / HTML / CSS / Sass / PostCss / Javascript / jQuery / Typescript / AngularJS / Babel / React / Node</p>
              <p>フリーでWebを制作する仕事をしています。<br />専門学校で講師をしています。</p>

              <p>HTML,CSS,Javascriptを使ってフロントエンドな仕事を中心に活動しています。<br />
                主にプロジェクトに参加してサイトを作っています。</p>

              <p>デザインを作るのも好きです。</p>

              <p>自分でひらめいたことを作ったりするのが好きです。<br />
                読書、イラスト、カラオケ、お酒とか好き。</p>

              <p>スポーツはテニス、野球が好きです。</p>
            </section>
          </Fragment>
        </Content>
      </section>
    )
  }
}
