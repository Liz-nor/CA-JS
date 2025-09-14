document.addEventListener("DOMContentLoaded", () => {
  const categoryEl = document.getElementById("categoryFilter");

  if (categoryEl) {
    categoryEl.addEventListener("change", () => {
      const selected = categoryEl.value.toLowerCase();
      const cards = document.querySelectorAll("#container .movie-card"); 

      cards.forEach((card) => { 
        const category = card.dataset.category || "";

        if (selected === "all" || category === selected) {
          card.style.display = ""; 
        } else {
          card.style.display = "none"; 
        }
      });
    });
  }
});
