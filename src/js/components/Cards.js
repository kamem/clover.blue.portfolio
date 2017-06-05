import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// utils

// Actions

// Components

// styles
import styles  from '../../css/animation.css'

export class Cards extends React.Component {

	componentWillMount() {
		this.setState({
			marks: {
				spade: '♠',
				heart: '♥',
				clover: '♣',
				dia: '♦'
			}
		})
	}

	render () {

		const { category } = this.props

		return (
			<ul className={classNames(styles[category], styles.cards)}>
				{(() => {
					const cards = []
					_.each(this.state.marks, (mark, name) => {
						for(var i = 1;i <= 13;i++) {
							cards.push(<Card {...{mark, name, num: i, key: name + i}} />)
						}
					})
					console.log(cards)
					return cards
				})()}
			</ul>
		);
	}

	componentDidMount() {
	}
}

export class Card extends React.Component {

	componentWillMount() {
		this.setState({ selected: false})
	}

	render() {
		const { mark, num, name } = this.props
		const { selected } = this.state

		return (
			<li className={classNames(
					{[styles.selected]: selected},
					styles.card,
					styles[name],
					styles[`${mark}_${num}`],
					styles[`num_${num}`],

					'card',
					mark,
					`${mark}_${num}`,
					`num_${num}`
				)}
				onClick={() => {
					return this.setState({selected: !selected})
				}}
			>
				<div className={classNames(styles.inner, 'inner')}>
					<div className="front">
						<i className="mark">{mark}</i>
					</div>
					<div className="back"></div>
				</div>
			</li>
		)
	}
}

function mapStateToProps(state) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
