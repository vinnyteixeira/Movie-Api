class MovieHtmlCreator {
  constructor(movie) {
    this.movie = movie;
    this.html = `
      <div class="col-sm-5 col-md-4 col-lg-3 remove">
          <div class="thumbnail custom-thumbnail">
            <h3>${this.movie.Title}</h3>
            <img src="${this.movie.Poster}" alt="poster" class="poster" />
            <div class="cont-button">
              <button href="#" class="btn btn-danger js-btn-favoritar" role="button" data-movie-id="${this.movie.imdbID}">Favorite</button>
              </div>
              <button class="btn btn-primary btn-more-info" style=" text-align: center;"  data-collapse-key="${this.movie.imdbID}">More Info</button>
              <div>
                <div class="caption">
                  <div data-collapse-target="${this.movie.imdbID}" style="display: none">
                    <p>Actors: ${this.movie.Actors}</p>
                    <p>Year: ${this.movie.Year}</p>
                    <p>Plot: ${this.movie.Plot}</p>
                  </div>
                </div>
              </div>
          </div>
      </div>
      
    `;
  }

  appendTo(elementSelector) {
    $(elementSelector).append(this.html);
  }
}

function createMovieHtml(movie) {
  const movieHtmlCreator = new MovieHtmlCreator(movie);
  movieHtmlCreator.appendTo(".js-container-movie.details");
}
