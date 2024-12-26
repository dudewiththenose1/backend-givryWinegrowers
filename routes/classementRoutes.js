const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

// Liste des proxies
const proxies = [
    '154.213.193.195:3128',
    '154.213.203.64:3128',
    '156.253.178.249:3128',
    '154.213.198.169:3128',
    '156.253.176.193:3128',
    '156.253.178.210:3128',
    '45.202.76.120:3128',
    '154.213.194.89:3128',
    '156.253.179.15:3128',
    '156.253.176.124:3128',
    '154.213.204.82:3128',
];




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


async function fetchPage(config) {
    try {
        const response = await axios.request(config);
        if (response.data && response.data.data) {
            if (response.data.data.browserHtml) {
                console.log('Browser HTML fetched successfully.');
                return response.data.data.browserHtml;
            } else if (response.data.data.httpResponseBody) {
                const decodedBody = Buffer.from(response.data.data.httpResponseBody, 'base64').toString();
                console.log('HTTP Response Body fetched successfully.');
                return decodedBody;
            } else {
                console.log('Unexpected response structure:', response.data);
                return null;
            }
        } else {
            console.log('Invalid response structure:', response);
            return null;
        }
    } catch (error) {
        console.error('Error in fetchPage:', error.message);
        throw error;
    }
}

router.get('/', async (req, res) => {
    try {
        let data = JSON.stringify({
            "url": "https://resultats.ffbb.com/championnat/classements/b5e621202149b5e621222fb9.html",
            "httpResponseBody": true
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.proxyscrape.com/v3/accounts/freebies/scraperapi/request',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': '03503d14-8042-4460-845c-d3e1d3889f27'
            },
            data: data
        };
        const html = await fetchPage(config);

        if (!html) {
            throw new Error('Failed to fetch HTML content.');
        }
        const rowData = await getClassementData(html);

        res.json(rowData);
    } catch (error) {
        console.error('Error during scraping:', error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get('/resultat', async (req, res) => {
    try {
        const data = JSON.stringify({
            "url": "https://resultats.ffbb.com/championnat/equipe/division/b5e621202149b5e621222fb9b5e6211d5f20.html",
            "httpResponseBody": true
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.proxyscrape.com/v3/accounts/freebies/scraperapi/request',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': '03503d14-8042-4460-845c-d3e1d3889f27'
            },
            data: data
        };
        const html = await fetchPage(config);

        if (!html) {
            throw new Error('Failed to fetch HTML content for results.');
        }

        const rowData = await getResultatData(html);

        res.json(rowData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;