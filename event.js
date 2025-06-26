document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("event-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        window.location.href = "login.html";
        return;
      }

      const eventData = {
        title: form.title.value,
        description: form.description.value,
        date: form.date.value,
        time: form.time.value,
        location: form.location.value,
        category: form.category.value,
        organizerId: user.id,
      };

      try {
        const res = await fetch("http://localhost:3000/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });

        const data = await res.json();

        if (res.ok) {
          alert("Événement créé avec succès !");
          window.location.href = "index.html";
        } else {
          document.getElementById("event-error").textContent = data.message || "Erreur lors de la création.";
        }
      } catch (err) {
        console.error(err);
        document.getElementById("event-error").textContent = "Erreur de communication avec le serveur.";
      }
    });
  }
});

