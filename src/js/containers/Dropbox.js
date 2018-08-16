import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

// Components
import {Section, Title, Content, Data} from '../components/common/Content'

export class Dropbox extends React.Component {
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

function mapStateToProps({dropbox}, props) {
  const item = _.find(dropbox.items, {uuid: props.routeParams.item_id})
  return {
    item,
    ...dropbox
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropbox)

