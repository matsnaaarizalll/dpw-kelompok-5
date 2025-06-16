// Preview gambar profil
const fileInput = document.querySelector('.profile-image input[type="file"]');
const profileImage = document.querySelector('.profile-image img');

fileInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    if (file.size > 1024 * 1024) {
      alert('Ukuran gambar melebihi 1 MB. Silakan pilih gambar yang lebih kecil.');
      this.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Tangani submit form
const form = document.getElementById('profileForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Ambil semua data dari input
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  console.log("Data profil yang disimpan:", data);
  alert("Profil berhasil disimpan!");
});
