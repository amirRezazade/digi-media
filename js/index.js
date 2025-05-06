import { apiKey , menu , manageMenu,moreFiltersToggle ,toggleMenu  ,switchTheme, getGenres , navControl, } from './funcs.js'

let headerPlayBtn = document.querySelector('#movie-play-btn');
headerPlayBtn.addEventListener('click' ,  ()=>{

 headerPlayBtn.dataset.type =='movie'? window.location.href = `movie.html?id=${headerPlayBtn.dataset.id}`:  window.location.href = `series.html?id=${headerPlayBtn.dataset.id}`
})
window.addEventListener('load' ,()=>{
 
})
window.addEventListener("resize", () => {
  toggleMovieSwiper();
  toggleTvSwiper();
  togglePersianSwiper();
});
window.addEventListener("DOMContentLoaded", () => {
  let result = getHeaderInfos();
  result.catch((error) => {
    console.log(error);
  });
  getActionMovie();
  getTv();
  getPersianMovie();
  document.querySelector('.loader-wrapper').remove()
  document.querySelector('.content').classList.remove('hidden')
});

let res;
async function getHeaderInfos() {
  let response = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
  );
  res = await response.json();
  let list = res.results;
  
  list.slice(0, 10).forEach((elem, index) => {
    if (elem.poster_path && elem.backdrop_path) {
      let type = elem.media_type=='movie';
      
      
      document.querySelector("#header-swiper-wrapper").innerHTML += `
        <a 
                      href="${type ? 'movie' : 'series'}.html?id=${elem.id}"
                      class="swiper-slide rounded-md group flex transition-all duration-500 min-h-[300px] sm:min-h-[235px] md:min-h-[246px] lg:min-h-[235px] xl:min-h-[230px] 2xl:min-h-[260px] "  data-index="${index}" data-id="${
        elem.id
      }"
                    >
                      <div
                        class="w-full flex flex-col  justify-between gap-2 h-full sm:min-h-[235px] md:min-h-[246px] lg:min-h-[235px] xl:min-h-[230px] 2xl:min-h-[258px]"
                      >
                        <div
                          class="relative  grow  rounded-md transition-all duration-300 active"
                        >
                          <img
                            src="https://image.tmdb.org/t/p/original${
                              elem.poster_path
                            }_medium"
                            alt="${elem.name ? elem.name : elem.title}" loading="lazy"
                            onerror="this.onerror=null; this.src='images/default_poster.jpg';"
                            class="w-full rounded-md"
                          />
                          <div
                            class="absolute top-0 left-0 w-full min-h-full bg-black/60 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:scale-90 transition-all duration-600"
                          >
                            <span class="absolute top-1/2 left-1/2 -translate-1/2">
                              <svg
                                width="30px"
                                height="30px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <path
                                    d="M3 12L3 18.9671C3 21.2763 5.53435 22.736 7.59662 21.6145L10.7996 19.8727M3 8L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L14.0026 18.131"
                                    stroke="#c5c5c5"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                  ></path>
                                </g>
                              </svg>
                            </span>
                            <div
                              class="absolute w-full bottom-0 right-0 p-3 text-base lg:p-1"
                            >
                              <div class="flex flex-col items-start gap-1">
                                <span
                                  class=" flex flex-row-reverse items-center text-xs gap-1"
                                  >زیر نویس
                                  <svg
                                    width="18px"
                                    height="18px"
                                    viewBox="0 0 512 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#fff"
                                  >
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      <path
                                        fill="var(--ci-primary-color, #fff)"
                                        d="M472,64H40A24.028,24.028,0,0,0,16,88V424a24.028,24.028,0,0,0,24,24H472a24.028,24.028,0,0,0,24-24V88A24.028,24.028,0,0,0,472,64Zm-8,352H48V96H464Z"
                                        class="ci-primary"
                                      ></path>
                                      <path
                                        fill="var(--ci-primary-color, #fff)"
                                        d="M184,344a87.108,87.108,0,0,0,54.484-18.891L218.659,299.99A55.41,55.41,0,0,1,184,312a56,56,0,0,1,0-112,55.41,55.41,0,0,1,34.659,12.01l19.825-25.119A87.108,87.108,0,0,0,184,168a88,88,0,0,0,0,176Z"
                                        class="ci-primary"
                                      ></path>
                                      <path
                                        fill="var(--ci-primary-color, #fff)"
                                        d="M347.429,344a87.108,87.108,0,0,0,54.484-18.891L382.088,299.99A55.414,55.414,0,0,1,347.429,312a56,56,0,0,1,0-112,55.414,55.414,0,0,1,34.659,12.01l19.825-25.119A87.108,87.108,0,0,0,347.429,168a88,88,0,0,0,0,176Z"
                                        class="ci-primary"
                                      ></path>
                                    </g></svg
                                ></span>
                                <span
                                  class="flex flex-row-reverse items-center text-xs gap-1"
                                  >دوبله<svg
                                    width="22px"
                                    height="22px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12 4.5C10.314 4.5 9 5.80455 9 7.35V12.15C9 13.6955 10.314 15 12 15C13.686 15 15 13.6955 15 12.15L15 7.35C15 5.80455 13.686 4.5 12 4.5ZM7.5 7.35C7.5 4.919 9.54387 3 12 3C14.4561 3 16.5 4.919 16.5 7.35L16.5 12.15C16.5 14.581 14.4561 16.5 12 16.5C9.54387 16.5 7.5 14.581 7.5 12.15V7.35ZM6.75 12.75C6.75 15.1443 9.0033 17.25 12 17.25C14.9967 17.25 17.25 15.1443 17.25 12.75H18.75C18.75 15.9176 16.0499 18.3847 12.75 18.7129V21H11.25V18.7129C7.95007 18.3847 5.25 15.9176 5.25 12.75H6.75Z"
                                        fill="#fff"
                                      ></path>
                                    </g></svg
                                ></span>
                              </div>
                              <div
                                class="w-full flex justify-between items-center mt-2 lg:mt-1"
                              >
                                <span
                                  class="text-orange-400 flex gap-1.5 items-start lg:gap-0.5"
                                  >82%
                                  <svg
                                    width="18px"
                                    height="18px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      <path
                                        d="M20.9752 12.1852L20.2361 12.0574L20.9752 12.1852ZM20.2696 16.265L19.5306 16.1371L20.2696 16.265ZM6.93777 20.4771L6.19056 20.5417L6.93777 20.4771ZM6.12561 11.0844L6.87282 11.0198L6.12561 11.0844ZM13.995 5.22142L14.7351 5.34269V5.34269L13.995 5.22142ZM13.3323 9.26598L14.0724 9.38725V9.38725L13.3323 9.26598ZM6.69814 9.67749L6.20855 9.10933H6.20855L6.69814 9.67749ZM8.13688 8.43769L8.62647 9.00585H8.62647L8.13688 8.43769ZM10.5181 4.78374L9.79208 4.59542L10.5181 4.78374ZM10.9938 2.94989L11.7197 3.13821V3.13821L10.9938 2.94989ZM12.6676 2.06435L12.4382 2.77841L12.4382 2.77841L12.6676 2.06435ZM12.8126 2.11093L13.042 1.39687L13.042 1.39687L12.8126 2.11093ZM9.86195 6.46262L10.5235 6.81599V6.81599L9.86195 6.46262ZM13.9047 3.24752L13.1787 3.43584V3.43584L13.9047 3.24752ZM11.6742 2.13239L11.3486 1.45675V1.45675L11.6742 2.13239ZM3.9716 21.4707L3.22439 21.5353L3.9716 21.4707ZM3 10.2342L3.74721 10.1696C3.71261 9.76945 3.36893 9.46758 2.96767 9.4849C2.5664 9.50221 2.25 9.83256 2.25 10.2342H3ZM20.2361 12.0574L19.5306 16.1371L21.0087 16.3928L21.7142 12.313L20.2361 12.0574ZM13.245 21.25H8.59635V22.75H13.245V21.25ZM7.68498 20.4125L6.87282 11.0198L5.3784 11.149L6.19056 20.5417L7.68498 20.4125ZM19.5306 16.1371C19.0238 19.0677 16.3813 21.25 13.245 21.25V22.75C17.0712 22.75 20.3708 20.081 21.0087 16.3928L19.5306 16.1371ZM13.2548 5.10015L12.5921 9.14472L14.0724 9.38725L14.7351 5.34269L13.2548 5.10015ZM7.18773 10.2456L8.62647 9.00585L7.64729 7.86954L6.20855 9.10933L7.18773 10.2456ZM11.244 4.97206L11.7197 3.13821L10.2678 2.76157L9.79208 4.59542L11.244 4.97206ZM12.4382 2.77841L12.5832 2.82498L13.042 1.39687L12.897 1.3503L12.4382 2.77841ZM10.5235 6.81599C10.8354 6.23198 11.0777 5.61339 11.244 4.97206L9.79208 4.59542C9.65573 5.12107 9.45699 5.62893 9.20042 6.10924L10.5235 6.81599ZM12.5832 2.82498C12.8896 2.92342 13.1072 3.16009 13.1787 3.43584L14.6307 3.05921C14.4252 2.26719 13.819 1.64648 13.042 1.39687L12.5832 2.82498ZM11.7197 3.13821C11.7548 3.0032 11.8523 2.87913 11.9998 2.80804L11.3486 1.45675C10.8166 1.71309 10.417 2.18627 10.2678 2.76157L11.7197 3.13821ZM11.9998 2.80804C12.1345 2.74311 12.2931 2.73181 12.4382 2.77841L12.897 1.3503C12.3873 1.18655 11.8312 1.2242 11.3486 1.45675L11.9998 2.80804ZM14.1537 10.9842H19.3348V9.4842H14.1537V10.9842ZM4.71881 21.4061L3.74721 10.1696L2.25279 10.2988L3.22439 21.5353L4.71881 21.4061ZM3.75 21.5127V10.2342H2.25V21.5127H3.75ZM3.22439 21.5353C3.2112 21.3828 3.33146 21.25 3.48671 21.25V22.75C4.21268 22.75 4.78122 22.1279 4.71881 21.4061L3.22439 21.5353ZM14.7351 5.34269C14.8596 4.58256 14.8241 3.80477 14.6307 3.0592L13.1787 3.43584C13.3197 3.97923 13.3456 4.54613 13.2548 5.10016L14.7351 5.34269ZM8.59635 21.25C8.12244 21.25 7.72601 20.887 7.68498 20.4125L6.19056 20.5417C6.29852 21.7902 7.3427 22.75 8.59635 22.75V21.25ZM8.62647 9.00585C9.30632 8.42 10.0392 7.72267 10.5235 6.81599L9.20042 6.10924C8.85404 6.75767 8.3025 7.30493 7.64729 7.86954L8.62647 9.00585ZM21.7142 12.313C21.9695 10.8365 20.8341 9.4842 19.3348 9.4842V10.9842C19.9014 10.9842 20.3332 11.4959 20.2361 12.0574L21.7142 12.313ZM3.48671 21.25C3.63292 21.25 3.75 21.3684 3.75 21.5127H2.25C2.25 22.1953 2.80289 22.75 3.48671 22.75V21.25ZM12.5921 9.14471C12.4344 10.1076 13.1766 10.9842 14.1537 10.9842V9.4842C14.1038 9.4842 14.0639 9.43901 14.0724 9.38725L12.5921 9.14471ZM6.87282 11.0198C6.8474 10.7258 6.96475 10.4378 7.18773 10.2456L6.20855 9.10933C5.62022 9.61631 5.31149 10.3753 5.3784 11.149L6.87282 11.0198Z"
                                        fill="#ff9800"
                                      ></path>
                                    </g></svg
                                ></span>
                                <span class="flex items-center gap-0.5"
                                  ><span class="text-xs">10/</span>
                                  <span class="text-base text-orange-400 font-bold"
                                    >${elem.vote_average.toFixed(1)}</span
                                  ></span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                        dir="ltr"
                          class="text-center h-5 text-sm text-white truncate group-hover:text-orange-400 transition-all duration-600"
                        >
                          <span class="truncate">${elem.name ? elem.name : elem.title}</span>
                        </div>
                      </div>
                    </a>
      `;
    }
  });
  const swiper = new Swiper(".mySwiper", {
    direction: "horizontal",
    slidesPerView: "auto",
    loop: true,
    centeredSlides: true,
    initialSlide: 0,
    speed: 500,
    spaceBetween: 30,
    effect: "slide",

    autoplay: {
      delay: 6000,
    },
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
    on: {
      transitionEnd: () => changeHeaderInfo(),
    },

    // ..................................
    breakpoints: {
      530: {
        speed: 300,
        spaceBetween: 10,
      },
      650: {
        spaceBetween: 20,
      },
      768: {
        centeredSlides: true,
      },
      1024: {
        spaceBetween: 10,
      },
    },
  });
}

function changeHeaderInfo() {
  let activeIndex = document.querySelector(".swiper-slide-active").dataset
    .index;
  if (window.innerWidth > 768) {
    document.querySelector(
      "#header-bg"
    ).style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${res.results[activeIndex].backdrop_path}_medium) , url('images/default-bg.png')`;
    document.querySelector("#header-name").textContent = res.results[
      activeIndex
    ].name
      ? res.results[activeIndex].name
      : res.results[activeIndex].title;
    document.querySelector("#header-type").textContent =
      res.results[activeIndex].media_type;
    document.querySelector("#header-point").textContent =
      res.results[activeIndex].vote_average.toFixed(1);
    document.querySelector("#movie-play-btn").dataset.id =
      res.results[activeIndex].id;
    document.querySelector("#movie-play-btn").dataset.type =
      res.results[activeIndex].media_type;
      
  } else {
    document.querySelector("#header-bg").style.backgroundImage = "url()";
  }
}
let movieSwiper;
function generateMovieSwiper() {
  if (!movieSwiper) {
    movieSwiper = new Swiper(".movieSwiper", {
      direction: "horizontal",
      lang: "ltr",
      slidesPerView: 3,
      loop: true,
      autoplay: {
        delay: 4000,
      },
      centeredSlides: true,
      initialSlide: 0,
      speed: 500,
      grabCursor: true,
      spaceBetween: 10,
      breakpoints: {
        650: {
          slidesPerView: 4,
        },
        850: {
          slidesPerView: 5,
        },
      },
    });
  }
}
let tvSwiper;
function generateTvSwiper() {
  if (!tvSwiper) {
    tvSwiper = new Swiper(".twSwiper", {
      direction: "horizontal",
      lang: "ltr",
      slidesPerView: 3,
      loop: true,
      autoplay: {
        delay: 4000,
      },
      centeredSlides: true,
      initialSlide: 0,
      speed: 500,
      grabCursor: true,
      spaceBetween: 10,
      breakpoints: {
        650: {
          slidesPerView: 4,
        },
        850: {
          slidesPerView: 5,
        },
      },
    });
  }
}
let persianSwiper;
function generatePersianSwiper() {
  if (!persianSwiper) {
    persianSwiper = new Swiper(".persianSwiper", {
      direction: "horizontal",
      lang: "ltr",
      slidesPerView: 3,
      loop: true,
      autoplay: {
        delay: 4000,
      },
      centeredSlides: true,
      initialSlide: 0,
      speed: 500,
      grabCursor: true,
      spaceBetween: 10,
      breakpoints: {
        650: {
          slidesPerView: 4,
        },
        850: {
          slidesPerView: 5,
        },
      },
    });
  }
}
function toggleMovieSwiper() {
  if (window.innerWidth < 1024) {
    document.querySelectorAll(".action-movie a").forEach((elem) => {
      elem.classList.add("swiper-slide");
    });
    generateMovieSwiper();
  } else {
    document.querySelectorAll(".action-movie a").forEach((elem) => {
      elem.classList.remove("swiper-slide");
    });
    if (movieSwiper) {
      movieSwiper.destroy(true, true);
      movieSwiper = null;
    }
  }
}
function toggleTvSwiper() {
  if (window.innerWidth < 1024) {
    document.querySelectorAll(".tv-movie a").forEach((elem) => {
      elem.classList.add("swiper-slide");
    });
    generateTvSwiper();
  } else {
    document.querySelectorAll(".tv-movie a").forEach((elem) => {
      elem.classList.remove("swiper-slide");
    });
    if (tvSwiper) {
      tvSwiper.destroy(true, true);
      tvSwiper = null;
    }
  }
}
function togglePersianSwiper() {
  if (window.innerWidth < 1024) {
    document.querySelectorAll(".persian-movie a").forEach((elem) => {
      elem.classList.add("swiper-slide");
    });
    generatePersianSwiper();
  } else {
    document.querySelectorAll(".persian-movie a").forEach((elem) => {
      elem.classList.remove("swiper-slide");
    });
    if (persianSwiper) {
      persianSwiper.destroy(true, true);
      persianSwiper = null;
    }
  }
}
async function getActionMovie() {
  let response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&without_genres=16,10751&vote_count.gte=2000`
  );
  let t = await response.json();
  let list = t.results;
  const randomFive = list.slice(0, 6);

  randomFive.forEach((elem) => {
    if (elem.poster_path && elem.backdrop_path) {
      document.querySelector(".action-movie").innerHTML += `
         <a
         href="movie.html?id=${elem.id}"
          id="${
           elem.id
         }"  class=" swiper-slide lg:inline-flex flex-col items-center w-full  gap-3 lg:w-[200px] lg:grow-0 overflow-hidden lg:h-auto grow-1 rounded-md transition-all duration-600 group">
         <div class="w-full h-9/10 relative rounded-md overflow-hidden lg:h-[255px] xl:h-[290px]">
           <div class="w-full h-full overflow-hidden">
             <img loading="lazy" class="w-full h-full object-cover  lg:group-hover:opacity-0 transition-all duration-600  " src="https://image.tmdb.org/t/p/original${
               elem.poster_path
             }_medium" alt="${elem.name ? elem.name : elem.title}" loading="lazy" onerror="this.onerror=null; this.src='images/default_poster.jpg';">
           </div>
           <div class="absolute top-0 left-0  bg-center bg-cover w-full min-h-full  rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-600" style="background-image: url(https://image.tmdb.org/t/p/original${
             elem.backdrop_path
           }_medium);">
             <div class="absolute top-0 left-0 flex flex-col justify-between  w-full min-h-full bg-black/60 px-3 py-3.5">
                 <div class=" flex justify-between items-center">
               
                   <span class="flex items-center gap-0.5 text-gray-300"><span class="text-xs">10/</span>
                     <span class="text-base text-amber-400 font-bold">${elem.vote_average.toFixed(
                       1
                     )}</span></span>
                     <span class="text-amber-400 flex gap-1.5 items-start lg:gap-0.5">${
                       elem.original_language
                     }</span>
                 </div>
                 <div class=" flex text-gray-300 flex-col items-start gap-3">
                   <div class="flex flex-col items-start gap-1">
                     <span class=" flex flex-row-reverse items-center text-xs gap-1">زیر نویس
                       <svg width="18px" height="18px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#fff">
                         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                         <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                         <g id="SVGRepo_iconCarrier">
                           <path fill="var(--ci-primary-color, #fff)" d="M472,64H40A24.028,24.028,0,0,0,16,88V424a24.028,24.028,0,0,0,24,24H472a24.028,24.028,0,0,0,24-24V88A24.028,24.028,0,0,0,472,64Zm-8,352H48V96H464Z" class="ci-primary"></path>
                           <path fill="var(--ci-primary-color, #fff)" d="M184,344a87.108,87.108,0,0,0,54.484-18.891L218.659,299.99A55.41,55.41,0,0,1,184,312a56,56,0,0,1,0-112,55.41,55.41,0,0,1,34.659,12.01l19.825-25.119A87.108,87.108,0,0,0,184,168a88,88,0,0,0,0,176Z" class="ci-primary"></path>
                           <path fill="var(--ci-primary-color, #fff)" d="M347.429,344a87.108,87.108,0,0,0,54.484-18.891L382.088,299.99A55.414,55.414,0,0,1,347.429,312a56,56,0,0,1,0-112,55.414,55.414,0,0,1,34.659,12.01l19.825-25.119A87.108,87.108,0,0,0,347.429,168a88,88,0,0,0,0,176Z" class="ci-primary"></path>
                         </g></svg></span>
                     <span class="flex flex-row-reverse items-center text-xs gap-1">دوبله<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                         <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                         <g id="SVGRepo_iconCarrier">
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.5C10.314 4.5 9 5.80455 9 7.35V12.15C9 13.6955 10.314 15 12 15C13.686 15 15 13.6955 15 12.15L15 7.35C15 5.80455 13.686 4.5 12 4.5ZM7.5 7.35C7.5 4.919 9.54387 3 12 3C14.4561 3 16.5 4.919 16.5 7.35L16.5 12.15C16.5 14.581 14.4561 16.5 12 16.5C9.54387 16.5 7.5 14.581 7.5 12.15V7.35ZM6.75 12.75C6.75 15.1443 9.0033 17.25 12 17.25C14.9967 17.25 17.25 15.1443 17.25 12.75H18.75C18.75 15.9176 16.0499 18.3847 12.75 18.7129V21H11.25V18.7129C7.95007 18.3847 5.25 15.9176 5.25 12.75H6.75Z" fill="#fff"></path>
                         </g></svg></span>
                   </div>
                   <div class="genres hidden pointer-events-none lg:flex gap-2 flex-wrap items-center ">

                   </div>
                 </div>
             </div>
 
           
         </div>
         </div>
         <p dir="ltr" class="mt-2 lg:mt-0 h-auto w-full text-center truncate  text-ellipsis transition-all duration-300 group-hover:text-orange-400 text-black dark:text-white text-sm "><span class="">${
           elem.name ? elem.name : elem.title
         }</span><span class="opacity-70 ml-2 ">${elem.release_date.slice(
        0,
        4
      )}</span></p>
        </a>
        `;
      getGenres(elem);
      
    }
  });
  toggleMovieSwiper();
}

async function getTv() {
  let response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=18&without_genres=16,10751&sort_by=vote_average.desc&vote_count.gte=1000`
  );
  let t = await response.json();
  let list = t.results;
  const randomFive = list.slice(0, 6);

  randomFive.forEach((elem) => {
    if (elem.poster_path && elem.backdrop_path) {
      
      document.querySelector(".tv-movie").innerHTML += `
         <a href="series.html?id=${elem.id}"
         id="${
           elem.id
         }" class=" swiper-slide lg:inline-flex flex-col items-center w-full  gap-3 lg:w-[200px] lg:grow-0 overflow-hidden lg:h-auto grow-1 rounded-md transition-all duration-600 group">
         <div class="w-full h-9/10 relative rounded-md overflow-hidden lg:h-[255px] xl:h-[290px]">
           <div class="w-full h-full overflow-hidden">
             <img loading="lazy" class="w-full h-full object-cover  lg:group-hover:opacity-0 transition-all duration-600  " src="https://image.tmdb.org/t/p/original${
               elem.poster_path
             }_medium" alt="${elem.name ? elem.name : elem.title}" loading="lazy" onerror="this.onerror=null; this.src='images/default_poster.jpg';">
           </div>
           <div class="absolute top-0 left-0  bg-center bg-cover w-full min-h-full  rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-600" style="background-image: url(https://image.tmdb.org/t/p/original${
             elem.backdrop_path
           }_medium);">
             <div class="absolute top-0 left-0 flex flex-col justify-between  w-full min-h-full bg-black/60 px-3 py-3.5">
                 <div class=" flex justify-between items-center">
               
                   <span class="flex items-center gap-0.5 text-gray-300"><span class="text-xs">10/</span>
                     <span class="text-base text-amber-400 font-bold">${elem.vote_average.toFixed(
                       1
                     )}</span></span>
                     <span class="text-amber-400 flex gap-1.5 items-start lg:gap-0.5">${
                       elem.original_language
                     }</span>
                 </div>
                 <div class="flex text-gray-300 flex-col items-start gap-3">
                   <div class="flex flex-col items-start gap-1">
                     <span class=" flex flex-row-reverse items-center text-xs gap-1">زیر نویس
                       <svg width="18px" height="18px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#fff">
                         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                         <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                         <g id="SVGRepo_iconCarrier">
                           <path fill="var(--ci-primary-color, #fff)" d="M472,64H40A24.028,24.028,0,0,0,16,88V424a24.028,24.028,0,0,0,24,24H472a24.028,24.028,0,0,0,24-24V88A24.028,24.028,0,0,0,472,64Zm-8,352H48V96H464Z" class="ci-primary"></path>
                           <path fill="var(--ci-primary-color, #fff)" d="M184,344a87.108,87.108,0,0,0,54.484-18.891L218.659,299.99A55.41,55.41,0,0,1,184,312a56,56,0,0,1,0-112,55.41,55.41,0,0,1,34.659,12.01l19.825-25.119A87.108,87.108,0,0,0,184,168a88,88,0,0,0,0,176Z" class="ci-primary"></path>
                           <path fill="var(--ci-primary-color, #fff)" d="M347.429,344a87.108,87.108,0,0,0,54.484-18.891L382.088,299.99A55.414,55.414,0,0,1,347.429,312a56,56,0,0,1,0-112,55.414,55.414,0,0,1,34.659,12.01l19.825-25.119A87.108,87.108,0,0,0,347.429,168a88,88,0,0,0,0,176Z" class="ci-primary"></path>
                         </g></svg></span>
                     <span class="flex flex-row-reverse items-center text-xs gap-1">دوبله<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                         <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                         <g id="SVGRepo_iconCarrier">
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.5C10.314 4.5 9 5.80455 9 7.35V12.15C9 13.6955 10.314 15 12 15C13.686 15 15 13.6955 15 12.15L15 7.35C15 5.80455 13.686 4.5 12 4.5ZM7.5 7.35C7.5 4.919 9.54387 3 12 3C14.4561 3 16.5 4.919 16.5 7.35L16.5 12.15C16.5 14.581 14.4561 16.5 12 16.5C9.54387 16.5 7.5 14.581 7.5 12.15V7.35ZM6.75 12.75C6.75 15.1443 9.0033 17.25 12 17.25C14.9967 17.25 17.25 15.1443 17.25 12.75H18.75C18.75 15.9176 16.0499 18.3847 12.75 18.7129V21H11.25V18.7129C7.95007 18.3847 5.25 15.9176 5.25 12.75H6.75Z" fill="#fff"></path>
                         </g></svg></span>
                   </div>
                   <div class="genres hidden  lg:flex gap-2 flex-wrap items-center ">

                   </div>
                 </div>
             </div>
 
           
         </div>
         </div>
         <p dir="ltr" class="mt-2 lg:mt-0 h-auto w-full text-center truncate  text-ellipsis transition-all duration-300 group-hover:text-orange-400 text-black dark:text-white text-sm "><span class="">${
           elem.name ? elem.name : elem.title
         }</span><span class="opacity-70 ml-2 ">${elem.first_air_date.slice(
        0,
        4
      )}</span></p>
        </a>
        `;
      getGenres(elem);
      
    }
  });
  toggleTvSwiper();
}
async function getPersianMovie() {
  let response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=fa&with_production_countries=IR&sort_by=vote_average.desc`
  );
  let t = await response.json();
  let list = t.results;
  const randomFive = list.slice(0, 6);

  randomFive.forEach((elem) => {
    if (elem.poster_path ) {
      document.querySelector(".persian-movie").innerHTML += `
         <a
         href="movie.html?id=${elem.id}"
         id="${
           elem.id
         }" class=" swiper-slide lg:inline-flex flex-col items-center w-full  gap-3 lg:w-[200px] lg:grow-0 overflow-hidden lg:h-auto grow-1 rounded-md transition-all duration-600 group">
         <div class="w-full h-9/10 relative rounded-md overflow-hidden lg:h-[255px] xl:h-[290px]">
           <div class="w-full h-full overflow-hidden">
             <img loading="lazy" class="w-full h-full object-cover  lg:group-hover:opacity-0 transition-all duration-600  " src="https://image.tmdb.org/t/p/original${
               elem.poster_path
             }_medium" alt="${elem.original_title ? elem.original_title : elem.name}" onerror="this.onerror=null; this.src='images/default_poster.jpg';">
           </div>
           <div class="absolute top-0 left-0  bg-center bg-cover w-full min-h-full  rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-600" style="background-image: url(https://image.tmdb.org/t/p/original${elem.backdrop_path ? elem.backdrop_path : elem.poster_path}_medium);">
             <div class="absolute top-0 left-0 flex flex-col justify-between  w-full min-h-full bg-black/60 px-3 py-3.5">
                 <div class=" flex justify-between items-center">
               
                   <span class="flex items-center gap-0.5 text-gray-300"><span class="text-xs">10/</span>
                     <span class="text-base text-amber-400 font-bold">${elem.vote_average.toFixed(
                       1
                     )}</span></span>
                     <span class="text-amber-400 flex gap-1.5 items-start lg:gap-0.5">${
                       elem.original_language
                     }</span>
                 </div>
                 <div class="flex text-gray-300 flex-col items-start gap-3">
                   <div class="flex flex-col items-start gap-1">
                     <span class=" ">${elem.release_date.slice(0,4)}</span>
                   </div>
                   <div class="genres hidden  lg:flex gap-2 flex-wrap items-center ">

                   </div>
                 </div>
             </div>
 
           
         </div>
         </div>
         <p dir="ltr" class="mt-2 lg:mt-0 h-auto w-full text-center truncate  text-ellipsis transition-all duration-300 group-hover:text-orange-400 text-black dark:text-white text-sm "><span class="">${elem.original_title ? elem.original_title : elem.name}</span></p>
        </a>
        `;
      getGenres(elem);
      
    }
  });
  togglePersianSwiper();
}
