async function loadStoreProfiles() {
    try {
        const response = await fetch('./javascript/profile.csv');
        const data = await response.text();
        
        const rows = data.split('\n').slice(1);
        const storeList = document.getElementById('store_list');
        storeList.innerHTML = '';

        rows.forEach(row => {
            const cols = row.split(',');
            if (cols.length < 3) return;

            const [name, count, intro, imgUrl] = cols;

            const storeHTML = `
                <div class='certi_store'>
                    <div class='certi_store_profile'>
                        <img src="${imgUrl.trim() || './img/icon.png'}" alt="${name}">
                    </div>
                    <div class='certi_store_txt'>
                        <h4>${name}</h4>
                        <p>판매도서: ${Number(count).toLocaleString()}권</p>
                        <p class='introduce'>${intro}</p>
                    </div>
                </div>
            `;
            storeList.insertAdjacentHTML('beforeend', storeHTML);
        });
    } catch (error) {
        console.error("서점 프로필 로딩 실패:", error);
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', loadStoreProfiles);