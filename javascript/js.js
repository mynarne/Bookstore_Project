// 헤더 리스트

document.addEventListener('DOMContentLoaded', () => {
    const menus = [
        { parent: '.menu_search_genre', child: '.sub_genre', type: 'grid' },
        { parent: '.menu_price_conner', child: '.sub_price', type: 'flex' },
        { parent: '.menu_event', child: '.sub_event', type: 'block' }
    ];

    menus.forEach(menu => {
        const parentEl = document.querySelector(menu.parent);
        const childEl = document.querySelector(menu.child);

        if (parentEl && childEl) {
            parentEl.addEventListener('mouseenter', () => {
                childEl.style.display = menu.type;
            });
            parentEl.addEventListener('mouseleave', () => {
                childEl.style.display = 'none';
            });
        }
    });
});



// 실검

document.addEventListener('DOMContentLoaded', () => {
    const rtsList = document.querySelector('.rts_list');
    const container = document.querySelector('.realtimesearch');
    let currentIndex = 0;
    const liHeight = 25;
    const totalItems = rtsList.querySelectorAll('li').length;
    let rollingTimer;

    function startRolling() {
        rollingTimer = setInterval(() => {
            currentIndex++;

            if (currentIndex >= totalItems) {
                currentIndex = 0;
            }

            if (!container.matches(':hover')) {
                rtsList.style.transition = 'top 0.5s ease';
                rtsList.style.top = `-${currentIndex * liHeight}px`;
            }
        }, 2500);
    }

    container.addEventListener('mouseenter', () => {
        clearInterval(rollingTimer);
        rtsList.style.top = '0px';
    });

    container.addEventListener('mouseleave', () => {
        startRolling();
    });

    startRolling();
});


/* const searchCategory = function() {
    const sccategory = document.querySelector('.search_category');
    const container = document.querySelector('#hb_search');

    function categoryList() {
        
    }
} */

// modal
const modal = document.getElementById('.modal');
const openBtn = document.querySelector('.cuns_btn');
const closeBtn = document.querySelector('.cuns_notice_close_btn');

// 열기
openBtn.onclick = function(e) {
    e.preventDefault();
    modal.style.display = 'flex';
}

// 닫기
closeBtn.onclick = function() {
    modal.style.display = 'none';
}