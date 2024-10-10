// i like this json sorter
// it also beautifulieses it or whatever the word is
// https://novicelab.org/jsonabc/
// gu
// also use tab for indentation otherwise it look too wide
// ok the end

// Color scheme functions
function changeColorScheme() {
  var selectedScheme = document.getElementById('color-scheme').value;
  document.body.className = selectedScheme + '-scheme';
  localStorage.setItem('colorScheme', selectedScheme);
}

function loadColorScheme() {
  var savedScheme = localStorage.getItem('colorScheme');
  if (savedScheme) {
    document.body.className = savedScheme + '-scheme';
    document.getElementById('color-scheme').value = savedScheme;
  }
}

// Category and filtering functions
function populateCategoryDropdown() {
  const categorySet = new Set();
  const categoryCheckboxes = document.getElementById('category-checkboxes');

  fetch('words.json')
    .then(response => response.json())
    .then(data => {
      wordsData = data; // Store the data globally
      data.forEach(item => {
        const categories = Object.values(item)[0].category;
        categories.forEach(category => categorySet.add(category));
      });

      Array.from(categorySet).sort().forEach(category => {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'checkbox-wrapper';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `category-${category}`;
        checkbox.value = category;
        checkbox.checked = true;

        // Add event listener to each checkbox
        checkbox.addEventListener('change', () => {
          const selectedCategories = Array.from(document.querySelectorAll('#category-checkboxes input:checked')).map(cb => cb.value);
          filterWords(selectedCategories);
        });

        const label = document.createElement('label');
        label.htmlFor = `category-${category}`;
        label.textContent = category;

        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(label);
        categoryCheckboxes.appendChild(checkboxWrapper);
        checkbox.addEventListener('change', applyFilters);
      });

      populateWordList(data); // Populate the word list initially
    });

  document.getElementById('category-filter-button').addEventListener('click', showCategoryPopup);
  document.getElementById('apply-filters').addEventListener('click', applyFilters);
  document.getElementById('fuzzy-search-toggle').addEventListener('change', applyFilters);
  document.getElementById('apply-filters').addEventListener('click', closeCategoryPopup);
}

function closeCategoryPopup() {
  document.getElementById('category-popup').style.display = 'none';
}

function showCategoryPopup() {
  document.getElementById('category-popup').style.display = 'block';
}

function applyFilters() {
  const selectedCategories = Array.from(document.querySelectorAll('#category-checkboxes input:checked')).map(cb => cb.value);
  const fuzzySearch = document.getElementById('fuzzy-search-toggle').checked;
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const buttons = document.getElementsByClassName('word-button');

  Array.from(buttons).forEach(button => {
    const word = button.textContent;
    const wordData = wordsData.find(item => Object.keys(item)[0] === word);
    const categories = wordData[word].category;

    const categoryMatch = selectedCategories.length === 0 || categories.some(cat => selectedCategories.includes(cat));
    const searchMatch = fuzzySearch 
      ? calculateRelevanceScore(word, wordData[word].definition, searchTerm) > 0 
      : word.toLowerCase().startsWith(searchTerm);

    button.style.display = (categoryMatch && (searchMatch || searchTerm === '')) ? 'block' : 'none';
  });
}


function filterWords(selectedCategories) {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const buttons = document.getElementsByClassName('word-button');

  Array.from(buttons).forEach(button => {
    const word = button.textContent;
    const wordData = wordsData.find(item => Object.keys(item)[0] === word);
    const categories = wordData[word].category;

    const categoryMatch = selectedCategories.length === 0 || categories.some(cat => selectedCategories.includes(cat));
    const searchMatch = word.toLowerCase().startsWith(searchTerm);

    button.style.display = (categoryMatch && (searchMatch || searchTerm === '')) ? 'block' : 'none';
  });
}

// Word list and details functions
function populateWordList(data) {
  const wordsContainer = document.getElementById('wordList');
  wordsContainer.innerHTML = ''; // Clear existing content

  const sortedWords = data.map(item => ({
    word: Object.keys(item)[0],
    data: Object.values(item)[0]
  })).sort((a, b) => a.word.localeCompare(b.word));

  sortedWords.forEach((item) => {
    const button = document.createElement('button');
    button.className = 'word-button';
    button.textContent = item.word;
    button.addEventListener('click', () => {
      displayWordDetails(item);
    });
    wordsContainer.appendChild(button);
  });
}

function displayWordDetails(item) {
  const definitionsElement = document.getElementById('wordDetails');
  const titleElement = document.getElementById('wordName');

  definitionsElement.innerHTML = `
    <h4>klani: ${item.data.category.join(", ")}</h4>
    <p>${item.data.definition}</p>
    ${item.data.image ? `<h4>riso:</h4>` : ''}
    ${item.data.image ? `<img src="${item.data.image}" height=200 width=auto>` : ''}
    ${item.data.image2 ? `<img src="${item.data.image2}" height=200 width=auto>` : ''}
    ${item.data.image ? `<h5>riso f'<a href="https://freepik.com">Freepik</a></h5>` : ''}
  `;
  titleElement.innerHTML = item.word;
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', function() {
  loadColorScheme();
  populateCategoryDropdown();
  checkUrlAndSearch();

  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', applyFilters);
});

const filterButton = document.getElementById('category-filter-button');
filterButton.style.display = 'block';

const wordsContainer = document.getElementById('wordList');
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', filterWords);

// Fuzzy search functions
function filterWords() {
  const searchTerm = searchInput.value.toLowerCase();
  const buttons = document.getElementsByClassName('word-button');
  const threshold = 2; // Adjust this value to change the sensitivity
  const maxResults = 10; // Maximum number of results to display

  if (searchTerm === '') {
    Array.from(buttons).forEach(button => {
      button.style.display = 'block';
      button.style.order = 0;
    });
    return;
  }

  const scoredWords = wordsData.map(item => {
    const word = Object.keys(item)[0];
    const definition = item[word].definition;
    const score = calculateRelevanceScore(word, definition, searchTerm);
    return { word, score };
  });

  scoredWords.sort((a, b) => b.score - a.score);

  let displayedCount = 0;
  Array.from(buttons).forEach(button => {
    const word = button.textContent;
    const index = scoredWords.findIndex(item => item.word === word);
    const score = scoredWords[index].score;

    if (score >= threshold && (displayedCount < maxResults || score > 10 || word.toLowerCase() === searchTerm)) {
      button.style.order = index;
      button.style.display = 'block';
      displayedCount++;
    } else {
      button.style.display = 'none';
    }
  });
}

function calculateRelevanceScore(word, definition, searchTerm) {
  let score = 0;
  const wordLower = word.toLowerCase();
  const definitionLower = definition.toLowerCase();
  const normalizedWord = normalizeDigraphs(wordLower);
  const normalizedSearchTerm = normalizeDigraphs(searchTerm);

  // Check if the normalized word starts with the normalized search term
  if (normalizedWord.startsWith(normalizedSearchTerm)) {
    score += 10;
  }

  // Check if the normalized word contains the normalized search term
  if (normalizedWord.includes(normalizedSearchTerm)) {
    score += 5;
  }

  // Check if the normalized definition contains the normalized search term
  if (normalizeDigraphs(definitionLower).includes(normalizedSearchTerm)) {
    score += 3;
  }

  // Calculate the Levenshtein distance for the normalized word
  const wordDistance = levenshteinDistance(normalizedWord, normalizedSearchTerm);
  score += Math.max(0, 5 - wordDistance);

  return score;
}

function normalizeDigraphs(text) {
  const digraphs = {
    'ph': 'f',
    'ch': 'c',
    'tj': 'c',
    'sh': 'sj',
    'zh': 'zj',
    'dzh': 'dj',
  };

  Object.entries(digraphs).forEach(([digraph, replacement]) => {
    text = text.replace(new RegExp(digraph, 'g'), replacement);
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

// URL and search functions
function checkUrlAndSearch() {
  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.searchParams;

  if (searchParams.has('kotoba')) {
    const searchWord = searchParams.get('kotoba');
    if (searchWord) {
      loadWordDetails(searchWord);
    }
  }
}

function loadWordDetails(word) {
  fetch('words.json')
    .then(response => response.json())
    .then(data => {
      const wordObject = data.find(item => Object.keys(item)[0].toLowerCase() === word.toLowerCase());

      if (wordObject) {
        const wordKey = Object.keys(wordObject)[0];
        const definitionsElement = document.getElementById('wordDetails');
        const titleElement = document.getElementById('wordName');

        definitionsElement.innerHTML = `
          <h4>klani: ${wordObject[wordKey].category.join(", ")}</h4>
          <p>${wordObject[wordKey].definition}</p>
          ${wordObject[wordKey].image ? `<h4>riso:</h4>` : ''}
          ${wordObject[wordKey].image ? `<img src="${wordObject[wordKey].image}" height=200 width=auto>` : ''}
          ${wordObject[wordKey].image2 ? `<img src="${wordObject[wordKey].image2}" height=200 width=auto>` : ''}
          ${wordObject[wordKey].image ? `<h5>riso f'<a href="https://freepik.com">Freepik</a></h5>` : ''}
        `;
        titleElement.innerHTML = wordKey;
      } else {
        console.log('kotoba naj jam.');
      }
    })
    .catch(error => console.error('Error:', error));
}

function copyURL() {
  var wordName = document.getElementById("wordName").textContent;
  var url = new URL(window.location.href);
  url.searchParams.set("kotoba", wordName);
  var newUrl = url.toString();

  navigator.clipboard.writeText(newUrl)
    .then(() => {
      window.location.href = newUrl;
    })
    .catch(err => {
      console.error(err);
    });
}

// Custom alert function
function customAlert(message) {
  const alertBox = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');
  const closeButton = document.getElementById('closeAlert');

  alertMessage.innerHTML = message;
  alertBox.style.display = 'block';

  closeButton.onclick = function() {
    alertBox.style.display = 'none';
  }

  alertBox.onclick = function(event) {
    if (event.target === alertBox) {
      alertBox.style.display = 'none';
    }
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      alertBox.style.display = 'none';
    }
  });
}

// Global variables and data loading
let wordsData;

fetch('words.json')
  .then(response => response.json())
  .then(data => {
    wordsData = data;
  });

// Statistics functions
function countWords(data) {
  return data.length;
}

function countTotalImages(data) {
  let imageCount = 0;
  data.forEach(item => {
    const word = Object.values(item)[0];
    if (word.image) imageCount++;
    if (word.image2) imageCount++;
  });
  return imageCount;
}

function showStats() {
  if (wordsData) {
    customAlert(`jam ${countWords(wordsData)} kotoba<br>jam ${countTotalImages(wordsData)} riso`);
  } else {
    console.log('Data not loaded yet');
  }
}

function calculateRelevanceScore(word, definition, searchTerm) {
  let score = 0;
  const wordLower = word.toLowerCase();
  const definitionLower = definition.toLowerCase();

  // Check if the word starts with the search term
  if (wordLower.startsWith(searchTerm)) {
    score += 10;
  }

  // Check if the word contains the search term
  if (wordLower.includes(searchTerm)) {
    score += 5;
  }

  // Check if the definition contains the search term
  if (definitionLower.includes(searchTerm)) {
    score += 3;
  }

  // Calculate the Levenshtein distance
  const distance = levenshteinDistance(wordLower, searchTerm);
  score += Math.max(0, 5 - distance);

  return score;
}

// Helper function to calculate Levenshtein distance
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