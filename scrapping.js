const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.text();
    const rowData = await getData(data);
    console.log(rowData);

}

fetchData("https://resultats.ffbb.com/championnat/classements/b5e621202149b5e621222fb9.html")

async function getData(html) {
    const $ = cheerio.load(html);
    const tableRows = $('table tr');
    const numberOfRows = tableRows.length;
    const rowData = [];
    
    tableRows.each((index, element) => {
        const row = $(element);
        if (index > 3 && index < numberOfRows - 3) {
            const equipeData = {
                equipe: row.find('td').eq(1).text().trim(),
                pts: row.find('td').eq(2).text().trim(),
                MJouer: row.find('td').eq(3).text().trim(),
                Mgagne: row.find('td').eq(4).text().trim(),
                Mperdu: row.find('td').eq(5).text().trim(),
                PMarque: row.find('td').eq(14).text().trim(),
                PEncaiss: row.find('td').eq(15).text().trim(),
                PDiff: row.find('td').eq(16).text().trim()
            };
            rowData.push(equipeData);
        }
    });
    return JSON.stringify(rowData, null, 2);;
}