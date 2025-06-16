
  function formatRupiah(angka) {
    return 'Rp' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // Ambil elemen-elemen DOM
  const productImage = document.querySelector('.product-card img');
  const productTitle = document.querySelector('.product-title');
  const productVariant = document.querySelector('.product-variant');
  const productPrice = document.querySelector('.product-price');
  const totalHighlight = document.querySelector('.highlight');
  const breakdownRows = document.querySelectorAll('.breakdown .row span:nth-child(2)');
  const totalPembayaranStrong = document.querySelector('.breakdown .total-pay strong:nth-child(2)');

 // Ambil data dari localStorage
const item = JSON.parse(localStorage.getItem("checkoutItem"));

if (item) {
  const harga = parseInt(item.harga, 10);
  const jumlah = parseInt(item.jumlah, 10);
  const total = harga * jumlah;
  const ongkir = 5000;
  const totalPembayaran = total + ongkir;

  // Isi elemen
  productImage.src = item.gambar || '';
  productTitle.textContent = item.nama || '';
  productVariant.textContent = `Jumlah: ${jumlah}`;
  productPrice.innerHTML = `${formatRupiah(harga)} x${jumlah}`;
  totalHighlight.textContent = formatRupiah(totalPembayaran);

  breakdownRows[0].textContent = formatRupiah(totalPembayaran); // sebelumnya hanya "total"

  // Subtotal Pengiriman (tidak berubah)
  breakdownRows[1].textContent = formatRupiah(ongkir);

  // Total keseluruhan
  totalPembayaranStrong.textContent = formatRupiah(totalPembayaran);
} else {
  alert('Tidak ada data produk yang dipilih!');
  window.location.href = 'index.html';
}

  // Tombol submit
 document.getElementById('btnCheckout').addEventListener('click', function () {
  const storedSaldo = parseFloat(localStorage.getItem('totalSaldo')) || 0;

  if (!item) {
    alert("Data produk tidak tersedia.");
    return;
  }

  const harga = parseInt(item.harga, 10);
  const jumlah = parseInt(item.jumlah, 10);
  const ongkir = 5000;
  const totalBayar = harga * jumlah + ongkir;

  // Cek metode pembayaran
  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  if (!selectedPayment) {
    alert("Silakan pilih metode pembayaran terlebih dahulu.");
    return;
  }

  const metode = selectedPayment.value;

  if (metode === "Transfer Bank") {
    if (storedSaldo >= totalBayar) {
      const sisaSaldo = storedSaldo - totalBayar;
      localStorage.setItem('totalSaldo', sisaSaldo.toString());

      alert("Pesanan berhasil dibuat! Saldo Anda tersisa: Rp" + sisaSaldo.toLocaleString('id-ID'));
      window.location.href = '../selesai/selesai.html';
    } else {
      alert("Saldo Anda tidak mencukupi. Silakan lakukan top up terlebih dahulu.");
      window.location.href = '../Top Up/topup.html';
    }
  } else {
    // Pembayaran lain seperti E-Wallet atau COD langsung berhasil
    alert("Pesanan berhasil dibuat dengan metode " + metode + "!");
    window.location.href = '../selesai/selesai.html';
  }
});



  function togglePaymentOptions() {
    const box = document.getElementById("payment-options");
    box.style.display = box.style.display === "block" ? "none" : "block";
  }
onclick="window.open('detail-makanan.html', '_blank')"
