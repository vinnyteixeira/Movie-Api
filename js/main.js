class Main {
  constructor() {
    const $doc = $(document);
    $doc.on("submit", ".js-search-form", (e) => this.validForm(e));
  }

  validForm(e) {
    e.preventDefault();

    const text = $(".input").val();

    $.ajax({
      type: "GET",
      url: `http://www.omdbapi.com/?apikey=ad8575b4&s=${text}`,
      success: (response) => {
        $("#moviesContainer").empty();

        if (response.Response === "True") {
          response.Search.forEach((movie) => {
            $.ajax({
              type: "GET",
              url: `http://www.omdbapi.com/?apikey=ad8575b4&i=${movie.imdbID}`,
              success: (movieDetails) => {
                movie.Plot = movieDetails.Plot;
                movie.Actors = movieDetails.Actors;

                loader.init(1);

                createMovieHtml(movie);

                loader.close();

                $("#searchInput").val("")
              },
              error: (error) => {
                console.log(error);
              },
            });
          });
        } else {
          console.log(response.Error);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

const main = new Main();
