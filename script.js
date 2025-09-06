
const toggle = document.getElementById("modeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


async function searchWord() {
  const word = document.getElementById('wordInput').value.trim();
  const resultDiv = document.getElementById('result');
  if (!word) {
    resultDiv.innerHTML = "Please enter a word.";
    return;
  }
  resultDiv.innerHTML = "Loading...";
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error("Word not found");
    const data = await response.json();


    let output = `<h2>${data[0].word}</h2>`;
    if (data[0].phonetics && data[0].phonetics[0]?.text) {
      output += `<p><i>Pronunciation:</i> ${data[0].phonetics[0].text}</p>`;
    }


    data[0].meanings.forEach((meaning, i) => {
      output += `<h3>${i + 1}. ${meaning.partOfSpeech}</h3>`;
      meaning.definitions.forEach((def, j) => {
        output += `<p><b>Definition ${j + 1}:</b> ${def.definition}</p>`;
        if (def.example) {
          output += `<p><i>Example:</i> ${def.example}</p>`;
        }
        if (def.synonyms && def.synonyms.length > 0) {
          output += `<p><i>Synonyms:</i> ${def.synonyms.join(", ")}</p>`;
        }
      });
    });

    resultDiv.innerHTML = output;
  } catch (error) {
    resultDiv.innerHTML = "Word not found. Try another word.";
  }
}

document.getElementById("searchBtn").addEventListener("click", searchWord);

document.getElementById("wordInput").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    searchWord();
  }
});