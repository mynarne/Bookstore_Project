async function loadData(title) {
    const REST_API_KEY = "dcd4417706d218dbe42babf0a06ebfde";
    
    const params = new URLSearchParams({
        query: title,
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
        const bookData = jsonData.documents[0];
        
        if (!bookData) {
            return;
        }

        document.querySelector('.top_title').textContent = bookData.title;
        
        const infoList = document.querySelectorAll('.tg_li');
        infoList[0].textContent = `저자 ${bookData.authors.join(', ')}`;
        infoList[1].textContent = `출판사 ${bookData.publisher}`;
        infoList[2].textContent = `출간일 ${bookData.datetime.substring(0, 10)}`;
        infoList[3].textContent = "상품등록일 2026년 03월 27일";

        // 2. 책 이미지
        const bookImg = document.querySelector('.book_info_img');
        bookImg.src = bookData.thumbnail || 'no_image.png'; // 이미지 없으면 기본이미지
        bookImg.alt = bookData.title;

        // 3. 분류 및 가격 상세 (오른쪽 bic_value 부분)
        const detailValues = document.querySelectorAll('.bic_value p');
        detailValues[0].textContent = "국내도서 > 소설";
        detailValues[1].textContent = bookData.isbn;
        detailValues[2].textContent = `${bookData.sale_price.toLocaleString()}원`;
        detailValues[3].textContent = `${bookData.price.toLocaleString()}원`;
        detailValues[4].textContent = "3,000원";

    } catch (error) {
        console.error(`데이터 로딩 중 에러 발생: ${error}`);
    }
}

// 메인에서 넘어온 제목 읽기
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get('title');

    if (bookTitle) {
        loadData(bookTitle);
    }
});


async function loadData2(author = '작가') {
    const REST_API_KEY = "dcd4417706d218dbe42babf0a06ebfde";
    
    const params = new URLSearchParams({
        query: author,
        size: 5
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
        const bookElements1 = document.querySelectorAll('.sa_book');
        

        bookElements1.forEach((book, i) => {
            const bookData1 = jsonData.documents[i];

            if (!bookData1) {
                return;
            }
            
            book.innerHTML = `
                <a href = '#'>
                    <div class = 'sa_book_img'>
                        <img src="${bookData1.thumbnail}" alt="${bookData1.title} 표지">
                    </div>
                    <div class="sa_book_text">
                        <p class="sa_book_title">${bookData1.title}</p>
                        <p><b>${bookData1.price.toLocaleString()}원</b></p>
                    </div>
                </a>
            `;
        });

    } catch (error) {
        console.error(`데이터 로딩 중 에러 발생: ${error}`);
    }
}

loadData2('작가');

async function loadData3(keyword = '베스트셀러') {
    const REST_API_KEY = "dcd4417706d218dbe42babf0a06ebfde";
    
    const params = new URLSearchParams({
        query: keyword,
        size: 6
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
        const bookElements1 = document.querySelectorAll('.br_book');
        

        bookElements1.forEach((book, i) => {
            const bookData1 = jsonData.documents[i];

            if (!bookData1) {
                return;
            }
            
            book.innerHTML = `
                <a href = '#'>
                    <div class = 'br_book_img'>
                        <img src="${bookData1.thumbnail}" alt="${bookData1.title} 표지">
                    </div>
                    <div class="br_book_text">
                        <p class="br_book_title">${bookData1.title}</p>
                        <p>${bookData1.authors.toLocaleString()}</p>
                    </div>
                </a>
            `;
        });

    } catch (error) {
        console.error(`데이터 로딩 중 에러 발생: ${error}`);
    }
}

loadData3('베스트셀러');