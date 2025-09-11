// let allProducts = [];

// document.addEventListener("DOMContentLoaded", () => {
//   setupFilters();
//   fetchProducts();
// });

// async function fetchProducts() {
//   try {
//     const res = await fetch("https://v2.api.noroff.dev/square-eyes");
//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     const json = await res.json();

//     allProducts = json.data || [];

//     if (!Array.isArray(allProducts)) allProducts = [];

//     populateCategoryOptions(allProducts);
//     applyFilters();
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//   }
// }

// function populateCategoryOptions(products) {
//   const categoryEl = document.getElementById("categoryFilter");
//   if (!categoryEl) return;

//   const set = new Set();
//   products.forEach((p) => {
//     const cat = p.genre || p.category;
//     if (Array.isArray(cat)) cat.forEach((c) => set.add(c.toLowerCase()));
//     else if (cat) set.add(String(cat).toLowerCase());
//   });

//   categoryEl
//     .querySelectorAll("option:not([value='all'])")
//     .forEach((o) => o.remove());

//   Array.from(set)
//     .sort()
//     .forEach((cat) => {
//       const opt = document.createElement("option");
//       opt.value = cat;
//       opt.textContent = capitalize(cat);
//       categoryEl.appendChild(opt);
//     });
// }

// function setupFilters() {
//   const categoryEl = document.getElementById("categoryFilter");
//   if (categoryFilter) {
//     categoryEl.addEventListener("change", applyFilters);
//   }
// }

// function applyFilters() {
//   const categoryEl = document.getElementById("categoryFilter");
//   const selected = categoryEl ? categoryEl.value : "all";

//   const filtered = allProducts.filter((p) => {
//     const cat = p.genre || p.category;
//     if (selected === "all") return true;
//     if (Array.isArray(cat))
//       return cat.map((c) => c.toLowerCase()).includes(selected);
//     return String(cat).toLowerCase() === selected;
//   });

//   displayProducts(filtered);
// }

// function displayProducts(products) {
//   const container = document.getElementById("container");
//   if (!container) return;

//   container.innerHTML = "";

//   products.forEach((p) => {
//     const card = document.createElement("div");
//     card.className = "movie-card";

//     const img = document.createElement("img");
//     img.src = p.image?.url || "";
//     img.alt = p.title || "Movie";

//     const h3 = document.createElement("h3");
//     h3.textContent = p.title || "Untitled";

//     card.appendChild(img);
//     card.appendChild(h3);

//     container.appendChild(card);
//   });
// }

// function capitalize(s) {
//   return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
// }

// filters.js assumes allProducts + displayProducts exist from index.js

// filters.js
document.addEventListener("DOMContentLoaded", () => {
  const categoryEl = document.getElementById("categoryFilter");

  if (categoryEl) {
    categoryEl.addEventListener("change", () => {
      const selected = categoryEl.value.toLowerCase();
      const cards = document.querySelectorAll("#container a"); // each product wrapped in <a>

      cards.forEach((anchor) => {
        const card = anchor.querySelector("div"); // inside <a>
        const category = card?.dataset.category || "";

        if (selected === "all" || category === selected) {
          anchor.style.display = ""; // show
        } else {
          anchor.style.display = "none"; // hide
        }
      });
    });
  }
});
