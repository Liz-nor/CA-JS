export async function setupPostsPage() {
  const posts = await getPosts();
  const paginatedPosts = paginate(posts, 10);
  renderPosts(paginatedPosts[0]);
  renderPagination(paginatedPosts);
}

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

      image.src = product.image.url;
      image.alt = product.image.alt;
      title.textContent = product.title;
      price.textContent = product.price;
      button.textContent = "Add to cart";
      anchor.href = `../product/product.html?id=${product.id}`;

      // Test
      button.addEventListener("click", () => {
        cart.push(product);
        renderCart();
      });

      content.appendChild(title);
      content.appendChild(price);
      card.appendChild(image);
      card.appendChild(content);
      anchor.appendChild(card);

      container.appendChild(anchor);
    });
  } catch (error) {
    console.error("Failed to load");
  }
}
fetchAndCreateMovies();
