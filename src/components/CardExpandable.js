import React, { Component } from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Comment from './Comment'

class CardExpandable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: props.post.comments || []
    }
  }

  renderComment(comment, i) {
    return (
      <ListItem key={comment.id}> <Comment comment={comment}/> </ListItem>
    )
  }

  render() {
    const { post } =  this.props
    return (
      <div>
      {
        post.isExpanded?
          <div onClick={() => this.props.deletePost(post)} className='deleteButton'> <ActionDelete /> </div>
          : <p/>
      }
      <Card className='card' onExpandChange={(expanded) => this.props.onExpanded(expanded, post)}>
        <CardHeader
          title={post.title}
          subtitle='Subtitle'
          actAsExpander={true}
          showExpandableButton={true}
          className='card-header'
        >
        </CardHeader>
        <CardText expandable={true}> {post.body} </CardText>
        <List expandable={true}>
          { post.comments? post.comments.map(this.renderComment) : false }
        </List>
      </Card>
      </div>
    )
  }
}

export default CardExpandable
