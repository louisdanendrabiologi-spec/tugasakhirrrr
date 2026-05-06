document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msgElement = document.getElementById("message");

    msgElement.innerText = "Processing...";

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=register&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            msgElement.style.color = "green";
            msgElement.innerText = "Registrasi berhasil! Mengalihkan...";
            setTimeout(() => {
                window.location.reload(); // Refresh untuk balik ke tampilan Sign In
            }, 2000);
        } else {
            msgElement.style.color = "red";
            msgElement.innerText = data.message || "Gagal registrasi";
        }
    } catch (error) {
        msgElement.innerText = "Error menghubungi server.";
    }
});
