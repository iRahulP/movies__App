import Navbar from './Navbar';
import MovieCard from './MovieCard';
import React from 'react';
import { data } from "../data";
import { addMovies } from '../actions';

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      console.log('Updated...');
      this.forceUpdate();
    });
    //make api call to get movies
    //and dispatch action
    store.dispatch(addMovies(data));
    console.log('state', this.props.store.getState());
  }
  render() {
    //const movies = this.props.store.getState();
    const { list } = this.props.store.getState();
    console.log('Rendering...', this.props.store.getState());
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>
          <div className="list">
            {list.map((movie) => {
              //console.log(movie);
              return <MovieCard movie={movie} key={movie.imdbID} />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
