// ===== FUNGSI UTILITAS =====
function formatRupiah(angka) {
  return 'Rp' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function togglePaymentOptions() {
  const box = document.getElementById("payment-options");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

// ===== LOGIKA UTAMA HALAMAN CHECKOUT =====
document.addEventListener('DOMContentLoaded', function () {
  
  // Ambil elemen-elemen DOM
  const productContainer = document.getElementById('product-list-container');
  const totalOrderTitle = document.getElementById('total-order-title');
  const totalHighlight = document.querySelector('.highlight');
  const subtotalProdukEl = document.getElementById('subtotal-produk');
  const totalPembayaranEl = document.getElementById('total-pembayaran');
  const btnCheckout = document.getElementById('btnCheckout');

  // Ambil data pesanan dari localStorage
  const pesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
  
  // Jika tidak ada item, kembali ke keranjang
  if (pesanan.length === 0) {
    alert('Tidak ada produk yang dipilih untuk checkout!');
    window.location.href = '../keranjang/keranjang.html'; // Arahkan ke halaman keranjang
    return; // Hentikan eksekusi script
  }

  // Definisikan biaya pengiriman
  const ongkir = 5000;
  let totalHargaProduk = 0;

  // Kosongkan kontainer produk
  productContainer.innerHTML = '';

  // Loop melalui setiap item pesanan untuk menampilkannya
  pesanan.forEach(item => {
    // Akumulasi total harga produk
    totalHargaProduk += parseInt(item.harga, 10);

    // Buat elemen div untuk setiap produk
    const itemDiv = document.createElement('div');
    itemDiv.className = 'product-card-checkout'; // Gunakan class CSS baru
    itemDiv.innerHTML = `
      <img src="${item.gambar}" alt="${item.nama}" />
      <div class="product-info">
        <p class="product-title">${item.nama}</p>
        <p class="product-price">${formatRupiah(item.harga)}</p>
      </div>
    `;
    productContainer.appendChild(itemDiv);
  });

  // Hitung total pembayaran
  const totalPembayaran = totalHargaProduk + ongkir;

  // Perbarui tampilan di halaman
  totalOrderTitle.textContent = `Total Pesanan (${pesanan.length} Produk):`;
  totalHighlight.textContent = formatRupiah(totalPembayaran);
  subtotalProdukEl.textContent = formatRupiah(totalHargaProduk);
  totalPembayaranEl.textContent = formatRupiah(totalPembayaran);


  // ===== EVENT LISTENER UNTUK TOMBOL PESAN SEKARANG =====
  btnCheckout.addEventListener('click', function () {
    const storedSaldo = parseFloat(localStorage.getItem('totalSaldo')) || 0;
    
    // Cek apakah metode pembayaran sudah dipilih
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }

    const metode = selectedPayment.value;

    if (metode === "Transfer Bank") {
      if (storedSaldo >= totalPembayaran) {
        const sisaSaldo = storedSaldo - totalPembayaran;
        localStorage.setItem('totalSaldo', sisaSaldo.toString());
        
        // Hapus item dari keranjang setelah berhasil
        localStorage.removeItem('pesanan');

        alert("Pesanan berhasil dibuat! Saldo Anda tersisa: " + formatRupiah(sisaSaldo));
        window.location.href = '../selesai/selesai.html';
      } else {
        alert("Saldo Anda tidak mencukupi. Silakan lakukan top up terlebih dahulu.");
        window.location.href = '../Top Up/topup.html'; // Arahkan ke halaman top up
      }
    } else {
      // Untuk metode lain (E-Wallet, COD)
      // Hapus item dari keranjang setelah berhasil
      localStorage.removeItem('pesanan');
      
      alert("Pesanan berhasil dibuat dengan metode " + metode + "!");
      window.location.href = '../selesai/selesai.html'; // Arahkan ke halaman selesai
    }
  });
});