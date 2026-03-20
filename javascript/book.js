async function loadData() {
    const REST_API_KEY = "dcd4417706d218dbe42babf0a06ebfde";
    // url에서 파라미터 정보를 얻어오고 key=value& 형식으로 변환해줌
    const params = new URLSearchParams( {
        target: 'title',
        query: '미움받을 용기',
        size: 8
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;
            
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`
            }
        });

        console.log(response);


        // 간이 예외처리
        if (!response.ok) {
            throw new Error(`HTTP 오류 - 상태코드:  ${response.status}`);
        }

        // 받은 데이터만 출력해주게함
        const jsonData = await response.json();
        const bookElement = document.querySelectorAll('.book');
        bookElement.forEach((book, i) => {
            const books = jsonData.documents[i];

            if (!books) return;

            book.innerHTML = `
                <img src="${books.thumbnail}">
                <h3>${books.title}</h3>
                <h2>${books.authors}</h2>
                <p>${books.contents.substring(0,60)}</p>
                <button>click</button>
            `

            const booktitle = jsonData.documents[i].title;
            const option = document.querySelectorAll('#filter > option')[i + 1];
            if (option) {
                option.textContent = booktitle;
            }
        });

        


    } catch(error) {
        console.log(`에러발생: ${error}`);
    }
}

loadData();

const divs = document.querySelectorAll("#new > div");
const select = document.getElementById("filter");

select.addEventListener('change', function(){
    const idx = select.selectedIndex;

    if (idx === 0) {
        divs.forEach(div => {
            div.style.display = 'block';
        });
    } else {
        divs.forEach((div,i) => {
            div.style.display = i === idx-1 ? "block" : "none";
        });
    }
});

const input = document.getElementById('myInput');
const bestDivs = document.querySelectorAll("#new div");

input.addEventListener("keyup", function(){
    const value = this.value.toLowerCase();

    bestDivs.forEach(div => {
        const text = div.textContent.toLowerCase();
        div.style.display = text.indexOf(value) > -1 ? "" : "none";
    });
});