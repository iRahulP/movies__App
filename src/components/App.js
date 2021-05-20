import { data } from "../data";
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import React from 'react';

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      console.log('Updated...');
      this.forceUpdate();
    });
    //make api call to get movies
    //and dispatch action
    this.props.store.dispatch({
      type: 'ADD_MOVIES',
      movies: data
    });
    console.log('state', this.props.store.getState());
  }
  render() {
    const movies = this.props.store.getState();
    console.log('Rendering...');
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>
          <div className="list">
            {movies.map((movie) => {
              console.log(movie);
              return <MovieCard movie={movie} key={movie.imdbID} />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
