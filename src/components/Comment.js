import React, { Component } from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'

class Comment extends Component {
  render() {
    const { comment } = this.props
    return (
      <Card className='card'>
        <CardHeader title={comment.name} />
        <CardText> {comment.body} </CardText>
      </Card>
    )
  }
}

export default Comment
