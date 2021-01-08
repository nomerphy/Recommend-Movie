// DOM ELEMENTS
const recommendBtn = document.querySelector(".movie__button");
const movieWrap = document.querySelector('.movie');
const poster = document.querySelector(".movie__poster-img");
const title = document.querySelector(".movie__title");
const movieAbout = document.querySelector(".movie__about-title");
const description = document.querySelector(".movie__description ");
const rating = document.querySelector(".movie__rating");
const movieRealeseDate = document.querySelector(".movie__realese");
const posterBtn = document.querySelector('.movie__poster-btn');
const categorieContainer = document.querySelector(
	".movie__categories-container"
);

// EVENT LISTENERS
recommendBtn.addEventListener("click", buttonEffect);
recommendBtn.addEventListener("click", recommendMovie);
posterBtn.addEventListener("click", findMovie);
title.addEventListener('click', searchInGoogle);
document.addEventListener("DOMContentLoaded", recommendMovie);
recommendBtn.addEventListener('click', () => categorieContainer.innerHTML = "");


// VARIABLES

// FUNCTIONS
function buttonEffect(event) {

	const x = event.clientX - event.target.offsetLeft;
	const y = event.clientY - event.target.offsetTop;

	const ripple = document.createElement('span');
	ripple.className = 'ripple';
	ripple.style.left = x + 'px';
	ripple.style.top = y + 'px';

	this.appendChild(ripple);

	setTimeout(() => {
		this.removeChild(ripple);
	}, 850);
}

// перед функцией или fetch попробовать добавить лоадер
// Расширеный поиск(в hdRezka, в google, смотреть на англ и т.д.)
// Чтение описания в голос
// Сменять фильмы по таймауту
// Рекомендация книг
// Добавить дату в поиск по браузеру

async function recommendMovie() {
	const randomPage = Math.floor(Math.random() * 15) + 1;
	const apiURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=
	bebc4be9e383670121721c0529981fa6&language=ru-RU&page=${randomPage}`;

	let dataInformation;

	await fetch(apiURL)
		.then((response) => response.json())
		.then((data) => (dataInformation = data));

	const result = dataInformation.results;
	const randomMovie = Math.floor(Math.random() * result.length);

	const movie = result[randomMovie];

	// Show data
	const posterPath = movie.poster_path
		? `https://image.tmdb.org/t/p/original${movie.poster_path}`
		: "../images/no-poster.jpg";
	poster.src = posterPath;

	title.textContent = movie.title || movie.original_title;
	movieAbout.textContent = `Про что «${movie.title ||
		movie.original_title}»:`;
	description.textContent = movie.overview;

	rating.textContent = movie.vote_average;

	if (rating.textContent.length == 1) {
		rating.textContent = `${movie.vote_average}.0`;
	}

	const realeseDate = movie.release_date.slice(0, 4);

	movieRealeseDate.textContent = `Дата релиза — ${realeseDate}`;

	let categories = transformArray(movie.genre_ids);

	categories.forEach((categorie) => {
		let categorieWrap = document.createElement("li");
		categorieWrap.classList.add("movie__categories");
		categorieWrap.innerHTML = categorie;
		categorieContainer.appendChild(categorieWrap);
	});
}

function openURL(url) {
	window.open(url, "_blank");
}

function findMovie() {
	const movieToFind = title.textContent;
	openURL(`https://rezka.ag/index.php?do=search&subaction=search&q=${movieToFind}`);
}

function searchInGoogle() {
	const movieToFind = title.textContent;
	const movieYear = movieRealeseDate.textContent.slice(14,18);
	console.log(movieYear);
	openURL(`https://www.google.com/search?q=Фильм ${movieToFind} ${movieYear} смотреть`);
}


function transformArray(array) {
	let values = [];

	for (let i = 0; i < array.length; i++) {
		if (array[i] == 28) {
			values.push("Боевик");
		} else if (array[i] == 12) {
			values.push("Приключение");
		} else if (array[i] == 16) {
			values.push("Мультипликация");
		} else if (array[i] == 35) {
			values.push("Комедия");
		} else if (array[i] == 80) {
			values.push("Криминал");
		} else if (array[i] == 99) {
			values.push("Документальный");
		} else if (array[i] == 18) {
			values.push("Драма");
		} else if (array[i] == 10751) {
			values.push("Семейный");
		} else if (array[i] == 14) {
			values.push("Фэнтези");
		} else if (array[i] == 36) {
			values.push("Исторический");
		} else if (array[i] == 27) {
			values.push("Хоррор");
		} else if (array[i] == 10402) {
			values.push("Музыкальный");
		} else if (array[i] == 9648) {
			values.push("Мистический");
		} else if (array[i] == 10749) {
			values.push("Романтика");
		} else if (array[i] == 878) {
			values.push("Научная фантастика");
		} else if (array[i] == 10770) {
			values.push("Телевизионное");
		} else if (array[i] == 53) {
			values.push("Триллер");
		} else if (array[i] == 10752) {
			values.push("Военное");
		} else if (array[i] == 37) {
			values.push("Вестерн");
		} else {
			values = [];
		}
	}
	return values;
}


