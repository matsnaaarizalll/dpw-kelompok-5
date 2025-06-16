document.addEventListener("DOMContentLoaded", function () {
  const tambahBtn = document.getElementById("tambahAlamat");
  const container = document.getElementById("alamat-container");

  // tambahBtn.addEventListener("click", function () {
  //   const newAlamat = document.createElement("div");
  //   newAlamat.className = "alamat";
  //   newAlamat.innerHTML = `
  //     <p><strong>Nama Baru</strong> (+62) 8xxx xxxx xxxx</p>
  //     <p>Alamat baru belum diisi</p>
  //     <p>
  //       <a href="#" class="ubah">Ubah</a>
  //       <a href="#" class="hapus">Hapus</a>
  //       <button class="atur-utama">Atur sebagai utama</button>
  //     </p>
  //   `;
  //   container.appendChild(newAlamat);
  // });

  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("ubah")) {
      e.preventDefault();
      alert("Fitur ubah (simulasi) - Anda bisa tambahkan form edit.");
    }

    if (e.target.classList.contains("hapus")) {
      e.preventDefault();
      const konfirmasi = confirm("Yakin ingin menghapus alamat ini?");
      if (konfirmasi) {
        const alamatDiv = e.target.closest(".alamat");
        alamatDiv.remove();
      }
    }

    if (e.target.classList.contains("atur-utama")) {
      const semuaAlamat = document.querySelectorAll(".alamat");
      semuaAlamat.forEach(alamat => {
        alamat.classList.remove("utama");
        const label = alamat.querySelector(".label-utama");
        if (label) label.remove();
      });

      const currentAlamat = e.target.closest(".alamat");
      currentAlamat.classList.add("utama");

      const utamaLabel = document.createElement("span");
      utamaLabel.textContent = "Utama";
      utamaLabel.className = "label-utama";

      currentAlamat.insertBefore(utamaLabel, currentAlamat.children[2]);
    }
    
  });
});
const openModal = document.getElementById("openModal");
const popupForm = document.getElementById("popupForm");
const cancelBtn = document.getElementById("cancelBtn");

openModal.onclick = () => popupForm.style.display = "flex";
cancelBtn.onclick = () => popupForm.style.display = "none";

window.onclick = function(event) {
  if (event.target === popupForm) {
    popupForm.style.display = "none";
  }
};