import Navbar from './Navbar';
import MovieCard from './MovieCard';
import React from 'react';
import { data } from "../data";
import { addMovies, setShowFavourites } from '../actions';

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

  isMovieFavourite = (movie) => {
    const { favourites } = this.props.store.getState();

    const index = favourites.indexOf(movie);
    if (index !== -1) {
      //found movie
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  }

  render() {
    //const movies = this.props.store.getState();
    const { list, favourites, showFavourites } = this.props.store.getState();
    console.log('Rendering...', this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className="list">
            {displayMovies.map((movie) => {
              //console.log(movie);
              return <MovieCard
                movie={movie}
                key={movie.imdbID}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            })}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No Movies to Show!</div> : null}
        </div>
      </div>
    );
  }
}

export default App;
