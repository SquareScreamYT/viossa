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

function populateCategoryDropdown() {
  const categorySet = new Set();
  const categoryDropdown = document.getElementById('category-filter');

  fetch('words.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const categories = Object.values(item)[0].category;
        categories.forEach(category => categorySet.add(category));
      });

      Array.from(categorySet).sort().forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
      });
    });

  categoryDropdown.addEventListener('change', filterWordsByCategory);
}

function filterWordsByCategory() {
  const selectedCategory = document.getElementById('category-filter').value;
  const buttons = document.getElementsByClassName('word-button');

  Array.from(buttons).forEach(button => {
    if (selectedCategory === 'all') {
      button.style.display = 'block';
    } else {
      fetch('words.json')
        .then(response => response.json())
        .then(data => {
          const word = button.textContent;
          const wordData = data.find(item => Object.keys(item)[0] === word);
          const categories = wordData[word].category;
          button.style.display = categories.includes(selectedCategory) ? 'block' : 'none';
        });
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadColorScheme();
  populateCategoryDropdown();

  fetch('words.json')
    .then(response => response.json())
    .then(data => {
      const wordsContainer = document.getElementById('wordList');
      const definitionsElement = document.getElementById('wordDetails');
      const titleElement = document.getElementById('wordName');
      
      data.forEach((item) => {
        const wordKey = Object.keys(item)[0];
        const button = document.createElement('button');
        button.className = 'word-button';
        button.textContent = wordKey;
        button.addEventListener('click', () => {
          definitionsElement.innerHTML = `
            <h4>klani: ${item[wordKey].category.join(", ")}</h4>
            <p>${item[wordKey].definition}</p>
            ${item[wordKey].image ? `<h4>riso:</h4>` : ''}
            ${item[wordKey].image ? `<img src="${item[wordKey].image}" height=200 width=auto>` : ''}
            ${item[wordKey].image2 ? `<img src="${item[wordKey].image2}" height=200 width=auto>` : ''}
            ${item[wordKey].image ? `<h5>riso f'<a href="https://freepik.com">Freepik</a></h5>` : ''}
          `;
          titleElement.innerHTML = wordKey;
        });
        wordsContainer.appendChild(button);
      });
    })
    .catch(error => console.error('Error:', error));

  checkUrlAndSearch();
});

const wordsContainer = document.getElementById('wordList');
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', filterWords);

function filterWords() {
  const searchTerm = searchInput.value.toLowerCase();
  const buttons = wordsContainer.getElementsByClassName('word-button');
  
  Array.from(buttons).forEach(button => {
    const word = button.textContent.toLowerCase();
    if (word.includes(searchTerm)) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });
}

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
          <h4>klani: ${item[wordKey].category.join(", ")}</h4>
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

function customAlert(message) {
  const alertBox = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');
  const closeButton = document.getElementById('closeAlert');

  alertMessage.textContent = message;
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
  customAlert(`jam ${countWords(JSON.parse('words.json'))} kotoba<br>jam ${countTotalImages(JSON.parse('words.json'))} riso`);
}