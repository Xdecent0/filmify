const filterButtonOpen = document.querySelector('.main__filter-button');
const filterButtonClose = document.querySelector('.popup-container__button');
const mainBackground = document.querySelector('.main__background');
const popupContainer = document.querySelector('.main__popup-container');
const paginationSection = document.querySelector('.main__pagination-inner');
const genreSelect = document.querySelector('.select__genre');
const releaseDateGteInput = document.getElementById('primary_release_date_gte');
const releaseDateLteInput = document.getElementById('primary_release_date_lte');
const searchInput = document.getElementById('search');
const moviesList = document.querySelector('.main__movies-list');
const filterSubmitButton = document.getElementById('filter_submit');

initMovies();

function initMovies(){
  filterButtonOpen.addEventListener('click', togglePopup)
  filterButtonClose.addEventListener('click', togglePopup)
  mainBackground.addEventListener('click', togglePopup)

  loadList();
}

function togglePopup(){
  popupContainer.classList.toggle('main__popup-container--open');
  mainBackground.classList.toggle('visually-hidden');

  filterButtonClose.classList.toggle('display--none');
  filterSubmitButton.classList.toggle('display--none');
  genreSelect.classList.toggle('display--none');
  releaseDateGteInput.classList.toggle('display--none');
  releaseDateLteInput.classList.toggle('display--none');
}

async function loadList() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.forEach((val,key) => {console.log(key + " " + val)})

  

  let doParam = urlParams.get("do");
  doParam = (doParam != 'search')?'discover':'search';

  let page = urlParams.get("page");
  let genreId = urlParams.get("genre");
  let primaryReleaseDateGte = urlParams.get("primary_release_date_gte");
  let primaryReleaseDateLte = urlParams.get("primary_release_date_lte");

  if(page == undefined || page == null) {page = 1;}
  if(genreId == undefined || genreId == null) {genreId = '';}
  if(primaryReleaseDateGte == undefined || primaryReleaseDateGte == null) {primaryReleaseDateGte = '';}
  if(primaryReleaseDateLte == undefined || primaryReleaseDateLte == null || primaryReleaseDateLte == '') {
    let today = new Date().toISOString().split('T')[0];
    primaryReleaseDateLte = today;
  }

  releaseDateGteInput.value = primaryReleaseDateGte;
  releaseDateLteInput.value = primaryReleaseDateLte;
  
  let genres = {};

    genres = await getGenres();

    if (!genres || genres.length === 0) {
      console.log("Genres are not loaded");
      return;
    }

    genreSelect.innerHTML += '<option></option>';
    genres.forEach(genre => {
      if(genreId == genre.id) genreSelect.innerHTML += '<option selected value="'+genre.id+'">'+genre.name+'</option>';
      else { genreSelect.innerHTML += '<option value="'+genre.id+'">'+genre.name+'</option>'; }
    })

    if(doParam == 'discover'){
        let movies = await getDiscover(page, genreId, primaryReleaseDateGte, primaryReleaseDateLte);
        
        moviesList.innerHTML = renderMovies(movies.results, genres);

        let pagination = new Pagination(parseInt(page), Math.min(500, movies.total_pages), 4);
        paginationSection.innerHTML = pagination.buildPagination();
      }
      else {
        let search = urlParams.get("search");
        if(search == undefined || search == null || search == '') {
          urlParams.delete('do');
          window.location.href = "movies.html";
        }
        searchInput.value = search;

        filterButtonOpen.style.opacity = '0';
        filterButtonOpen.style.pointerEvents = 'none';

        let movies = await getSearch(page, search);
        
        moviesList.innerHTML = renderMovies(movies.results, genres);

        let pagination = new Pagination(parseInt(page), Math.min(500, movies.total_pages), 4);
        paginationSection.innerHTML = pagination.buildPagination();
      }  
}

async function getGenres(){
  try{
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const response = await fetch(url, fetchOptions());
    const data = await response.json();
    return data.genres ?? {};
  }
  catch(error){
    console.error(error);
  }
}

async function getDiscover(page, genreId, dateGte, dateLte) {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}&primary_release_date.gte=${dateGte}&primary_release_date.lte=${dateLte}`;
    const response = await fetch(url, fetchOptions());
    const data = await response.json();
    return data ?? {};
  } catch (error) {
    console.error(error);
  }
}

async function getSearch(page, search) {
  try {
    const url = 'https://api.themoviedb.org/3/search/movie?query='+search+'&include_adult=false&language=en-US&page='+page;
    const response = await fetch(url, fetchOptions());
    const data = await response.json();
  return data ?? {};
  } catch (error) {
    console.error(error);
  }
}

function renderMovies(movies, genres){
  let html = '';
  movies.forEach(movie => {
          
    let genresList = [];
    if(movie.genre_ids != undefined && movie.genre_ids != null){
    movie.genre_ids.forEach(movieGenreId => {
      genres.forEach(genre => {
        if(movieGenreId == genre.id) {genresList.push(genre.name);}
      })
    })}

    let imagePath = (movie.poster_path == undefined || movie.poster_path == null)?'../assets/images/no-image.png':`https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    html+=`
      <li class="main__movies-item">
          <a href="./movie.html?id=${movie.id}" class="link main__movies-item__link">
              <div class="main__movies-image-wrapper"><img class="main__movies-item__image" src="${imagePath}" alt="movie_image"></div>
              <p class="main__movies-item__title text-cut-2-lines">${movie.original_title}</p>
              <p class="main__movies-item__description text-cut-2-lines">${(movie.release_date!=undefined && movie.release_date!='')?movie.release_date.split("-")[0]:''} ${(genresList.length != 0 && movie.release_date != undefined && movie.release_date!='')?', ':''} ${(genresList.length>0)?genresList.join(', '):' '}</p>
          </a>
      </li>
    `;
  });

  return html;
}

function fetchOptions(){
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmJhMWMxZjg1YWU0ZTJhYzNiYzJhNjNhOTRlOGEyMyIsIm5iZiI6MTczNzk5NTY1OC45NDcsInN1YiI6IjY3OTdiNThhM2FlMzU1YzQ3ODhmNDA4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kUNWul5PDKWbGwQvBbxomqF60G_bPaFgv_Vj3chTVuo'
    }
  };
}