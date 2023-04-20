const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            '--start-maximized'
        ]
    })

    const page = await browser.newPage();

    await page.goto('https://www.reed.co.uk/jobs/software-engineer/50212065?source=searchResults&filter=%2fjobs%2fsoftware-engineer-jobs');

    try {
        await page.waitForSelector('#onetrust-accept-btn-handler');
        await page.click('#onetrust-accept-btn-handler');
    } catch (error) {
        console.log(error);
    }




    const childElements = await element.$$('*');

    for (const childElement of childElements) {
        const text = await page.evaluate(element => element.innerText, childElement);
        if (text) {
            //console.log(childElement);
            //console.log(text);
        } else console.log('*****************');
    }

})()

// .branded-job--content
//class contains ALL the description of the job listing

// .branded-job--description-container
//class contains ONLY the description of the job listing

const n = await page.$("#txt")
const t = await(await n.getProperty('textContent')).jsonValue()

// const element = await page.$('branded-job--description-container');

// const childElements = await element.$$('*');

// for (const childElement of childElements) {
//     const text = await page.evaluate(element => element.innerText, childElement);
//     if (text) {
//         //console.log(childElement);
//         console.log(text);
//     } else console.log('*****************');
// }
