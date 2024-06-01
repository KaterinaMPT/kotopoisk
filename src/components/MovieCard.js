import React from "react";

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    if (!movie.backdrop || !movie.backdrop.url) {
      return null; 
    }

    return (
      <div className="col-md-4 mb-4">
        <div className="card">
          <img
            src={movie.backdrop.url}
            className="card-img-top"
            alt={movie.name}
          />
          <div className="card-body">
            <h5 className="card-title">{movie.name}</h5>
            {movie.description && <p className="card-text">{movie.description}</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
