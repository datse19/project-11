import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import apiKey from './config';

//Components
import SearchForm from './SearchForm';
import Nav from './Nav';
import NotFound from './NotFound';
import PhotoContainer from './PhotoContainer';

//API flickr
const photoKey = apiKey;


class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [], 
      cats: [],
      dogs: [], 
      birds: [],
      loading: true, 
      query: ''
    };
  }

  componentDidMount() {
    this.querySearch();
    this.querySearch('cats');
    this.querySearch('dogs');
    this.querySearch('birds');
  }

  //Searching for queries to match the right photos 
  querySearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${photoKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      if(query === 'cats') {
        this.setState({
        cats: response.data.photos.photo,
        loading: false,
        });
      } else if (query === 'dogs'){
        this.setState({
        dogs: response.data.photos.photo,
        loading: false,
        });
      } else if (query === 'birds') {
        this.setState({
        birds: response.data.photos.photo,
        loading: false,
        });
      } else {
        this.setState({
        photos: response.data.photos.photo,
        loading: false,
          });
      }
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.querySearch} />
          <Nav />
          <Switch>
            <Route path='/search/:query' render={({ match }) => <PhotoContainer querySearch={this.querySearch} query={match.params.query} loading={this.state.loading} photos={this.state.photos} />} />
            <Route path='/cats' render={() => <PhotoContainer query='cats' loading={this.state.loading} photos={this.state.cats} />} />
            <Route path='/dogs' render={() => <PhotoContainer query='dogs' loading={this.state.loading} photos={this.state.dogs} />} />
            <Route path='/birds' render={() => <PhotoContainer query='birds' loading={this.state.loading} photos={this.state.birds} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;