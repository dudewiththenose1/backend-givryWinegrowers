const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');


async function getClassementData(html) {
    const $ = cheerio.load(html);
    const tableRows = $('table tr');
    const numberOfRows = tableRows.length;
    const rowData = [];
    
    tableRows.each((index, element) => {
        const row = $(element);
        if (index > 3 && index < numberOfRows - 4) {
            const tabEquipe = [];
            const equipe = row.find('td').eq(1);
            tabEquipe.push($(equipe).text().trim());
            const pts = row.find('td').eq(2);
            tabEquipe.push($(pts).text().trim());
            const MJouer = row.find('td').eq(3);
            tabEquipe.push($(MJouer).text().trim());
            const Mgagne = row.find('td').eq(4);
            tabEquipe.push($(Mgagne).text().trim());
            const Mperdu = row.find('td').eq(5);
            tabEquipe.push($(Mperdu).text().trim());
            const PMarque = row.find('td').eq(14);
            tabEquipe.push($(PMarque).text().trim());
            const PEncaiss = row.find('td').eq(15);
            tabEquipe.push($(PEncaiss).text().trim());
            const PDiff = row.find('td').eq(16);
            tabEquipe.push($(PDiff).text().trim());
            rowData.push(tabEquipe);
        }
    });
    return rowData;
}

async function getResultatData(html) {
    const $ = cheerio.load(html);
    const tableRows = $('table tr');
    const numberOfRows = tableRows.length;
    const rowData = [];

    tableRows.each((index, element) => {
        const row = $(element);
        if ((index > 2 && index < numberOfRows / 2 && index % 2 === 1) || (index > numberOfRows / 2 && index < numberOfRows && index % 2 === 0)) {
            const tabMatch = [];
            const date = row.find('td').eq(1);
            tabMatch.push($(date).text().trim());

            const heure = row.find('td').eq(2);
            tabMatch.push($(heure).text().trim());

            const domicile = row.find('td').eq(3);
            tabMatch.push($(domicile).text().trim());

            const exterieur = row.find('td').eq(4);
            tabMatch.push($(exterieur).text().trim());

            const resultat = row.find('td').eq(5);
            tabMatch.push($(resultat).text().trim());

            rowData.push(tabMatch);
        }
    });
    return rowData;
}


async function fetchPage(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Accept-Language': 'en-US,en;q=0.9',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch page: ${error.message}`);
    }
}

router.get('/', async (req, res) => {
    const url = 'https://resultats.ffbb.com/championnat/classements/b5e621202149b5e621222fb9.html';

    try {
        console.log('Starting scraping process...');
        const html = await fetchPage(url);
        console.log('HTML fetched successfully.');

        const rowData = await getClassementData(html);
        console.log('Scraping completed:', rowData);

        res.json(rowData);
    } catch (error) {
        console.error('Error during scraping:', error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get('/resultat', async (req, res) => {
    try {
        const url = "https://resultats.ffbb.com/championnat/equipe/division/b5e621202149b5e621222fb9b5e6211d5f20.html";
        const response = await fetchPage(url);
        const data = await response.text();
        const rowData = await getResultatData(data);
        res.json(rowData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/test', async (req, res) => {
    try {
        const response = await fetch('https://resultats.ffbb.com');
        const data = await response.text();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;