const swiper = new Swiper('.swiper', {
    loop: true,
    spaceBetween: 30,
    autoplay: {
    delay: 3000,},
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