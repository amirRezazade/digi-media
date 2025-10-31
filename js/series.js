import { apiKey, genres, menu, manageMenu, moreFiltersToggle, toggleMenu, showVpnModal, switchTheme, getGenres, navControl, removeLoader } from "./funcs.js";
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
let main;
window.addEventListener("DOMContentLoaded", () => {
  getSeries();
  getRecommendationsMovie();
});
window.addEventListener("keyup", (e) => {
  if (document.body.classList.contains("lock-scroll") && e.key == "Escape") {
    closeTrailer();
  }
});
async function getSeries() {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${apiKey}&query&&language=fa&append_to_response=credits,videos`);
    let list = await res.json();
    if (list.status_code == 34) {
      document.querySelector("header").innerHTML = `<div class="flex justify-center items-center h-[70vh] bg-[100%,auto] bg-bottom text-white bg-no-repeat" style="background-image: url('');">
        <h1>اطلاعات بیشتری از این سریال وجود ندارد</h1>
        </div>`;
    } else {
      document.querySelector("#header-bg").style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${list.backdrop_path}_low') , url('images/default-bg.jpg')`;
      document.querySelector("#header-address").textContent = list.original_name;
      document.querySelector("#header-average").textContent = list.vote_average.toFixed(1);
      document.querySelector("#movie-img-overlay").style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${list.poster_path}_low')`;
      document.querySelector("#movie-img-overlay").nextElementSibling.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${list.poster_path}_low')`;
      document.querySelector("#movie-img").src = `https://image.tmdb.org/t/p/original${list.poster_path}_medium')`;
      document.querySelector("#movie-img").alt = list.original_title;
      document.querySelector("#movie-name").textContent = list.original_name;
      list.tagline ? (document.querySelector("#movie-tagline").textContent = list.tagline) : document.querySelector("#movie-tagline").remove();
      list.overview ? (document.querySelector("#movie-overview").textContent = list.overview) : document.querySelector("#movie-overview").classList.add("hidden");
      document.querySelector("#movie-vote-count").textContent = list.vote_count;
      document.querySelector("#movie-seasons-count").textContent = list.number_of_seasons;
      document.querySelector("#movie-original-country").textContent = list.origin_country;
      document.querySelector("#movie-status-text").textContent = list.status === "Ended" ? "پایان یافته" : "در حال پخش";
      document.querySelector("#movie-first-air").textContent = `${list.first_air_date ? list.first_air_date.slice(0, 4) : ""} - ${list.last_air_date ? list.last_air_date.slice(0, 4) : "نا معلوم"}`;
      document.querySelector("#list-original-language").textContent = list.original_language;
      document.querySelector("#genres").innerHTML += list.genres.map((gen) => `<a   href="search.html?type=all&country=&age=&genre=${gen.id}&double=false&Subtitle=false&Online=false" class="px-2.5 py-0.5 rounded-full border border-gray-400 hover:border-orange-400 hover:text-orange-400 transition-all duration-300" >${genres[gen.id]}</a>`).join("");

      document.querySelector("#movie-img").addEventListener("load", () => document.querySelector("#movie-img").classList.remove("loading-animation"));
      document.querySelector("#movie-img").addEventListener("error", () => (document.querySelector("#movie-img").src = "images/default_poster.jpg"));

      document.querySelector("#sm-infos").innerHTML = `
            <div class="flex flex-col  py-2 gap-y-1 grow items-center ">
          <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
            <svg width="15px" height="15px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffad49"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cc [#ffad49]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -4039.000000)" fill="#ffad49"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M100,3892 L100,3892 C100,3892.552 99.552,3893 99,3893 L97,3893 C95.895,3893 95,3892.105 95,3891 L95,3887 C95,3885.895 95.895,3885 97,3885 L99,3885 C99.552,3885 100,3885.448 100,3886 C100,3886.552 99.552,3887 99,3887 L98,3887 C97.448,3887 97,3887.448 97,3888 L97,3890 C97,3890.552 97.448,3891 98,3891 L99,3891 C99.552,3891 100,3891.448 100,3892 M93,3892 L93,3892 C93,3892.552 92.552,3893 92,3893 L90,3893 C88.895,3893 88,3892.105 88,3891 L88,3887 C88,3885.895 88.895,3885 90,3885 L92,3885 C92.552,3885 93,3885.448 93,3886 C93,3886.552 92.552,3887 92,3887 L91,3887 C90.448,3887 90,3887.448 90,3888 L90,3890 C90,3890.552 90.448,3891 91,3891 L92,3891 C92.552,3891 93,3891.448 93,3892 M101,3897 L87,3897 C86.448,3897 86,3896.552 86,3896 L86,3882 C86,3881.448 86.448,3881 87,3881 L101,3881 C101.552,3881 102,3881.448 102,3882 L102,3896 C102,3896.552 101.552,3897 101,3897 M84,3881 L84,3897 C84,3898.105 84.895,3899 86,3899 L102,3899 C103.105,3899 104,3898.105 104,3897 L104,3881 C104,3879.895 103.105,3879 102,3879 L86,3879 C84.895,3879 84,3879.895 84,3881" id="cc-[#ffad49]"> </path> </g> </g> </g> </g></svg>
            <span class="text-black dark:text-white text-[10px]">زیرنویس:</span>
          </div>
          <span class="text-black dark:text-white opacity-75 text-[10px]">ندارد</span>
        </div>
        <div class="flex flex-col  py-2 gap-y-1 grow items-center ">
          <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
            <svg width="17px" height="17px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 3C5 1.34315 6.34315 0 8 0C9.65685 0 11 1.34315 11 3V7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7V3Z" fill="#ffad49"></path> <path d="M9 13.9291V16H7V13.9291C3.60771 13.4439 1 10.5265 1 7V6H3V7C3 9.76142 5.23858 12 8 12C10.7614 12 13 9.76142 13 7V6H15V7C15 10.5265 12.3923 13.4439 9 13.9291Z" fill="#ffad49"></path> </g></svg>
            <span class="text-black dark:text-white text-[10px]">دوبله:</span>
          </div>
          <span class="text-black dark:text-white opacity-75 text-[10px]">ندارد</span>
        </div>
        <div class="flex flex-col  py-2 gap-y-1 grow items-center ">
          <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
                            <svg width="20px" height="20px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd" stroke="#ffad49" stroke-linecap="round" stroke-linejoin="round" transform="translate(1 4)"> <path d="m13.5 12.5v-6c0-1.1045695-.8954305-2-2-2h-9c-1.1045695 0-2 .8954305-2 2v6c0 1.1045695.8954305 2 2 2h9c1.1045695 0 2-.8954305 2-2z"></path> <path d="m15.5 12.5v-6.99481259c0-1.65685425-1.3431458-3-3-3-.0017276 0-.0034553 0-.0051829 0l-8.9948171.01554432"></path> <path d="m17.5 10.5v-5.99308345c0-2.209139-1.790861-4-4-4-.0023035 0-.004607 0-.0069106 0l-7.9930894.01381519"></path> </g> </g></svg>
            <span class="text-black dark:text-white text-[10px]">تعداد فصل :</span>
          </div>
          <span class="text-black dark:text-white opacity-75 text-[10px]">${list.number_of_seasons}</span>
        </div>
        <div class="flex flex-col  py-2 gap-y-1 grow items-center ">
          <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
            <svg width="20px" height="20px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffad49"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.516 0c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.814-8.5-8.5-8.5zM1.041 9h2.937c0.044 1.024 0.211 2.031 0.513 3h-2.603c-0.481-0.906-0.776-1.923-0.847-3zM3.978 8h-2.937c0.071-1.077 0.366-2.094 0.847-3h2.6c-0.301 0.969-0.467 1.976-0.51 3zM5.547 5h5.896c0.33 0.965 0.522 1.972 0.569 3h-7.034c0.046-1.028 0.239-2.035 0.569-3zM4.978 9h7.035c-0.049 1.028-0.241 2.035-0.572 3h-5.891c-0.331-0.965-0.524-1.972-0.572-3zM13.013 9h2.978c-0.071 1.077-0.366 2.094-0.847 3h-2.644c0.302-0.969 0.469-1.976 0.513-3zM13.013 8c-0.043-1.024-0.209-2.031-0.51-3h2.641c0.48 0.906 0.775 1.923 0.847 3h-2.978zM14.502 4h-2.354c-0.392-0.955-0.916-1.858-1.55-2.7 1.578 0.457 2.938 1.42 3.904 2.7zM9.074 1.028c0.824 0.897 1.484 1.9 1.972 2.972h-5.102c0.487-1.071 1.146-2.073 1.97-2.97 0.199-0.015 0.398-0.030 0.602-0.030 0.188 0 0.373 0.015 0.558 0.028zM6.383 1.313c-0.629 0.838-1.151 1.737-1.54 2.687h-2.314c0.955-1.267 2.297-2.224 3.854-2.687zM2.529 13h2.317c0.391 0.951 0.915 1.851 1.547 2.689-1.561-0.461-2.907-1.419-3.864-2.689zM7.926 15.97c-0.826-0.897-1.488-1.899-1.978-2.97h5.094c-0.49 1.072-1.152 2.075-1.979 2.972-0.181 0.013-0.363 0.028-0.547 0.028-0.2 0-0.395-0.015-0.59-0.030zM10.587 15.703c0.636-0.842 1.164-1.747 1.557-2.703h2.358c-0.968 1.283-2.332 2.247-3.915 2.703z" fill="#ffad49"></path> </g></svg>
            <span class="text-black dark:text-white text-[10px]">محصول :</span>
          </div>
          <span class="text-black dark:text-white opacity-75 text-[10px]">${list.origin_country}</span>
        </div>
        <div class="flex flex-col  py-2 gap-y-1 grow items-center ">
          <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
                          <svg fill="#ffad49" height="20px" width="20px" version="1.1" id="Icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12,0C5.38,0,0,5.38,0,12s5.38,12,12,12s12-5.38,12-12S18.62,0,12,0z M12,22C6.49,22,2,17.51,2,12S6.49,2,12,2 s10,4.49,10,10S17.51,22,12,22z M10.5,10h3v8h-3V10z M10.5,5h3v3h-3V5z"></path> </g></svg>
            <span class="text-black dark:text-white text-[10px]">وضعیت:</span>
          </div>
          <span class="text-black dark:text-white opacity-75 text-[10px]">${list.status === "Ended" ? "پایان یافته" : "در حال پخش"}</span>
        </div>
        <div class="flex flex-col  py-2 gap-y-1 grow items-center ">
          <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#ffad49" stroke-width="2" stroke-linecap="round"></path> <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#ffad49"></rect> <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#ffad49"></rect> <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#ffad49"></rect> </g></svg>
            <span class="text-black dark:text-white text-[10px]">سال تولید :</span>
          </div>
          <span class="text-black dark:text-white opacity-75 text-[10px]"> ${list.first_air_date ? list.first_air_date.slice(0, 4) : ""} - ${list.last_air_date ? list.last_air_date.slice(0, 4) : ""}</span>
        </div>
        <div class="flex flex-col  py-2 gap-y-1 grow items-center ">
          <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
            <svg width="15px" height="15px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0H6V2H10V4H8.86807C8.57073 5.66996 7.78574 7.17117 6.6656 8.35112C7.46567 8.73941 8.35737 8.96842 9.29948 8.99697L10.2735 6H12.7265L15.9765 16H13.8735L13.2235 14H9.77647L9.12647 16H7.0235L8.66176 10.9592C7.32639 10.8285 6.08165 10.3888 4.99999 9.71246C3.69496 10.5284 2.15255 11 0.5 11H0V9H0.5C1.5161 9 2.47775 8.76685 3.33437 8.35112C2.68381 7.66582 2.14629 6.87215 1.75171 6H4.02179C4.30023 6.43491 4.62904 6.83446 4.99999 7.19044C5.88743 6.33881 6.53369 5.23777 6.82607 4H0V2H4V0ZM12.5735 12L11.5 8.69688L10.4265 12H12.5735Z" fill="#ffad49"></path> </g></svg>
            <span class="text-black dark:text-white text-[10px]">زبان  :</span>
          </div>
          <span class="text-black dark:text-white opacity-75 text-[10px]">${list.original_language}</span>
        </div>
        `;
      getActors(list.credits.cast);
      getCrows(list.credits.crew);
    }
  } catch {
    showVpnModal();
  } finally {
    removeLoader();
  }
}
document.querySelector("#video-play-btn").addEventListener("click", getTrailer);
document.querySelector("#video").addEventListener("click", (e) => {
  if (e.target.nodeName !== "iframe") {
    closeTrailer();
  }
});

function getCrows(crow) {
  let mainList = crow.length < 15 ? crow : crow.slice(0, 15);
  const list = [...new Map(mainList.map((item) => [item.id, item])).values()];
  list.forEach((act) => {
    document.querySelector("#crow-swiper").innerHTML += `
     <a href="actors.html?id=${act.id}"  class="swiper-slide  group overflow-hidden">
          <div class="flex flex-col items-center  gap-1.5">
            <div class="aspect-square w-full rounded-full overflow-hidden loading-animation">
              <img class="object-cover" src="https://image.tmdb.org/t/p/w185${act.profile_path}_low" alt="${act.original_name}" loading="lazy" onerror="this.onerror=null; this.src='images/person-not-loaded.png';">
            </div>
            <div  class="flex flex-col items-left w-full gap-0.5 mt-1 ">
              <p dir="ltr" class="text-sm overflow-hidden text-black truncate block  dark:text-white text-center group-hover:text-orange-400 transition-all duration-300"><span>${act.original_name}</span></p>
              <span class="text-center text-xs text-gray-500 dark:text-gray-300">${act.known_for_department}</span>
            </div>
          </div>
        </a>
    `;
  });
  if (list.length == 0) document.querySelector(".crow-swiper").parentElement.parentElement.style.display = "none";
}
function getActors(cast) {
  let mainList = cast.length < 15 ? cast : cast.slice(0, 15);

  const list = [...new Map(mainList.map((item) => [item.id, item])).values()];

  list.forEach((act) => {
    document.querySelector("#act-swiper").innerHTML += `
     <a href="actors.html?id=${act.id}"  class=" swiper-slide  group overflow-hidden">
          <div class="flex flex-col items-center  gap-1.5">
            <div class="aspect-square w-full rounded-full overflow-hidden loading-animation">
              <img class="" src="https://image.tmdb.org/t/p/w185${act.profile_path}_low" alt="${act.original_name}" loading="lazy" onerror="this.onerror=null; this.src='images/person-not-loaded.png';">
            </div>
            <div  class="flex flex-col items-left w-full gap-0.5 mt-1 ">
              <p dir="ltr" class="text-sm overflow-hidden text-black truncate block  dark:text-white text-center group-hover:text-orange-400 transition-all duration-300"><span>${act.original_name}</span></p>
              <span class="text-center text-xs text-gray-500 dark:text-gray-300">${act.known_for_department == "Acting" ? "بازیگر" : act.known_for_department}</span>
            </div>
          </div>
        </a>
    `;
  });
  if (list.length == 0) document.querySelector(".actors-swiper").parentElement.parentElement.style.display = "none";
}

generateSwiper(".actors-swiper", ".act-next", ".act-prev");
generateSwiper(".crow-swiper", ".crow-next", ".crow-prev");
function generateSwiper(wrapper, next, prev) {
  const createSwiper = new Swiper(wrapper, {
    direction: "horizontal",
    slidesPerView: 3,
    loop: false,
    centeredSlides: false,
    initialSlide: 0,
    speed: 500,
    spaceBetween: 10,
    navigation: {
      nextEl: next,
      prevEl: prev,
    },
    breakpoints: {
      500: {
        slidesPerView: 4,
      },
      640: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
      1280: {
        slidesPerView: 5,
      },
    },
  });
}
async function getRecommendationsMovie() {
  let response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}/recommendations?api_key=${apiKey}`);
  let t = await response.json();
  let list = t.results;
  const randomFive = list.filter((item) => item.poster_path && item.backdrop_path).slice(0, 6);
  if (randomFive.length) {
    randomFive.forEach((elem) => {
      let elemMediaType = elem.media_type === "tv" ? "سریال" : "فیلم";
      document.querySelector(".Recommendations-wrapper").innerHTML += `
         <a href="series.html?id=${elem.id}" class="swiper-slide w-auto rounded-lg overflow-hidden transition-all duration-600 group ">
                <div class="relative ">
              <div class="w-full relative rounded-lg overflow-hidden ">
                <img loading="lazy" class="object-cover w-full min-h-55 lg:min-h-65 xl:min-h-70 loading-animation" src="https://image.tmdb.org/t/p/original/${elem.poster_path}_medium" alt=""  onerror="this.onerror=null; this.src='images/default_poster.jpg';">
                <div class="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent from-50% to-black/50 to-90% transition-all duration-600 group-hover:opacity-0">
                <p dir="ltr" class="p-5  px-3 text-sm absolute bottom-0 left-0  font-extrabold text-white">${elem.name ? elem.name : elem.original_name}</p>
                </div>
              </div>
              <div class="absolute w-full h-full top-0 left-0 rounded-lg bg-black/60 px-3 py-3.5 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:scale-90 transition-all duration-600">
                <span class="absolute top-0 left-0 p-3 text-amber-400 flex gap-1.5 items-start ">${elemMediaType}</span>
                <span class="absolute top-1/2 left-1/2 -translate-1/2">
                  <svg  width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12L3 18.9671C3 21.2763 5.53435 22.736 7.59662 21.6145L10.7996 19.8727M3 8L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L14.0026 18.131" stroke="#cfcfcf" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                </span>
                <div class=" absolute w-full p-3 bottom-0 left-0 flex justify-between items-center">
                  <div class="flex items-start">
                    <span class="text-orange-400 text-sm lg:text-lg">100%</span>
                    <span>
                       <svg class=" w-5 h-4" version="1.1" id="designs" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 32 32" xml:space="preserve" fill="#ff8904"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .sketchy_een{fill:#ff8904;} </style> <path class="sketchy_een" d="M28.869,20.55c-0.11-0.138-0.231-0.271-0.36-0.395c0.171-0.153,0.296-0.362,0.421-0.551 c0.181-0.277,0.334-0.552,0.445-0.867c0.248-0.706-0.118-1.461-0.577-1.988c-0.067-0.077-0.142-0.149-0.22-0.216 c0.082-0.099,0.161-0.203,0.239-0.303c0.204-0.262,0.428-0.535,0.487-0.873c0.061-0.344,0.021-0.674-0.067-1.01 c-0.176-0.672-0.76-1.192-1.329-1.541c-0.187-0.115-0.384-0.2-0.588-0.279c-0.172-0.065-0.374-0.08-0.554-0.103 c-0.311-0.038-0.628-0.032-0.941-0.038c-0.081-0.001-0.162-0.002-0.243-0.002c-0.85,0-1.696,0.068-2.545,0.105 c-0.832,0.034-1.667,0.04-2.5,0.04c-0.002-0.39-0.001-0.78-0.016-1.17c-0.018-0.492-0.029-0.981,0.019-1.473 c0.033-0.191,0.076-0.38,0.109-0.57c0.057-0.336,0.122-0.668,0.166-1.008c0.082-0.615,0.153-1.243,0.074-1.862 c-0.046-0.372-0.105-0.741-0.187-1.105c-0.082-0.357-0.187-0.733-0.384-1.045c-0.113-0.18-0.254-0.342-0.384-0.508 c-0.109-0.137-0.223-0.273-0.349-0.395c-0.208-0.206-0.451-0.382-0.682-0.563c-0.208-0.162-0.416-0.327-0.64-0.468 c-0.242-0.153-0.504-0.26-0.781-0.336C17.415,2.009,17.346,2,17.278,2c-0.348,0-0.675,0.233-0.771,0.581 c-0.02,0.074-0.016,0.149-0.015,0.223c-0.012,0.018-0.033,0.026-0.045,0.045c-0.067,0.116-0.101,0.242-0.101,0.376 c-0.04,0.291-0.068,0.582-0.103,0.872c-0.12,0.864-0.299,1.722-0.464,2.58c-0.133,0.701-0.233,1.41-0.488,2.077 c-0.141,0.316-0.299,0.626-0.452,0.936c-0.197,0.395-0.435,0.771-0.655,1.153c-0.43,0.747-0.871,1.487-1.385,2.178 c-0.195,0.243-0.397,0.478-0.612,0.706c-0.203,0.217-0.421,0.409-0.651,0.594c-0.124,0.094-0.249,0.185-0.384,0.263 c-0.093,0.053-0.189,0.097-0.284,0.143c0-0.049,0.003-0.097,0.003-0.145c-0.004-0.422-0.349-0.773-0.775-0.773 c-0.059,0-0.114,0.022-0.17,0.035c-0.039-0.009-0.076-0.029-0.114-0.029c-0.014,0-0.029,0.001-0.043,0.002 c-0.995,0.099-2.001,0.115-3.002,0.138c-0.506,0.011-1.012,0.025-1.52,0.019c-0.514-0.004-1.033-0.065-1.545-0.015 c-0.047,0.005-0.086,0.019-0.13,0.028c-0.077-0.026-0.156-0.05-0.244-0.05c-0.407,0-0.81,0.357-0.783,0.783 c0.023,0.359,0.05,0.712,0.053,1.071c0.004,0.374,0.004,0.749,0.006,1.121c0.002,0.739-0.017,1.478-0.008,2.217 c0.021,1.459,0.031,2.916,0.031,4.373c0,0.712-0.019,1.421-0.032,2.131c-0.011,0.624-0.004,1.247-0.017,1.869 c-0.004,0.2,0.084,0.38,0.221,0.511c0.138,0.173,0.337,0.294,0.566,0.277c1.085-0.08,2.173-0.156,3.261-0.147 c0.313,0.004,0.628,0.002,0.943,0.002c0.223-0.002,0.449-0.002,0.674-0.002c0.51,0,1.031-0.015,1.537,0.042 c0.185,0.021,0.399-0.092,0.525-0.218c0.069-0.069,0.123-0.153,0.16-0.243c0.339-0.067,0.623-0.36,0.612-0.719 c-0.002-0.06-0.009-0.12-0.013-0.179c0.025,0.018,0.051,0.035,0.075,0.053c0.615,0.499,1.205,1.034,1.865,1.474 c0.315,0.21,0.628,0.433,0.964,0.609c0.382,0.2,0.783,0.37,1.193,0.502c0.749,0.244,1.533,0.324,2.316,0.384 c0.376,0.029,0.754,0.053,1.13,0.092c0.361,0.034,0.72,0.059,1.083,0.061c1.543,0.004,3.082-0.092,4.623-0.128 c0.46-0.011,0.918-0.034,1.373-0.103c0.353-0.053,0.714-0.109,1.058-0.202c0.145-0.04,0.292-0.088,0.432-0.145 c0.12-0.05,0.246-0.094,0.359-0.162c0.109-0.065,0.208-0.147,0.309-0.227c0.225-0.176,0.445-0.353,0.632-0.573 c0.191-0.225,0.304-0.485,0.441-0.743c0.097-0.185,0.187-0.38,0.231-0.584c0.101-0.466,0.076-0.939-0.055-1.396 c-0.074-0.25-0.164-0.495-0.273-0.731c-0.084-0.183-0.233-0.338-0.369-0.485c-0.068-0.073-0.137-0.145-0.206-0.218 c0.03-0.024,0.06-0.048,0.09-0.072c0.197-0.156,0.34-0.334,0.491-0.537c0.162-0.218,0.292-0.452,0.382-0.71 c0.075-0.214,0.105-0.447,0.147-0.668c0.055-0.306,0.055-0.544-0.002-0.85C29.288,21.115,29.087,20.819,28.869,20.55z M8.733,26.719 c-0.164,0-0.327-0.002-0.489-0.002c-0.538,0.004-1.079,0.002-1.617,0.013c-0.544,0.013-1.09,0.042-1.635,0.055 c-0.244,0.008-0.489,0.004-0.733,0C4.173,26.785,4.087,26.789,4,26.788c-0.007-1.095,0.007-2.191,0.007-3.287 c0.002-1.457,0.025-2.916,0.053-4.373c0.015-0.739,0.036-1.478,0.044-2.217c0.004-0.372,0.002-0.747,0.002-1.121 c0.001-0.125-0.001-0.249,0.002-0.374c0.374-0.027,0.748-0.042,1.124-0.053c0.506-0.015,1.012-0.032,1.52-0.048 c0.496-0.013,0.995-0.011,1.491-0.013c0.369,0,0.738-0.006,1.108-0.011c0.022,0.516,0.047,1.032,0.056,1.549 c0.013,0.722,0.029,1.445,0.04,2.167c0.01,0.747,0.032,1.491,0.055,2.236c0.021,0.737,0.032,1.472,0.04,2.209 c0.008,0.628-0.013,1.256,0.01,1.885c0.013,0.304,0.031,0.607,0.036,0.909c0.002,0.154,0,0.306-0.002,0.459 C9.303,26.718,9.018,26.723,8.733,26.719z M27.847,24.618c0.003-0.002,0.005-0.004,0.008-0.006c0.005-0.004,0.01-0.008,0.016-0.012 C27.863,24.606,27.855,24.612,27.847,24.618z M27.918,18.272c-0.01,0.04-0.021,0.079-0.035,0.118 c-0.102,0.212-0.227,0.42-0.362,0.612c-0.028,0.032-0.056,0.063-0.086,0.092c-0.171,0.107-0.359,0.187-0.533,0.29 c-0.258,0.155-0.439,0.409-0.439,0.718c0,0.336,0.218,0.58,0.495,0.741c0.123,0.071,0.25,0.137,0.371,0.215 c0.136,0.119,0.261,0.25,0.377,0.389c0.05,0.074,0.094,0.15,0.134,0.23c0.014,0.045,0.026,0.09,0.036,0.136 c0.001,0.043,0,0.085-0.002,0.129c-0.031,0.203-0.066,0.41-0.13,0.603c-0.057,0.108-0.121,0.211-0.191,0.31 c-0.096,0.115-0.204,0.217-0.32,0.312c-0.121,0.089-0.246,0.172-0.37,0.254c-0.218,0.145-0.378,0.302-0.462,0.556 c-0.107,0.317,0.034,0.626,0.244,0.857c0.232,0.256,0.473,0.504,0.69,0.772c0.043,0.06,0.081,0.122,0.116,0.187 c0.067,0.183,0.125,0.367,0.161,0.558c0.009,0.105,0.01,0.211,0.004,0.316c-0.012,0.062-0.027,0.124-0.046,0.184 c-0.037,0.074-0.076,0.148-0.112,0.223c-0.053,0.109-0.103,0.218-0.166,0.32c-0.13,0.141-0.269,0.268-0.417,0.389 c-0.081,0.058-0.165,0.111-0.255,0.156c-0.391,0.142-0.799,0.228-1.211,0.292c-0.755,0.078-1.519,0.052-2.276,0.08 c-0.741,0.025-1.482,0.031-2.223,0.044c-0.768,0.013-1.531,0.048-2.299,0.004c-0.694-0.04-1.391-0.055-2.084-0.138 c-0.519-0.087-1.017-0.228-1.505-0.421c-0.457-0.218-0.881-0.489-1.3-0.772c-0.417-0.281-0.823-0.578-1.225-0.881 c-0.222-0.173-0.442-0.346-0.669-0.509c-0.185-0.131-0.382-0.242-0.568-0.371c-0.007-0.006-0.013-0.012-0.02-0.019 c-0.082-0.073-0.176-0.122-0.274-0.156c0-0.012-0.001-0.024-0.002-0.036c-0.021-0.728-0.032-1.457-0.046-2.186 c-0.015-0.739-0.04-1.478-0.052-2.217c-0.013-0.754-0.015-1.506-0.015-2.261c0.002-0.611-0.002-1.222-0.004-1.833 c0-0.09,0.001-0.18,0.001-0.27c0.003-0.002,0.005-0.004,0.008-0.005c0.261-0.18,0.574-0.294,0.859-0.43 c0.378-0.183,0.728-0.456,1.044-0.726c0.275-0.233,0.519-0.497,0.76-0.762c0.267-0.292,0.516-0.603,0.747-0.924 c0.428-0.598,0.781-1.243,1.157-1.871c0.183-0.304,0.374-0.602,0.55-0.909c0.176-0.302,0.332-0.615,0.485-0.93 c0.176-0.355,0.321-0.726,0.433-1.105c0.052-0.174,0.103-0.349,0.128-0.531c0.023-0.17,0.044-0.341,0.065-0.512 c0.175-1.246,0.443-2.477,0.651-3.719c0.153,0.105,0.303,0.217,0.451,0.332c0.111,0.088,0.221,0.178,0.321,0.278 c0.148,0.146,0.285,0.304,0.416,0.467c0.055,0.077,0.105,0.155,0.15,0.237c0.166,0.458,0.26,0.935,0.332,1.416 c0.063,0.585,0.007,1.178-0.066,1.761c-0.053,0.37-0.111,0.743-0.185,1.11c-0.082,0.397-0.09,0.802-0.105,1.205 c-0.029,0.831,0.071,1.659,0.023,2.49c-0.016,0.256,0.14,0.475,0.349,0.607c0.137,0.154,0.33,0.257,0.548,0.256 c0.609-0.004,1.216-0.052,1.825-0.08c0.563-0.029,1.127-0.036,1.69-0.055c0.548-0.019,1.094-0.027,1.642-0.031 c0.474-0.002,0.944,0.008,1.413,0.064c0.142,0.025,0.276,0.061,0.411,0.109c0.139,0.072,0.273,0.153,0.401,0.245 c0.093,0.079,0.182,0.164,0.264,0.255c0.04,0.062,0.077,0.126,0.112,0.192c0.019,0.06,0.034,0.121,0.047,0.183 c0.002,0.031,0.004,0.061,0.004,0.092c-0.06,0.106-0.131,0.205-0.205,0.302c-0.092,0.118-0.188,0.231-0.298,0.331 c-0.104,0.069-0.215,0.125-0.329,0.182c-0.34,0.166-0.559,0.596-0.435,0.964c0.074,0.22,0.214,0.409,0.428,0.506 c0.057,0.025,0.114,0.049,0.172,0.072c0.104,0.05,0.201,0.11,0.295,0.175c0.124,0.106,0.238,0.222,0.344,0.345 c0.049,0.074,0.094,0.149,0.133,0.228c0.013,0.039,0.025,0.077,0.035,0.117C27.919,18.236,27.918,18.254,27.918,18.272z M27.523,22.892c-0.004,0.005-0.007,0.01-0.011,0.015c-0.011,0.015-0.023,0.03-0.034,0.045 C27.492,22.932,27.507,22.912,27.523,22.892z"></path> </g></svg>
                      </span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-xs text-white">10/</span>
                    <span class="text-base lg:text-2xl text-amber-400 font-bold">${elem.vote_average.toFixed(1)}</span>
                  </div>
                  
                  <!-- <span class="text-base text-amber-400 font-bold">6.8</span></span>
                  <span class=" flex items-center gap-0.5 text-gray-300"><span class="text-xs">10/</span></span> -->
                </div>
               </div>
                </div>
              </a>
        `;
    });
    const RecommendationsSwiper = new Swiper(".recommendations-swiper", {
      direction: "horizontal",
      slidesPerView: 2,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      speed: 500,
      spaceBetween: 15,
      pagination: {
        el: ".Recommendations-pagination",
        clickable: true,
      },
      breakpoints: {
        500: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 5,
        },
        1400: {
          spaceBetween: 20,
          slidesPerView: 7,
        },
      },
    });
    document.querySelectorAll(".Recommendations-wrapper img").forEach((elem) => elem.addEventListener("load", () => elem.classList.remove("loading-animation")));
  } else {
    document.querySelector(".recommendations-swiper").parentElement.style.display = "none";
  }
}

async function getTrailer() {
  if (main) showTrailer();
  else {
    let response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${apiKey}`);
    let res = await response.json();
    let list = res.results;
    main = list.find((el) => el.type == "Trailer" && el.official == true);
    showTrailer();
  }
}
function showTrailer() {
  document.body.classList.add("lock-scroll");
  document.querySelector("#video").classList.remove("hidden");
  if (main) document.querySelector("#video iframe").src = `https://www.youtube.com/embed/${main.key}?autoplay=0&controls=1`;
  else {
    document.querySelector("#video iframe").style.display = "none";
    document.querySelector("#video p").classList.remove("hidden");
  }
}
function closeTrailer() {
  document.body.classList.remove("lock-scroll");
  document.querySelector("#video").classList.add("hidden");
  document.querySelector("#video iframe").src = "";
}
