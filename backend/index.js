import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const file = "./data.json";

// GET quotes
app.get("/quotes", (req, res) => {
  const quotes = JSON.parse(fs.readFileSync(file));
  res.json(quotes);
});

// POST new quote
app.post("/quotes", (req, res) => {
  const quotes = JSON.parse(fs.readFileSync(file));
  const newQuote = { id: Date.now(), text: req.body.text };
  quotes.push(newQuote);
  fs.writeFileSync(file, JSON.stringify(quotes));
  res.json(newQuote);
});

// DELETE quote
app.delete("/quotes/:id", (req, res) => {
  let quotes = JSON.parse(fs.readFileSync(file));
  quotes = quotes.filter((q) => q.id != req.params.id);
  fs.writeFileSync(file, JSON.stringify(quotes));
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
