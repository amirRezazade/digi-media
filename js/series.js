import { apiKey ,genres, menu , manageMenu,moreFiltersToggle ,toggleMenu  ,switchTheme, getGenres , navControl} from './funcs.js'
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

window.addEventListener('DOMContentLoaded' , ()=>{
  getRecommendationsMovie();
})

 fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${apiKey}&query&&language=fa&append_to_response=credits,videos`)
 .then(response=> response.json()).then(list=> {    
  if(list.status_code ==34){
    document.querySelector('header').innerHTML=`<div class="flex justify-center items-center h-[70vh] bg-[100%,auto] bg-bottom text-white bg-no-repeat" style="background-image: url('');">
        <h1>اطلاعات بیشتری از این سریال وجود ندارد</h1>
      </div>`
    } 
  else{
    let statusText= list.status==='Ended'? 'پایان یافته': 'در حال پخش'
    document.querySelector('header').innerHTML=
       `
    <div  class=" bg-no-repeat bg-cover bg-center xl:bg-size-[80%_100%] xl:bg-top-left" style="background-image:url('https://image.tmdb.org/t/p/original${list.backdrop_path}_medium') , url('images/default-bg.png');" >
          <div class="px-4 py-6 md:py-10 lg:px-13 bg-gradient-to-r from-gray-950/10 to-gray-950 to-80%">
  
            <div class="flex items-center gap-1 text-[11px] text-gray-300">
          <span><svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></span>
         <a href="index.html" class="transition-all duration-300 cursor-pointer hover:text-orange-400">خانه</a>
         <svg width="12px" height="12px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#ffffff"></path> </g></svg>
         <a href="#" class="transition-all duration-300 cursor-pointer hover:text-orange-400">سریال ها</a>
         <svg width="12px" height="12px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#ffffff"></path> </g></svg>
         <span class="transition-all duration-300 cursor-pointer hover:text-orange-400">${list.original_name}</span>
      
              </div>
              <div class="flex gap-6 sm:gap-6 items-center lg:items-stretch sm:items-start justify-between my-5 xl:my-8 lg:gap-8">
                <div class="flex flex-col items-center grow  gap-9 max-w-32 sm:max-w-37 md:max-w-45 lg:max-w-59 ">
                  <div class="flex items-center gap-1">
                  <span class="text-xs text-gray-400 ">10/</span>  
                  <span class=" text-white font-extrabold lg:text-xl xl:text-3xl ">${list.vote_average.toFixed(1)}</span>
                  <span class="text-black tracking-tighter font-extrabold text-xs  px-1.5 py-0.5 rounded-md bg-amber-300  mr-2 relative  before:content[''] before:absolute before:w-1.5 before:h-1.5 before:top-1/2 before:left-1/1 before:bg-amber-300 before:z-0 before:rotate-45 before:-translate-1/2 ">IMDB</span>
                  </div>
                  <div class="relative group z-1">
                    <div class="absolute w-full -z-1 h-full top-0 left-0 rounded-lg contrast-85 scale-x-80 -translate-y-4 group-hover:translate-y-0 group-hover:opacity-0  transition-all duration-300" style="background-image: url('https://image.tmdb.org/t/p/original${list.poster_path}_low');" loading="lazy"></div>
                    <div class="absolute w-full -z-1 h-full top-0 left-0 rounded-lg contrast-90 scale-x-90 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-0  transition-all duration-300" style="background-image: url('https://image.tmdb.org/t/p/original${list.poster_path}_low');" loading="lazy"></div>
                    <img class=" w-full h-full object-cover z-50 rounded-lg contrast-110" src="https://image.tmdb.org/t/p/original${list.poster_path}_medium" alt="${list.original_title}" loading="lazy" onerror="this.onerror=null; this.src='images/default_poster.jpg';">
                    <a href="#" class="absolute top-1/1 left-1/2 -translate-1/2 flex justify-center items-center border border-orange-400 hover:bg-transparent transition-all duration-300 w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-orange-400">
                      <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z" fill="#ffffff"></path> </g></svg>
                    </a>
                  </div>
                  <div class="flex items-center w-full justify-center  gap-2 sm:hidden">
                    <span class="bg-gray-500/70 text-xs rounded-lg px-1.5 py-2 flex items-end gap-1 text-orange-400">
                      <svg version="1.1" id="designs" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 32 32" xml:space="preserve" fill="#ff8904"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .sketchy_een{fill:#ff8904;} </style> <path class="sketchy_een" d="M28.869,20.55c-0.11-0.138-0.231-0.271-0.36-0.395c0.171-0.153,0.296-0.362,0.421-0.551 c0.181-0.277,0.334-0.552,0.445-0.867c0.248-0.706-0.118-1.461-0.577-1.988c-0.067-0.077-0.142-0.149-0.22-0.216 c0.082-0.099,0.161-0.203,0.239-0.303c0.204-0.262,0.428-0.535,0.487-0.873c0.061-0.344,0.021-0.674-0.067-1.01 c-0.176-0.672-0.76-1.192-1.329-1.541c-0.187-0.115-0.384-0.2-0.588-0.279c-0.172-0.065-0.374-0.08-0.554-0.103 c-0.311-0.038-0.628-0.032-0.941-0.038c-0.081-0.001-0.162-0.002-0.243-0.002c-0.85,0-1.696,0.068-2.545,0.105 c-0.832,0.034-1.667,0.04-2.5,0.04c-0.002-0.39-0.001-0.78-0.016-1.17c-0.018-0.492-0.029-0.981,0.019-1.473 c0.033-0.191,0.076-0.38,0.109-0.57c0.057-0.336,0.122-0.668,0.166-1.008c0.082-0.615,0.153-1.243,0.074-1.862 c-0.046-0.372-0.105-0.741-0.187-1.105c-0.082-0.357-0.187-0.733-0.384-1.045c-0.113-0.18-0.254-0.342-0.384-0.508 c-0.109-0.137-0.223-0.273-0.349-0.395c-0.208-0.206-0.451-0.382-0.682-0.563c-0.208-0.162-0.416-0.327-0.64-0.468 c-0.242-0.153-0.504-0.26-0.781-0.336C17.415,2.009,17.346,2,17.278,2c-0.348,0-0.675,0.233-0.771,0.581 c-0.02,0.074-0.016,0.149-0.015,0.223c-0.012,0.018-0.033,0.026-0.045,0.045c-0.067,0.116-0.101,0.242-0.101,0.376 c-0.04,0.291-0.068,0.582-0.103,0.872c-0.12,0.864-0.299,1.722-0.464,2.58c-0.133,0.701-0.233,1.41-0.488,2.077 c-0.141,0.316-0.299,0.626-0.452,0.936c-0.197,0.395-0.435,0.771-0.655,1.153c-0.43,0.747-0.871,1.487-1.385,2.178 c-0.195,0.243-0.397,0.478-0.612,0.706c-0.203,0.217-0.421,0.409-0.651,0.594c-0.124,0.094-0.249,0.185-0.384,0.263 c-0.093,0.053-0.189,0.097-0.284,0.143c0-0.049,0.003-0.097,0.003-0.145c-0.004-0.422-0.349-0.773-0.775-0.773 c-0.059,0-0.114,0.022-0.17,0.035c-0.039-0.009-0.076-0.029-0.114-0.029c-0.014,0-0.029,0.001-0.043,0.002 c-0.995,0.099-2.001,0.115-3.002,0.138c-0.506,0.011-1.012,0.025-1.52,0.019c-0.514-0.004-1.033-0.065-1.545-0.015 c-0.047,0.005-0.086,0.019-0.13,0.028c-0.077-0.026-0.156-0.05-0.244-0.05c-0.407,0-0.81,0.357-0.783,0.783 c0.023,0.359,0.05,0.712,0.053,1.071c0.004,0.374,0.004,0.749,0.006,1.121c0.002,0.739-0.017,1.478-0.008,2.217 c0.021,1.459,0.031,2.916,0.031,4.373c0,0.712-0.019,1.421-0.032,2.131c-0.011,0.624-0.004,1.247-0.017,1.869 c-0.004,0.2,0.084,0.38,0.221,0.511c0.138,0.173,0.337,0.294,0.566,0.277c1.085-0.08,2.173-0.156,3.261-0.147 c0.313,0.004,0.628,0.002,0.943,0.002c0.223-0.002,0.449-0.002,0.674-0.002c0.51,0,1.031-0.015,1.537,0.042 c0.185,0.021,0.399-0.092,0.525-0.218c0.069-0.069,0.123-0.153,0.16-0.243c0.339-0.067,0.623-0.36,0.612-0.719 c-0.002-0.06-0.009-0.12-0.013-0.179c0.025,0.018,0.051,0.035,0.075,0.053c0.615,0.499,1.205,1.034,1.865,1.474 c0.315,0.21,0.628,0.433,0.964,0.609c0.382,0.2,0.783,0.37,1.193,0.502c0.749,0.244,1.533,0.324,2.316,0.384 c0.376,0.029,0.754,0.053,1.13,0.092c0.361,0.034,0.72,0.059,1.083,0.061c1.543,0.004,3.082-0.092,4.623-0.128 c0.46-0.011,0.918-0.034,1.373-0.103c0.353-0.053,0.714-0.109,1.058-0.202c0.145-0.04,0.292-0.088,0.432-0.145 c0.12-0.05,0.246-0.094,0.359-0.162c0.109-0.065,0.208-0.147,0.309-0.227c0.225-0.176,0.445-0.353,0.632-0.573 c0.191-0.225,0.304-0.485,0.441-0.743c0.097-0.185,0.187-0.38,0.231-0.584c0.101-0.466,0.076-0.939-0.055-1.396 c-0.074-0.25-0.164-0.495-0.273-0.731c-0.084-0.183-0.233-0.338-0.369-0.485c-0.068-0.073-0.137-0.145-0.206-0.218 c0.03-0.024,0.06-0.048,0.09-0.072c0.197-0.156,0.34-0.334,0.491-0.537c0.162-0.218,0.292-0.452,0.382-0.71 c0.075-0.214,0.105-0.447,0.147-0.668c0.055-0.306,0.055-0.544-0.002-0.85C29.288,21.115,29.087,20.819,28.869,20.55z M8.733,26.719 c-0.164,0-0.327-0.002-0.489-0.002c-0.538,0.004-1.079,0.002-1.617,0.013c-0.544,0.013-1.09,0.042-1.635,0.055 c-0.244,0.008-0.489,0.004-0.733,0C4.173,26.785,4.087,26.789,4,26.788c-0.007-1.095,0.007-2.191,0.007-3.287 c0.002-1.457,0.025-2.916,0.053-4.373c0.015-0.739,0.036-1.478,0.044-2.217c0.004-0.372,0.002-0.747,0.002-1.121 c0.001-0.125-0.001-0.249,0.002-0.374c0.374-0.027,0.748-0.042,1.124-0.053c0.506-0.015,1.012-0.032,1.52-0.048 c0.496-0.013,0.995-0.011,1.491-0.013c0.369,0,0.738-0.006,1.108-0.011c0.022,0.516,0.047,1.032,0.056,1.549 c0.013,0.722,0.029,1.445,0.04,2.167c0.01,0.747,0.032,1.491,0.055,2.236c0.021,0.737,0.032,1.472,0.04,2.209 c0.008,0.628-0.013,1.256,0.01,1.885c0.013,0.304,0.031,0.607,0.036,0.909c0.002,0.154,0,0.306-0.002,0.459 C9.303,26.718,9.018,26.723,8.733,26.719z M27.847,24.618c0.003-0.002,0.005-0.004,0.008-0.006c0.005-0.004,0.01-0.008,0.016-0.012 C27.863,24.606,27.855,24.612,27.847,24.618z M27.918,18.272c-0.01,0.04-0.021,0.079-0.035,0.118 c-0.102,0.212-0.227,0.42-0.362,0.612c-0.028,0.032-0.056,0.063-0.086,0.092c-0.171,0.107-0.359,0.187-0.533,0.29 c-0.258,0.155-0.439,0.409-0.439,0.718c0,0.336,0.218,0.58,0.495,0.741c0.123,0.071,0.25,0.137,0.371,0.215 c0.136,0.119,0.261,0.25,0.377,0.389c0.05,0.074,0.094,0.15,0.134,0.23c0.014,0.045,0.026,0.09,0.036,0.136 c0.001,0.043,0,0.085-0.002,0.129c-0.031,0.203-0.066,0.41-0.13,0.603c-0.057,0.108-0.121,0.211-0.191,0.31 c-0.096,0.115-0.204,0.217-0.32,0.312c-0.121,0.089-0.246,0.172-0.37,0.254c-0.218,0.145-0.378,0.302-0.462,0.556 c-0.107,0.317,0.034,0.626,0.244,0.857c0.232,0.256,0.473,0.504,0.69,0.772c0.043,0.06,0.081,0.122,0.116,0.187 c0.067,0.183,0.125,0.367,0.161,0.558c0.009,0.105,0.01,0.211,0.004,0.316c-0.012,0.062-0.027,0.124-0.046,0.184 c-0.037,0.074-0.076,0.148-0.112,0.223c-0.053,0.109-0.103,0.218-0.166,0.32c-0.13,0.141-0.269,0.268-0.417,0.389 c-0.081,0.058-0.165,0.111-0.255,0.156c-0.391,0.142-0.799,0.228-1.211,0.292c-0.755,0.078-1.519,0.052-2.276,0.08 c-0.741,0.025-1.482,0.031-2.223,0.044c-0.768,0.013-1.531,0.048-2.299,0.004c-0.694-0.04-1.391-0.055-2.084-0.138 c-0.519-0.087-1.017-0.228-1.505-0.421c-0.457-0.218-0.881-0.489-1.3-0.772c-0.417-0.281-0.823-0.578-1.225-0.881 c-0.222-0.173-0.442-0.346-0.669-0.509c-0.185-0.131-0.382-0.242-0.568-0.371c-0.007-0.006-0.013-0.012-0.02-0.019 c-0.082-0.073-0.176-0.122-0.274-0.156c0-0.012-0.001-0.024-0.002-0.036c-0.021-0.728-0.032-1.457-0.046-2.186 c-0.015-0.739-0.04-1.478-0.052-2.217c-0.013-0.754-0.015-1.506-0.015-2.261c0.002-0.611-0.002-1.222-0.004-1.833 c0-0.09,0.001-0.18,0.001-0.27c0.003-0.002,0.005-0.004,0.008-0.005c0.261-0.18,0.574-0.294,0.859-0.43 c0.378-0.183,0.728-0.456,1.044-0.726c0.275-0.233,0.519-0.497,0.76-0.762c0.267-0.292,0.516-0.603,0.747-0.924 c0.428-0.598,0.781-1.243,1.157-1.871c0.183-0.304,0.374-0.602,0.55-0.909c0.176-0.302,0.332-0.615,0.485-0.93 c0.176-0.355,0.321-0.726,0.433-1.105c0.052-0.174,0.103-0.349,0.128-0.531c0.023-0.17,0.044-0.341,0.065-0.512 c0.175-1.246,0.443-2.477,0.651-3.719c0.153,0.105,0.303,0.217,0.451,0.332c0.111,0.088,0.221,0.178,0.321,0.278 c0.148,0.146,0.285,0.304,0.416,0.467c0.055,0.077,0.105,0.155,0.15,0.237c0.166,0.458,0.26,0.935,0.332,1.416 c0.063,0.585,0.007,1.178-0.066,1.761c-0.053,0.37-0.111,0.743-0.185,1.11c-0.082,0.397-0.09,0.802-0.105,1.205 c-0.029,0.831,0.071,1.659,0.023,2.49c-0.016,0.256,0.14,0.475,0.349,0.607c0.137,0.154,0.33,0.257,0.548,0.256 c0.609-0.004,1.216-0.052,1.825-0.08c0.563-0.029,1.127-0.036,1.69-0.055c0.548-0.019,1.094-0.027,1.642-0.031 c0.474-0.002,0.944,0.008,1.413,0.064c0.142,0.025,0.276,0.061,0.411,0.109c0.139,0.072,0.273,0.153,0.401,0.245 c0.093,0.079,0.182,0.164,0.264,0.255c0.04,0.062,0.077,0.126,0.112,0.192c0.019,0.06,0.034,0.121,0.047,0.183 c0.002,0.031,0.004,0.061,0.004,0.092c-0.06,0.106-0.131,0.205-0.205,0.302c-0.092,0.118-0.188,0.231-0.298,0.331 c-0.104,0.069-0.215,0.125-0.329,0.182c-0.34,0.166-0.559,0.596-0.435,0.964c0.074,0.22,0.214,0.409,0.428,0.506 c0.057,0.025,0.114,0.049,0.172,0.072c0.104,0.05,0.201,0.11,0.295,0.175c0.124,0.106,0.238,0.222,0.344,0.345 c0.049,0.074,0.094,0.149,0.133,0.228c0.013,0.039,0.025,0.077,0.035,0.117C27.919,18.236,27.918,18.254,27.918,18.272z M27.523,22.892c-0.004,0.005-0.007,0.01-0.011,0.015c-0.011,0.015-0.023,0.03-0.034,0.045 C27.492,22.932,27.507,22.912,27.523,22.892z"></path> </g></svg>
                      <span>100%</span>
                    </span>
                    <span class="bg-gray-500/70 w-1/2 text-xs rounded-lg overflow-hidden divide-x-1 divide-gray-300/50 flex items-end gap-1 text-orange-400 ">
                      <a href="#" class=" py-2 w-1/2 group">
                        <svg class="cursor-pointer mx-auto fill-gray-300 group-hover:fill-orange-400 transition-all duration-300" fill="#" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.2 490.2" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width=""></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M490.1,234.464c0-37.6-30.6-68.3-68.3-68.3H316.2v-76.1c0-32.2-9.4-55.4-28-69c-29.4-21.6-69.8-9.3-71.5-8.7 c-5.1,1.6-8.6,6.3-8.6,11.7v85.5c0,67.3-78.1,90.2-81.4,91.2c-1,0.3-1.9,0.6-2.7,1.1c-5.8-11.6-17.8-19.6-31.6-19.6H35.2 c-19.4,0-35.2,15.8-35.2,35.2v207.9c0,19.4,15.8,35.2,35.2,35.2h33.1c6.8,0,12.3-5.5,12.3-12.3s-5.6-12.2-12.3-12.2H35.2 c-5.9,0-10.7-4.8-10.7-10.7v-207.9c0-5.9,4.8-10.7,10.7-10.7h57.3c5.9,0,10.7,4.8,10.7,10.7v196.1c0,37.6,30.6,68.3,68.3,68.3 h209.2c46.4,0,75.9-24.3,81.1-66.3l28.2-177c0.1-0.6,0.2-1.3,0.2-1.9v-2.2H490.1z M465.6,235.564l-28.1,176.5 c-3.7,30-22.8,45.3-56.8,45.3h-7.8H171.5c-24.1,0-43.8-19.6-43.8-43.8v-189.1c1.8,0.4,3.7,0.3,5.6-0.2 c4.1-1.1,99.3-28.7,99.3-114.8v-75.6c10.4-1.6,28.2-2.5,41.1,6.9c11.9,8.8,18,25.3,18,49.3v88.4c0,6.8,5.5,12.3,12.3,12.3h117.9 c24.1,0,43.8,19.6,43.8,43.8v1H465.6z"></path> </g> </g></svg>
                      </a>
                      <a href="#" class="py-2 w-1/2 group ">
                        <svg class=" cursor-pointer mx-auto fill-gray-300 group-hover:fill-orange-400 transition-all duration-300"fill="#" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.3 490.3" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M202,469.2c13.6,10,29.5,12.7,42.9,12.7c15.6,0,27.7-3.7,28.6-4c5.1-1.6,8.6-6.3,8.6-11.7v-85.5 c0-67.3,78.1-90.2,81.4-91.2c1-0.3,1.9-0.6,2.7-1.1C372,300,384,308,397.8,308h57.3c19.4,0,35.2-15.8,35.2-35.2V65 c0-19.4-15.8-35.2-35.2-35.2H422c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.1,12.2,12.1H455c5.9,0,10.7,4.8,10.7,10.7v207.9 c0,5.9-4.8,10.7-10.7,10.7h-57.3c-5.9,0-10.7-4.8-10.7-10.7V76.7c0-37.6-30.6-68.3-68.3-68.3H109.5c-46.4,0-75.9,24.3-81.1,66.3 l-28.2,177C0.1,252.3,0,253,0,253.6v2.1C0,293.3,30.6,324,68.3,324h105.6v76.2C174,432.4,183.4,455.6,202,469.2z M68.4,299.6 c-24.1,0-43.8-19.6-43.8-43.8v-1.1L52.7,78.2c3.7-30,22.8-45.3,56.8-45.3h209.2c24.1,0,43.8,19.6,43.8,43.8v189.1 c-1.8-0.4-3.7-0.3-5.6,0.2c-4.1,1.1-99.3,28.7-99.3,114.8v75.6c-10.4,1.7-28.2,2.5-41.1-6.9c-11.9-8.8-18-25.3-18-49.3v-88.4 c0-6.8-5.5-12.3-12.3-12.3H68.4V299.6z"></path> </g> </g></svg>
                      </a>
                    </span>
                  </div>
                </div>
                <div class="flex flex-col  gap-6 sm:gap-4 grow w-7/10 sm:mt-8  md:gap-2 ">
                  <div class="flex items-start justify-between  ">
                    <p class="text-white relative font-extrabold px-2 before:content[''] before:absolute before:w-1.5 before:h-4 before:left-1/1 before:top-1/2 before:-translate-y-1/2 before:bg-orange-400 before:rounded-full  lg:text-xl xl:text-2xl">${ list.original_name}</p>
                   <div class="hidden sm:flex flex-col items-center ">
                    <div class="flex items-center w-full text-xs divide-x-1 divide-gray-500 xl:text-sm">
                      <span class="flex items-center px-2 group gap-1 cursor-pointer text-white  hover:text-orange-400 transition-all duration-300">
                        <svg class=" fill-white group-hover:rotate-[360deg] group-hover:fill-orange-400 transition-all duration-300" fill="#" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.2 490.2" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width=""></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M490.1,234.464c0-37.6-30.6-68.3-68.3-68.3H316.2v-76.1c0-32.2-9.4-55.4-28-69c-29.4-21.6-69.8-9.3-71.5-8.7 c-5.1,1.6-8.6,6.3-8.6,11.7v85.5c0,67.3-78.1,90.2-81.4,91.2c-1,0.3-1.9,0.6-2.7,1.1c-5.8-11.6-17.8-19.6-31.6-19.6H35.2 c-19.4,0-35.2,15.8-35.2,35.2v207.9c0,19.4,15.8,35.2,35.2,35.2h33.1c6.8,0,12.3-5.5,12.3-12.3s-5.6-12.2-12.3-12.2H35.2 c-5.9,0-10.7-4.8-10.7-10.7v-207.9c0-5.9,4.8-10.7,10.7-10.7h57.3c5.9,0,10.7,4.8,10.7,10.7v196.1c0,37.6,30.6,68.3,68.3,68.3 h209.2c46.4,0,75.9-24.3,81.1-66.3l28.2-177c0.1-0.6,0.2-1.3,0.2-1.9v-2.2H490.1z M465.6,235.564l-28.1,176.5 c-3.7,30-22.8,45.3-56.8,45.3h-7.8H171.5c-24.1,0-43.8-19.6-43.8-43.8v-189.1c1.8,0.4,3.7,0.3,5.6-0.2 c4.1-1.1,99.3-28.7,99.3-114.8v-75.6c10.4-1.6,28.2-2.5,41.1,6.9c11.9,8.8,18,25.3,18,49.3v88.4c0,6.8,5.5,12.3,12.3,12.3h117.9 c24.1,0,43.8,19.6,43.8,43.8v1H465.6z"></path> </g> </g></svg>
                        پسندیدن
                      </span>
                      <span class="flex items-start px-2 group gap-1 cursor-pointer text-white  hover:text-orange-400 transition-all duration-300">
                        نپسندیدن
                        <svg class=" fill-white group-hover:rotate-[360deg] group-hover:fill-orange-400 transition-all duration-300" fill="#" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.3 490.3" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M202,469.2c13.6,10,29.5,12.7,42.9,12.7c15.6,0,27.7-3.7,28.6-4c5.1-1.6,8.6-6.3,8.6-11.7v-85.5 c0-67.3,78.1-90.2,81.4-91.2c1-0.3,1.9-0.6,2.7-1.1C372,300,384,308,397.8,308h57.3c19.4,0,35.2-15.8,35.2-35.2V65 c0-19.4-15.8-35.2-35.2-35.2H422c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.1,12.2,12.1H455c5.9,0,10.7,4.8,10.7,10.7v207.9 c0,5.9-4.8,10.7-10.7,10.7h-57.3c-5.9,0-10.7-4.8-10.7-10.7V76.7c0-37.6-30.6-68.3-68.3-68.3H109.5c-46.4,0-75.9,24.3-81.1,66.3 l-28.2,177C0.1,252.3,0,253,0,253.6v2.1C0,293.3,30.6,324,68.3,324h105.6v76.2C174,432.4,183.4,455.6,202,469.2z M68.4,299.6 c-24.1,0-43.8-19.6-43.8-43.8v-1.1L52.7,78.2c3.7-30,22.8-45.3,56.8-45.3h209.2c24.1,0,43.8,19.6,43.8,43.8v189.1 c-1.8-0.4-3.7-0.3-5.6,0.2c-4.1,1.1-99.3,28.7-99.3,114.8v75.6c-10.4,1.7-28.2,2.5-41.1-6.9c-11.9-8.8-18-25.3-18-49.3v-88.4 c0-6.8-5.5-12.3-12.3-12.3H68.4V299.6z"></path> </g> </g></svg>
                      </span>
                    </div>
                    <span class="text-orange-300 text-xs mt-1 xl:text-sm">
                          100%
                          (1رای)
                    </span>
                   </div>
                  </div>
                  <div class="flex flex-col  justify-between gap-4 grow sm:gap-8 md:flex-row  ">
                   <div class="flex flex-col gap-6 sm:gap-5 md:w-6/10 xl:w-6/10 md:gap-8 md:py-5 ">
                    <div id="genres" class="flex flex-wrap items-center gap-2 md:gap-3.5 text-gray-300 text-[11px] lg:text-sm">
                   
                    </div>
                    <p class="text-sm text-white font-extrabold leading-5 lg:text-base xl:text-base  ${list.tagline ? '' : 'hidden'}">${list.tagline}</p>
                    <p class="hidden text-xs text-gray-300 leading-5 lg:text-sm xl:text-base lg:leading-8 sm:${list.overview ? 'inline' : 'hidden'}">${ list.overview }</p>
                    <div class="flex items-center gap-5">
                      <div class="flex items-center gap-2 text-sm text-gray-300">
                        <span class="w-5 h-5 flex items-center justify-center font-bold bg-black border-2 -rotate-30 border-amber-300 rounded-full text-white">m</span>
                        <span class="hidden sm:inline">امتیاز منتقدین</span>
                        <span>87</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm text-gray-300">
                        <svg width="22px" height="22px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#ffc107"> <path d="M36.46 36.81l-14.14-9.06a2.213 2.213 0 0 1-.41-3.45l5.31-5.31c1.02-1.02 2.74-.8 3.47.45l8.84 14.37c1.16 1.98-1.11 4.2-3.07 3z"> </path> <path d="M24.1 80.39l-16.42.33a2.21 2.21 0 0 0-2.09 2.77l1.91 7.26c.37 1.4 1.96 2.07 3.22 1.37l14.51-7.59c2-1.13 1.17-4.19-1.13-4.14z"> </path> <path d="M62.24 108.28l-3.6 15.99c-.33 1.39.72 2.73 2.15 2.73h7.51c1.45 0 2.5-1.37 2.14-2.77l-3.91-15.99c-.58-2.23-3.75-2.2-4.29.04z"> </path> <path d="M91.54 36.81l14.14-9.06c1.22-.75 1.42-2.44.41-3.45l-5.31-5.31a2.212 2.212 0 0 0-3.47.45l-8.84 14.37c-1.16 1.98 1.11 4.2 3.07 3z"> </path> <path d="M103.9 80.39l16.42.33a2.21 2.21 0 0 1 2.09 2.77l-1.91 7.26a2.217 2.217 0 0 1-3.22 1.37l-14.51-7.59c-2-1.13-1.17-4.19 1.13-4.14z"> </path> </g> <path d="M68.05 7.23l13.46 30.7a7.047 7.047 0 0 0 5.82 4.19l32.79 2.94c3.71.54 5.19 5.09 2.5 7.71l-24.7 20.75c-2 1.68-2.91 4.32-2.36 6.87l7.18 33.61c.63 3.69-3.24 6.51-6.56 4.76L67.56 102a7.033 7.033 0 0 0-7.12 0l-28.62 16.75c-3.31 1.74-7.19-1.07-6.56-4.76l7.18-33.61c.54-2.55-.36-5.19-2.36-6.87L5.37 52.78c-2.68-2.61-1.2-7.17 2.5-7.71l32.79-2.94a7.047 7.047 0 0 0 5.82-4.19l13.46-30.7c1.67-3.36 6.45-3.36 8.11-.01z" fill="#fdd835"> </path> <path d="M67.07 39.77l-2.28-22.62c-.09-1.26-.35-3.42 1.67-3.42c1.6 0 2.47 3.33 2.47 3.33l6.84 18.16c2.58 6.91 1.52 9.28-.97 10.68c-2.86 1.6-7.08.35-7.73-6.13z" fill="#ffff8d"> </path> <path d="M95.28 71.51L114.9 56.2c.97-.81 2.72-2.1 1.32-3.57c-1.11-1.16-4.11.51-4.11.51l-17.17 6.71c-5.12 1.77-8.52 4.39-8.82 7.69c-.39 4.4 3.56 7.79 9.16 3.97z" fill="#f4b400"> </path> </g></svg>
                        <span class="hidden sm:inline">رای کاربران IMDb</span>
                        <span>${list.vote_count}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 text-xs text-white sm:w-1/2 md:w-auto ">
                      <a href="#" class=" bg-orange-400 rounded-xl py-2 lg:py-3 md:px-5  grow md:grow-0  flex items-center justify-center gap-1">
                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#ffffff"></path> </g></svg>
                        پخش آنلاین
                      </a>
                      <a href="#" class=" bg-gray-800 rounded-xl py-2 lg:py-3 md:px-5  grow md:grow-0 flex items-center justify-center gap-1">
                         <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.7258 7.34056C12.1397 7.32632 12.4638 6.97919 12.4495 6.56522C12.4353 6.15125 12.0882 5.8272 11.6742 5.84144L11.7258 7.34056ZM7.15843 11.562L6.40879 11.585C6.40906 11.5938 6.40948 11.6026 6.41006 11.6114L7.15843 11.562ZM5.87826 14.979L6.36787 15.5471C6.38128 15.5356 6.39428 15.5236 6.40684 15.5111L5.87826 14.979ZM5.43951 15.342L5.88007 15.949C5.89245 15.94 5.90455 15.9306 5.91636 15.9209L5.43951 15.342ZM9.74998 17.75C10.1642 17.75 10.5 17.4142 10.5 17C10.5 16.5858 10.1642 16.25 9.74998 16.25V17.75ZM11.7258 5.84144C11.3118 5.8272 10.9647 6.15125 10.9504 6.56522C10.9362 6.97919 11.2602 7.32632 11.6742 7.34056L11.7258 5.84144ZM16.2415 11.562L16.9899 11.6113C16.9905 11.6025 16.9909 11.5938 16.9912 11.585L16.2415 11.562ZM17.5217 14.978L16.9931 15.5101C17.0057 15.5225 17.0187 15.5346 17.0321 15.5461L17.5217 14.978ZM17.9605 15.341L17.4836 15.9199C17.4952 15.9294 17.507 15.9386 17.5191 15.9474L17.9605 15.341ZM13.65 16.25C13.2358 16.25 12.9 16.5858 12.9 17C12.9 17.4142 13.2358 17.75 13.65 17.75V16.25ZM10.95 6.591C10.95 7.00521 11.2858 7.341 11.7 7.341C12.1142 7.341 12.45 7.00521 12.45 6.591H10.95ZM12.45 5C12.45 4.58579 12.1142 4.25 11.7 4.25C11.2858 4.25 10.95 4.58579 10.95 5H12.45ZM9.74998 16.25C9.33577 16.25 8.99998 16.5858 8.99998 17C8.99998 17.4142 9.33577 17.75 9.74998 17.75V16.25ZM13.65 17.75C14.0642 17.75 14.4 17.4142 14.4 17C14.4 16.5858 14.0642 16.25 13.65 16.25V17.75ZM10.5 17C10.5 16.5858 10.1642 16.25 9.74998 16.25C9.33577 16.25 8.99998 16.5858 8.99998 17H10.5ZM14.4 17C14.4 16.5858 14.0642 16.25 13.65 16.25C13.2358 16.25 12.9 16.5858 12.9 17H14.4ZM11.6742 5.84144C8.65236 5.94538 6.31509 8.53201 6.40879 11.585L7.90808 11.539C7.83863 9.27613 9.56498 7.41488 11.7258 7.34056L11.6742 5.84144ZM6.41006 11.6114C6.48029 12.6748 6.08967 13.7118 5.34968 14.4469L6.40684 15.5111C7.45921 14.4656 8.00521 13.0026 7.9068 11.5126L6.41006 11.6114ZM5.38865 14.4109C5.23196 14.5459 5.10026 14.6498 4.96265 14.7631L5.91636 15.9209C6.0264 15.8302 6.195 15.6961 6.36787 15.5471L5.38865 14.4109ZM4.99895 14.735C4.77969 14.8942 4.58045 15.1216 4.43193 15.3617C4.28525 15.5987 4.14491 15.9178 4.12693 16.2708C4.10726 16.6569 4.24026 17.0863 4.63537 17.3884C4.98885 17.6588 5.45464 17.75 5.94748 17.75V16.25C5.78415 16.25 5.67611 16.234 5.60983 16.2171C5.54411 16.2004 5.53242 16.1861 5.54658 16.1969C5.56492 16.211 5.59211 16.2408 5.61004 16.2837C5.62632 16.3228 5.62492 16.3484 5.62499 16.3472C5.62513 16.3443 5.62712 16.3233 5.6414 16.2839C5.65535 16.2454 5.67733 16.1997 5.70749 16.151C5.73748 16.1025 5.77159 16.0574 5.80538 16.0198C5.84013 15.981 5.86714 15.9583 5.88007 15.949L4.99895 14.735ZM5.94748 17.75H9.74998V16.25H5.94748V17.75ZM11.6742 7.34056C13.835 7.41488 15.5613 9.27613 15.4919 11.539L16.9912 11.585C17.0849 8.53201 14.7476 5.94538 11.7258 5.84144L11.6742 7.34056ZM15.4932 11.5127C15.3951 13.0024 15.9411 14.4649 16.9931 15.5101L18.0503 14.4459C17.3105 13.711 16.9199 12.6744 16.9899 11.6113L15.4932 11.5127ZM17.0321 15.5461C17.205 15.6951 17.3736 15.8292 17.4836 15.9199L18.4373 14.7621C18.2997 14.6488 18.168 14.5449 18.0113 14.4099L17.0321 15.5461ZM17.5191 15.9474C17.5325 15.9571 17.5599 15.9802 17.5949 16.0193C17.629 16.0573 17.6634 16.1026 17.6937 16.1514C17.7241 16.2004 17.7463 16.2463 17.7604 16.285C17.7748 16.3246 17.7769 16.3457 17.777 16.3485C17.7771 16.3497 17.7756 16.3238 17.792 16.2844C17.81 16.241 17.8375 16.211 17.856 16.1968C17.8702 16.1859 17.8585 16.2002 17.7925 16.217C17.7259 16.234 17.6174 16.25 17.4535 16.25V17.75C17.9468 17.75 18.4132 17.6589 18.7669 17.3885C19.1628 17.0859 19.2954 16.6557 19.2749 16.2693C19.2562 15.9161 19.1151 15.5972 18.9682 15.3604C18.8194 15.1206 18.6202 14.8936 18.4018 14.7346L17.5191 15.9474ZM17.4535 16.25H13.65V17.75H17.4535V16.25ZM12.45 6.591V5H10.95V6.591H12.45ZM9.74998 17.75H13.65V16.25H9.74998V17.75ZM8.99998 17C8.99998 18.5008 10.191 19.75 11.7 19.75V18.25C11.055 18.25 10.5 17.7084 10.5 17H8.99998ZM11.7 19.75C13.2089 19.75 14.4 18.5008 14.4 17H12.9C12.9 17.7084 12.3449 18.25 11.7 18.25V19.75Z" fill="#ffffff"></path> </g></svg>
                        اعلان سریال
                      </a>
                     </div>
                  </div>  
                   <div class="hidden sm:flex md:flex-wrap overflow-hidden rounded-lg divide-x md:divide-x-0 bg-gray-900/30 md:justify-between md:py-5 md:bg-transparent divide-black md:grid md:grid-cols-2 md:gap-3  md:w-4/10 xl:w-3/10">
                    <div class="flex flex-col md:flex-row md:flex-wrap py-3 gap-y-1 grow  md:justify-center  items-center md:rounded-xl bg-black/45  ">
                      <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
                        <svg width="15px" height="15px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffad49"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cc [#ffad49]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -4039.000000)" fill="#ffad49"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M100,3892 L100,3892 C100,3892.552 99.552,3893 99,3893 L97,3893 C95.895,3893 95,3892.105 95,3891 L95,3887 C95,3885.895 95.895,3885 97,3885 L99,3885 C99.552,3885 100,3885.448 100,3886 C100,3886.552 99.552,3887 99,3887 L98,3887 C97.448,3887 97,3887.448 97,3888 L97,3890 C97,3890.552 97.448,3891 98,3891 L99,3891 C99.552,3891 100,3891.448 100,3892 M93,3892 L93,3892 C93,3892.552 92.552,3893 92,3893 L90,3893 C88.895,3893 88,3892.105 88,3891 L88,3887 C88,3885.895 88.895,3885 90,3885 L92,3885 C92.552,3885 93,3885.448 93,3886 C93,3886.552 92.552,3887 92,3887 L91,3887 C90.448,3887 90,3887.448 90,3888 L90,3890 C90,3890.552 90.448,3891 91,3891 L92,3891 C92.552,3891 93,3891.448 93,3892 M101,3897 L87,3897 C86.448,3897 86,3896.552 86,3896 L86,3882 C86,3881.448 86.448,3881 87,3881 L101,3881 C101.552,3881 102,3881.448 102,3882 L102,3896 C102,3896.552 101.552,3897 101,3897 M84,3881 L84,3897 C84,3898.105 84.895,3899 86,3899 L102,3899 C103.105,3899 104,3898.105 104,3897 L104,3881 C104,3879.895 103.105,3879 102,3879 L86,3879 C84.895,3879 84,3879.895 84,3881" id="cc-[#ffad49]"> </path> </g> </g> </g> </g></svg>
                        <span class="text-white text-[10px] font-bold lg:font-normal lg:text-sm">زیرنویس:</span>
                      </div>
                      <span class="text-white opacity-75 text-[11px] lg:text-sm">ندارد</span>
                    </div>
                    <div class="flex flex-col md:flex-row md:flex-wrap py-3 gap-y-1 grow  md:justify-center  items-center md:rounded-xl bg-black/45  ">
                      <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
                        <svg width="17px" height="17px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 3C5 1.34315 6.34315 0 8 0C9.65685 0 11 1.34315 11 3V7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7V3Z" fill="#ffad49"></path> <path d="M9 13.9291V16H7V13.9291C3.60771 13.4439 1 10.5265 1 7V6H3V7C3 9.76142 5.23858 12 8 12C10.7614 12 13 9.76142 13 7V6H15V7C15 10.5265 12.3923 13.4439 9 13.9291Z" fill="#ffad49"></path> </g></svg>
                        <span class="text-white text-[10px] font-bold lg:font-normal lg:text-sm">دوبله:</span>
                      </div>
                      <span class="text-white opacity-75 text-[11px] lg:text-sm">ندارد</span>
                    </div>
                    <div class="flex flex-col md:flex-row md:flex-wrap py-3 gap-y-1 grow  md:justify-center  items-center md:rounded-xl bg-black/45  ">
                      <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
                        <svg width="20px" height="20px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd" stroke="#ffad49" stroke-linecap="round" stroke-linejoin="round" transform="translate(1 4)"> <path d="m13.5 12.5v-6c0-1.1045695-.8954305-2-2-2h-9c-1.1045695 0-2 .8954305-2 2v6c0 1.1045695.8954305 2 2 2h9c1.1045695 0 2-.8954305 2-2z"></path> <path d="m15.5 12.5v-6.99481259c0-1.65685425-1.3431458-3-3-3-.0017276 0-.0034553 0-.0051829 0l-8.9948171.01554432"></path> <path d="m17.5 10.5v-5.99308345c0-2.209139-1.790861-4-4-4-.0023035 0-.004607 0-.0069106 0l-7.9930894.01381519"></path> </g> </g></svg>
                        <span class="text-white text-[10px] font-bold lg:font-normal lg:text-sm">تعداد فصل :</span>
                      </div>
                      <span class="text-white opacity-75 text-[11px] lg:text-sm">${list.number_of_seasons}</span>
                    </div>
                    <div class="flex flex-col md:flex-row md:flex-wrap py-3 gap-y-1 grow  md:justify-center  items-center md:rounded-xl bg-black/45  ">
                      <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
                        <svg width="20px" height="20px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffad49"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.516 0c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.814-8.5-8.5-8.5zM1.041 9h2.937c0.044 1.024 0.211 2.031 0.513 3h-2.603c-0.481-0.906-0.776-1.923-0.847-3zM3.978 8h-2.937c0.071-1.077 0.366-2.094 0.847-3h2.6c-0.301 0.969-0.467 1.976-0.51 3zM5.547 5h5.896c0.33 0.965 0.522 1.972 0.569 3h-7.034c0.046-1.028 0.239-2.035 0.569-3zM4.978 9h7.035c-0.049 1.028-0.241 2.035-0.572 3h-5.891c-0.331-0.965-0.524-1.972-0.572-3zM13.013 9h2.978c-0.071 1.077-0.366 2.094-0.847 3h-2.644c0.302-0.969 0.469-1.976 0.513-3zM13.013 8c-0.043-1.024-0.209-2.031-0.51-3h2.641c0.48 0.906 0.775 1.923 0.847 3h-2.978zM14.502 4h-2.354c-0.392-0.955-0.916-1.858-1.55-2.7 1.578 0.457 2.938 1.42 3.904 2.7zM9.074 1.028c0.824 0.897 1.484 1.9 1.972 2.972h-5.102c0.487-1.071 1.146-2.073 1.97-2.97 0.199-0.015 0.398-0.030 0.602-0.030 0.188 0 0.373 0.015 0.558 0.028zM6.383 1.313c-0.629 0.838-1.151 1.737-1.54 2.687h-2.314c0.955-1.267 2.297-2.224 3.854-2.687zM2.529 13h2.317c0.391 0.951 0.915 1.851 1.547 2.689-1.561-0.461-2.907-1.419-3.864-2.689zM7.926 15.97c-0.826-0.897-1.488-1.899-1.978-2.97h5.094c-0.49 1.072-1.152 2.075-1.979 2.972-0.181 0.013-0.363 0.028-0.547 0.028-0.2 0-0.395-0.015-0.59-0.030zM10.587 15.703c0.636-0.842 1.164-1.747 1.557-2.703h2.358c-0.968 1.283-2.332 2.247-3.915 2.703z" fill="#ffad49"></path> </g></svg>
                        <span class="text-white text-[10px] font-bold lg:font-normal lg:text-sm">محصول :</span>
                      </div>
                      <span class="text-white opacity-75 text-[11px] lg:text-sm">${list.origin_country}</span>
                    </div>
                    <div class="flex flex-col md:flex-row md:flex-wrap py-3 gap-y-1 grow  md:justify-center  items-center md:rounded-xl bg-black/45  ">
                      <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
                      <svg fill="#ffad49" height="20px" width="20px" version="1.1" id="Icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12,0C5.38,0,0,5.38,0,12s5.38,12,12,12s12-5.38,12-12S18.62,0,12,0z M12,22C6.49,22,2,17.51,2,12S6.49,2,12,2 s10,4.49,10,10S17.51,22,12,22z M10.5,10h3v8h-3V10z M10.5,5h3v3h-3V5z"></path> </g></svg>
                      <span class="text-white text-[10px] font-bold lg:font-normal lg:text-sm">وضعیت:</span>
                      </div>
                      <span class="text-white opacity-75 text-[11px] lg:text-sm">${statusText }</span>
                    </div>
                    <div class="flex flex-col md:flex-row md:flex-wrap py-3 gap-y-1 grow  md:justify-center  items-center md:rounded-xl bg-black/45  ">
                      <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#ffad49" stroke-width="2" stroke-linecap="round"></path> <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#ffad49"></rect> <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#ffad49"></rect> <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#ffad49"></rect> </g></svg>
                        <span class="text-white text-[10px] font-bold lg:font-normal lg:text-sm">سال تولید :</span>
                      </div>
                      <span class="text-white opacity-75 text-[11px] lg:text-sm"> ${list.first_air_date.slice(0,4)} - ${list.last_air_date.slice(0 , 4)} </span>
                    </div>
                    <div class="flex flex-col md:flex-row md:flex-wrap py-3 gap-y-1 grow  md:justify-center  items-center md:rounded-xl bg-black/45  ">
                      <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
                        <svg width="15px" height="15px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0H6V2H10V4H8.86807C8.57073 5.66996 7.78574 7.17117 6.6656 8.35112C7.46567 8.73941 8.35737 8.96842 9.29948 8.99697L10.2735 6H12.7265L15.9765 16H13.8735L13.2235 14H9.77647L9.12647 16H7.0235L8.66176 10.9592C7.32639 10.8285 6.08165 10.3888 4.99999 9.71246C3.69496 10.5284 2.15255 11 0.5 11H0V9H0.5C1.5161 9 2.47775 8.76685 3.33437 8.35112C2.68381 7.66582 2.14629 6.87215 1.75171 6H4.02179C4.30023 6.43491 4.62904 6.83446 4.99999 7.19044C5.88743 6.33881 6.53369 5.23777 6.82607 4H0V2H4V0ZM12.5735 12L11.5 8.69688L10.4265 12H12.5735Z" fill="#ffad49"></path> </g></svg>
                        <span class="text-white text-[10px] font-bold lg:font-normal lg:text-sm">زبان  :</span>
                      </div>
                      <span class="text-white opacity-75 text-[11px] lg:text-sm">${list.original_language}</span>
                    </div>
         
                   </div>  
                  </div>
                </div>
      
              </div>
          </div>
        </div>
    `    
    document.querySelector('#sm-infos').innerHTML=
    `
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
      <span class="text-black dark:text-white opacity-75 text-[10px]">${statusText}</span>
    </div>
    <div class="flex flex-col  py-2 gap-y-1 grow items-center ">
      <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#ffad49" stroke-width="2" stroke-linecap="round"></path> <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#ffad49"></rect> <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#ffad49"></rect> <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#ffad49"></rect> </g></svg>
        <span class="text-black dark:text-white text-[10px]">سال تولید :</span>
      </div>
      <span class="text-black dark:text-white opacity-75 text-[10px]"> ${list.first_air_date.slice(0,4)} - ${list.last_air_date.slice(0 , 4)}</span>
    </div>
    <div class="flex flex-col  py-2 gap-y-1 grow items-center ">
      <div class="flex flex-col md:flex-row md:w-full md:justify-center gap-1 md:gap-x-2 items-center">
        <svg width="15px" height="15px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0H6V2H10V4H8.86807C8.57073 5.66996 7.78574 7.17117 6.6656 8.35112C7.46567 8.73941 8.35737 8.96842 9.29948 8.99697L10.2735 6H12.7265L15.9765 16H13.8735L13.2235 14H9.77647L9.12647 16H7.0235L8.66176 10.9592C7.32639 10.8285 6.08165 10.3888 4.99999 9.71246C3.69496 10.5284 2.15255 11 0.5 11H0V9H0.5C1.5161 9 2.47775 8.76685 3.33437 8.35112C2.68381 7.66582 2.14629 6.87215 1.75171 6H4.02179C4.30023 6.43491 4.62904 6.83446 4.99999 7.19044C5.88743 6.33881 6.53369 5.23777 6.82607 4H0V2H4V0ZM12.5735 12L11.5 8.69688L10.4265 12H12.5735Z" fill="#ffad49"></path> </g></svg>
        <span class="text-black dark:text-white text-[10px]">زبان  :</span>
      </div>
      <span class="text-black dark:text-white opacity-75 text-[10px]">${list.original_language}</span>
    </div>
    `
    document.querySelector('#sm-desc').textContent = list.overview ? list.overview : '' 
    getHeaderGenres(list.genres)
    getActors(list.credits.cast)
    getCrows(list.credits.crew)

  }

 })


 function getCrows(crow){
  let mainList = crow.length<15 ?crow : crow.slice(0,15)  
  const list = [...new Map(mainList.map(item => [item.id, item])).values()];
   list.forEach(act=>{    
    document.querySelector('#crow-swiper').innerHTML+=`
     <a href="actors.html?id=${act.id}"  class="swiper-slide  group overflow-hidden">
          <div class="flex flex-col items-center  gap-1.5">
            <div class="aspect-square w-full rounded-full overflow-hidden">
              <img class="object-cover" src="https://image.tmdb.org/t/p/w185${act.profile_path}_low" alt="${act.original_name}" loading="lazy" onerror="this.onerror=null; this.src='images/person-not-loaded.png';">
            </div>
            <div  class="flex flex-col items-left w-full gap-0.5 mt-1 ">
              <p dir="ltr" class="text-sm overflow-hidden text-black truncate block  dark:text-white text-center group-hover:text-orange-400 transition-all duration-300"><span>${act.original_name}</span></p>
              <span class="text-center text-xs text-gray-500 dark:text-gray-300">${act.known_for_department}</span>
            </div>
          </div>
        </a>
    `
  })

 }
 function getActors(cast){
  let mainList = cast.length<15 ?cast : cast.slice(0,15)
  
  const list = [...new Map(mainList.map(item => [item.id, item])).values()];

  list.forEach(act=>{
    if(true){
    document.querySelector('#act-swiper').innerHTML+=`
     <a href="actors.html?id=${act.id}"  class=" swiper-slide  group overflow-hidden">
          <div class="flex flex-col items-center  gap-1.5">
            <div class="aspect-square w-full rounded-full overflow-hidden">
              <img class="" src="https://image.tmdb.org/t/p/w185${act.profile_path}_low" alt="${act.original_name}" loading="lazy" onerror="this.onerror=null; this.src='images/person-not-loaded.png';">
            </div>
            <div  class="flex flex-col items-left w-full gap-0.5 mt-1 ">
              <p dir="ltr" class="text-sm overflow-hidden text-black truncate block  dark:text-white text-center group-hover:text-orange-400 transition-all duration-300"><span>${act.original_name}</span></p>
              <span class="text-center text-xs text-gray-500 dark:text-gray-300">${act.known_for_department=="Acting" ? 'بازیگر' : act.known_for_department}</span>
            </div>
          </div>
        </a>
    ` 
  }
    
  })
 }
const actSwiper = new Swiper (".actors-swiper" ,{
    direction: "horizontal",
    slidesPerView: 3,
    loop: false,
    centeredSlides: false,
    initialSlide: 0,
    speed: 500,
    spaceBetween: 10,
    navigation: {
      nextEl: ".act-next",
      prevEl: ".act-prev",
    },
    breakpoints:{
      500:{
        slidesPerView: 4,
      },
      640:{
        slidesPerView: 5,
      },
      768:{
        slidesPerView: 3,
      },
      1000:{
        slidesPerView: 4,
      },
      1280:{
        slidesPerView: 5,
      },
    }
})
const crowSwiper = new Swiper (".crow-swiper" ,{
    direction: "horizontal",
    slidesPerView: 3,
    loop: false,
    centeredSlides: false,
    initialSlide: 0,
    speed: 500,
    spaceBetween: 10,
    navigation: {
      nextEl: ".crow-next",
      prevEl: ".crow-prev",
    },
    breakpoints:{
      500:{
        slidesPerView: 4,
      },
      640:{
        slidesPerView: 5,
      },
      768:{
        slidesPerView: 3,
      },
      1000:{
        slidesPerView: 4,
      },
      1280:{
        slidesPerView: 5,
      },
    }
})
async function getRecommendationsMovie() {
  let response = await fetch(
    `https://api.themoviedb.org/3/tv/${movieId}/recommendations?api_key=${apiKey}`
  );
  let t = await response.json();
  let list = t.results;
  const randomFive = list.slice(0, 6);  
  randomFive.forEach((elem) => {
    if (elem.poster_path && elem.backdrop_path) {
        let elemMediaType= elem.media_type==='tv' ? 'سریال': 'فیلم'
      document.querySelector(".Recommendations-wrapper").innerHTML += `
       <a href="series.html?id=${elem.id}" class="swiper-slide w-auto rounded-lg overflow-hidden transition-all duration-600 group">
              <div class="relative ">
            <div class="w-full relative rounded-lg overflow-hidden">
              <img loading="lazy" class="object-cover w-full" src="https://image.tmdb.org/t/p/original/${elem.poster_path}_medium" alt=""  onerror="this.onerror=null; this.src='images/default_poster.jpg';">
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
      `
       }
  });
  const RecommendationsSwiper = new Swiper (".recommendations-swiper" ,{
    direction: "horizontal",
    slidesPerView: 2,
    loop: false,
    centeredSlides: false,
    initialSlide: 0,
    speed: 500,
    spaceBetween: 15,
    pagination: {
      el: ".Recommendations-pagination",
      clickable: true
    },
    breakpoints:{
      500:{
        slidesPerView: 3,
      },
      640:{
        slidesPerView: 4,
      },
      768:{
        slidesPerView: 5,
      },
      1400:{
        spaceBetween: 20,
        slidesPerView: 7,
      },
    }
  })
}


function getHeaderGenres(list){
  let genresContainer = document.querySelector('#genres')
  list.forEach(gen=>{    
    genresContainer.innerHTML+= `<a   href="search.html?type=all&country=&age=&genre=${gen.id}&double=false&Subtitle=false&Online=false" class="px-2.5 py-0.5 rounded-full border border-gray-400 hover:border-orange-400 hover:text-orange-400 transition-all duration-300" >${genres[gen.id]}</a>`
  })

}

