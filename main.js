// public/js/main.js
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("events-list");

  try {
    const res = await fetch("http://localhost:3000/api/events");
    const events = await res.json();

    if (!Array.isArray(events)) throw new Error("La réponse n'est pas un tableau");

    container.innerHTML = ""; // Vider avant d'ajouter

    events.forEach(event => {
      const div = document.createElement("div");
      div.className = "event-card";
      div.innerHTML = `
        <h3>${event.title}</h3>
        <p>${event.description || "Aucune description."}</p>
        <p><strong>Date :</strong> ${event.date}</p>
        <p><strong>Heure :</strong> ${event.time}</p>
        <p><strong>Lieu :</strong> ${event.location}</p>
        <p><strong>Catégorie :</strong> ${event.category}</p>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error("Erreur lors du chargement des événements :", err);
    container.innerHTML = "<p>Impossible de charger les événements pour le moment.</p>";
  }
});
