import React from 'react';
import { connect } from 'react-redux';

// Components
import Cards from './Cards';

class Main extends React.Component {
  componentWillMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    window.addEventListener('resize', () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    })
  }

  render() {
    const children = React.Children.map(
      this.props.children,
      (child) => React.cloneElement(child, { category: this.props.route.category })
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
          }}
          />
        </article>
      </main>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
