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

    await page.goto('https://www.reed.co.uk/');

    try {
        await page.waitForSelector('#onetrust-accept-btn-handler');
        await page.click('#onetrust-accept-btn-handler');
    } catch (error) {
        console.log(error);
    }

    await page.waitForSelector('#main-keywords');
    await page.type('#main-keywords', 'Software Engineer');
    await page.click('#homepageSearchButton');


    try {
        await page.waitForSelector('.btn.btn-link.btn-job-result-more');
        const rows = await page.$$('.btn.btn-link.btn-job-result-more');

        await page.evaluate(() => {
            let elements = $('.btn.btn-link.btn-job-result-more').toArray();
            for (i = 0; i < elements.length; i++) {
                $(elements[i]).click();
            }
        });

    } catch (err) {
        console.log(err);
    }

})()
