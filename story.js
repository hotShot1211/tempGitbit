const puppy = require("puppeteer");
const iPhone = puppy.devices['iPhone 6'];
const id = "godeshwar1213";
const password = "peesha1213";
const caption = "to be or not to be....";
const file = "C://Users//anshu//OneDrive//Pictures//5f08a47c01a844388a1046b5-1000x625.jpg";

async function main(){
    const browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });
    const tabs = await browser.pages();
    const tab = tabs[0];
    await tab.emulate(iPhone);
    await tab.goto("https://instagram.com/accounts/login", {waitUntil: "networkidle0"});
    
    await tab.type("input[name='username']", id);
    await tab.type("input[name='password']", password);
    await tab.click("button[type='submit']");
    await tab.waitForSelector(".cmbtv");
    await tab.click(".cmbtv button",{waitUntil:  "networkidle0"});
    await tab.waitForSelector(".mt3GC");
    let buttons = await tab.$$(".mt3GC button");
    await buttons[1].click();
    //story upload
    const [fileChooser] = await Promise.all([
        tab.waitForFileChooser(),
        tab.click('.mTGkH')
    ]);
    await fileChooser.accept([file]);

    await tab.waitForSelector(".LEJ26 button");
    await Promise.all([
        tab.waitForNavigation({waitUntil: "networkidle2"}),
        await tab.click(".LEJ26 button")
    ]);
    
    

}


main()