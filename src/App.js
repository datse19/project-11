import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router, 
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Search from './components/Search';
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import PhotoContainer from './components/PhotoContainer';
import apiKey from './config';


class App extends Component {

  state = {
    photos: [],
    isLoading: true,
    query:''
  }

  updateQuery = (query) => {
    this.setState({
      query
    })
  }

  componentDidMount() {
    this.updateQuery('orange');
  }

  componentDidUpdate( prevProps, prevState) {
    if(this.state.query !== prevState.query) {
      this.perfromSearch(this.state.query);
    }
  }

  performSearch = (query) => {
    this.setState ({
      isLoading: true,
      query
    })

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      if(response) {
        this.setState({
          photos: response.data.photos.photo,
          isLoading: false
        })
      }
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render () {
    return (
      <Router>
        <div className= "container">
          <h1>Photo Gallery</h1>
          <Search updateQuery={this.updateQuery} />
          <Nav onClick={this.performSearch} updateQuery={this.updateQuery} photos={this.state.photos} /> 
          {
            (this.state.isLoading)
            ? <p>Loading...</p>
            : (
              <Switch>
                <Route exact path='/' render={ () => <Redirect to = {`${this.state.query}`} />} /> 
                <Route path ="/:query" render={ () => <photoContainer photos={this.state.photos} query={this.state.query} updateQuery={this.updateQuery} />} /> 
                <Route component = {NotFound} /> 
              </Switch>
            )
          }
        </div>
      </Router>
    );
  }
}

export default App;