
function saveRegistration(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simpan ke localStorage
    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredPassword", password);

    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "/login/login.html"; // arahkan ke halaman login

    return false;
}
