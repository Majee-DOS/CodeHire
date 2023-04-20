const puppeteer = require('puppeteer');
const jobDescription = require('./descriptionPage');
const homePage = 'https://www.reed.co.uk/';

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            '--start-maximized'
        ]
    })

    const page = await browser.newPage();

    await page.goto(homePage);

    try {
        await page.waitForSelector('#onetrust-accept-btn-handler');
        await page.click('#onetrust-accept-btn-handler');
    } catch (error) {
        console.log(error);
    }

    await page.waitForSelector('#main-keywords');
    await page.type('#main-keywords', 'Software Engineer');
    await page.click('#homepageSearchButton');

    //clicking all see more elements on page
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

    //saving all url links to array
    let jobUrlLinks;
    try {
        await page.waitForSelector('.job-result-heading__title')
        jobUrlLinks = await page.$$eval('h2.job-result-heading__title > a', links => {
            return links.map(jobLink => jobLink.getAttribute('href'));
        });
    } catch (err) {
        console.log(err);
    }

    //const jobLinks = await scrapeData(page, 'h2.job-result-heading__title > a', 'href');
    const jobCompanies = await scrapeDataText(page, '.gtmJobListingPostedBy');
    const jobSalaries = await scrapeDataText(page, '.job-metadata__item--salary');
    const jobLocations = await scrapeDataText(page, '.job-metadata__item--location');
    const jobTypes = await scrapeDataText(page, '.job-metadata__item--type');
    const jobTitles = await scrapeDataText(page, 'h2.job-result-heading__title > a');
    const jobDatePosted = await scrapeDataText(page, '.job-result-heading__posted-by');
    //remove " by" and everything after with regex
    const modifiedListings = jobDatePosted.map(job => job.replace(/ by.+/, ''));

    const jobs = [];
    for (let i = 0; i < jobCompanies.length; i++) {
        const job = {
            title: jobTitles[i],
            company: jobCompanies[i],
            salary: jobSalaries[i],
            location: jobLocations[i],
            type: jobTypes[i],
            datePosted: modifiedListings[i],
            urlLink: jobUrlLinks[i]
        };
        jobs.push(job);
    }
    console.log(jobs);
    console.log(scrapeDescription(homePage + jobUrlLinks[0]));

})()

async function scrapeDataText(page, selector) {
    try {
        await page.waitForSelector(selector);
        const data = await page.$$eval(selector, elements => {
            return elements.map(element => element.innerText);
        });
        //console.log(data);
        //console.log(`length of ${selector}: ${data.length}`);
        return data;
    } catch (err) {
        //console.log(err);
        return [];
    }
}

async function scrapeDescription(url) {
    try {
        const d = await jobDescription(url);
    } catch (err) {
        console.log(err);
    }
}