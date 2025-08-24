import { add } from "./math.js";

function main() {
  console.log(add(2, 3));
}
const container = document.querySelector("#container");
const cart = [];
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

      card.className = "card";
      image.className = "card-image";
      content.className = "card-content";
      title.className = "card-title";
      price.className = "card-price";
      button.className = "card-button"; //This is a test

      image.src = product.image.url;
      image.alt = product.image.alt;
      title.textContent = product.title;
      price.textContent = product.price;
      button.textContent = "Add to cart";

      // Test
      button.addEventListener("click", () => {
        cart.push(product);
        renderCart();
      });

      content.appendChild(title);
      content.appendChild(price);
      content.appendChild(button); //This is a test
      card.appendChild(image);
      card.appendChild(content);

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load");
  }
}
main();
fetchAndCreateMovies();
