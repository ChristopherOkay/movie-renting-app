const readline = require('readline');

class Movie {
  constructor(title, genre, releaseYear, isAvailable = true) {
    this.title = title;
    this.genre = genre;
    this.releaseYear = releaseYear;
    this.isAvailable = isAvailable;
  }
}

class MovieStore {
  constructor() {
    this.movies = [];
  }

  addMovie(title, genre, releaseYear) {
    const movie = new Movie(title, genre, releaseYear);
    this.movies.push(movie);
    console.log(`Added ${title} to the movie store.`);
  }

  rentMovie(title) {
    const movie = this.movies.find(movie => movie.title === title);

    if (movie) {
      if (movie.isAvailable) {
        movie.isAvailable = false;
        console.log(`You have rented ${title}. Enjoy your movie!`);
      } else {
        console.log(`${title} is currently not available for rent.`);
      }
    } else {
      console.log(`${title} not found in the movie store.`);
    }
  }

  returnMovie(title) {
    const movie = this.movies.find(movie => movie.title === title);

    if (movie) {
      if (!movie.isAvailable) {
        movie.isAvailable = true;
        console.log(`You have returned ${title}. Thank you!`);
      } else {
        console.log(`${title} is already available in the movie store.`);
      }
    } else {
      console.log(`${title} not found in the movie store.`);
    }
  }

  listMovies() {
    console.log("Movies in the store:");
    this.movies.forEach(movie => {
      console.log(`${movie.title} - ${movie.genre} (${movie.releaseYear}) - Available: ${movie.isAvailable}`);
    });
  }
}

// Set up readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Example usage:

const movieStore = new MovieStore();

// Predefined movies
movieStore.addMovie("The Shawshank Redemption", "Drama", 1994);
movieStore.addMovie("The Godfather", "Crime", 1972);
movieStore.addMovie("The Dark Knight", "Action", 2008);

function displayMenu() {
  console.log("\nMovie Rental API");
  console.log("1. Rent Movie");
  console.log("2. Return Movie");
  console.log("3. List Movies");
  console.log("4. Exit");
}

function displayMovies() {
  console.log("\nSelect a movie:");
  movieStore.listMovies();
}

function processUserInput() {
  displayMenu();

  rl.question("Enter your choice: ", choice => {
    switch (choice) {
      case '1':
        displayMovies();
        rl.question("Enter the title of the movie you want to rent: ", title => {
          movieStore.rentMovie(title);
          processUserInput();
        });
        break;
      case '2':
        displayMovies();
        rl.question("Enter the title of the movie you want to return: ", title => {
          movieStore.returnMovie(title);
          processUserInput();
        });
        break;
      case '3':
        movieStore.listMovies();
        processUserInput();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        processUserInput();
        break;
    }
  });
}

processUserInput();
