// Use strict mode to enforce stricter parsing and error handling in JavaScript
"use strict";

// Function to search for a movie based on title and date
// This function is triggered when the search button is clicked
function searchMovie() {
  // Set the title to the value of the title input field
  let title = document.getElementById("title").value;
  // Set the date to the value of the date input field
  let date = document.getElementById("date").value;
  // Set the URL to the JSON file containing movie data
  let url = "movie.json";

  let promise = new Promise(function(resolve, reject) {
  // Fetch the movie data from the JSON file
  fetch(url)
  // Parse the response as JSON
  .then(function(response) {
    if (!response.ok) {
      // If the response is not OK, reject the promise with an error message
      reject("Network response was not ok: " + response.statusText);
      return;
    } else {
      // If the response is OK, resolve the promise with the parsed JSON data
      return response.json();
    }
  })
  .then(function(data) {
    // Resolve the promise with the fetched data
    resolve(data);
  })
  .catch(function(error) {
    // If an error occurs during the fetch or parsing, reject the promise with the error
    reject("Error fetching movie data: " + error);
  });
});

  // Return the promise then log the promise to the console
  promise.then(function(data) {
  console.log("Fetched data:", data);
  
  // Check if data.movies is an array, if not, initialize it as an empty array
  let movies =[];
    
    if (Array.isArray(data.movies)) {
      movies = data.movies;
    }

  // Find the movie with the specified title
  // Set the movie variable to null initially
  let movie = null;
  // Loop through the movies array to find the movie with the matching title
  for (let i = 0; i < movies.length; i++) {
    // Check if the title matches the movie's title in the array
    if (movies[i].title === title) {
      // If a match is found, set the movie variable to the current movie
      // and break out of the loop
      movie = movies[i];
      break;
    }
  }
  // set the output container
  let container = document.getElementById("output");

  // If the movie is found and has showtimes for the specified date
  if (movie && movie.showtimes && movie.showtimes[date]) {
    // Clear the output container
    let showtimeHtml = "";
    // Generate the HTML for the showtimes based on the selected date
    for (let i = 0; i < movie.showtimes[date].length; i++) {
      showtimeHtml += `<li>${movie.showtimes[date][i]}</li>`;
    }
    // Generate the HTML for the movie details and showtimes
    let html = `
      <h2>${movie.title}</h2>
      <p>Release Date: ${movie.date}</p>
      <p>${movie.duration} | ${movie.rating}</p>
      <p>${movie.description}</p>
      <img src="${movie.poster}" alt="${movie.title} poster">
      <h3>Showtimes</h3>
      <p>Click on a showtime to view details.</p>
      <ul>${showtimeHtml}</ul><br>
      <button class="close" onclick="closeSearch()" type="button">Close</button>
    `;
    // Set the inner HTML of the container to the generated HTML
    container.innerHTML = html;

  } else {
    // If no showtimes are available for the movie and provide a close button
    container.innerHTML = `<p>No showtimes available for ${title}.</p>
    <button class="close" onclick="closeSearch()" type="button">Close</button>`;
  }
})
  // Handle errors
  .catch(error => {
    console.error("Error fetching movie data:", error);
    document.getElementById("output").innerHTML = "<p>Error loading movie data.</p>";
  });
}

// Add event listener to the search button
document.getElementById("search").addEventListener("click", searchMovie);

// Function to close the search results
function closeSearch() {
  document.getElementById("output").innerHTML = "";
}

// Function to open the account form when account button is clicked
function openAccountForm() {
  document.getElementById("accountForm").style.display = "block";
}

// Function to close the account form
function closeForm() {
  document.getElementById("accountForm").style.display = "none";
}
