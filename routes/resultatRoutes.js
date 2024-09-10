const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

/*
async function getData(html) {
    const $ = cheerio.load(html);
    const tableRows = $('table tr');
    const numberOfRows = tableRows.length;
    const rowData = [];
    const tabEquipe = [];
    const tabPts = [];
    const tabMjouer = [];
    const tabMgagne = [];
    const tabMperdu = [];
    const tabPMarque = [];
    const tabPEncaiss = [];
    const tabPDiff = [];
    tableRows.each((index, element) => {
        const row = $(element);
        if (index > 3 && index < numberOfRows - 3) {
            const equipe = row.find('td').eq(1);
            tabEquipe.push($(equipe).text().trim());
            const pts = row.find('td').eq(2);
            tabPts.push($(pts).text().trim());
            const MJouer = row.find('td').eq(3);
            tabMjouer.push($(MJouer).text().trim());
            const Mgagne = row.find('td').eq(4);
            tabMgagne.push($(Mgagne).text().trim());
            const Mperdu = row.find('td').eq(5);
            tabMperdu.push($(Mperdu).text().trim());
            const PMarque = row.find('td').eq(14);
            tabPMarque.push($(PMarque).text().trim());
            const PEncaiss = row.find('td').eq(15);
            tabPEncaiss.push($(PEncaiss).text().trim());
            const PDiff = row.find('td').eq(16);
            tabPDiff.push($(PDiff).text().trim());
        }
    });
    rowData.push(tabEquipe);
    rowData.push(tabPts);
    rowData.push(tabMjouer);
    rowData.push(tabMgagne);
    rowData.push(tabMperdu);
    rowData.push(tabPMarque);
    rowData.push(tabPEncaiss);
    rowData.push(tabPDiff);
    return rowData;
}
*/

async function getData(html) {
    const $ = cheerio.load(html);
    const tableRows = $('table tr');
    const numberOfRows = tableRows.length ;
    console.log(numberOfRows);
    const rowData = [];

    tableRows.each((index, element) => {
        const row = $(element);
        if (index > 2 && index < numberOfRows) {
            if ((index <= (numberOfRows / 2) && index % 2 === 1) || (index > (numberOfRows / 2) && index % 2 === 0)) {
                const tabRencontre = [];
                const date = row.find('td').eq(1);
                tabRencontre.push($(date).text().trim());
                const heure = row.find('td').eq(2);
                tabRencontre.push($(heure).text().trim());
                const domicile = row.find('td').eq(3);
                tabRencontre.push($(domicile).text().trim());
                const visiteur = row.find('td').eq(4);
                tabRencontre.push($(visiteur).text().trim());
                const resultat = row.find('td').eq(5);
                tabRencontre.push($(resultat).text().trim());
                rowData.push(tabRencontre);
            }
        }
    });
    return rowData;
}
router.get('/', async (req, res) => {
    try {
        const url = "https://resultats.ffbb.com/championnat/equipe/division/b5e621202149b5e621222fb9b5e6211d5f20.html";
        const response = await fetch(url);
        const data = await response.text();
        const rowData = await getData(data);
        //console.log(rowData);
        res.json(rowData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;