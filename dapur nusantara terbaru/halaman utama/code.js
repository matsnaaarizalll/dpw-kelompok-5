  function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
  }

  // Tutup sidebar jika klik di luar area sidebar (opsional, lebih bagus)
  document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar");
    const toggle = document.querySelector(".menu-toggle");

    if (!sidebar.contains(event.target) && !toggle.contains(event.target)) {
      sidebar.classList.remove("open");
    }
  });

 function toggleSubmenu() {
  var submenu = document.getElementById("submenu-akun");
  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

  function masukKeranjang(nama, harga, gambar) {
    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    keranjang.push({
      nama: nama,
      harga: harga,
      gambar: gambar
    });
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    window.location.href = '/keranjang/keranjang.html'; // pindah ke halaman keranjang
  }
