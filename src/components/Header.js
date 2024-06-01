import React from "react";
import logo from '../images/kotik.png'; 
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { theme, toggleTheme } = this.props;
    return (
      <header className="mb-4">
        <div className="poisk">
          <h1 className="mt-4" id="pos">КотоПоиск</h1>
          <img className="mt-2"id="kot" src={logo}></img>
        </div>
        <p className="mt-3">В нашем сервисе маленькие интернет-котята найдут для вас все фильмы и сериалы, которые вас интересуют!</p>
        <p>Для этого им даже не нужно платить! Пожалуйста, введите фильм(сериал), который вас интересует.</p>
        <button className="btn btn-secondary mt-3 mb-4" onClick={this.props.getTopMovies}>Топ фильмов</button>
        <button className="btn btn-secondary mt-3 ml-3 mb-4" onClick={toggleTheme}>Переключить на {theme === 'light' ? 'темную' : 'светлую'} тему</button>
        <form onSubmit={this.props.searchMovies}>
          <div className="search">
            <input type="text" className="form-control" name="query" placeholder="Поиск фильмов и сериалов..."/>
            <div className="search-append">
              <button className={`btn btn-secondary ${theme === 'dark' ? 'search-dark' : ''}`} type="submit">Поиск</button>
            </div>
          </div>
        </form>
      </header>
    );
  }
}

export default Header;
