const menuButton = document.querySelector('.header__menu-button');
const buttonImage = menuButton.querySelector('.header__menu-button__icon');
const menuBackground = document.querySelector('.menu__background');
const menu = document.querySelector('.header__menu');

initMenu()

function initMenu(){ 
    menuButton.addEventListener('click', toggleMenu);
    menuBackground.addEventListener('click', toggleMenu);
}

function toggleMenu(){
    let imageFile = buttonImage.getAttribute('src');

    menuButton.classList.toggle('button--fixed');
    menuButton.classList.toggle('z-index--max');

    menuBackground.classList.toggle('visually-hidden');
    
    if(menu.classList.toggle('header__menu--active')){ 
        imageFile = imageFile.replace(/\w+.{1}\w+$/, 'cross.svg'); 

        menuBackground.style.zIndex = 3;
        menuButton.style.zIndex = 5;
        menu.style.zIndex = 4;

    }
    else { 
        imageFile = imageFile.replace(/\w+.{1}\w+$/, 'menu.svg'); 

        menuBackground.style.zIndex = 1;
        menuButton.style.zIndex = 1;
        menu.style.zIndex = 1;
    }
        
    buttonImage.setAttribute('src', imageFile);
}