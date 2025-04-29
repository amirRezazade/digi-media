import { apiKey ,genres, menu , manageMenu,moreFiltersToggle ,toggleMenu  ,switchTheme, getGenres , navControl} from './funcs.js'


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let totalCredits;
let min = 0
let itemInPage = 12
let page = 1
let totalPage;
let max = 12
getPerson()
getCredits()
async function getPerson(){

    let person = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=cf30b054d9d7ec861b2a498d97eccdad&query`)
    let data = await person.json()    
    let year= new Date().getFullYear()   
    if(data.birthday || data.imdb_id){

   
    document.querySelector('#card').innerHTML=
    `
     <div class="w-full  overflow-hidden">
     <img loading="lazy" class="aspect-square sm:h-[330px] w-full" src="https://image.tmdb.org/t/p/original${data.profile_path}_medium" alt="" onerror="this.onerror=null; this.src='images/default_poster.jpg';">
     </div>
       <div class="flex flex-col gap-2 px-5 items-center">
        <h1 class="text-black dark:text-white font-bold text-2xl font-sans">${data.name}</h1>
        <div class="w-full flex justify-between items-center py-1.5 border-b border-gray-500/30">
          <span class="text-black dark:text-white text-xs">سن:</span>
          <span class="text-gray-500 dark:text-gray-300 text-xs font-light ">${data.deathday? data.deathday.slice(0 , 4) - data.birthday.slice(0 , 4) : year- data.birthday.slice(0 , 4)} سال</span>
        </div>
        <div class="w-full flex justify-between items-center py-1.5 border-b border-gray-500/30">
          <span class="text-black dark:text-white text-xs">تاریخ تولد :</span>
          <span class="text-gray-500 dark:text-gray-300 text-xs font-light ">${data.birthday}</span>
        </div>
         <div class="${data.deathday ? '' : 'hidden'} w-full flex justify-between items-center py-1.5 border-b border-gray-500/30">
          <span class="text-black dark:text-white text-xs">تاریخ فوت :</span>
          <span class="text-gray-500 dark:text-gray-300 text-xs font-light ">${data.deathday}</span>
        </div>
        <div class="w-full flex justify-between items-center py-1.5 border-b border-gray-500/30">
          <span class="text-black dark:text-white text-xs">جنسیت :</span>
          <span class="text-gray-500 dark:text-gray-300 text-xs font-light ">${data.gender==1 ? 'زن' : 'مرد'}</span>
        </div>
        <div class="w-full flex justify-between items-center py-1.5 border-b border-gray-500/30">
          <span class="text-black dark:text-white text-xs">محل تولد :</span>
          <span class="text-gray-500 dark:text-gray-300 text-xs font-light ">${data.place_of_birth}</span>
        </div>
        <div class="w-full flex justify-between items-center py-1.5 border-b border-gray-500/30">
          <span class="text-black dark:text-white text-xs">حرفه :</span>
          <span class="text-gray-500 dark:text-gray-300 text-xs font-light ">${data.known_for_department }</span>
        </div>
        <a href="" data-id="${data.imdb_id}" class="${data.imdb_id ? '' : 'hidden'} bg-orange-400 text-white text-xs rounded-3xl p-2 mt-2 mb-4">مشاهده پروفایل در IMDb</a>
       </div>
    `
}  
else{
    document.querySelector('#card').innerHTML=`<p class="text-black dark:text-white px-3 py-5 text-sm">اطلاعات بیشتری  از این شخص وجود ندارد</p>
`
}
}

async function getCredits() {
    document.querySelector('#items').innerHTML=''
    let credits= await fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}`)
    let list = await credits.json()
    let all= list.cast.concat(list.crew)
    totalCredits = all.length
    if(totalCredits<=12) document.querySelector('#pagination').style.display= 'none'
    if(totalCredits >= 9) document.querySelector('#items').classList.add('min-h-[906px]' , 'sm:min-h-[1450px]' , 'md:min-h-[830px]' , 'lg:min-h-[724px]' , 'xl:min-h-[775px]' , '2xl:min-h-[546px]')
    document.querySelector('#credits-count').textContent= totalCredits + '   عدد'
    console.log((page*itemInPage-itemInPage) , (page*itemInPage))
    
    all.slice((page*itemInPage-itemInPage) , (page*itemInPage)).forEach(elem => {
        
        
        let date=elem.media_type=='movie' ? elem.release_date : elem.first_air_date
        let department;
        if(!elem.department) department='بازیگر';
        else{
            if(elem.department="Directing") department='کارگردان';
            if(elem.department="Production") department='تیه کننده';
            if(elem.department="Writing") department='نویسنده';
            if(elem.department="Sound") department='صدا بردار';
            if(elem.department="Crew") department='خدمه';
            if(elem.department="Creator") department='تولید کننده';
        }
        if(elem.poster_path) {
      document.querySelector('#items').innerHTML+=
       `
    <a href="${elem.media_type=='tv'? 'series' : 'movie'}.html?id=${elem.id}" class=" w-auto rounded-2xl overflow-hidden transition-all duration-600 group">
            <div class="relative h-full">
          <div class="w-full h-full relative rounded-lg overflow-hidden">
            <img loading="lazy" class="object-cover w-full h-full" src="https://image.tmdb.org/t/p/original/${elem.poster_path}_medium" alt=""  onerror="this.onerror=null; this.src='images/default_poster.jpg';">
            <div class="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent from-50% to-black/50 to-90% transition-all duration-600 group-hover:opacity-0">
            <p dir="ltr" class="p-5  px-3 text-sm absolute bottom-0 left-0  font-extrabold text-white">${elem.original_title ? elem.original_title : elem.name}</p>
            </div>
          </div>
          <div class="absolute w-full h-full top-0 left-0 rounded-lg bg-black/60 px-3 py-3.5 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:scale-90 transition-all duration-600">
            <span class="absolute top-0 left-0 p-3 text-amber-400 flex gap-1.5 items-start ">${elem.media_type}</span>
            <span class="absolute top-0 right-0 p-3 text-amber-400 flex gap-1.5 items-start ">${date? date.slice(0 , 4) : '...'}</span>
            <span class="absolute top-1/2 left-1/2 -translate-1/2">
              <svg  width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 12L3 18.9671C3 21.2763 5.53435 22.736 7.59662 21.6145L10.7996 19.8727M3 8L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L14.0026 18.131" stroke="#cfcfcf" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            </span>
            <div class=" absolute w-full p-3 bottom-0 left-0 flex justify-between items-center">
              <div class="flex items-start">
                <span class="text-amber-400">${elem.character? elem.character : department}</span>
                
              </div>
              <div class="flex items-center gap-1">
                <span class="text-base lg:text-xl text-amber-400 font-bold">${elem.vote_average.toFixed(1)}</span>
              </div>
              
              <!-- <span class="text-base text-amber-400 font-bold">6.8</span></span>
              <span class=" flex items-center gap-0.5 text-gray-300"><span class="text-xs">10/</span></span> -->
            </div>
           </div>
            </div>
          </a>
       `
     }
});   
paginationControl()
}

    let prev= document.querySelector('#prev')
    let one= document.querySelector('#one')
    let count= document.querySelector('#count')
    let end= document.querySelector('#end')
    let next= document.querySelector('#next')

    prev.addEventListener('click', ()=>{
        page--
        getCredits()
    })
    next.addEventListener('click', ()=>{
        page++
        getCredits()
    })
    one.addEventListener('click' , ()=>{
        page=Number(one.textContent)
        getCredits()
    })
    count.addEventListener('click' , ()=>{
        page=Number(count.textContent)
        getCredits()
    })
    end.addEventListener('click' , ()=>{
        page=Number(end.textContent)
        getCredits()
    })
    function paginationControl(){
        totalPage= Math.ceil(totalCredits/itemInPage)
        end.textContent= totalPage
    if(page==1){
      prev.disabled= true
      next.disabled= false
      one.style.backgroundColor='#ff8904'
      one.style.color='#fff'
      end.style.backgroundColor=''
      end.style.color=''
      count.style.backgroundColor=''
      count.style.color=''
      count.textContent= Math.ceil(totalPage/2)
    }

    if(page!==1 && page !== totalPage ){
        prev.disabled= false
        next.disabled= false
        one.style.backgroundColor=''
        one.style.color=''
        end.style.backgroundColor=''
        end.style.color=''
        count.textContent=page
        count.style.backgroundColor='#ff8904'
        count.style.color='#fff'
    }
    if(page == totalPage){
        next.disabled= true
        prev.disabled= false

        end.style.backgroundColor='#ff8904'
        end.style.color='#fff'
        one.style.backgroundColor=''
        one.style.color=''
        count.style.backgroundColor=''
        count.style.color=''
        count.textContent= Math.ceil(totalPage/2)
    }
}


