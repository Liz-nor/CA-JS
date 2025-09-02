const container = document.querySelector("#container");
const API_URL = "https://v2.api.noroff.dev/square-eyes";

async function fetchAndCreateMovies() {
  try {
    const respons = await fetch(API_URL);
    const data = await respons.json();
    const movies = data.data;

    movies.forEach((product) => {
      const card = document.createElement("div");
      const image = document.createElement("img");
      const content = document.createElement("div");
      const title = document.createElement("h2");
      const price = document.createElement("p");
      const button = document.createElement("button"); //This is a test
      const anchor = document.createElement("a");

      card.className = "card";

      image.className = "card-image";
      content.className = "card-content";
      title.className = "card-title";
      price.className = "card-price";

      card.dataset.name = product.genre || product.category || "uncategorized";

      image.src = product.image.url;
      image.alt = product.image.alt;
      title.textContent = product.title;
      price.textContent = product.price;
      button.textContent = "Add to cart";
      anchor.href = `/CA-JS/product/product.html?id=${product.id}`;

      content.appendChild(title);
      content.appendChild(price);
      card.appendChild(image);
      card.appendChild(content);
      anchor.appendChild(card);
      container.appendChild(anchor);
    });

    setupFilters();
  } catch (error) {
    console.error("Failed to load");
  }
}
fetchAndCreateMovies();
