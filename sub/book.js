async function loadData(genre = '소설') {
    const REST_API_KEY = "dcd4417706d218dbe42babf0a06ebfde";
    
    const params = new URLSearchParams({
        query: genre,
        size: 1
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
        const bookElements1 = document.querySelectorAll('.book_info_shape');

        bookElements1.forEach((book, i) => {
            const bookData1 = jsonData.documents[i];

            if (!bookData1) {
                return;
            }
            
            book.innerHTML = `
                <img class="book_info_img" src="${bookData1.thumbnail}"">
            `;
        });

    } catch (error) {
        console.error(`데이터 로딩 중 에러 발생: ${error}`);
    }
}