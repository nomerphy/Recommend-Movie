// DOM ELEMENTS
const recommendBtn = document.querySelector(".movie__button");
const poster = document.querySelector(".movie__poster");
const title = document.querySelector(".movie__title");
const movieAbout = document.querySelector(".movie__about-title");
const description = document.querySelector(".movie__description ");
const rating = document.querySelector(".movie__rating");
const movieRealeseDate = document.querySelector(".movie__realese");

// EVENT LISTENERS
recommendBtn.addEventListener("click", buttonEffect);
recommendBtn.addEventListener("click", recommendMovie);
document.addEventListener("DOMContentLoaded", recommendMovie);

// FUNCTIONS

function buttonEffect(event) {
	const x = event.clientX - event.target.offsetLeft;
	const y = event.clientY - event.target.offsetTop;

	const ripple = document.createElement("span");
	ripple.className = "ripple";

	ripple.style.left = x + "px";
	ripple.style.top = y + "px";

	this.appendChild(ripple);

	setTimeout(() => {
		this.removeChild(ripple);
	}, 850);
}

// перед функцией или fetch попробовать добавить лоадер
// Чтение описания в голос

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
	console.log(movie);

	// Show data
	const posterPath = movie.poster_path
		? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
		: "../images/no-poster.jpg";
	poster.setAttribute("style", `background: url('${posterPath}')`);

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
			values += "Комедия";
		} else if (array[i] == 80) {
			values += "Криминал";
		} else if (array[i] == 99) {
			values += "Документальное";
		} else if (array[i] == 18) {
			values += "Драма";
		} else if (array[i] == 10751) {
			values += "Семейное";
		} else if (array[i] == 14) {
			values += "Фэнтези";
		} else if (array[i] == 36) {
			values += "Историческое";
		} else if (array[i] == 27) {
			values += "Хоррор";
		} else if (array[i] == 10402) {
			values += "Музыкальное";
		} else if (array[i] == 9648) {
			values += "Мистическое";
		} else if (array[i] == 10749) {
			values += "Романтика";
		} else if (array[i] == 878) {
			values += "Научная фантастика";
		} else if (array[i] == 10770) {
			values += "Телевизионное";
		} else if (array[i] == 53) {
			values += "Триллер";
		} else if (array[i] == 10752) {
			values += "Военное";
		} else if (array[i] == 37) {
			values += "Вестерн";
		} else {
			values = "";
		}
	}
	return values;
}


