function parseWikiTables(wikiText) {
  console.log("Input length:", wikiText.length);
  
  const sections = wikiText.split(/====\s*([A-Z0-9\/]+)\s*====/)
    .filter(Boolean);
  console.log("Found sections:", sections.length);
  
  let result = [];
  
  // Find all tables directly
  const tables = wikiText.match(/{.*?class="wikitable".*?\|\}/gs);
  console.log("Found tables:", tables?.length);
  
  if (!tables) return "[]";
  
  tables.forEach(table => {
    const rows = table.split('|-')
      .filter(row => row.includes('||'));
      
    rows.forEach(row => {
      const cells = row.split('||')
        .map(cell => cell.replace(/[\|\{\}]/g, '').trim())
        .filter(Boolean);
        
      if (cells.length >= 3 && !cells[0].startsWith('!')) {
        const word = cells[0].replace(/\[\[.*?\]\]/g, '').trim();
        const category = cells[2];
        const definition = cells[3] || '';
        
        if (word) {
          result.push({
            [word]: {
              category: [category],
              definition: `${word}<br><br>${definition}`
            }
          });
        }
      }
    });
  });
  
  return JSON.stringify(result, null, 2);
}

//update with https://vikoli.org/index.php?title=Kotobalibre&action=edit 
const wikiText = `

`;

console.log(parseWikiTables(wikiText));
