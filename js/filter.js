const navItems = document.querySelectorAll(".navbar li");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const category = item.textContent.trim();

    if (category.toLowerCase() === "all") {
      window.setupPagination(window.allMovies);
    } else {
      const filtered = window.allMovies.filter(
        (movie) => movie.genre?.toLowerCase() === category.toLowerCase()
      );
      window.setupPagination(filtered);
    }
  });
});
