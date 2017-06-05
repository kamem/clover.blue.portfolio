import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import Cards from './Cards';

class Main extends React.Component {
	render() {
		const children = React.Children.map(
			this.props.children,
			(child) => {
				return React.cloneElement(child, {category: this.props.route.category})
			}
		)
		const { category } = this.props.route
		return (
			<main id="main">
				<article>
					{children}

					<Cards {...{ category }} />
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
