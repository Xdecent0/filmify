const filterButtonOpen = document.querySelector('.main__filter-button');
const filterButtonClose = document.querySelector('.popup-container__button');
const mainBackground = document.querySelector('.main__background');
const popupContainer = document.querySelector('.main__popup-container');

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