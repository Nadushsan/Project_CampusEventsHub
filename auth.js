document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;

      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLoggedIn", "true");
          window.location.href = "index.html";
        } else {
          document.getElementById("login-error").textContent = data.message || "Connexion échouée.";
        }
      } catch (err) {
        console.error(err);
        document.getElementById("login-error").textContent = "Erreur de connexion au serveur.";
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = registerForm.name.value;
      const email = registerForm.email.value;
      const password = registerForm.password.value;

      try {
        const res = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLoggedIn", "true");
          window.location.href = "index.html";
        } else {
          document.getElementById("register-error").textContent = data.message || "Inscription échouée.";
        }
      } catch (err) {
        console.error(err);
        document.getElementById("register-error").textContent = "Erreur de connexion au serveur.";
      }
    });
  }
});
