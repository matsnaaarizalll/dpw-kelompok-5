function filterItems(kategori) {
  const items = document.querySelectorAll(".menu-item");

  items.forEach(item => {
    if (kategori === "semua") {
      item.style.display = "block";
    } else {
      if (item.classList.contains(kategori)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    }
  });
}
