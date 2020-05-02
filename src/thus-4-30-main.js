import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { Movies } from './movies-older.js';


let movieObj;
let currentMovie;
$(document).ready(function () {
  movieObj = new Movies();
  attachMovieListeners();

  $("#showFMovieList").click(function () {
    showFavoriteMovieList(movieObj);
    $("#details").hide();
    $("#fMovieList").show();
  });

  $("#details").on("click", "button", function () {
    // new 8.18pm
    $("#addToList").attr("style","display:none");
    movieObj.addfavoriteMovieList(currentMovie);
  });

 //new 8.37pm
  $("#details").on("click", "button", function () {
    if(this.id === "favoriteMoveiList"){
      $("#addToList").show();
      $("#favoriteMoveiList").attr("style","display:none");
    }else{
      if(this.id === "backToList"){
        $("#details").hide();
        $('#results').show();
      }
    }
  });

// search movie by title
  $('#movie-title').click(function () {
    $("#details").html("");
    $("#results").html("");
    $("#fMovieList").html("");
    $(".search-msg").show();
    $("#results").show();

    let title = $('#movie').val();
    $('#movie').val("");

    (async () => {
      const response = await movieObj.getMoviebyTitle(title);
      getElements(response);
      showNumOfResults(response);
    })();

    function showNumOfResults(response) {
      $('#num-of-results').text(`${response.results.length}`);
    }
    function getElements(response) {
      if (response) {
        let htmlInfo;
        for (let i = 0; i < response.results.length; i++) {

          htmlInfo = `<div class="p-2 border d-flex flex-wrap align-content-center bg-light">
                  <h5><a id="${response.results[i].id}" href="#">${response.results[i].original_title}</h5>
                  <div class="card">    
                    <p>Year :${response.results[i].release_date}</p>
                    <img class="card-img-top" src="https://image.tmdb.org/t/p/w94_and_h141_bestv2${response.results[i].poster_path}" style="width: 7rem" alt="Card image cap">
                  </div></a>
              </div>`
          $('#results').append(`${htmlInfo}`);
        }
      } else {
        $('#results').text(`There was an error handling your request.`);
      }
    }
  });
});


function getMoveiById(id){
  $("#results").hide();
  $("#fMovieList").hide();
  $("#details").show();
  $('#similarMovie').html('');
  $("#details").html('');
 

  (async () => {
    const response = await movieObj.displayDetailPage(id);
    getDetails(response);
    //new 10.53pm
    const similarMovie = await movieObj.findSimilarMovie(id);
    getSmilarMovie(similarMovie);
  })();


  function getDetails(response) {
    if (response) {
      currentMovie = response;
      console.log(currentMovie);
      
    let movieInfo = `<div class="row">
      <div class="col-sm-3.2">
        <div class="card">
          <img class="card-img-top" src="https://image.tmdb.org/t/p/w94_and_h141_bestv2${response.poster_path}" style="width: 18rem" alt="Card image cap"/>
          <div class="card-body">
          </div>
        </div>
      </div>
      
      <div class="col-sm-6">
        
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${response.original_title}</h5>
                <p>Year :${response.release_date}</p>
                <p class="card-text">${response.overview}</p>
                <button type="button" class="btn btn-primary" id="favoriteMoveiList">Add to Favorite List</button>
                <button type="button" class="btn btn-success" id="addToList">Watch Later</button>
                <button type="button" class="btn btn-primary" id="backToList">Back</button>
              </div>
            </div>
      </div>
        
    </div>`
      $('#details').html(`${movieInfo}`);
    } else {
      $('#details').text(`There was an error handling your request.`);
    }
  }

  // new 11.07pm
  function getSmilarMovie(similarMovie){
    console.log("val");
    if (similarMovie) {
      let similarMovieInfo;
      console.log("val2  ===");
      for (let i = 0; i < similarMovie.results.length; i++) {
        console.log("val3   ----");
        similarMovieInfo = `<div class="p-2 border d-flex flex-wrap align-content-center bg-light">
                <h5><a id="${similarMovie.results[i].id}" href="#">${similarMovie.results[i].original_title}</h5>
                <div class="card"style="width: 10rem;">    
                  <p>Year :${similarMovie.results[i].release_date}</p>
                  <img class="card-img-top" src="https://image.tmdb.org/t/p/w94_and_h141_bestv2${similarMovie.results[i].poster_path}" style="width: 7rem" alt="Card image cap">
                </div>
              </div></a>`
        $('#similarMovie').append(`${similarMovieInfo}`);
      }
    } else {
      $('#similarMovie').text(`There was an error handling your request.`);
    }
  }

}

function attachMovieListeners() {
  $("#similarMovie").on("click", "a", function (event) {
    event.preventDefault();
    getMoveiById(this.id)
  })

  $(".movieList").on("click", "a", function (event) {
    event.preventDefault();
    getMoveiById(this.id)
  })
}

function showFavoriteMovieList(movieObj) {
  let movieListInfo = "";
  movieObj.favoriteMovieList.forEach(function (movie) {

    movieListInfo = `<div class="row">
    <div class="col-sm-3.2">
      <div class="card">
        <img class="card-img-top" src="https://image.tmdb.org/t/p/w94_and_h141_bestv2${movie.poster_path}" style="width: 18rem" alt="Card image cap"/>
        <div class="card-body">
        </div>
      </div>
    </div>
    
   <div class="col-sm-6">
      <div class="card">
        <div class="card">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${movie.original_title}</h5>
              <p>Year :${movie.release_date}</p>
              <p class="card-text">${movie.overview}</p>
              <button type="button" class="btn btn-primary" id="favoriteMoveiList">Remove from your Favorites</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
    $("#fMovieList").append(movieListInfo);
  });
}

//<h5>${movie.original_title}</h5>   
//<p>Year :${movie.release_date}</p>
  
  
  
  