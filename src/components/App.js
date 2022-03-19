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
      watches: [],
      lakes: [], 
      birds: [],
      loading: true, 
      query: ''
    };
  }

  componentDidMount() {
    this.querySearch();
    this.querySearch('watches');
    this.querySearch('lakes');
    this.querySearch('birds');
  }

  //Searching for queries to match the right photos 
  querySearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${photoKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      if(query === 'watches') {
        this.setState({
        watches: response.data.photos.photo,
        loading: false,
        });
      } else if(query === 'lakes'){
        this.setState({
        lakes: response.data.photos.photo,
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
            <Route exact path='/' render={() => <PhotoContainer data={this.state.photos} query='watches' loading={this.state.loading} photos={this.state.photos} />} />
            <Route path='/watches' render={() => <PhotoContainer data={this.state.watches} query='watches' loading={this.state.loading} photos={this.state.watches} />} />
            <Route path='/lakes' render={() => <PhotoContainer data={this.state.lakes} query='lakes' loading={this.state.loading} photos={this.state.lakes} />} />
            <Route path='/birds' render={() => <PhotoContainer data={this.state.birds} query='birds' loading={this.state.loading} photos={this.state.birds} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;