import React from 'react';
// import { data } from '../data';
import { addMovieToList, handleMovieSearch } from '../actions';
import { StoreContext } from '../index';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSearchResults: true,
            searchText: ''
        };
    }

    handleAddToMovies = (movie) => {
        const { dispatch } = this.props;
        dispatch(addMovieToList(movie));
        this.setState({
            showSearchResults: false
        });
    }

    handleSearch = () => {
        const { dispatch } = this.props;
        const { searchText } = this.state;
        dispatch(handleMovieSearch(searchText));
    }

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }

    render() {
        const { result: movie, showSearchResults } = this.props.search;
        return (
            <div className="nav">
                <div className="search-container">
                    <input onChange={this.handleChange} />
                    <button id="search-btn" onClick={this.handleSearch}>Search</button>
                    {
                        showSearchResults &&
                        <div className="search-results">
                            <div className="search-result">
                                <img className="seacrh-pic" src={movie.Poster} alt="search-pic" />
                                <div className="movie-info">
                                    <span>{movie.Title}</span>
                                    <button onClick={() => { this.handleAddToMovies(movie) }}>
                                        Add to Movies
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

class NavbarWraper extends React.Component {
    render() {
        return (
            <StoreContext.Consumer>
                {(store) => (
                    <Navbar dispatch={store.dispatch} search={this.props.search} />
                )}
            </StoreContext.Consumer>
        );
    }
}

export default NavbarWraper;
