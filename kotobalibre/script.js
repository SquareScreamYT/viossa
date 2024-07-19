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

document.addEventListener('DOMContentLoaded', loadColorScheme);

document.addEventListener('DOMContentLoaded', function() {
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

        for (let c = 0; c < item[wordKey].category.length; c++) {
          categoriesFinal = "";
          categoriesFinal += item[wordKey].category[c];
        }

        button.addEventListener('click', () => {
          definitionsElement.innerHTML = `
            <h4>klani: ${categoriesFinal}</h4>
            <p>${item[wordKey].definition}</p>
            ${item[wordKey].image ? `<h4>riso:</h4>` : ''}
            ${item[wordKey].image ? `<img src="${item[wordKey].image}" height=200 width=auto>` : ''}
            ${item[wordKey].image2 ? `<img src="${item[wordKey].image2}" height=200 width=auto>` : ''}
            ${item[wordKey].image ? `<h5>riso f'<a href="https://freepik.com">Freepik</a></h5>` : ''}
          `;
          titleElement.innerHTML = wordKey;
        } );
        wordsContainer.appendChild(button);
      });
    })
    .catch(error => console.error('Error:', error));
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

document.addEventListener('DOMContentLoaded', function() {
  checkUrlAndSearch();
});

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
