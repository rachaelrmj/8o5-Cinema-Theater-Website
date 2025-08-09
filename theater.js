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
      <p>Click on a showtime to view details.</p>
      <ul>
        ${movie.showtimes[date].map(time => `<a href="#view"><li>${time}</li></a>`).join('')}
      </ul><br>
      
      <button class="close" onclick="closeSearch()" type="button">Close</button>
    `;
  } else {
    container.innerHTML = `<p>No showtimes available for ${title}.</p>
    <button class="close" onclick="closeSearch()" type="button">Close</button>`;
  }

  
})
  .catch(error => {
    console.error("Error fetching movie data:", error);
    document.getElementById("output").innerHTML = "<p>Error loading movie data.</p>";
  });
}

function closeSearch() {
  document.getElementById("output").innerHTML = "";
}

function buyTickets() {
  let container = document.getElementById("buy-container");
  container.innerHTML = `
    <h2>Buy Tickets</h2>
    <p>Please fill out the form below to purchase tickets.</p>
    <h3>Buy Tickets</h3>
    <form id="ticket-form">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <label for="tickets">Number of Tickets:</label>
      <input type="number" id="tickets" name="tickets" min="1" max="10" required>

      <button type="submit">Purchase</button>
    </form> 
    <button class="close" id="close" type="button">Close</button>
    `
}

document.getElementById("search").addEventListener("click", searchMovie);
document.getElementById("close").addEventListener("click", closeSearch);
document.getElementById("buy").addEventListener("click", buyTickets);
