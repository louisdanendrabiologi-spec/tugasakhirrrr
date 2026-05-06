document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const msgElement = document.getElementById("loginMessage");

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            msgElement.style.color = "green";
            msgElement.innerText = "Login Berhasil!";
            // Simpan data login sederhana
            localStorage.setItem("user", username);
            // Pindah ke halaman utama (index.html di luar folder login)
            window.location.href = "../index.html"; 
        } else {
            msgElement.style.color = "red";
            msgElement.innerText = data.message || "Username atau password salah";
        }
    } catch (error) {
        msgElement.innerText = "Error menghubungi server.";
    }
});
