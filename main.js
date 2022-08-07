
let news = [];

//페이지네이션
let page = 1;
let total_pages = 0;


//querySelectorAll 버튼목록들 전부
let menus = document.querySelectorAll(".menus button");
console.log("menus",menus);
//getNewsByTopic함수이름 
//event 누구를 선택했는지 알아야 되니깐
menus.forEach((menu) => menu.addEventListener("click", (event)=>getNewsByTopic(event)));

//키워드검색
let searchButton  = document.getElementById("search-button");
console.log("searchButton", searchButton);

let url;

//api호출 함수를 부른다.
//const getNews = async() => {
    //news API인데 여기에서 사진이나이런것들을 보려면 API문서에 따른 Key 이름과 값을 보내줘야한다. 
    //key를 header에 보내줘야한다.
//    let header = new Headers({"x-api-key" : "U5vDkw4JdgBc1gBLF2J2waR7-MiQJtARq1hvyzf0bYY"});


    //await를 쓰려면 async가 있어야 한다. 둘은 세트다. 노트 2번째장에 설명 적혀있다.
//    let response = await fetch(url, {headers:header}); //서버로 요청하는 키워드는 다양하다.
                                                        //ajax, http, fetch(요놈이 제일 간단하데)
    
//    let data = await response.json(); //json() 자료형타입(데이터타입) 웬만한 서버통신할때는 JSON을 쓴다.
                                      //JSON을 많이 쓰는 이유는 객체와 매우 유사하다. 그래서 많이씀
                                      //객체랑 매우 유사한데 text타입일 뿐
 //   console.log("this is data: ", data);

 //   news = data.articles; //여기서 articles가 어디서 왓냐? 콘솔에 data찍고 웹브라우저에서 검색 누르고 
                          //data타입들을 보면 key이름이 articles라는게 있다.

 //   render();
//}

//try ~ catch 
const getNews = async() => {
    
    try {
        let header = new Headers({"x-api-key" : "U5vDkw4JdgBc1gBLF2J2waR7-MiQJtARq1hvyzf0bYY"});  

        //url page라는 걸 쿼리에 추가
        url.searchParams.set("page", page); //&page=
        console.log("url은 어떻게 생겻는지", url);

        let response = await fetch(url, {headers:header});    
        console.log("this is response: ", response);
        let data = await response.json();
        console.log("this is data: ", data);
        let totalPage = data.total_pages;

        if(response.status == 200) {
            //console.log("this is data: ", data); 데이터값들이 0일때 data안이 어떻게 생겻는지 궁금해서 찍어본것..
            if(data.total_hits == 0) {
                throw new Error("검색된 결과값이 없습니다.");
            }
            news = data.articles; 
            console.log("this is news: ", news);

            total_pages = data.total_pages;
            page = data.page;

            render();
            pagenation();
        } else {
            throw new Error(data.message);
        }     

    } catch(error) {
        console.log("잡힌 에러는 ", error.message);
        errorRender(error.message);
    }
};


//api부르는 함수
const getLatestNews = async() => {
    //URL이라는 클래스를 이용해서 크롬에 보낸다.
   url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=music&page_size=10&`);
   console.log(url);

    getNews();
};



//뉴스종류 menus를 선택했을때
const getNewsByTopic = async (event)=>{
    //textContent없으면 <button>event.target</button> 이렇게 나온다.
    //textContent은 옆의 태그들은 제외하고 text만 뽑아내는것
    console.log("클릭됨", event.target.textContent);
    
    //topic이라고 정의한 이유. news뉴스 API에서 뉴스종류는 topic으로 그리고 소문자로
    let topic = event.target.textContent.toLowerCase();

    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=kr&topic=${topic}&page_size=10`);
    console.log("url", url);

    getNews(); 
};


//키워드 검색했을때
const getNewsByKeyword = async () => {
    console.log("click");
    //1. 검색 키워드 읽어오기
    //2. url에 검색 키워드 부치기
    //3. 헤더준비
    //4. url 부르기
    //5. 데이터 가져오기
    //6. 데이터 보여주기

    let keyword = document.getElementById("search-input").value;
    console.log("keyword",keyword);
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
    
    getNews();
};





// const render = () => {
//     let newsHTML = ''

//     //todoList에선 for문을 썻지만 여기선 Map을 쓸 거다.
//     newsHTML = news.map(news=> {
//         return `<div class="row news">
//                     <div class="col-lg-4">
//                         <img class="news-img-size" src="http://newsimg.hankookilbo.com/2018/07/15/201807151077060417_1.jpg">
//                     </div>
//                     <div class="col-lg-8">
//                         <h2>코딩하자</h2>
//                         <p>
//                         코딩공부 열풍 열심히 해보자
//                         </p>
//                         <div>   
//                         구창근회사 2022 8 16
//                         </div>
//                     </div>
//                 </div>`;
                 
//     });

//     document.getElementById("news-board").innerHTML=newsHTML
// };
//        =======> 위코드 map을 써서 한페이지에 뉴스기사들이 나오게 했지만 하지만 여기서 문제점이 이상태로 하면 뉴스기사 밑에 마다 , 가 있을 것이다.
//                 하지맘ㄴ arrylist 배열로 받앗기 때문에 , 가 들어간다 .. key : 값 , key : 값 , 이렇게 , 까지 프린트 해서 ,가 찍히는 것이다./
//                 그래서 arrylist를 String 변환해서 프린트!!!!!!!!!!!!!
//                 Array.prototype.join() --> 회사에서 쓰든거!!....
//                 join() 메서드 return을 한다 String으로
//                 const elements = ['Fire', 'Air', 'water'];
//                 console.log(elements.join());
//                 콘솔창 => "Fire, Air, Water"
//
//                 console.log(elements.join(''));
//                 콘솔창 => "FireAirWater"
//
//                 console.log(elements.join('-'));
//                 콘솔창 => "Fire-Air-Water"
//

const render = () => {
         let newsHTML = ''
    
         //todoList에선 for문을 썻지만 여기선 Map을 쓸 거다.
         newsHTML = news.map(item=> {
            //news.media는 news의 콜솔 찍어보고 news안의 값들 중에 media에 img 파일이 들어가 있다.
             return `<div class="row news">
                         <div class="col-lg-4">
                             <img class="news-img-size" src="${item.media}">
                         </div>
                         <div class="col-lg-8">
                             <h2>${item.title}</h2>
                             <p>
                             ${item.summary}
                             </p>
                             <div>   
                             ${item.rights} * ${item.published_date}
                             </div>
                         </div>
                     </div>`;
                     
         }).join('');

         console.log(newsHTML);

         document.getElementById("news-board").innerHTML = newsHTML;
};

//getNews에서 에러가 잡혓을때 에러메세지를 화면에 뿌리기
const errorRender = (message) => {
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">
                       ${message}
                    </div>`;
    document.getElementById("news-board").innerHTML = errorHTML;
};


//pagenation 페이지알고리즘
const pagenation = () => {

    let pagenationHTML = ``;
    // total_page => api를 호출하고 data에 total_hits: 10000,  total_pages: 1000 이렇게 있다. 
    // page => 그리고 data안에 그리고 현재 페이지 정보도 있다.

    // page grop => 5페이지씩 보이게 한다. 1그룹은 1 ~ 5, 2그룹은 6 ~ 10, 3그룹 11 ~ 15 
    //현재 내가 몇번째 그룹인지 아는 알고리즘  
    //ex) 12page => 몇번째 그룹?? 12/5 는 2.4xx 여기서 올림을 하면 3이 된다. 
    let pageGroup = Math.ceil(page/5);

    // last => 5페이지씩 보이게 한다. 1그룹은 1 ~ 5, 2그룹은 6 ~ 10, 3그룹 11 ~ 15 
    //몇번째의 그룹인지 알았다. 그럼 1룹의 마지막 페이지는 5, 2그룹의 마지막페이지는?10 
    let last = pageGroup*5;

    // first
    let first = last - 4;

    console.log("page", page);
    console.log("last", last);
    console.log("first", first);

    
    if(page == 1) {
        pagenationHTML = ``;
    } else {
        pagenationHTML = `<li class="page-item">
                            <a class="page-link" href="#" onclick="moveToPage(${page-1})" aria-label="Previous">
                                <span aria-hidden="false">&lt;</span>
                            </a>
                          </li>
                          <li>
                            <a class="page-link" href="#" onclick="moveToPage(${1})" aria-label="Previous">
                                <span aria-hidden="false">&laquo;</span>
                            </a>
                          </li>`;
    };

    // first ~ last 페이지 프린트
    for(let i=first; i <= last; i++) {
        //html 뉴스끝나는 지점.. 1그룹은 1~5, 2그룹으 6~10, 3그룹 11~15
        //active 페이지그룹중 페이지를 눌렀을때 어떤페이지에 있는지 표시
        pagenationHTML += `<li class="page-item ${page == i? "active" : ""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`;
    }


    if(page == total_pages) {
        pagenationHTML += ``;
    } else {
        pagenationHTML += `<li class="page-item">
                                <a class="page-link" href="#" onclick="moveToPage(${page + 1})" aria-label="Next">
                                    <span aria-hidden="true">&gt;</span>
                                </a>                
                            </li>
                            <li>
                                <a class="page-link" href="#" onclick="moveToPage(${total_pages})" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>`
    };

  

    document.querySelector(".pagination").innerHTML = pagenationHTML;
};

const moveToPage = (pageNum) => {
    //1. 이동하고싶은 페이지를 알아야겠지
    page = pageNum
    console.log(page)

    //2. 이동하고싶은 페이지를 가지고 api를 다시 호출해줘야 겟지
    getNews();

};


searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();
