// i like this json sorter
// it also beautifulieses it or whatever the word is
// https://novicelab.org/jsonabc/
// gu
// also use tab for indentation otherwise it look too wide
// ok the end
// make code pretty
// https://prettier.io/playground

let wordsData;

// Color scheme handling
function changeColorScheme() {
  const selectedScheme = document.getElementById("color-scheme").value;
  document.body.className = selectedScheme + "-scheme";
  localStorage.setItem("colorScheme", selectedScheme);
}

function loadColorScheme() {
  const savedScheme = localStorage.getItem("colorScheme");
  if (savedScheme) {
    document.body.className = savedScheme + "-scheme";
    document.getElementById("color-scheme").value = savedScheme;
  }
}

// Category handling
function populateCategoryDropdown() {
  const categorySet = new Set();
  const categoryCheckboxes = document.getElementById("category-checkboxes");

  fetch("words.json")
    .then((response) => response.json())
    .then((data) => {
      wordsData = data;
      data.forEach((item) => {
        const categories = Object.values(item)[0].category;
        categories.forEach((category) => categorySet.add(category));
      });

      Array.from(categorySet)
        .sort()
        .forEach((category) => {
          const checkboxWrapper = document.createElement("div");
          checkboxWrapper.className = "checkbox-wrapper";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = `category-${category}`;
          checkbox.value = category;
          checkbox.checked = true;
          checkbox.addEventListener("change", applyFilters);

          const label = document.createElement("label");
          label.htmlFor = `category-${category}`;
          label.textContent = category;

          checkboxWrapper.appendChild(checkbox);
          checkboxWrapper.appendChild(label);
          categoryCheckboxes.appendChild(checkboxWrapper);
        });

      populateWordList(data);
    });
}

function checkAllCategories() {
  const checkboxes = document.querySelectorAll('#category-checkboxes input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });
  applyFilters();
}

function uncheckAllCategories() {
  const checkboxes = document.querySelectorAll('#category-checkboxes input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  applyFilters();
}

// Search and filter functionality
function applyFilters() {
  const selectedCategories = Array.from(
    document.querySelectorAll("#category-checkboxes input:checked")
  ).map((cb) => cb.value);
  const fuzzySearch = document.getElementById("fuzzy-search-toggle").checked;
  const searchDescription = document.getElementById("search-description").checked;
  const fuzzyStrength = parseInt(document.getElementById("fuzzy-strength").value);
  const searchTerm = document.getElementById("search").value.toLowerCase();
  
  // Create array of buttons with their scores
  const buttonArray = Array.from(document.getElementsByClassName("word-button"));
  
  buttonArray.forEach(button => {
    const word = button.textContent;
    const wordData = wordsData.find((item) => Object.keys(item)[0] === word);
    const categories = wordData[word].category;
    
    button.relevanceScore = calculateRelevanceScore(word, searchDescription ? wordData[word].definition : "", searchTerm);
    
    const categoryMatch = selectedCategories.length === 0 || 
                         categories.some((cat) => selectedCategories.includes(cat));
    const searchMatch = fuzzySearch
      ? button.relevanceScore > 10 / fuzzyStrength
      : word.toLowerCase().includes(searchTerm);
      
    button.style.display = categoryMatch && (searchMatch || searchTerm === "") ? "block" : "none";
  });

  // Sort visible buttons by relevance score if there's a search term, otherwise restore alphabetical order
  if (searchTerm) {
    buttonArray
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .forEach(button => button.parentNode.appendChild(button));
  } else {
    buttonArray
      .sort((a, b) => a.textContent.localeCompare(b.textContent))
      .forEach(button => button.parentNode.appendChild(button));
  }
}

// Word display and population
function populateWordList(data) {
  const wordsContainer = document.getElementById("wordList");
  wordsContainer.innerHTML = "";

  const sortedWords = data
    .map((item) => ({
      word: Object.keys(item)[0],
      data: Object.values(item)[0],
    }))
    .sort((a, b) => a.word.localeCompare(b.word));

  sortedWords.forEach((item) => {
    const button = document.createElement("button");
    button.className = "word-button";
    button.textContent = item.word;
    button.addEventListener("click", () => displayWordDetails(item));
    wordsContainer.appendChild(button);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadColorScheme();
  populateCategoryDropdown();
  checkUrlAndSearch();

  // Event listeners
  document.getElementById("search").addEventListener("input", applyFilters);
  document.getElementById("category-filter-button").addEventListener("click", () => {
    document.getElementById("category-popup").style.display = "block";
  });
  document.getElementById("apply-filters").addEventListener("click", () => {
    document.getElementById("category-popup").style.display = "none";
    applyFilters();
  });
  document.getElementById("fuzzy-search-toggle").addEventListener("change", applyFilters);
  document.getElementById("fuzzy-strength").addEventListener("input", applyFilters);
  document.getElementById("search-description").addEventListener("change", applyFilters);
  document.getElementById("check-all").addEventListener("click", checkAllCategories);
  document.getElementById("uncheck-all").addEventListener("click", uncheckAllCategories);
});

// Utility functions
function calculateRelevanceScore(word, definition, searchTerm) {
  let score = 0;
  const wordLower = word.toLowerCase();
  const definitionLower = definition.toLowerCase();
  const normalizedWord = normalizeDigraphs(wordLower);
  const normalizedSearchTerm = normalizeDigraphs(searchTerm);
  const fuzzyStrength = parseInt(document.getElementById("fuzzy-strength").value);

  if (normalizedWord == normalizedSearchTerm) {
    score += 15 * fuzzyStrength;
  }

  if (normalizedWord.startsWith(normalizedSearchTerm)) {
    score += 10 * fuzzyStrength;
  }

  if (normalizedWord.includes(normalizedSearchTerm)) {
    score += 8 * fuzzyStrength;
  }

  if (normalizeDigraphs(definitionLower).includes(normalizedSearchTerm)) {
    score += 3 * fuzzyStrength;
  }

  const distance = levenshteinDistance(normalizedWord, normalizedSearchTerm);
  score += Math.max(0, fuzzyStrength * (5 - distance));

  return score;
}

function normalizeDigraphs(text) {
  const digraphs = {
    ph: "f",
    ch: "c",
    tj: "c",
    sh: "sj",
    zh: "zj",
    dzh: "dj",
  };

  Object.entries(digraphs).forEach(([digraph, replacement]) => {
    text = text.replace(new RegExp(digraph, "g"), replacement);
  });

  return text;
}

function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Word details and URL handling
function displayWordDetails(item) {
  const definitionsElement = document.getElementById("wordDetails");
  const titleElement = document.getElementById("wordName");

  definitionsElement.innerHTML = `
    <h4>klani: ${item.data.category.join(", ")}</h4>
    <p>${item.data.definition}</p>
    ${item.data.image ? `<h4>riso:</h4>` : ""}
    ${item.data.image ? `<img src="${item.data.image}" height=200 width=auto>` : ""}
    ${item.data.image2 ? `<img src="${item.data.image2}" height=200 width=auto>` : ""}
    ${item.data.image ? `<h5>riso f'<a href="https://freepik.com">Freepik</a></h5>` : ""}
  `;
  titleElement.innerHTML = item.word;
}

function checkUrlAndSearch() {
  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.searchParams;

  if (searchParams.has("kotoba")) {
    const searchWord = searchParams.get("kotoba");
    if (searchWord) {
      loadWordDetails(searchWord);
    }
  }
}

function loadWordDetails(word) {
  fetch("words.json")
    .then((response) => response.json())
    .then((data) => {
      const wordObject = data.find(
        (item) => Object.keys(item)[0].toLowerCase() === word.toLowerCase()
      );

      if (wordObject) {
        const wordKey = Object.keys(wordObject)[0];
        displayWordDetails({
          word: wordKey,
          data: wordObject[wordKey]
        });
      } else {
        console.log("kotoba naj jam.");
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Stats and alerts
function showStats() {
  if (wordsData) {
    customAlert(
      `jam ${countWords(wordsData)} kotoba<br>jam ${countTotalImages(wordsData)} riso`
    );
  }
}

function countWords(data) {
  return data.length;
}

function countTotalImages(data) {
  let imageCount = 0;
  data.forEach((item) => {
    const word = Object.values(item)[0];
    if (word.image) imageCount++;
    if (word.image2) imageCount++;
  });
  return imageCount;
}

function customAlert(message) {
  const alertBox = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");
  const closeButton = document.getElementById("closeAlert");

  alertMessage.innerHTML = message;
  alertBox.style.display = "block";

  closeButton.onclick = () => alertBox.style.display = "none";
  alertBox.onclick = (event) => {
    if (event.target === alertBox) {
      alertBox.style.display = "none";
    }
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      alertBox.style.display = "none";
    }
  });
}

function copyURL() {
  const wordName = document.getElementById("wordName").textContent;
  const url = new URL(window.location.href);
  url.searchParams.set("kotoba", wordName);
  const newUrl = url.toString();

  navigator.clipboard
    .writeText(newUrl)
    .then(() => {
      window.location.href = newUrl;
    })
    .catch((err) => {
      console.error(err);
    });
}
