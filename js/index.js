import { addToCart, renderCart, updateCartCounter, initCartUI } from "./cart.js";
const API_URL = "https://v2.api.noroff.dev/square-eyes";
const container = document.querySelector("#container");


async function fetchAndCreateMovies() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch movies");
    const json = await res.json();
    const movies = json.data || [];

    if (!container) {
      console.error("#container not found");
      return;
    }
    
    container.innerHTML = "";

    movies.forEach((product) => {
    
      const card = document.createElement("div");
      card.className = "movie-card";
    
      const anchor = document.createElement("a");
      anchor.href = `product.html?id=${product.id}`;
      anchor.className = "card-anchor";
    
      const image = document.createElement("img");
      image.className = "card-image";
      image.src = product.image?.url || "";
      image.alt = product.image?.alt || product.title || "Movie";

      const content = document.createElement("div");
      content.className = "card-content";

      const title = document.createElement("h2");
      title.className = "card-title";
      title.textContent = product.title || "Untitled";

      const price = document.createElement("p");
      price.className = "card-price";
      price.textContent = `$${product.price}`;

      const cat = product.genre || product.category || "uncategorized";
      if(Array.isArray(cat)) {
        cat = cat[0];
      }
      card.dataset.category = String(cat).toLowerCase();

      const button = document.createElement("button");
      button.className = "add-to-cart";
      button.textContent = "Add to Cart";
      button.addEventListener("click", (event) => {
        event.preventDefault();
        addToCart(product);
        updateCartCounter();
        renderCart();
        });
      
      content.appendChild(title);
      content.appendChild(price);
      card.appendChild(image);
      card.appendChild(content);
      anchor.appendChild(card);
      container.appendChild(anchor);
      content.appendChild(button);
    });

    if (window.applyCategoryFilter) {
      window.applyCategoryFilter();
    }
  } catch (error) {
    console.error("Failed to load:", error);
  }
}

fetchAndCreateMovies();
updateCartCounter();
initCartUI();


