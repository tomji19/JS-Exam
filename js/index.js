$(document).ready(function () {
  $("#open").on("click", function () {
    $("#leftMenu").show(1000);
    $("#closebtn").show(0);
  });

  $("#closebtn").on("click", function () {
    $("#leftMenu").hide(500);
    $("#closebtn").hide(0);
  });

  $(".sidenav a").on("click", function () {
    $("#leftMenu").hide(500);
    $("#closebtn").hide(0);
  });

  $("#facebook-icon").on("click", function () {
    window.open("https://www.facebook.com", "_blank");
  });

  $("#x-icon").on("click", function () {
    window.open("https://www.x.com", "_blank");
  });

  $(document).ready(function () {
    const scrollUpButton = document.getElementById('scrollUpButton');

    // Show or hide the button based on scroll position
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) { // Show button after scrolling down 100px
        scrollUpButton.classList.add('show');
      } else {
        scrollUpButton.classList.remove('show');
      }
    });

    // Scroll to top when button is clicked with smooth scroll behavior
    scrollUpButton.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });



  const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjM3ZTc5MmZjMGZhNmY2MDE4MDY5MzE0ZDQ5MzdhZCIsIm5iZiI6MTcyMTQ4MDE5My45ODI5Miwic3ViIjoiNjY5YTVhY2I4MzdiOTRhNDY0NTAyNDQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.82V08L4oVlnb1uILyxzJ7prvPtl5-G46_KDFVQC8_fw';

  function fetchMovies(url, container) {
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: apiKey,
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const movies = data.results;
        container.innerHTML = ''; // Clear the container before adding new cards
        movies.forEach(movie => {
          const rating = movie.vote_average / 2;
          const fullStars = Math.floor(rating);
          const halfStar = rating - fullStars > 0 ? 1 : 0;

          let starHTML = '';
          for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
              starHTML += '&#9733;';
            } else if (i === fullStars && halfStar) {
              starHTML += '&#9734;';
            } else {
              starHTML += '&#9734;';
            }
          }

          const cardHTML = `
            <div class="now-playing-card">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Image" class="card-image">
              <div class="card-overlay">
                <h2 class="card-title">${movie.title}</h2>
                <p class="card-description">${movie.overview.substring(0, 160)}...</p>
                <p class="card-release-date"><span>Release Date:</span> ${movie.release_date}</p>
                <div class="card-rating">
                  <span style="font-size: 1.5rem; color: #F4DC16; margin-bottom: 0.6rem;">${starHTML}</span>
                  <span class="rating-circle">${movie.vote_average}</span>
                </div>
              </div>
            </div>
          `;
          container.innerHTML += cardHTML;
        });
      })
      .catch(error => console.error('Error:', error));
  }

  // API Endpoints
  const nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
  const popularUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const trendingUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  const upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';

  // Initial load of Now Playing movies
  fetchMovies(nowPlayingUrl, document.querySelector('.results'));

  // Navigation link event listeners
  document.getElementById('search').addEventListener('click', () => fetchMovies(nowPlayingUrl, document.querySelector('.results')));
  document.getElementById('categories').addEventListener('click', () => fetchMovies(popularUrl, document.querySelector('.results')));
  document.getElementById('area').addEventListener('click', () => fetchMovies(topRatedUrl, document.querySelector('.results')));
  document.getElementById('ingredients').addEventListener('click', () => fetchMovies(trendingUrl, document.querySelector('.results')));
  document.getElementById('contact').addEventListener('click', () => fetchMovies(upcomingUrl, document.querySelector('.results')));

  // Search functionality
  document.getElementById('search-input').addEventListener('input', function () {
    const query = this.value.trim();
    if (query) {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`;
      fetchMovies(searchUrl, document.querySelector('.results'));
    }
  });
});
