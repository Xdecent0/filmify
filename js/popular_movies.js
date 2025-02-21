// import { API_KEY } from '../config/config.local.js';

async function initMovieSlider() {
    const movies = await getPopularMovies();
    if (movies && movies.results) {
        renderMovieSlides(movies.results);
        initializeSwiper();
    }
}

async function getPopularMovies() {
    try {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                 Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmJhMWMxZjg1YWU0ZTJhYzNiYzJhNjNhOTRlOGEyMyIsIm5iZiI6MTczNzk5NTY1OC45NDcsInN1YiI6IjY3OTdiNThhM2FlMzU1YzQ3ODhmNDA4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kUNWul5PDKWbGwQvBbxomqF60G_bPaFgv_Vj3chTVuo'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return null;
    }
}

function renderMovieSlides(movies) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = ''; 

    movies.forEach(movie => {
        const imagePath = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : '../assets/images/no-image.png';

            const slide = `
            <div class="swiper-slide">
                <div class="movie-slide">
                    <img src="${imagePath}" alt="${movie.title}" class="movie-poster">
                    <div class="movie-info">
                        <h3 class="movie-title text-cut-1-lines">${movie.title}</h3>
                        <p class="movie-date">${movie.release_date ? movie.release_date.split('-')[0] : ''}</p>
                        <div class="movie-rating">Rating: ${movie.vote_average.toFixed(1)}</div>
                    </div>
                </div>
            </div>
        `;
        
        
        swiperWrapper.innerHTML += slide;
    });
}

function initializeSwiper() {
    const swiper = new Swiper('.swiper', {
        loop: true,
        spaceBetween: 30,
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
    });
}

document.addEventListener('DOMContentLoaded', initMovieSlider);