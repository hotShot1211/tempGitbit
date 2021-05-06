const puppy = require("puppeteer");
const id ="nasef87699@art2427.com";
const password = "dildeewana1211";

let challenges =["ch1","ch2","ch3","ch4","ch5"];
let moderators = ["HotShot1211"];
async function main(){
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2", password);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.click(".dropdown-handle.nav_link.toggle-wrap");
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li");
    let lists = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await lists[1].click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible:true});
    let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
    let createChallengeUrl = await tab.evaluate(function(ele){
        return ele.getAttribute("href"); 
    },createChallengeButton);
    for(let i = 0; i < challenges.length; i++){
        await createChallenge("https://www.hackerrank.com" + createChallengeUrl, challenges[i], tab);
    }

}

async function createChallenge(url, challenge, tab){
    await tab.goto(url);
    await tab.waitForSelector("#name", challenge);
    await tab.type("#name", challenge);
    await tab.type("#preview", challenge);
    await tab.waitForSelector(".CodeMirror textarea");
    let textAreas = await tab.$$(".CodeMirror textarea");
    for(let i = 0; i < textAreas.length;i++){
        await textAreas[i].type(challenge);
    }
    await tab.waitForSelector("#tags_tag",{visible:true});
    await tab.type("#tags_tag", challenge);
    await tab.keyboard.press("Enter");
    await tab.click(".save-challenge.btn.btn-green");

    await tab.waitForSelector('li[data-tab="moderators"]', {visible:true});
    await tab.click('li[data-tab="moderators"]');
    await tab.waitForSelector("#confirmBtn", {visible:true});
    await tab.click("#confirmBtn");
    await tab.waitForselector('li[data-tab="moderators"]',{visible:true});
    await tab.click('li[data-tab="moderators"]');
    await tab.waitForSelector("#moderator", {visible:true});
    for(let i= 0;i < moderators.length; i++){
        await tab.type("#moderator", moderators[i]);
        await tab.keyboard.press("Enter");
    }
    await tab.click(".save-challenge.btn.btn-green");
}

main();