let swiper = new Swiper(".mySwiper", {

    watchOverflow: false,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        /* renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        }, */
    },
});
