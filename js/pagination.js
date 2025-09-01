export function paginate(items, itemsPerPage) {
  const pages = [];

  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }

  return pages;
}

export function renderPagination(paginatedData, renderFn) {
  const paginationContainer = document.querySelector("#pagination");
  const article = document.querySelector("article");
  paginationContainer.innerHTML = "";

  paginatedPosts.forEach((pageItems, index) => {
    const button = document.createElement("button");
    button.textContent = index + 1;

    button.addEventListener("click", () => {
      document.querySelector("#container").innerHTML = "";
      renderFn(pageItems);
    });
    paginationContainer.appendChild(button);
  });
}
