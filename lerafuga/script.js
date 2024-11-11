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

function redirect(page) {
  window.location.href = page;
}

let currentWordIndex = 0;
let words = [];

async function loadWords() {
  const response = await fetch('data/varge.json');
  const data = await response.json();
  words = data;
  showWord();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showWord() {
  const word = Object.entries(words[currentWordIndex])[0];
  const [correctWord, data] = word;
  
  const questionDiv = document.getElementById('question');
  questionDiv.style.backgroundColor = data.color;
  
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  
  let options = [correctWord, ...data.options];
  options = shuffleArray(options);
  
  options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'option-button';
    button.textContent = option;
    button.onclick = () => checkAnswer(option, correctWord);
    optionsDiv.appendChild(button);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    showWord();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadColorScheme();
  loadWords();
});
