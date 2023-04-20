const puppeteer = require('puppeteer');
//const url = "https://www.reed.co.uk//jobs/software-engineer/50177810?source=searchResults&filter=%2fjobs%2fsoftware-engineer-jobs"

async function jobDescription(url) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            '--start-maximized'
        ]
    })

    const page = await browser.newPage();
    await page.goto(url);

    try {
        await page.waitForSelector('#onetrust-accept-btn-handler');
        await page.click('#onetrust-accept-btn-handler');
    } catch (error) {
        console.log(error);
    }

    let element = await page.$('.description > span');
    if (!element) {
        element = await page.$('div.branded-job--description-container > div > span');
    }
    const childElements = await element.$$('*');

    let textDescription = "";
    for (const childElement of childElements) {
        text = await page.evaluate(element => element.innerText, childElement);
        const firstChild = await childElement.$('*');
        if (!firstChild) {
            console.log(text);
            textDescription = textDescription + "\n" + text;
        }
    }
    await browser.close();
    //console.log(textDescription);
    return textDescription;
}

//jobDescription("https://www.reed.co.uk/jobs/software-engineer/50212065?source=searchResults&filter=%2fjobs%2fsoftware-engineer-jobs");
// "https://www.reed.co.uk/jobs/software-engineer/50177810?source=searchResults&filter=%2fjobs%2fsoftware-engineer-jobs"
module.exports = jobDescription;
