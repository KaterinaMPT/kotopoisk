import React from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; 
import Footer from "./components/Footer";

const API_KEY = "DTQPJSQ-KFDMDVK-Q3RYD5P-04Y6FJP";

class App extends React.Component {
  state = {
    movies: [],
    theme: localStorage.getItem('theme') || 'light',
    showSearchResults: false 
  };

  componentDidMount() {
    document.body.className = this.state.theme; 
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.body.className = this.state.theme; 
    }
  }

  searchMovies = async (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    try {
      let response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${query}`, {
        headers: {
          'X-API-KEY': API_KEY,
          'accept': 'application/json',
        },
      });
      let data = await response.json();
      let validMovies = data.docs.filter(movie => movie.backdrop && movie.backdrop.url);

      if (validMovies.length < 10) {
        response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${query} фильм`, {
          headers: {
            'X-API-KEY': API_KEY,
            'accept': 'application/json',
          },
        });
        data = await response.json();
        const moreValidMovies = data.docs.filter(movie => movie.backdrop && movie.backdrop.url);
       
        const uniqueMovies = [...new Set([...validMovies, ...moreValidMovies])].slice(0, 10);
        validMovies = uniqueMovies;
      }

      this.setState({
        movies: validMovies,
        showSearchResults: true
      });
    } catch (error) {
      console.error('Ошибка в обработке информации:', error);
    }
  };

  getTopMovies = async () => {
    try {
      const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&order=-votes&year=${new Date().getFullYear()}`, {
        headers: {
          'X-API-KEY': API_KEY,
          'accept': 'application/json',
        },
      });
      const data = await response.json();
      const validMovies = data.docs.filter(movie =>
        movie.backdrop &&
        movie.backdrop.url &&
        movie.name !== "Русский хозяин" &&
        movie.name !== "Русская мечта"
      );

      this.setState({
        movies: validMovies,
        showSearchResults: false 
      });
    } catch (error) {
      console.error('Ошибка в обработке информации:', error);
    }
  };

  toggleTheme = () => {
    this.setState((prevState) => {
      const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); 
      return { theme: newTheme };
    });
  };

  render() {
    const { theme, movies, showSearchResults } = this.state;
    return (
      <div className={`container ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <Header
          searchMovies={this.searchMovies}
          getTopMovies={this.getTopMovies}
          toggleTheme={this.toggleTheme}
          theme={theme}
        />
        {showSearchResults && (
          <div>
            <h3>Интернет-котята нашли для вас...</h3>
            <div className="row">
              {movies.map((movie, movieIndex) => (
                <MovieCard key={movieIndex} movie={movie} />
              ))}
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default App;
