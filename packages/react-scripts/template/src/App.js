import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import jsonp from 'jsonp';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      imageTags : ""
    };
  }
  search(e){
    this.setState({imageTags: e.target.value}, function(){
      jsonp('https://api.flickr.com/services/feeds/photos_public.gne?format=json&tagmode=any&tags=' + this.state.imageTags, 
        {"param" : "jsoncallback"}, 

        function (err, data) {
          if (err) {
            console.error(err.message);
          } 
          else {
            const resp = data.items;
            // window.ddd = data;
            // console.log(typeof(resp));
            this.setState({posts : resp});
          }
      }.bind(this));
    }.bind(this));
  }
 
  handleImageTagsChange (e) {
    var search = this.search.bind(this);
    search(e);
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="row">
          <div className="col-xs-12 col-md-6 col-md-offset-3">
             <div className="form-group">
                <label for="imagetags">Image Tags</label>
                <input value={this.state.imageTags} onChange={this.handleImageTagsChange.bind(this)} type="text" className="form-control" id="imagetags"/>
              </div>
          </div>
          {this.state.posts.map((post, index) => 
               <div key={index} className="col-xs-12 col-md-6">
                  
                    <img class="card-img-top" src={post.media.m} alt="Card image cap"/>
                    <div class="card-block">
                      <h4 class="card-title">Title: {post.title}</h4>
                      <p class="card-text">Author: {post.author}</p>
                      <p class="card-text">tags: {post.tags}</p>
                      <a href={post.link} class="btn btn-primary">Click to View the full Image</a>
                    </div>
                </div>
             

          )} 
         
         
        </div>
      </div>
    );
  }
}

export default App;
