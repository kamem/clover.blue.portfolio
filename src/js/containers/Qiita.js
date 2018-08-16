import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

// Components
import {Section, Title, Content, Data} from '../components/common/Content'

export class Qiita extends React.Component {
  render() {
    const { item } = this.props
    return (
      <Section>
        <Title>{item && item.title}</Title>
        <Data {...{item}} />
        <Content>
          {item && item.body}
        </Content>
      </Section>
    )
  }
}

function mapStateToProps({qiita}, props) {
  const item = _.find(qiita.items, {uuid: props.routeParams.item_id})
  return {
    item,
    ...qiita
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Qiita)

