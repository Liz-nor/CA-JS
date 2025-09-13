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
      // wrapper for card
      const card = document.createElement("div");
      card.className = "movie-card";
      //link
      const anchor = document.createElement("a");
      anchor.href = `product.html?id=${product.id}`;
      anchor.className = "card-anchor";
      //image
      const image = document.createElement("img");
      image.className = "card-image";
      image.src = product.image?.url || "";
      image.alt = product.image?.alt || product.title || "Movie";

      //title and price
      const content = document.createElement("div");
      content.className = "card-content";

      const title = document.createElement("h2");
      title.className = "card-title";
      title.textContent = product.title || "Untitled";

      const price = document.createElement("p");
      price.className = "card-price";
      price.textContent = `$${product.price}`;

      // filter
      const cat = product.genre || product.category || "uncategorized";
      card.dataset.category = String(cat).toLowerCase();

      //button
      const button = document.createElement("button");
      button.className = "add-to-cart";
      button.textContent = "Add to Cart";
      button.addEventListener("click", (event) => {
        event.preventDefault(); // stop anchor navigation when clicking button
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


// const CART_KEY = "cart"; //label of the cart

// function loadCart() { //open the cart and take out items
//   try {
//     return JSON.parse(localStorage.getItem(CART_KEY)) || [];
//   } catch {
//     return [];
//   }
// }

// function saveCart(cart) { //save items after changing them
//   localStorage.setItem(CART_KEY, JSON.stringify(cart));
// }

// function getCartCount(cart) {
//   return cart.reduce((sum, item) => sum + item.qty, 0);
// }
// //show the elements of the cart
// const cartPanel = document.getElementById("cart");
// const cartItemsEl = document.getElementById("cart-items");
// const cartTotalEl = document.getElementById("cart-total");
// const cartIcon = document.querySelector(".cart-icon");
// const clearBtn = document.getElementById("clear-cart");
// const closeBtn = document.getElementById("close-cart");
// const checkOutBtn = document.getElementById("check-out");

// // looking inside of the cart for items
// let cart = loadCart();
// updateCartCounter();

// // Open/close handlers
// if (cartIcon) {
//   cartIcon.addEventListener("click", () => {
//     cartPanel.classList.remove("hidden");
//     renderCart();
//   });
// }
// if (closeBtn)
//   closeBtn.addEventListener("click", () => cartPanel.classList.add("hidden"));
// if (clearBtn)
//   clearBtn.addEventListener("click", () => {
//     cart = [];
//     saveCart(cart);
//     renderCart();
//     updateCartCounter();
//   });

// // Remove (event delegation)
// if (cartItemsEl) {
//   cartItemsEl.addEventListener("click", (e) => {
//     const btn = e.target.closest("[data-remove-id]");
//     if (!btn) return;
//     const id = btn.getAttribute("data-remove-id");
//     removeFromCart(id);
//   });
// }

// // add items to cart
// function addToCart(product) {
//   // if same product exists, increment quantity
//   const idx = cart.findIndex((i) => i.id === product.id);
//   if (idx >= 0) {
//     cart[idx].qty += 1;
//   } else {
//     cart.push({
//       id: product.id,
//       title: product.title,
//       price: Number(product.price) || 0,
//       image: product.image?.url || "",
//       qty: 1,
//     });
//   }
//   saveCart(cart);
//   updateCartCounter();
// }
// //remove items from cart
// function removeFromCart(id) {
//   const idx = cart.findIndex((i) => i.id === id);
//   if (idx >= 0) {
//     cart.splice(idx, 1);
//     saveCart(cart);
//     renderCart();
//     updateCartCounter();
//   }
// }

// function changeQty(id, delta) {
//   const idx = cart.findIndex((i) => i.id === id);
//   if (idx >= 0) {
//     cart[idx].qty += delta;
//     if (cart[idx].qty <= 0) {
//       cart.splice(idx, 1);
//     }
//     saveCart(cart);
//     renderCart();
//     updateCartCounter();
//   }
// }
// // updates the span number to see how many items are in cart
// function updateCartCounter() {
//   const badge = document.querySelector(".cart-icon span");
//   if (badge) badge.textContent = String(getCartCount(cart));
// }
// // show the cart with img, txt, price and items. Telling if the cart is empty
// function renderCart() {
//   if (!cartItemsEl || !cartTotalEl) return;

//   cartItemsEl.innerHTML = "";
//   if (cart.length === 0) {
//     cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
//     cartTotalEl.textContent = "";
//     return;
//   }

//   let total = 0;

//   cart.forEach((item) => {
//     total += item.price * item.qty;

//     const row = document.createElement("div");
//     row.className = "cart-row";

//     const img = document.createElement("img");
//     img.src = item.image;
//     img.alt = item.title;

//     const title = document.createElement("div");
//     title.textContent = item.title;

//     const price = document.createElement("div");
//     price.textContent = `$${item.price.toFixed(2)}`;

//     const qty = document.createElement("div");
//     qty.className = "qty";

//     const minusBtn = document.createElement("button");
//     minusBtn.textContent = "-";
//     minusBtn.addEventListener("click", () => changeQty(item.id, -1));

//     const qtyText = document.createElement("span");
//     qtyText.textContent = item.qty;

//     const plusBtn = document.createElement("button");
//     plusBtn.textContent = "+";
//     plusBtn.addEventListener("click", () => changeQty(item.id, +1));
    

//     qty.appendChild(minusBtn);
//     qty.appendChild(qtyText);
//     qty.appendChild(plusBtn);

//     const remove = document.createElement("button");
//     remove.textContent = "Remove";
//     remove.setAttribute("data-remove-id", item.id);

//     row.appendChild(img);
//     row.appendChild(title);
//     row.appendChild(price);
//     row.appendChild(qty);
//     row.appendChild(remove);

//     cartItemsEl.appendChild(row);
//   });

//   cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
// }
