import React, { Component } from 'react';

import './App.css';
import axios from 'axios';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseURL: 'https://practiceapi.devmountain.com/api',
      failure: 'Failed to communicate with api'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${this.state.baseURL}/posts`).then(res => {
      this.setState({posts: res.data})
    })
    .catch(() => alert(this.state.failure))
  }

  updatePost(id, updateText) {
    axios.put(`${this.state.baseURL}/posts?id=${id}`, {updateText}).then(res => [
      this.setState({posts: res.data})
    ])
    .catch(() => alert(this.state.failure))
  }

  deletePost(id) {
    axios.delete(`${this.state.baseURL}/posts?id=${id}`).then(res => {
      this.setState({posts: res.data})
    })
    .catch(() => alert(this.state.failure))
  }

  createPost(text) {
    axios.post(`${this.state.baseURL}/posts`, {text}).then(res => {
      this.setState({posts: res.data})
    })
    .catch(() => alert(this.state.failure))
  }

  render() {
    const displayPost = this.state.posts.map(post => {
      return <Post key={post.id}
      text={post.text}
      date={post.date}
      id={post.id}
      updatePostFn={this.updatePost}
      deletePostFn={this.deletePost} />
    })

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

          {displayPost}
          
        </section>
      </div>
    );
  }
}

export default App;
