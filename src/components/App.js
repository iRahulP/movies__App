import Navbar from './Navbar';
import MovieCard from './MovieCard';
import React from 'react';
import { data } from "../data";
import { addMovies, setShowFavourites } from '../actions';
// import { StoreContext } from '../index';
import { connect } from '../index';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      //found movie
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  }

  render() {
    const { movies, search } = this.props; //{movies: {}, search: {}}
    //const movies = this.props.store.getState();
    const { list, favourites, showFavourites } = movies;
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar
          search={search}
        />
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
                dispatch={this.props.dispatch}
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

// class AppWraper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search
  }
}

const ConnectedComponent = connect(mapStateToProps)(App)

export default ConnectedComponent;