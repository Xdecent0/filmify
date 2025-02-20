const movie_image = document.getElementById('movie_image');
const title = document.getElementById('title');
const slogan = document.getElementById('slogan');
const release_date = document.getElementById('release_date');
const country = document.getElementById('country');
const genres = document.getElementById('genres');
const age = document.getElementById('age');
const rating = document.getElementById('rating');
const description_heading = document.getElementById('description_heading');
const description = document.getElementById('description');

initMovieVisual();

async function initMovieVisual(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if(id == undefined || id == null || id == '' || isNaN(id)) window.location.href = "../index.html";

    let movie = await getMovie(id);

    if(movie.success != false){

        let imagePath = (movie.poster_path == undefined || movie.poster_path == null)?'../assets/images/no-image.png':`https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movie_image.setAttribute('src', imagePath);

        title.innerHTML = movie.title;
        
        if(movie.tagline != undefined && movie.tagline != null && movie.tagline != '') slogan.innerHTML = '"'+movie.tagline+'"';
        else { slogan.parentElement.style.display = 'none'; }

        const date = new Date(movie.release_date);

        const formattedDate = date.toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        if(movie.release_date != undefined && movie.release_date != null && movie.release_date != ''){
            release_date.innerHTML = formattedDate;
        }
        else { release_date.parentElement.style.display = 'none';}

        let countries = [];
        movie.production_countries.forEach(el => {
            countries.push(el.name);
        });

        if(countries.length != 0) country.innerHTML = countries.join(', ');
        else { country.parentElement.style.display = 'none'; }

        let movieGenres = [];
        movie.genres.forEach(el => {
            movieGenres.push(el.name);
        });

        if(movieGenres.length != 0) genres.innerHTML = movieGenres.join(', ');
        else { genres.parentElement.style.display = 'none'; }

        if(movie.adult == true) age.innerHTML = '18+';
        else { age.innerHTML = 'For all family'; }

        if(movie.vote_count != 0 ){
            rating.innerHTML = movie.vote_average.toFixed(1);
        }
        else { rating.parentElement.style.display = 'none';}

        description_heading.innerHTML = `What is "${movie.title}" about?:`
        description.innerHTML = movie.overview;
    }
}


async function getMovie(id){
    try {
        const url = 'https://api.themoviedb.org/3/movie/'+id+'?language=en-US';
        const response = await fetch(url, fetchOptions());
        const data = await response.json();
        return data ?? {};
    } catch (error) {
        console.error('HELLO'+error);
    }
}


function fetchOptions(){
    return {
        method: 'GET',
        headers: {
        accept: 'application/json',
        // Authorization: `Bearer ${API_KEY}`,
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmJhMWMxZjg1YWU0ZTJhYzNiYzJhNjNhOTRlOGEyMyIsIm5iZiI6MTczNzk5NTY1OC45NDcsInN1YiI6IjY3OTdiNThhM2FlMzU1YzQ3ODhmNDA4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kUNWul5PDKWbGwQvBbxomqF60G_bPaFgv_Vj3chTVuo'
        }
    };
}
