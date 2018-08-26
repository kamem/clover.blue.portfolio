import React, {Fragment} from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

// Components
import {Section, Title, Content, Data} from '../components/common/Content'

export class Instagram extends React.Component {
  render() {
    const { item } = this.props
    return (
      <Section>
        <Title>Instagram</Title>
        <Data {...{item}} />
        <Content>
          {item &&
            <Fragment>
              <p>
                <img src={item.img} />
              </p>
              <p>{item.body}</p>
            </Fragment>
          }
        </Content>
      </Section>
    )
  }
}

function mapStateToProps({instagram}, props) {
  const item = _.find(instagram.items, {uuid: props.routeParams.item_id})
  return {
    item,
    ...instagram
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Instagram)

