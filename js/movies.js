const filterButtonOpen = document.querySelector('.main__filter-button');
const filterButtonClose = document.querySelector('.popup-container__button');
const mainBackground = document.querySelector('.main__background');
const popupContainer = document.querySelector('.main__popup-container');
const paginationSection = document.querySelector('.main__pagination-inner');

const moviesList = document.querySelector('.main__movies-list');
initMovies();

function initMovies(){
  filterButtonOpen.addEventListener('click', function(){
      popupContainer.classList.toggle('main__popup-container--open');
      mainBackground.classList.toggle('visually-hidden');
  });

  filterButtonClose.addEventListener('click', function(){
      popupContainer.classList.toggle('main__popup-container--open');
      mainBackground.classList.toggle('visually-hidden');
  })

  mainBackground.addEventListener('click', function(){
      popupContainer.classList.toggle('main__popup-container--open');
      mainBackground.classList.toggle('visually-hidden');
  })

  loadList();
}

function loadList() {
  const urlParams = new URLSearchParams(window.location.search);
  let page = urlParams.get("page");

  if(page == undefined || page == null) {page = 1;}

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmJhMWMxZjg1YWU0ZTJhYzNiYzJhNjNhOTRlOGEyMyIsIm5iZiI6MTczNzk5NTY1OC45NDcsInN1YiI6IjY3OTdiNThhM2FlMzU1YzQ3ODhmNDA4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kUNWul5PDKWbGwQvBbxomqF60G_bPaFgv_Vj3chTVuo'
    }
  };


  fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(res => res.json())
  .then(res => {
    const genres = structuredClone(res.genres);

    if (!genres || genres.length === 0) {
      console.log("Genres are not loaded");
      return;
    }

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page='+page+'&sort_by=popularity.desc', options)
    .then(res => res.json())
    .then(res => {

      let html = '';

      res.results.forEach(movie => {
        let genresList = [];
        movie.genre_ids.forEach(movieGenreId => {
          genres.forEach(genre => {
            if(movieGenreId == genre.id) genresList.push(genre.name);
          })
        })
        html+=`
          <li class="main__movies-item">
              <a href="./movie.html?id=${movie.id}" class="link main__movies-item__link">
                  <div class="main__movies-image-wrapper"><img class="main__movies-item__image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="movie_image"></div>
                  <p class="main__movies-item__title text-cut-2-lines">${movie.original_title}</p>
                  <p class="main__movies-item__description text-cut-2-lines">${movie.release_date.split("-")[0]}, ${genresList.join(', ')}</p>
              </a>
          </li>
        `;
      });

      let pagination = new Pagination(parseInt(page), 500, 4);
      paginationSection.innerHTML = pagination.buildPagination();

      moviesList.innerHTML = html;
    })
    .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

}