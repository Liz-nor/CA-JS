const container = document.querySelector("#container");

async function fetchAndCreateMoviePage() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      container.textContent = "No product ID provided!";
      return;
    }

    const API_URL = "https://v2.api.noroff.dev/square-eyes";

    // Hovedfilmen
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const data = await response.json();
    const product = data.data;

    // Hovedfilmens detaljer
    const productDiv = document.createElement("div");
    productDiv.className = "product-details";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image.url;
    image.alt = product.image.alt;

    const title = document.createElement("h2");
    title.className = "product-title";
    title.textContent = product.title;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = `$${product.price}`;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    const backButton = document.createElement("a");
    backButton.className = "back-button";
    backButton.textContent = "Back to Movies";
    backButton.href = "index.html";

    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "addToCartBtn";
    addToCartBtn.textContent = "Add To Cart";

    productDiv.append(image, title, price, description, backButton, addToCartBtn);
    container.appendChild(productDiv);

    // Henter alle filmer
    const allResponse = await fetch(API_URL);
    if (!allResponse.ok) {
      throw new Error(`Failed to load other movies: ${allResponse.status}`);
    }
    const allData = await allResponse.json();
    const allMovies = allData.data;

    // Filtrerer i samme sjanger
    const sameGenreMovies = allMovies.filter(movie => {
      if (movie.id === product.id) return false; // denne gjør så man hopper over filmen som er i fokus
      if (Array.isArray(movie.genre)) {
        return movie.genre.includes(product.genre);
      }
      return movie.genre === product.genre;
    });

    // Forslag andre filmer samme sjanger HUSK å ta bort console.log!
    if (sameGenreMovies.length > 0) {
      const otherMoviesSection = document.createElement("div");
      otherMoviesSection.className = "other-movies";

      const heading = document.createElement("h3");
      heading.textContent = `Other ${product.genre} movies`;
      otherMoviesSection.appendChild(heading);

      sameGenreMovies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        const link = document.createElement("a");
        link.href = `product.html?id=${movie.id}`;

        const img = document.createElement("img");
        img.src = movie.image.url;
        img.alt = movie.image.alt;

        const movieTitle = document.createElement("p");
        movieTitle.textContent = movie.title;

        link.append(img, movieTitle);
        card.appendChild(link);
        otherMoviesSection.appendChild(card);
      });

      container.appendChild(otherMoviesSection);
    } else {
      console.log("No other movies found in this genre.");
    }
  } catch (error) {
    console.error("Failed to fetch product", error);
    container.textContent = "Failed to load product";
  }
}

fetchAndCreateMoviePage();
