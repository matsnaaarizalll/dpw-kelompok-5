// Simulasi data dummy jika belum ada di localStorage
if (!localStorage.getItem('jumlahPengguna')) {
    localStorage.setItem('jumlahPengguna', '');
}
if (!localStorage.getItem('jumlahPesanan')) {
    localStorage.setItem('jumlahPesanan', '');
}

// Ambil elemen
const penggunaEl = document.getElementById('jumlah-pengguna');
const pesananEl = document.getElementById('jumlah-pesanan');

// Ambil data dari localStorage
const jumlahPengguna = localStorage.getItem('jumlahPengguna');
const jumlahPesanan = localStorage.getItem('jumlahPesanan');

// Tampilkan ke halaman
penggunaEl.textContent = jumlahPengguna;
pesananEl.textContent = jumlahPesanan;