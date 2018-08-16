import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as env from '../env'

// Actions
import * as TestActions from '../actions/TestActions'

// CSS
import style from '../../css/hello_world.css'

// Components
import Cards from '../components/cards/Cards'

export class HelloWorld extends React.Component {

  componentWillMount() {
    this.setState({
      num: 0,
      text: ''
    })
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        num: this.state.num + 1
      })
    }, 1000)
  }

  handleOnChange(e) {
    this.props.testActions.changeText({ text: e.target.value })
  }

  render() {
    const { APP_ENV, BUILD_AT } = env
    const { text,
      route: {
        category
      }
    } = this.props

    return (
      <div className={style.test}>
        <Cards {...{
          category
        }}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.test
  }
}

function mapDispatchToProps(dispatch) {
  return {
    testActions: bindActionCreators(TestActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorld)
