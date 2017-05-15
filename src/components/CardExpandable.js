import React, { Component } from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentSend from 'material-ui/svg-icons/content/send';
import TextField from 'material-ui/TextField';
import Comment from './Comment'
import cuid from 'cuid'

class CardExpandable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      comments: props.post.comments || []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    this.setState({value: event.target.value})
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
          />
          <div className='card-inside' expandable={true}>
            <CardText expandable={true}> {post.body} </CardText>
            <List expandable={true}>
              { post.comments? post.comments.map(this.renderComment) : false }
              <ListItem key='text-field'>
                <Card className='card'>
                  <div className='text-field-comment-parent'>
                    <TextField
                      id={cuid()}
                      value={this.state.value}
                      onChange={this.handleInputChange}
                      fullWidth={true}
                      hintText={this.state.value === ''? 'Write a comment...' : ''}/>
                    <ContentSend style={{marginTop: '15px'}} onClick={()=> this.props.addComment(post, this.state.value)} />
                  </div>
                </Card>
              </ListItem>
            </List>

          </div>
        </Card>
      </div>
    )
  }
}

export default CardExpandable
