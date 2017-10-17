import React from 'react'

import style from './app.css'

export default class HelloWorld extends React.Component {
  componentWillMount() {
    this.setState({
      num: 0
    })

    console.log(process.env.APP_ENV)
    console.log(process.env.BUILD_AT)

    const test = 0
    switch(test) {
      case 0 :
        console.log(test)
        break;
      default:
        console.log(test)
        break;
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        num: this.state.num + 2
      })
    }, 1000)
  }
  static test() {
    console.log('test')
    console.log(style)
  }
  render() {
    return (
      <h2 className={style.test}>
        <input onChange={this.test} />
        <span className="hello-world__i">ffsafasafda{this.props.name}</span>
        <p>{this.state.num}</p>
        <div>test {this.state.num}</div>
      </h2>
    )
  }
}
