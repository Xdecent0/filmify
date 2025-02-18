const speedSettings = {
    mobile: 50,   
    tablet: 100,    
    desktop: 100 
};

const genres = [
    "Action", "Comedy", "Drama", "Science Fiction", "Thriller",
    "Horror", "Romance", "Animation", "Documentary", "Mystery",
    "Fantasy", "War", "Historical", "Adventure", "Crime"
];

const sliderTrack = document.getElementById('sliderTrack');

function createGenreDiv(genre) {
    const div = document.createElement('div');
    div.classList.add('genre');
    div.textContent = genre;
    return div;
}

function getSpeedMultiplier() {
    const width = window.innerWidth;
    if (width <= 767) {
        return speedSettings.mobile;
    } else if (width <= 1023) {
        return speedSettings.tablet;
    }
    return speedSettings.desktop;
}

function populateSlider() {
    sliderTrack.innerHTML = '';
    genres.forEach(genre => sliderTrack.appendChild(createGenreDiv(genre)));
    genres.forEach(genre => sliderTrack.appendChild(createGenreDiv(genre)));
}

function updateSliderAnimation() {
    const genreDivs = sliderTrack.querySelectorAll('.genre');
    let totalWidth = 0;
    
    for (let i = 0; i < genres.length; i++) {
        totalWidth += genreDivs[i].offsetWidth + 20;
    }
    
    sliderTrack.style.width = (totalWidth * 2) + 'px';
    const speedMultiplier = getSpeedMultiplier();
    const duration = totalWidth / speedMultiplier;
    sliderTrack.style.animationDuration = duration + 's';
}

populateSlider();

window.addEventListener('load', updateSliderAnimation);
window.addEventListener('resize', updateSliderAnimation);

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        populateSlider();
        updateSliderAnimation();
    }
});