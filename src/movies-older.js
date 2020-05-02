export class Movies {

  constructor() {
    this.favoriteMovieList = [];
  }

  addfavoriteMovieList(response) {
    this.favoriteMovieList.push(response);
  }

  deleteMovieById(idInput) {
   
    for (let i = 0; i < this.favoriteMovieList.length; i++) {
      console.log( this.favoriteMovieList.length );
      console.log( typeof idInput);
      let id = parseInt(idInput);
      if (this.favoriteMovieList[i].id === id) {
        console.log("remove3");
        delete this.favoriteMovieList[i];
        console.log( this.favoriteMovieList[i] );
        return true;
      }
      
    }
    return false;
  }

  async getMoviebyTitle(title) {
    let jsonifiedResponse;
    try {
      let response = await fetch(`https://api.themoviedb.org/3/search/movie/?api_key=${process.env.api_key}&query=${title}`);
      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      }
    } catch (error) {
      return false;
    }
    return jsonifiedResponse;
  }


  async displayDetailPage(id) {
    let jsonifiedResponse;
    try {
      let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.api_key}`;
      let response = await fetch(url);

      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      }
    } catch (error) {
      return false;
    }
    return jsonifiedResponse;
  }

  //new 11.00pm
  async findSimilarMovie(id) {
    let jsonifiedResponse;
    try {
      let url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.api_key}&language=en-US&page=1`;

      let response = await fetch(url);

      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      }
    } catch (error) {
      return false;
    }
    return jsonifiedResponse;
  }

}

