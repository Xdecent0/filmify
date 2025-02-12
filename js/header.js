const menuButton = document.querySelector('.header__menu-button');
const buttonImage = menuButton.querySelector('.header__menu-button__icon');
const menuBackground = document.querySelector('.menu__background');
const menu = document.querySelector('.header__menu');

menuButton.addEventListener('click', function(){ 
    let imageFile = buttonImage.getAttribute('src');

    menuButton.classList.toggle('button--fixed');
    menuButton.classList.toggle('z-index--max');

    menuBackground.classList.toggle('visually-hidden');
    
    if(menu.classList.toggle('header__menu--active')){ 
        imageFile = imageFile.replace(/\w+.{1}\w+$/, 'cross.svg'); 
    }
    else { imageFile = imageFile.replace(/\w+.{1}\w+$/, 'menu.svg'); }
        
    buttonImage.setAttribute('src', imageFile);
});

menuBackground.addEventListener('click', function(){ 
    let imageFile = buttonImage.getAttribute('src');

    menuButton.classList.toggle('button--fixed');
    menuButton.classList.toggle('z-index--max');

    menuBackground.classList.toggle('visually-hidden');
    
    if(menu.classList.toggle('header__menu--active')){ 
        imageFile = imageFile.replace(/\w+.{1}\w+$/, 'cross.svg'); 
    }
    else { imageFile = imageFile.replace(/\w+.{1}\w+$/, 'menu.svg'); }
        
    buttonImage.setAttribute('src', imageFile);
});