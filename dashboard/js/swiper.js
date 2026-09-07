new Swiper('.card-wrapper', {
    loop: false,
    spaceBetween: 0, //50
    // Pagination bullets
    // pagination: {
    //     el: '.swiper-pagination',
    //     clickable: false,
    //     dynamicBullets: false
    // },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Responsive breakpoints
    slidesPerView: 'auto', // Automatically adjust based on the number of cards
    centeredSlides: true, // Ensure slides align to the left
    // breakpoints: {
    //     0: {
    //         slidesPerView: auto
    //     }
        // 480: {
        //     slidesPerView: 2
        // }
    // }
    //     768: {
    //         slidesPerView: 2
    //     },
    //     1024: {
    //         slidesPerView: 3
    //     }
    // }
});
