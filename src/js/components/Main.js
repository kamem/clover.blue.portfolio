import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import Cards from './Cards';

class Main extends React.Component {

	componentWillMount() {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight,
		})

		window.addEventListener( 'resize', () => {
			this.setState({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		})
	}

	render() {
		const children = React.Children.map(
			this.props.children,
			(child) => {
				return React.cloneElement(child, {category: this.props.route.category})
			}
		)


		const { category } = this.props.route
		const { width, height } = this.state
		return (
			<main id="main">
				<article>
					{children}

					<Cards {...{
						category,
						width,
						height
					}} />
				</article>
			</main>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
