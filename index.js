
const API_KEY = '';
const ACCESS_TOKEN =''
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
// const searchURL = BASE_URL + '/search/movie?'+API_KEY;


let left_btn = document.getElementsByClassName("bx-chevron-left")[0];
let right_btn = document.getElementsByClassName("bx-chevron-right")[0];
let cards = document.getElementsByClassName("cards")[0];
let search = document.getElementsByClassName("search")[0];
let search_input = document.getElementById("search_input");
left_btn.addEventListener("click",()=>{
    cards.scrollLeft -= 140;
})
right_btn.addEventListener("click",()=>{
    cards.scrollLeft += 140;
})


    // .catch(err => console.error(err));


let json_url = "movies.json"
const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ACCESS_TOKEN'
    }
    };
    
    fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
    .then(response => response.json())
    .then(data => {
        // console.log(data.results)
        data.results.forEach(ele => {
            let { title ,popularity ,name,release_date ,poster_path,backdrop_path,overview,genre_ids,id} = ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = id;
            card.innerHTML = `
            <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}" class="poster">
            <div class="card_body">
                <img src="${backdrop_path? IMG_URL+backdrop_path: "http://via.placeholder.com/1080x1580" }" alt="">
                <div class="cont">
                    <h4>${title || name}</h4>
                    <div class="sub">
                        <p>${genre_ids},${release_date}</p>
                        <h3><span>IMDB</span><i class='bx bxs-star' ></i>${popularity}</h3>
                    </div>
                </div>
            </div>            
            `
            cards.appendChild(card);  
        });

// fetch(json_url).then(Response => Response.json())
    // .then((data)=>{
    //     data.forEach((ele,i) => {
    //         let { title ,imdb ,year ,sposter,bposter,href,genre,extract} = ele;
    //         let card = document.createElement('a');
    //         card.classList.add('card');
    //         card.href = href;
    //         card.innerHTML = `
    //         <img src="${sposter}" alt="${title}" class="poster">
    //         <div class="card_body">
    //             <img src="${bposter}" alt="">
    //             <div class="cont">
    //                 <h4>${title}</h4>
    //                 <div class="sub">
    //                     <p>${genre},${year}</p>
    //                     <h3><span>IMDB</span><i class='bx bxs-star' ></i>${imdb}</h3>
    //                 </div>
    //             </div>
    //         </div>            
    //         `
    //         cards.appendChild(card);  
    //     });


        // document.getElementById('title').src = data[2].title1;
        // document.getElementsByTagName('video')[0].src = data[2].trailer;
        // document.getElementById('plot').innerText = data[2].extract;
        // document.getElementById('gen').innerText = data[2].genre;
        // document.getElementById('date').innerText = data[2].year;
        // document.getElementById('rate').innerHtml =`<span>IMDB</span><i class='bx bxs-star' ></i>${data[2].imdb}`;

        //video slider
        const btns = document.querySelectorAll("card")
        const sliderNav = (manual) =>{
            btns[manual].classList.add("active");

        }
        btns.forEach((btn, i) => {
            btn.addEventListener("click",()=>{
                sliderNav(i);
            })
        })

        // search data
        data.forEach(element=>{
            let { title ,imdb ,year ,sposter,href,genre,} = element;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = href;
            card.innerHTML = `
            <img src="${sposter}" alt="${title}">
                        <div class="cont">
                            <h3>${title}</h3>
                            <p>${genre} ,${year}, <span>IMDB</span><i class='bx bxs-star' ></i>${imdb}</p>
                        </div>            
            `
            search.appendChild(card);
        });

        //search filter
        search_input.addEventListener('keyup',()=>{
            let filter = search_input.value.toUpperCase();
            let a = search.getElementsByTagName('a');

            for (let index = 0; index < a.length; index++) {
                let b = a[index].getElementsByClassName('cont')[0];
                let TextValue = b.textContent || b.innerText;
                if (TextValue.toUpperCase().indexOf(filter)>-1) {
                    a[index].style.display ="flex";
                    search.style.visibility ="visible"
                    search.style.opacity =1;
                    
                } else {
                    a[index].style.display = "none"
                    
                }
                if (search_input.value == 0) {
                    search.style.visibility ="hidden"
                    search.style.opacity = 0;                    
                }
                
            }
        });


        //play and pause video
        let video = document.getElementsByTagName('video')[0];
        let play = document.getElementById('play');

        play.addEventListener('click' ,()=>{
            if (video.paused) {
                video.play();
                play.innerHTML = `play <i class='bx bx-pause-circle'></i>`
                
            } else {
                video.pause();
                play.innerHTML = `watch <i class='bx bx-play-circle'></i>`
            }
        })
        

        //filter series
        let series = document.getElementById("series");
        series.addEventListener('click',()=>{
            cards.innerHTML = '';
            
            let series_array = data.filter(ele =>{
                return ele.type === "Series";
            });

            series_array.forEach((ele,i) => {
                let { title ,imdb ,year ,sposter,bposter,href,genre,extract} = ele;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = href;
                card.innerHTML = `
                <img src="${sposter}" alt="${title}" class="poster">
                <div class="card_body">
                    <img src="${bposter}" alt="">
                    <div class="cont">
                        <h4>${title}</h4>
                        <div class="sub">
                            <p>${genre},${year}</p>
                            <h3><span>IMDB</span><i class='bx bxs-star' ></i>${imdb}</h3>
                        </div>
                    </div>
                </div>            
                `
                cards.appendChild(card);  
            });
        })
            
             // filter movies
             let movies = document.getElementById("movies");
             movies.addEventListener('click',()=>{
                 cards.innerHTML = '';
                 
                 let movies_array = data.results.filter(ele =>{
                     return ele.media_type === "movie"; 
                 });
                 console.log(movies_array)
     
                 
                 movies_array.forEach(ele => {
                    let { title ,popularity ,name,release_date ,poster_path,backdrop_path,overview,genre_ids,id} = ele;
                    let card = document.createElement('a');
                    card.classList.add('card');
                    card.href = id;
                    card.innerHTML = `
                    <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}" class="poster">
                    <div class="card_body">
                        <img src="${backdrop_path? IMG_URL+backdrop_path: "http://via.placeholder.com/1080x1580" }" alt="">
                        <div class="cont">
                            <h4>${title || name}</h4>
                            <div class="sub">
                                <p>${genre_ids},${release_date}</p>
                                <h3><span>IMDB</span><i class='bx bxs-star' ></i>${popularity}</h3>
                            </div>
                        </div>
                    </div>            
                    `
                    cards.appendChild(card);  
                });
                })

                // filter kids
             let kids = document.getElementById("kids");
             kids.addEventListener('click',()=>{
                 cards.innerHTML = '';
                 
                 let kids_array = data.filter(ele =>{
                     return ele.type === "Kids";
                 });
     
                 kids_array.forEach((ele,i) => {
                     let { title ,imdb ,year ,sposter,bposter,href,genre,extract} = ele;
                     let card = document.createElement('a');
                     card.classList.add('card');
                     card.href = href;
                     card.innerHTML = `
                     <img src="${sposter}" alt="${title}" class="poster">
                     <div class="card_body">
                         <img src="${bposter}" alt="">
                         <div class="cont">
                             <h4>${title}</h4>
                             <div class="sub">
                                 <p>${genre},${year}</p>
                                 <h3><span>IMDB</span><i class='bx bxs-star' ></i>${imdb}</h3>
                             </div>
                         </div>
                     </div>            
                     `
                     cards.appendChild(card);  
                 });
                })
       
    }) 
