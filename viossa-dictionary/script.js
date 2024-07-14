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
        button.addEventListener('click', () => {
          definitionsElement.innerHTML = `
            <p>Definition 1: ${item[wordKey].definition1}</p>
            <p>Definition 2: ${item[wordKey].definition2}</p>
          `;
          titleElement.innerHTML = wordKey;
        });
        wordsContainer.appendChild(button);
      });
    })
    .catch(error => console.error('Error:', error));
});

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