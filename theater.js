"use strict";

function searchMovie() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;

  fetch("movie.json")
  .then(response => response.json())
  .then(data => {
  console.log("Fetched data:", data);
  let movies = Array.isArray(data.movies) ? data.movies : [];
  let movie = movies.find(m => m.title === title);
  let container = document.getElementById("output");

  if (movie && movie.showtimes?.[date]) {
    container.innerHTML = `
      <h2>${movie.title}</h2>
      <p>Release Date: ${movie.date}</p>
      <p>${movie.duration} | ${movie.rating}</p>
      <p>${movie.description}</p>
      <img src="${movie.poster}" alt="${movie.title} poster">
      <h3>Showtimes</h3>
      <ul>
        ${movie.showtimes[date].map(time => `<a href="#view"><li>${time}</li></a>`).join('')}
      </ul>
    `;
  } else {
    container.innerHTML = `<p>No showtimes available for ${title} on ${date}.</p>`;
  }
})
  .catch(error => {
    console.error("Error fetching movie data:", error);
    document.getElementById("output").innerHTML = "<p>Error loading movie data.</p>";
  });
}

document.getElementById("search").addEventListener("click", searchMovie);
