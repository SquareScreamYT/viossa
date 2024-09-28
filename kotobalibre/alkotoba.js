fetch('words.json')
  .then(response => response.json())
  .then(data => {
    var wordTable = document.getElementById('wordTable');
    var contents = `
      <thead>
        <tr>
          <th>kotoba</th>
          <th>klani</th>
          <th>imi</th>
          <th>riso 1</th>
          <th>riso 2</th>
        </tr>
      </thead>
      <tbody>
    `;

    data.forEach(wordObject => {
      const wordKey = Object.keys(wordObject)[0];
      contents += `
        <tr>
          <td>${wordKey}</td>
          <td>${wordObject[wordKey].category.join(", ")}</td>
          <td>${wordObject[wordKey].definition}</td>
          <td>${wordObject[wordKey].image ? `<img src="${wordObject[wordKey].image}" height="50" width="auto">` : 'jam naj riso'}</td>
          <td>${wordObject[wordKey].image2 ? `<img src="${wordObject[wordKey].image2}" height="50" width="auto">` : 'jam naj riso'}</td>
        </tr>
      `;
    });

    console.log(contents);
    contents += '</tbody>';
    wordTable.innerHTML = contents;
  })
  .catch(error => console.error('Error: ', error));
