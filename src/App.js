import React, { Component } from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import axios from 'axios'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

class CardExpandable extends Component {
  render() {
    const { post } =  this.props
    return (
      <Card className='card'>
        <CardHeader
          title={post.title}
          subtitle='Subtitle'
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}> {post.body} </CardText>
      </Card>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/posts')
      .then(res => {
        console.log(res.data[0])
        const posts = res.data
        this.setState({ posts })
      })
  }

  renderPost(post, i) {
    return (
      <CardExpandable post={post} key={post.id}/>
    )
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          {this.state.posts.map(this.renderPost)}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
