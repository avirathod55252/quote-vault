// 🔥 Use your deployed backend URL
const API = "https://quote-vault.onrender.com";

// 📌 Load all quotes from backend
async function loadQuotes() {
  const res = await fetch(`${API}/quotes`);
  const data = await res.json();

  document.getElementById("quoteList").innerHTML = data
    .map(
      (q) => `
      <li class="quote-item">
        <span>${q.text}</span>
        <button class="delete-btn" onclick="deleteQuote(${q.id})">🗑️</button>
      </li>
    `
    )
    .join("");
}

// 📌 Add a new quote
async function addQuote() {
  const text = document.getElementById("quoteInput").value.trim();

  if (!text) return alert("Please enter a quote!");

  await fetch(`${API}/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  document.getElementById("quoteInput").value = "";
  loadQuotes();
}

// 📌 Delete quote
async function deleteQuote(id) {
  await fetch(`${API}/quotes/${id}`, { method: "DELETE" });
  loadQuotes();
}

// 🔥 Load quotes on page start
loadQuotes();
