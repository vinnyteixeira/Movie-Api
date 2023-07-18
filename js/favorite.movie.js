class FavoriteMovie {
  constructor() {
    this.container = $(".js-container-favorite-movie .js-container");
    this.initEventHandlers();
    this.displayFavoriteMovies();
  }

  createFavoriteMovieHtml(movie) {
    let html = `
      <div class="col-sm-5 col-md-4 col-lg-3" data-movie-id="${movie.imdbID}">
        <div class="thumbnail custom-thumbnail">
          <h3>${movie.Title}</h3>
          <img src="${movie.Poster}" alt="poster" class="poster" />
          <div class="cont-button">
            <a href="#" class="btn btn-default btn-desfavoritar" style="width: 100%; margin: 0 auto;" role="button" data-movie-id="${movie.imdbID}">Disfavor</a>
          </div>
          <button class="btn btn-primary btn-more-info" data-collapse-key="${movie.imdbID}">More Info</button>
          <div>
            <div class="caption">
              <div data-collapse-target="${movie.imdbID}" style="display: none">
                <p>Actors: ${movie.Actors}</p>
                <p>Year: ${movie.Year}</p>
                <p>${movie.Plot}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.container.append(html);
  }

  displayFavoriteMovies() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    this.container.empty();

    if (favoritos.length > 0) {
      favoritos.forEach((movieId) => {
        $.ajax({
          type: "GET",
          url: `http://www.omdbapi.com/?apikey=ad8575b4&i=${movieId}`,
          success: (movie) => {
            this.createFavoriteMovieHtml(movie);
          },
          error: (error) => {
            console.log(error);
          },
        });
      });
    } else {
      let html = `
        <div class="col-sm-12">
          <p class="text-center">Nenhum filme favorito encontrado.</p>
        </div>
      `;
      this.container.append(html);
    }
  }

  initEventHandlers() {
    $(".js-container-movie.details").on("click", ".js-btn-favoritar", (e) => {
      e.preventDefault();

      let movieId = $(e.target).attr("data-movie-id");

      let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      favoritos.push(movieId);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));

      $(e.target).addClass("favoritado");
      $(e.target).text("Favorited");
      $(e.target).prop("disabled", true);

      this.displayFavoriteMovies();
    });

    this.container.on("click", ".btn-desfavoritar", (e) => {
      e.preventDefault();
      let movieId = $(e.target).attr("data-movie-id");
      let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      favoritos = favoritos.filter((id) => id !== movieId);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      $(e.target).closest("[data-movie-id]").remove();
      this.displayFavoriteMovies();
      $(".js-container-movie.details").find(`.js-btn-favoritar[data-movie-id="${movieId}"]`).prop("disabled", false).removeClass("favoritado").text("Favorite");
    });
  }
}

const favoriteMovie = new FavoriteMovie();
