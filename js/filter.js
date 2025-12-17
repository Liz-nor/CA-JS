document.addEventListener("DOMContentLoaded", () => {
  const categoryEl = document.getElementById("categoryFilter");

  if (categoryEl) {
    categoryEl.addEventListener("change", () => {
      const selected = categoryEl.value.toLowerCase();
      const cards = document.querySelectorAll("#container .movie-card");
      const container = document.getElementById("container");

      if (selected === "all") {
        container.style.display = "grid";
      } else {
        container.style.display = "flex";
        container.style.flexDirection = "row";
        container.style.flexWrap = "wrap";
        container.style.alignItems = "center";
      }

      cards.forEach((card) => {
        const category = card.dataset.category || "";

        if (selected === "all" || category === selected) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});
