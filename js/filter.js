const filterButtons = document.querySelectorAll(".filter-buttons button");
const product = document.querySelectorAll("");
const product = (e) => {
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  console.log(e.target);
};

filterButtons.forEach((button) => button.addEventListener("click", product));
