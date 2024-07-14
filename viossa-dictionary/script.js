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
      const wordsContainer = document.getElementById('sidebar');
      const definitionsElement = document.getElementById('wordDetails');
      
      data.forEach((item, index) => {
        const button = document.createElement('button');
        button.textContent = item.word;
        button.addEventListener('click', () => {
          definitionsElement.innerHTML = `
            <p>Definition 1: ${item.word.definition1}</p>
            <p>Definition 2: ${item.word.definition2}</p>
          `;
        });
        wordsContainer.appendChild(button);
      });
    })
    .catch(error => console.error('Error:', error));
});
