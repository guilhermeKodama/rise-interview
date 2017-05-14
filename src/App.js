import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import axios from 'axios'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

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

class CardExpandable extends Component {
  constructor() {
    super()
    this.state = {
      comments: []
    }
  }

  getComments(post) {
    this.props.setTitle(post)
    axios.get(`http://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then(res => {
        const comments = res.data
        console.log(comments.length)
        this.setState({
          comments
        })
      })
  }

  renderComment(comment, i) {
    return (
      <ListItem key={comment.id}> <Comment comment={comment}/> </ListItem>
    )
  }

  render() {
    const { post } =  this.props
    return (
      <Card className='card' onExpandChange={() => this.getComments(post)}>
        <CardHeader
          title={post.title}
          subtitle='Subtitle'
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}> {post.body} </CardText>
        <List expandable={true}>
          {this.state.comments.map(this.renderComment)}
        </List>
      </Card>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      title: 'Title',
      posts: []
    }
  }

  setTitle(post) {
    this.setState({ title: post.title, posts: this.state.posts })
  }

  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/posts')
      .then(res => {
        const posts = res.data
        this.setState({ title: this.state.title, posts })
      })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <AppBar title={this.state.title} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
          </div>
          <div>
            {this.state.posts.map((post, i) => <CardExpandable post={post} key={post.id} setTitle={this.setTitle.bind(this)}/> )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
