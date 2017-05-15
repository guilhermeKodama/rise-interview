import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import axios from 'axios'
import CardExpandable from './components/CardExpandable'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

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

  getPostIndex(posts, post) {
    for(let i = 0; i < posts.length; i++){
      if(post.id === posts[i].id) return i
    }
  }

  deletePost(post) {
    const posts = this.state.posts.slice()
    const i =  this.getPostIndex(posts, post)
    delete posts[i]
    posts.splice(i, 1)
    this.setState({ title: 'Title', posts: posts })
  }

  getComments(expanded, post) {
    const i = this.getPostIndex(this.state.posts, post)
    const posts = this.state.posts.slice()
    const newPost = posts[i]
    newPost.isExpanded = expanded

    //if expanding now update comments
    if(expanded === true) {
      axios.get(`http://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then(res => {
          newPost.comments = res.data
          posts[i] = newPost
          this.setState({
            title: post.title,
            posts
          })
        })
    } else {
      posts[i] = newPost
      this.setState({
        title: post.title,
        posts
      })
    }
  }

  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/posts')
      .then(res => {
        const posts = res.data
        for(let i = 0; i < posts.length; i++){
          const post = posts[i]
          post.isExpanded = false
        }

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
            {this.state.posts.map((post, i) => {
              return <CardExpandable p
                        post={post}
                        key={post.id}
                        setTitle={this.setTitle.bind(this)}
                        deletePost={this.deletePost.bind(this)}
                        onExpanded={this.getComments.bind(this)}
                        isExpanded={post.isExpanded}
                        />
            })}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App
