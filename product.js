import { updateCartCounter, initCartUI, addToCart, renderCart } from "./js/cart.js";

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

    const productInfo = document.createElement("div");
    productInfo.className = "product-info";

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
    backButton.className = "back-button btn";
    backButton.textContent = "Back to Movies";
    backButton.href = "index.html";

    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "addToCartBtn";
    addToCartBtn.textContent = "Add To Cart";
    addToCartBtn.addEventListener("click", (event) => {
      event.preventDefault();
      addToCart(product);
      updateCartCounter();
      renderCart();
    })

    productDiv.append(image, productInfo);
    productInfo.append(title, price, description, backButton, addToCartBtn);
    container.appendChild(productDiv);

  } catch (error) {
    console.error("Failed to fetch product", error);
    container.textContent = "Failed to load product";
  }
}

fetchAndCreateMoviePage();
updateCartCounter();
initCartUI();
