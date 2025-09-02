export function renderNextButton(paginatedPosts, currentPage) {
  const pagination = document.querySelector(".pagination");
  const button = document.createElement("button");
  button.textContent = "Next";
  button.addEventListener("click", () => {
    article.innerHTML = "";
    renderPosts(paginatedPosts[currentPage + 1]);
  });
  pagination.append(button);
}

export function renderPreviousButton(paginatedPosts, currentPage) {
  const pagination = document.querySelector(".pagination");
  const button = document.createElement("button");
  button.textContent = "Previous";
  button.addEventListener("click", () => {
    article.innerHTML = "";
    renderPosts(paginatedPosts[currentPage - 1]);
  });
  pagination.append(button);
}

export function renderFirstButton(paginatedPosts) {
  const pagination = document.querySelector(".pagination");
  const button = document.createElement("button");
  button.textContent = "First";
  button.addEventListener("click", () => {
    article.innerHTML = "";
    renderPosts(paginatedPosts[0]);
  });
  pagination.append(button);
}

export function renderLastButton(paginatedPosts) {
  const pagination = document.querySelector(".pagination");
  const button = document.createElement("button");
  button.textContent = "Last";
  button.addEventListener("click", () => {
    article.innerHTML = "";
    renderPosts(paginatedPosts[paginatedPosts.length - 1]);
  });
  pagination.append(button);
}

export function renderPagination(paginatedPosts, currentPage) {
  const pagination = document.querySelector(".pagination");
  const article = document.querySelector("article");
  pagination.innerHTML = "";

  if (currentPage > 0) {
    // Only show the previous and first buttons if we are not on the first page
    renderFirstButton(paginatedPosts);
    renderPreviousButton(paginatedPosts, currentPage);
  }

  paginatedPosts.forEach((page, index) => {
    const button = document.createElement("button");
    button.textContent = index + 1;
    button.addEventListener("click", () => {
      article.innerHTML = "";
      renderPosts(page);
    });
    pagination.append(button);
  });

  if (currentPage < paginatedPosts.length - 1) {
    // Only show the next and last buttons if we are not on the last page
    renderNextButton(paginatedPosts, currentPage);
    renderLastButton(paginatedPosts);
  }
}

function paginate(items, itemsPerPage, currentPage = 0) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    const start = i * itemsPerPage;
    const end = start + itemsPerPage;
    pages.push(items.slice(start, end));
  }

  return {
    pages,
    currentPage,
    totalPages,
    nextPage: currentPage + 1,
    previousPage: currentPage - 1,
  };
}

function paginate(items, itemsPerPage, currentPage = 0) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    const start = i * itemsPerPage;
    const end = start + itemsPerPage;
    pages.push(items.slice(start, end));
  }

  return {
    pages,
    currentPage,
    totalPages,
    nextPage: currentPage + 1 < totalPages ? currentPage + 1 : null,
    previousPage: currentPage - 1 >= 0 ? currentPage - 1 : null,
  };
}
