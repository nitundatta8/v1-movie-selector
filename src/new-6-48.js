<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css?family=Bangers|Forum|Single+Day&display=swap" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Movie Favorites</title>
</head>

<body>

  <div class="contanier-fluid">
    <div class="jumbotron">
      <h1 class="head"></h1>Movie Favorites <img
        src="https://lh3.googleusercontent.com/proxy/_6FVp3F3kluX225nN6aOyE6zoHnCbk60pk2vaw-FXxA_qrFVqDbgVTfhFJ4L71KgNsfIQ4DUGI_qQ9wYVK9ARXRTau28ufy4ozTI3KrVeWDqTp9B7dx1vifFOMiIcWuOy1yJTOffKx-VL3lyQoPW"
        id="reel" alt="photo of reel"></h1>
    </div>

    <p class="intro">Search Movies Below:</p>
    <div class='input'>
      <label for="movie" id="enter" results>Enter a movie name below:</label>
      <input id="movie" type="text">
      <button class="btn-success" id="movie-title">Submit</button>
    </div>
    <div class="search-msg">
        <p>About <span id="num-of-results"></span> results:</p>
    </div>
    <div>
       <button id="showFMovieList" class="btn btn-primary"  type="button">Favorite movie List</button>
       <!-- <a id="showFMovieList" href="#">Favorite movie List</a> -->
    </div>
    <div id="details"></div>
    <div id="fMovieList"></div>
    <div id="results" class="movieList"></div>

    <div class="row">
      <div class="col-sm-3.2">
        <div class="card">
          <img class="card-img-top" src="https://image.tmdb.org/t/p/w94_and_h141_bestv2${response.poster_path}" style="width: 18rem" alt="Card image cap"/>
          <div class="card-body">
          </div>
        </div>
      </div>
      
      <div class="col-sm-6">
        <div class="card card1">
          <div class="card-body">
            <h5 class="card-title">${response.original_title}</h5>
            <p>Year :${response.release_date}</p>
            <p class="card-text">${response.overview}</p>
            <button type="button" class="btn btn-primary" id="favoriteMoveiList">Add To Your Favorites</button>
            <button type="button" class="btn btn-primary" id="favoriteMoveiList">Remove from your Favorites</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</body>

</html>