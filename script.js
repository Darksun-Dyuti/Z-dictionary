const wordInput = document.getElementById("word-input");
const result = document.getElementById("result");
const themeToggle = document.getElementById("theme-toggle");
const suggestionsBox = document.getElementById("suggestions");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

async function fetchSuggestions(query) {
  const url = `https://api.datamuse.com/sug?s=${query}`;
  const res = await fetch(url);
  return res.json();
}

async function showSuggestions(query) {
  if (query.length < 2) {
    suggestionsBox.style.display = "none";
    return;
  }

  const suggestions = await fetchSuggestions(query);
  if (suggestions.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  suggestionsBox.innerHTML = suggestions
    .slice(0, 7)
    .map(s => `<div class="suggestion-item">${s.word}</div>`)
    .join("");
  suggestionsBox.style.display = "block";
}

async function getDefinition(word) {
  result.innerHTML = `<p class="info">Searching for "${word}"...</p>`;
  suggestionsBox.style.display = "none";

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error("Word not found");

    const data = await res.json();
    const meaning = data[0].meanings[0];
    const definition = meaning.definitions[0].definition;
    const example = meaning.definitions[0].example || "No example available.";
    const phonetic = data[0].phonetic || "";
    const audio = data[0].phonetics.find(p => p.audio)?.audio || "";

    result.innerHTML = `
      <h2>${word}</h2>
      <p class="phonetic">${phonetic}</p>
      ${audio ? `<audio controls src="${audio}"></audio>` : ""}
      <h3>Definition:</h3>
      <p>${definition}</p>
      <h3>Example:</h3>
      <p>${example}</p>
    `;
  } catch (error) {
    result.innerHTML = `<p class="info">❌ ${error.message}</p>`;
  }
}

wordInput.addEventListener("input", e => showSuggestions(e.target.value));

suggestionsBox.addEventListener("click", e => {
  if (e.target.classList.contains("suggestion-item")) {
    const word = e.target.textContent;
    wordInput.value = word;
    getDefinition(word);
  }
});

wordInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    getDefinition(wordInput.value.trim());
  }
});
