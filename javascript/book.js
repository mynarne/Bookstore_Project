async function loadData(genre = '소설') {
    const REST_API_KEY = "dcd4417706d218dbe42babf0a06ebfde";
    
    const params = new URLSearchParams({
        query: genre,
        sort: 'latest',
        size: 7
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류 - 상태코드: ${response.status}`);
        }

        const jsonData = await response.json();
        const bookElements1 = document.querySelectorAll('.new_book');
        

        bookElements1.forEach((book, i) => {
            const bookData1 = jsonData.documents[i];

            if (!bookData1) {
                return;
            }
            
            book.innerHTML = `
                <img id="new_book_img" src="${bookData1.thumbnail}" alt="${bookData1.title} 표지">
                <div id="new_book_text">
                    <div><p id="new_book_title">${bookData1.title}</p></div>
                    <div><p><b>${bookData1.price.toLocaleString()}원</b></p></div>
                </div>
            `;
        });

    } catch (error) {
        console.error(`데이터 로딩 중 에러 발생: ${error}`);
    }
}

async function loadData2(price = '1') {
    const REST_API_KEY = "dcd4417706d218dbe42babf0a06ebfde";
    
    const params = new URLSearchParams({
        query: price,
        size: 16
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류 - 상태코드: ${response.status}`);
        }

        const jsonData = await response.json();
        const bookElements2 = document.querySelectorAll('.price_book');
        

        bookElements2.forEach((book, i) => {
            const bookData2 = jsonData.documents[i];

            if (!bookData2) {
                return;
            }

            book.innerHTML = `
                <img id="price_book_img" src="${bookData2.thumbnail}" alt="${bookData2.title} 표지">
                <div id="price_book_text">
                    <p id="price_book_title">${bookData2.title}</p>
                    <p><b>${bookData2.price.toLocaleString()}원</b></p>
                </div>
            `;
        });

    } catch (error) {
        console.error(`데이터 로딩 중 에러 발생: ${error}`);
    }
}


loadData();
loadData2();