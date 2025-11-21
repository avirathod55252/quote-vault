
const API = "http://localhost:5000";

async function loadQuotes() {
  const res = await fetch(API + "/quotes");
  const data = await res.json();

  document.getElementById("quoteList").innerHTML =
    data.map(q => `<li>${q.text} 
    <button onclick="deleteQuote(${q.id})">X</button>
    </li>`).join("");
}

async function addQuote() {
  const text = document.getElementById("quoteInput").value;
  await fetch(API + "/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  loadQuotes();
}

async function deleteQuote(id) {
  await fetch(API + "/quotes/" + id, { method: "DELETE" });
  loadQuotes();
}

loadQuotes();
