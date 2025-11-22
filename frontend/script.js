// 🔥 Use your deployed backend URL (update if you deploy elsewhere)
const API = "https://quote-vault.onrender.com";

/* ----------------- helpers ----------------- */
function el(id) {
  return document.getElementById(id);
}
function sanitize(text) {
  // Very light sanitization to avoid accidental HTML injection in UI
  return String(text).replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/* ----------------- Load all quotes ----------------- */
async function loadQuotes() {
  try {
    const res = await fetch(`${API}/quotes`);
    if (!res.ok) throw new Error("Failed to fetch quotes");
    const data = await res.json();

    const html = (Array.isArray(data) ? data : [])
      .map(
        (q) => `
      <li class="quote-item" role="listitem">
        <span>${sanitize(q.text)}</span>
        <button class="delete-btn" aria-label="Delete quote" onclick="deleteQuote(${
          q.id
        })">🗑️</button>
      </li>
    `
      )
      .join("");

    el("quoteList").innerHTML =
      html ||
      `<li class="quote-item" style="justify-content:center; font-weight:600; opacity:.8;">No quotes found. Add one above!</li>`;
  } catch (err) {
    console.error(err);
    el(
      "quoteList"
    ).innerHTML = `<li class="quote-item" style="justify-content:center; color:#ffd2d2;">Unable to load quotes.</li>`;
  }
}

/* ----------------- Add a new quote ----------------- */
async function addQuote() {
  const input = el("quoteInput");
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return alert("Please enter a quote!");
  }

  try {
    await fetch(`${API}/quotes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    input.value = "";
    loadQuotes();
  } catch (err) {
    console.error(err);
    alert("Failed to add quote. Try again.");
  }
}

/* ----------------- Delete ----------------- */
async function deleteQuote(id) {
  if (!confirm("Delete this quote?")) return;
  try {
    await fetch(`${API}/quotes/${id}`, { method: "DELETE" });
    loadQuotes();
  } catch (err) {
    console.error(err);
    alert("Delete failed.");
  }
}

/* ----------------- Load at start ----------------- */
document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();

  // quick keyboard shortcut: Enter in input will add (form already handles onsubmit)
  const input = el("quoteInput");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addQuote();
    }
  });
});
