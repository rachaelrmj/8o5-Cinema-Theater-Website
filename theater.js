// Use strict mode to enforce stricter parsing and error handling in JavaScript
"use strict";

let passwordAttempts = 0;
let maxPasswordAttempts = 3;
let passwordReset = false;

document.getElementById("account-btn").addEventListener("click", function(e) {
  // Prevent the default action of the button click
  e.preventDefault();
  // Open the account form when the account button is clicked
  AccountAccess();  
});

// Function to open the account form when account button is clicked
function AccountAccess() {
  // Display the account form by changing its CSS display property
  document.getElementById("accountForm").style.display = "block";


  let savedAccountData = JSON.parse(localStorage.getItem("accountFormData"));
  let submitButton = document.getElementById("submit");
  let newAccountButton = document.getElementById("newAccountButton");

  if (savedAccountData) {
    // If there is saved account data, populate the form fields with the saved data
    document.getElementById("fname").value = savedAccountData.fname || "";
    document.getElementById("lname").value = savedAccountData.lname || "";
    document.getElementById("email").value = savedAccountData.email || "";
    document.getElementById("phone").value = savedAccountData.phone || "";
    document.getElementById("username").value = savedAccountData.username || "";
    document.getElementById("password").value = "";

    submitButton.textContent = "Log In / Update 8o5 Account"; // Change button text on "Join Club Button" to "Update 8o5 Account"
    newAccountButton.style.display = "inline-block"; // Show the "New Account" button
  } else {
    // If no saved data, set the button text to "Join Club"
    submitButton.textContent = "Join Now";
    newAccountButton.style.display = "none"; // Hide the "New Account" button
  }
}

document.getElementById("newAccountButton").addEventListener("click", function() {
  if (confirm("Are you sure you want to create a new account? This will overwrite any existing account data.")) {
    localStorage.removeItem("accountFormData"); // Clear existing account data from localStorage
    // If the user confirms, reset the form fields to empty values
    resetForm();
    // Hide the "Create New Account" button
    document.getElementById("newAccountButton").style.display = "none"; 
    // Change the button text to "Join Now"
    document.getElementById("submit").textContent = "Join Now"; // Change the button text to "Join Now"
    alert("You can now create a new account.");
  }
});

document.getElementById("acctForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent the default form submission behavior

  let message = document.getElementById("message");
  let resetButton = document.getElementById("resetPasswordButton");
  
  let existingData = localStorage.getItem("accountFormData");
  let enteredPassword = document.getElementById("password").value;

  if (existingData) {
    let savedAccountData = JSON.parse(existingData);

    if (passwordReset) {
      // If the password has been reset and no password is saved, allow the user to set a new password
      savedAccountData.password = enteredPassword;
      localStorage.setItem("accountFormData", JSON.stringify(savedAccountData));
      passwordReset = false; // Reset the password reset flag
    }

    if (savedAccountData.password !== "" && enteredPassword !== savedAccountData.password) {
      passwordAttempts++;
      if (passwordAttempts >= maxPasswordAttempts) {
        message.textContent = "Maximum password attempts reached. Please reset your password.";
        resetButton.style.display = "inline-block";   
        message.style.color = "red";
        document.getElementById("password").disabled = true
  } else {
    message.textContent = `Incorrect password. You have ${maxPasswordAttempts - passwordAttempts} attempts left.`;
    message.style.color = "red";
  }
  return; // Exit the function if the password is incorrect
} 

  passwordAttempts = 0;
  message.textContent = ""; // Clear the message if the password is correct
}

  // Collect form data and store it in an object saving it to localStorage
  let formData = {
    fname: document.getElementById("fname").value,
    lname: document.getElementById("lname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    username: document.getElementById("username").value,
    password: enteredPassword
  };

  // Save the form data to localStorage as a JSON string
  localStorage.setItem("accountFormData", JSON.stringify(formData));
  
  if (existingData) {
    alert("Account logged in and updated successfully!"); // If the data already exists, alert the user that the account has been updated
  } else {
    alert("Account created successfully!"); // If the data does not exist, alert the user that the account has been created
  }
  // Close the form after saving the data
  resetButton.style.display = "none"; // Hide the reset password button
  message.textContent = "";
  closeForm();
});

document.getElementById("resetPasswordButton").addEventListener("click", function() {
  alert("Please create a new password.");
  passwordAttempts = 0; // Reset the password attempts counter
  document.getElementById("password").disabled = false;
  this.style.display = "none"; // Hide the reset password button
  document.getElementById("message").textContent = "";
  document.getElementById("password").value = ""; // Clear the password field

  let savedAccountData = localStorage.getItem("accountFormData");
  if (savedAccountData) {
    savedAccountData = JSON.parse(savedAccountData);
    savedAccountData.password = "";
    localStorage.setItem("accountFormData", JSON.stringify(savedAccountData));
  }
});

// Function to close the account form
function closeForm() {
  document.getElementById("accountForm").style.display = "none";
  resetForm(); // Reset the form fields when closing the form
}

function resetForm() {
  let form = document.querySelector("#accountForm form");
  form.reset(); // This clears all form inputs to default values
}

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