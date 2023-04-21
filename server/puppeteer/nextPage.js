const puppeteer = require('puppeteer');

const nextPage = async (urlLink, pageNumber) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            '--start-maximized'
        ]
    })


    //loop through this page if refactoring
    const page = await browser.newPage();
    const nextPageUrl = '?pageno=';
    await page.goto(urlLink + nextPageUrl + pageNumber);

    //accepting GDPR request when opening browser page for the first time
    //reused in main.js, make it more dry in the future
    try {
        await page.waitForSelector('#onetrust-accept-btn-handler');
        await page.click('#onetrust-accept-btn-handler');
    } catch (error) {
        console.log(error);
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
    //create referenceIDs to link jobs with jobDescriptions
    const referenceID = await Promise.all(jobUrlLinks.map(refLink => referenceGenerator(refLink)));

    const jobs = [];
    for (let i = 0; i < jobCompanies.length; i++) {
        const job = {
            title: jobTitles[i],
            company: jobCompanies[i],
            salary: jobSalaries[i],
            location: jobLocations[i],
            type: jobTypes[i],
            datePosted: modifiedListings[i],
            urlLink: jobUrlLinks[i],
            refID: referenceID[i]
        };
        jobs.push(job);
    }

    //Scraper for the job description page
    //TODO iterate through and store in an object with refID
    //console.log(scrapeDescription(homePage + jobUrlLinks[0]));

    browser.close();

    return jobs;
}


async function referenceGenerator(url) {
    const refRegex = /\/(\d+)\?/;  // regular expression pattern to match the number
    const match = url.match(refRegex);  // apply the pattern to the url string
    const refID = match[1];  // extract the captured group from the match

    return Number(refID);
}


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

module.exports = nextPage;