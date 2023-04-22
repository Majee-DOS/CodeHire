const puppeteer = require('puppeteer');
const jobDescription = require('./descriptionPage');
const homePage = 'https://www.reed.co.uk/';
const NextPage = require("./nextPage.js");


const main = async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            '--start-maximized'
        ]
    })

    const page = await browser.newPage();

    await page.goto(homePage);

    //accepting GDPR request when opening browser page for the first time
    //reused in nextPage.js, descriptionPage.js, make it more dry in the future
    try {
        await page.waitForSelector('#onetrust-accept-btn-handler');
        await page.click('#onetrust-accept-btn-handler');
    } catch (error) {
        console.log(error);
    }


    //'frontend'
    //'Software Engineer'
    await page.waitForSelector('#main-keywords');
    await page.type('#main-keywords', 'frontend');
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
    console.log(jobs);

    //Scraper for the job description page
    //TODO iterate through and store in an object with refID
    //console.log(scrapeDescription(homePage + jobUrlLinks[0]));





    //get the string of the page counter
    const pageCounter = await page.evaluate(() => {
        const div = document.querySelector('.page-counter');
        return div.textContent.trim();
    });

    let parts = pageCounter.split(' ');
    let secondNum = parseInt(parts[2]);
    let thirdNum = parseInt(parts[4].replace(',', '')); // Remove comma before converting to integer
    let maxPageNumber = Math.floor(thirdNum / secondNum);

    //Scraper to loop through the next page
    for (let i = 2; i <= maxPageNumber; i++) {
        let currentURL = await page.url();
        const nextJobs = await NextPage(currentURL, i);
        jobs.push(...nextJobs);
    }


    browser.close();
    return jobs;
}


// main();

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
        console.log(d);
    } catch (err) {
        console.log(err);
    }
}

async function referenceGenerator(url) {
    const refRegex = /\/(\d+)\?/;  // regular expression pattern to match the number
    const match = url.match(refRegex);  // apply the pattern to the url string
    const refID = match[1];  // extract the captured group from the match

    return Number(refID);
}

function checkLastPage(pageCounter) {
    // matches all numbers in the string
    const nums = pageCounter.match(/\d+/g);

    if (nums[1] < nums[2]) {
        return true;
    } else {
        return false;
    }
}

module.exports = main;

    // //This doesn't work because it is read on main/first browser page which is always 1-25
    // //initialize pageNumber to 2 to start scraping
    // let pageNumber = 2;
    // //will return true if not last page
    // //and call the nextPage function
    // while (checkLastPage(pageCounter)) {
    //     //Scraper for the next page
    //     let currentURL = await page.url();
    //     const nextJobs = await NextPage(currentURL, pageNumber);
    //     jobs.push(...nextJobs);
    //     pageNumber++;
    // }