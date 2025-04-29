import { apiKey ,genres, menu , manageMenu,moreFiltersToggle ,toggleMenu  ,switchTheme, getGenres , navControl} from './funcs.js'
const urlParams = new URLSearchParams(window.location.search);
// document.querySelector('#search').addEventListener('click' ,  search)
const searchBoxSelection = document.querySelectorAll("#selection span");
let movieTotalPage=0
let tvTotalPage=0
let page = 1

window.addEventListener('DOMContentLoaded' , ()=>{
  setValues()
  
})



function setValues(){
  if(urlParams.get('type')){
    searchBoxSelection.forEach(elem=>{
      elem.classList.remove("bg-orange-400")
      if(elem.dataset.type==urlParams.get('type') ) {
        elem.classList.add("bg-orange-400")
      }
    })
    let country =document.querySelector('#country').value=  urlParams.get('country')
    let genre =document.querySelector('#genre').value=urlParams.get('genre')
    let fromYear =document.querySelector('#fromYear').value=urlParams.get('fromYear')==0 ? '':urlParams.get('fromYear')
    let toYear =document.querySelector('#toYear').value=urlParams.get('toYear')==0 ? '':urlParams.get('toYear')
    let fromPoint =document.querySelector('#fromPoint').value=urlParams.get('fromPoint') 
    let toPoint =document.querySelector('#toPoint').value=urlParams.get('toPoint') 
    let age =document.querySelector('#age').value=urlParams.get('age')
    page = urlParams.get('page') ? urlParams.get('page') : 1 
    let sort = document.querySelector('#sort').value= urlParams.get('sort') ? urlParams.get('sort') : ''
  document.querySelector('#double').checked = urlParams.get('double')=='false' ? false : true
  document.querySelector('#Subtitle').checked = urlParams.get('Subtitle')=='false' ? false : true
}
callFuncs()
}
// function search(){
//   let mediaType ;
//   searchBoxSelection.forEach(elem=>{
//      if(elem.classList.contains("bg-orange-400"))  mediaType = elem.dataset.type
//  })
//  let country =document.querySelector('#country').value
//  let genre =document.querySelector('#genre').value
//  let fromYear =Number(document.querySelector('#fromYear').value)
//  let toYear =Number(document.querySelector('#toYear').value)
//  let fromPoint =document.querySelector('#fromPoint').value
//  let toPoint =document.querySelector('#toPoint').value
//  let age =document.querySelector('#age').value
//  let  double=document.querySelector('#double').checked
//  let  Subtitle=document.querySelector('#Subtitle').checked
//  let sort = document.querySelector('#sort').value
//  window.location.href= `search.html?${'&type='+mediaType}${'&country='+country}${'&genre='+genre}${'&fromYear='+fromYear}${'&toYear='+toYear}${'&fromPoint='+fromPoint}${'&toPoint='+toPoint}${'&age='+age}${'&double='+double}${'&Subtitle='+Subtitle}${'&page=1'}${sort=='' ?'' : '&sort='+ sort}`
// }
function callFuncs(){
  document.querySelector('#items').innerHTML=''
  let mediaType ;
  searchBoxSelection.forEach(elem=>{
     if(elem.classList.contains("bg-orange-400"))  mediaType = elem.dataset.type
  })
  let country =document.querySelector('#country').value
  let genre =document.querySelector('#genre').value
  let fromYear =Number(document.querySelector('#fromYear').value)
  let toYear =Number(document.querySelector('#toYear').value)
  let fromPoint =document.querySelector('#fromPoint').value
  let toPoint =document.querySelector('#toPoint').value
  let age =document.querySelector('#age') 
  let sort = document.querySelector('#sort').value

      if(mediaType=='movie') movie(country , genre , fromYear , toYear , fromPoint , toPoint , age , sort  )
      if(mediaType=='tv') tv(country , genre , fromYear , toYear , fromPoint , toPoint , age , sort )
      if(mediaType=='all') all(country , genre , fromYear , toYear , fromPoint , toPoint , age , sort )
      
}
async function movie(country , genre , fromYear , toYear , fromPoint , toPoint , age , sort ){
 let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${'&page=' + page}${genre == '' ? '' : '&with_genres='+genre}${country== ''? '' : '&with_origin_country='+country}${fromPoint==0 ? '' : '&vote_average.gte='+fromPoint}${toPoint==0 ?'' : '&vote_average.lte='+toPoint}${fromYear==0 ? '' : '&primary_release_date.gte='+fromYear+'-01-01'}${toYear==0 ? '' : '&primary_release_date.lte='+toYear+'-01-01'}${age.options[age.selectedIndex].value=='' ? '': '&certification_country=US&certification='+age.options[age.selectedIndex].dataset.value }${'&'+ sort}`)
 let res = await response.json();
 movieTotalPage=res.total_pages
 console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${'&page=' + page}${genre == '' ? '' : '&with_genres='+genre}${country== ''? '' : '&with_origin_country='+country}${fromPoint==0 ? '' : '&vote_average.gte='+fromPoint}${toPoint==0 ?'' : '&vote_average.lte='+toPoint}${fromYear==0 ? '' : '&primary_release_date.gte='+fromYear+'-01-01'}${toYear==0 ? '' : '&primary_release_date.lte='+toYear+'-01-01'}${age.options[age.selectedIndex].value=='' ? '': '&certification_country=US&certification='+age.options[age.selectedIndex].dataset.value }${sort=''? '' :'&'+sort}`);
 let list = res.results;

 addItems(list) 
}
async function tv(country , genre , fromYear , toYear , fromPoint , toPoint , age , sort ){

  let response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}${'&page=' + page}${genre == '' ? '' : '&with_genres='+genre}${country== ''? '' : '&with_origin_country='+country}${fromPoint==0 ? '' : '&vote_average.gte='+fromPoint}${toPoint==0 ?'' : '&vote_average.lte='+toPoint}${fromYear==0 ? '' : '&first_air_date.gte='+fromYear+'-01-01'}${toYear==0 ? '' : '&first_air_date.lte='+toYear+'-01-01'}${age.value=='' ? '' : '&certification_country=US&certification='+age.value}${'&'+ sort}`)
  let res = await response.json();
  tvTotalPage=res.total_pages
  console.log(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}${'&page=' + page}${genre == '' ? '' : '&with_genres='+genre}${country== ''? '' : '&with_origin_country='+country}${fromPoint==0 ? '' : '&vote_average.gte='+fromPoint}${toPoint==0 ?'' : '&vote_average.lte='+toPoint}${fromYear==0 ? '' : '&first_air_date.gte='+fromYear+'-01-01'}${toYear==0 ? '' : '&first_air_date.lte='+toYear+'-01-01'}${age.value=='' ? '' : '&certification_country=US&certification='+age.value}${'&'+ sort}`);

  let list = res.results;
  addItems(list)
}
async function all(country , genre , fromYear , toYear , fromPoint , toPoint , age , sort ){
  let movieResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${'&page=' + page}${genre == '' ? '' : '&with_genres='+genre}${country== ''? '' : '&with_origin_country='+country}${fromPoint==0 ? '' : '&vote_average.gte='+fromPoint}${toPoint==0 ?'' : '&vote_average.lte='+toPoint}${fromYear==0 ? '' : '&primary_release_date.gte='+fromYear+'-01-01'}${toYear==0 ? '' : '&primary_release_date.lte='+toYear+'-01-01'}${age.options[age.selectedIndex].value=='' ? '': '&certification_country=US&certification='+age.options[age.selectedIndex].dataset.value }${'&'+ sort}`)
  let movieRes = await movieResponse.json();
  movieTotalPage=movieRes.total_pages
 let movieList = movieRes.results;
 let tvResponse = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}${'&page=' + page}${genre == '' ? '' : '&with_genres='+genre}${country== ''? '' : '&with_origin_country='+country}${fromPoint==0 ? '' : '&vote_average.gte='+fromPoint}${toPoint==0 ?'' : '&vote_average.lte='+toPoint}${fromYear==0 ? '' : '&first_air_date.gte='+fromYear+'-01-01'}${toYear==0 ? '' : '&first_air_date.lte='+toYear+'-01-01'}${age.value=='' ? '' : '&certification_country=US&certification='+age.value}${'&'+ sort}`)
 let tvRes = await tvResponse.json();
 tvTotalPage=tvRes.total_pages
 let tvList = tvRes.results;
 const mixed = movieList.concat(tvList).sort(() => Math.random() - 0.5);
addItems(mixed.slice(0,20))
}
function addItems(list){
  console.log(list);

  if(list.length == 0) {
    document.querySelector('#not-found-text').classList.remove('hidden') }
    else{
      document.querySelector('#not-found-text').classList.add('hidden') 
      list.forEach(elem=>{
        let date = elem.release_date ? elem.release_date : elem.first_air_date        
      document.querySelector('#items').innerHTML+=
      `
       <a
      
           href="${elem.release_date ?  'movie' : 'series'}.html?id=${elem.id}"
            id="${
             elem.id
           }"  class=" inline-flex flex-col items-center w-full  gap-1.5 overflow-hidden min-h-[245px] sm:min-h-[240px] md:min-h-[230px] lg:min-h-[240px] xl:min-h-[250px] 2xl:min-h-[300px] rounded-xl transition-all duration-600 group min-h-[]">
           <div class="w-full h-9/10 relative rounded-md overflow-hidden ">
             <div class="w-full h-full overflow-hidden">
               <img loading="lazy" class="w-full h-full object-cover " src="https://image.tmdb.org/t/p/original${
                 elem.poster_path
               }_low" alt="${elem.name ? elem.name : elem.title}" loading="lazy" onerror="this.onerror=null; this.src='images/default_poster.jpg';">
             </div>
             <div class="absolute  top-0 left-0  bg-center bg-cover w-full min-h-full  rounded-xl overflow-hidden opacity-0 invisible group-hover:scale-95 lg:group-hover:scale-90 group-hover:opacity-100 group-hover:visible transition-all duration-600">
               <div class="absolute top-0 left-0 flex flex-col justify-between  w-full min-h-full bg-black/60 px-3 py-3.5">
                   <div class=" flex justify-between items-center">
                 
                     <span class=" font-light text-sm text-amber-400">${date ? date.slice(0,4) : '...'}</span>
                       <span class=" font-light text-sm text-amber-400">${elem.release_date ? 'movie' : 'tv'}</span>
                   </div>
                   <span class="absolute top-1/2 left-1/2 -translate-1/2">
                  <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M3 12L3 18.9671C3 21.2763 5.53435 22.736 7.59662 21.6145L10.7996 19.8727M3 8L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L14.0026 18.131" stroke="#c5c5c5" stroke-width="1.5" stroke-linecap="round"></path>
                    </g>
                  </svg>
                </span>
                   <div class="flex text-gray-300 flex-col items-start gap-3">
                     <div class="w-full flex justify-between items-center mt-2 lg:mt-1">
                    <span class="text-amber-400 flex gap-0.5 items-start lg:gap-0.5 text-xs xl:text-sm">${elem.popularity.toFixed(3)}
                      <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M20.9752 12.1852L20.2361 12.0574L20.9752 12.1852ZM20.2696 16.265L19.5306 16.1371L20.2696 16.265ZM6.93777 20.4771L6.19056 20.5417L6.93777 20.4771ZM6.12561 11.0844L6.87282 11.0198L6.12561 11.0844ZM13.995 5.22142L14.7351 5.34269V5.34269L13.995 5.22142ZM13.3323 9.26598L14.0724 9.38725V9.38725L13.3323 9.26598ZM6.69814 9.67749L6.20855 9.10933H6.20855L6.69814 9.67749ZM8.13688 8.43769L8.62647 9.00585H8.62647L8.13688 8.43769ZM10.5181 4.78374L9.79208 4.59542L10.5181 4.78374ZM10.9938 2.94989L11.7197 3.13821V3.13821L10.9938 2.94989ZM12.6676 2.06435L12.4382 2.77841L12.4382 2.77841L12.6676 2.06435ZM12.8126 2.11093L13.042 1.39687L13.042 1.39687L12.8126 2.11093ZM9.86195 6.46262L10.5235 6.81599V6.81599L9.86195 6.46262ZM13.9047 3.24752L13.1787 3.43584V3.43584L13.9047 3.24752ZM11.6742 2.13239L11.3486 1.45675V1.45675L11.6742 2.13239ZM3.9716 21.4707L3.22439 21.5353L3.9716 21.4707ZM3 10.2342L3.74721 10.1696C3.71261 9.76945 3.36893 9.46758 2.96767 9.4849C2.5664 9.50221 2.25 9.83256 2.25 10.2342H3ZM20.2361 12.0574L19.5306 16.1371L21.0087 16.3928L21.7142 12.313L20.2361 12.0574ZM13.245 21.25H8.59635V22.75H13.245V21.25ZM7.68498 20.4125L6.87282 11.0198L5.3784 11.149L6.19056 20.5417L7.68498 20.4125ZM19.5306 16.1371C19.0238 19.0677 16.3813 21.25 13.245 21.25V22.75C17.0712 22.75 20.3708 20.081 21.0087 16.3928L19.5306 16.1371ZM13.2548 5.10015L12.5921 9.14472L14.0724 9.38725L14.7351 5.34269L13.2548 5.10015ZM7.18773 10.2456L8.62647 9.00585L7.64729 7.86954L6.20855 9.10933L7.18773 10.2456ZM11.244 4.97206L11.7197 3.13821L10.2678 2.76157L9.79208 4.59542L11.244 4.97206ZM12.4382 2.77841L12.5832 2.82498L13.042 1.39687L12.897 1.3503L12.4382 2.77841ZM10.5235 6.81599C10.8354 6.23198 11.0777 5.61339 11.244 4.97206L9.79208 4.59542C9.65573 5.12107 9.45699 5.62893 9.20042 6.10924L10.5235 6.81599ZM12.5832 2.82498C12.8896 2.92342 13.1072 3.16009 13.1787 3.43584L14.6307 3.05921C14.4252 2.26719 13.819 1.64648 13.042 1.39687L12.5832 2.82498ZM11.7197 3.13821C11.7548 3.0032 11.8523 2.87913 11.9998 2.80804L11.3486 1.45675C10.8166 1.71309 10.417 2.18627 10.2678 2.76157L11.7197 3.13821ZM11.9998 2.80804C12.1345 2.74311 12.2931 2.73181 12.4382 2.77841L12.897 1.3503C12.3873 1.18655 11.8312 1.2242 11.3486 1.45675L11.9998 2.80804ZM14.1537 10.9842H19.3348V9.4842H14.1537V10.9842ZM4.71881 21.4061L3.74721 10.1696L2.25279 10.2988L3.22439 21.5353L4.71881 21.4061ZM3.75 21.5127V10.2342H2.25V21.5127H3.75ZM3.22439 21.5353C3.2112 21.3828 3.33146 21.25 3.48671 21.25V22.75C4.21268 22.75 4.78122 22.1279 4.71881 21.4061L3.22439 21.5353ZM14.7351 5.34269C14.8596 4.58256 14.8241 3.80477 14.6307 3.0592L13.1787 3.43584C13.3197 3.97923 13.3456 4.54613 13.2548 5.10016L14.7351 5.34269ZM8.59635 21.25C8.12244 21.25 7.72601 20.887 7.68498 20.4125L6.19056 20.5417C6.29852 21.7902 7.3427 22.75 8.59635 22.75V21.25ZM8.62647 9.00585C9.30632 8.42 10.0392 7.72267 10.5235 6.81599L9.20042 6.10924C8.85404 6.75767 8.3025 7.30493 7.64729 7.86954L8.62647 9.00585ZM21.7142 12.313C21.9695 10.8365 20.8341 9.4842 19.3348 9.4842V10.9842C19.9014 10.9842 20.3332 11.4959 20.2361 12.0574L21.7142 12.313ZM3.48671 21.25C3.63292 21.25 3.75 21.3684 3.75 21.5127H2.25C2.25 22.1953 2.80289 22.75 3.48671 22.75V21.25ZM12.5921 9.14471C12.4344 10.1076 13.1766 10.9842 14.1537 10.9842V9.4842C14.1038 9.4842 14.0639 9.43901 14.0724 9.38725L12.5921 9.14471ZM6.87282 11.0198C6.8474 10.7258 6.96475 10.4378 7.18773 10.2456L6.20855 9.10933C5.62022 9.61631 5.31149 10.3753 5.3784 11.149L6.87282 11.0198Z" fill="#ffb900"></path>
                        </g></svg></span>
                    <span class="flex items-center gap-0.5"><span class="text-xs">10/</span>
                      <span class="text-lg md:text-xl xl:text-1xl text-amber-400 font-bold">${elem.vote_average.toFixed(1)}</span></span>
                  </div>
                   </div>
               </div>
   
             
           </div>
           </div>
           <p dir="ltr" class="mt-2 lg:mt-0 h-auto w-full text-center truncate text-ellipsis transition-all duration-300 group-hover:text-amber-400 text-black dark:text-white text-sm ">${
            elem.title ? elem.title : elem.name
           }</p>
          </a>
          `;
  
      
    })

  }
  paginationControl()
}
function paginationControl(){
  if((movieTotalPage + tvTotalPage)<=2 ){
  document.querySelector('#pagination').style.display='none'
  }else   document.querySelector('#pagination').style.display='flex'

  console.log(movieTotalPage + tvTotalPage);
  console.log( 'page =' +page);
  document.querySelector('#end').textContent=movieTotalPage + tvTotalPage
  if(page==1) {
    document.querySelector('#prev').disabled = true
    document.querySelector('#one').style.backgroundColor='#ff8904'
    document.querySelector('#one').style.color='#fff'
    // document.querySelector('#count').textContent= Math.floor((movieTotalPage + tvTotalPage)/2)
  }
  if((movieTotalPage + tvTotalPage)>500){
    document.querySelector('#end').textContent= 500
    document.querySelector('#count').textContent= 250
  }
  else{
    document.querySelector('#end').textContent= movieTotalPage + tvTotalPage
    document.querySelector('#count').textContent= Math.floor((movieTotalPage + tvTotalPage)/2)

  }
  if(page!=1 && page!= Number(document.querySelector('#end').textContent)){
    document.querySelector('#count').textContent=page
    document.querySelector('#count').style.backgroundColor='#ff8904'
    document.querySelector('#count').style.color='#fff'
  }
  if(Number(document.querySelector('#end').textContent)==page) {
    document.querySelector('#next').disabled  = true
    document.querySelector('#end').style.backgroundColor='#ff8904'
    document.querySelector('#end').style.color='#fff'
    document.querySelector('#count').textContent= Math.floor(Number(document.querySelector('#end').textContent)/2)

  }
}

function changePage(page){
  let mediaType ;
  searchBoxSelection.forEach(elem=>{
     if(elem.classList.contains("bg-orange-400"))  mediaType = elem.dataset.type
 })
 let country =document.querySelector('#country').value
 let genre =document.querySelector('#genre').value
 let fromYear =Number(document.querySelector('#fromYear').value)
 let toYear =Number(document.querySelector('#toYear').value)
 let fromPoint =document.querySelector('#fromPoint').value
 let toPoint =document.querySelector('#toPoint').value
 let age =document.querySelector('#age').value
 let  double=document.querySelector('#double').checked
 let  Subtitle=document.querySelector('#Subtitle').checked
 let sort = document.querySelector('#sort').value

  window.location.href= `search.html?${'&type='+mediaType}${'&country='+country}${'&genre='+genre}${'&fromYear='+fromYear}${'&toYear='+toYear}${'&fromPoint='+fromPoint}${'&toPoint='+toPoint}${'&age='+age}${'&double='+double}${'&Subtitle='+Subtitle}${'&page='+page}${sort=='' ?'' : '&sort='+ sort}`

}
document.querySelector('#prev').addEventListener('click' , ()=>{
  page--  
  changePage(page)
})
document.querySelector('#next').addEventListener('click' , ()=>{
  page++
  changePage(page)
})
document.querySelectorAll('#pagination-numbers button').forEach(elem=>{
  elem.addEventListener('click' , ()=>{
    changePage(Number(elem.textContent));
  })
})
