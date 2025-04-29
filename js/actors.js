import { apiKey ,genres, menu , manageMenu,moreFiltersToggle ,toggleMenu  ,switchTheme, getGenres , navControl} from './funcs.js'


const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

