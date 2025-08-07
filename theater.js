"use strict";

function searchMovie() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;

  fetch("movie.json")
  .then(response => response.json())
  .then(data => {
    let movie = data.movies.find(movie => movie.title === title);
    let container = document.getElementById("output");

    if (movie && movie.showtimes[date]) {
      container.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${movie.poster}" alt="${movie.title} poster">
        <p>${movie.description}</p>
        <h3>Showtimes for ${date}:</h3>
        <ul>
          ${movie.showtimes[date].map(time => `<li>${time}</li>`).join('')}
        </ul>
      `;
    }else {
      container.innerHTML = `<p>No showtimes available for ${title} on ${date}.</p>`;
    }
  })
  .catch(error => {
    console.error("Error fetching movie data:", error);
    document.getElementById("output").innerHTML = "<p>Error loading movie data.</p>";
  });
}

document.getElementById("search").addEventListener("click", searchMovie);
