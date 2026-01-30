document.addEventListener("DOMContentLoaded", function() {
  var coll = document.getElementsByClassName("collapsible");
  for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var content = this.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
});}});

const now = new Date();
const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

const hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');
const year = now.getFullYear();
const month = now.getMonth()
const day = now.getDate();

const timetext = document.getElementById("time");

timetext.innerHTML = 
// per line: time, clock, now, past, future, morning, day, evening, night, day, hour, minute, second, week, month, year, yesterday, today, tomorrow
`tyd = 🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧<br>
tydkrăis = 🕓⏰⏳⏱<br><br>

imå = ${hours}:${minutes}:${seconds}<br>
⬅️🕰️ dân "îne dântyd"<br>
🕰️➡️ mirăj (îne mirăjtyd)<br><br>

🌅 — môra<br>
🏞️ — dâg<br>
🌆 — gvêl<br>
🌃 — naĉt/nakt<br><br>

dâg = ${day}/${month}/${year} 12:00 -> ${tomorrow.getDate()}/${tomorrow.getMonth()}/${tomorrow.getFullYear()} 12:00<br><br>

1 dâg = 24 džikan<br>
1 džikan = 60 fûn<br>
1 fûn = 60 šoj<br><br>

7 dâg = 1 ûjk<br>
28/29/30/31 dâg = 1 mwâj<br>
12 mwâj = 1 toši<br><br>

dântâg = ${yesterday.getDate()}/${yesterday.getMonth()}/${yesterday.getFullYear()}<br>
imåtâg = ${day}/${month}/${year}<br>
mirăitâg = ${tomorrow.getDate()}/${tomorrow.getMonth()}/${tomorrow.getFullYear()}
`

setInterval(function() {
  const now = new Date();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const year = now.getFullYear();
  const month = now.getMonth()
  const day = now.getDate();

  const timetext = document.getElementById("time");

  timetext.innerHTML = 
  // per line: time, clock, now, past, future, morning, day, evening, night, day, hour, minute, second, week, month, year, yesterday, today, tomorrow
  `tyd = 🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧<br>
  tydkrăis = 🕓⏰⏳⏱<br><br>

  imå = ${hours}:${minutes}:${seconds}<br>
  ⬅️🕰️ dân "îne dântyd"<br>
  🕰️➡️ mirăj (îne mirăjtyd)<br><br>

  🌅 — môra<br>
  🏞️ — dâg<br>
  🌆 — gvêl<br>
  🌃 — naĉt/nakt<br><br>

  ☀️ sôl<br>
  🌙 lûna<br><br>
  
  dâg = ${day}/${month}/${year} 12:00 -> ${tomorrow.getDate()}/${tomorrow.getMonth()}/${tomorrow.getFullYear()} 12:00<br><br>
  
  1 dâg = 24 džikan<br>
  1 džikan = 60 fûn<br>
  1 fûn = 60 šoj<br><br>

  7 dâg = 1 ûjk<br>
  28/29/30/31 dâg = 1 mwâj<br>
  12 mwâj = 1 toši<br><br>

  dântâg = ${yesterday.getDate()}/${yesterday.getMonth()}/${yesterday.getFullYear()}<br>
  imåtâg = ${day}/${month}/${year}<br>
  mirăitâg = ${tomorrow.getDate()}/${tomorrow.getMonth()}/${tomorrow.getFullYear()}<br><br>

  Dâgnamaj<br>
  Lundâg<br>
  Ajfrôjdâg<br>
  Melån-ujk<br>
  Airidâg<br>
  Jaidâg<br>
  Krendâg<br>
  Soldâg
  `
}, 1000);

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