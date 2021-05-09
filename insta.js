const puppy = require("puppeteer");
const fs = require("fs");
const iPhone = puppy.devices['iPhone 6'];
const id = "almost.amusing";
const password = "pikachu18";
const caption = "to be or not to be....";
const file = "C:\Users\anshu\OneDrive\Pictures\5f08a47c01a844388a1046b5-1000x625.jpg";

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
    
    const [fileChooser] = await Promise.all([
        tab.waitForFileChooser(),
        tab.click('.q02Nz._0TPg')
    ])

    await fileChooser.accept(['C://Users//anshu//OneDrive//Pictures//5f08a47c01a844388a1046b5-1000x625.jpg']);
    await tab.waitForSelector(".hnYIW");
    await tab.click(".hnYIW button[tabindex='0']");
    await tab.waitForSelector(".cwqzn.fq6ji");
    
    buttons = await tab.$$(".cwqzn.fq6ji");
    buttons[3].click();
    await tab.waitForSelector(".mXkkY.KDuQp");
    await tab.click(".mXkkY.KDuQp button");
    await tab.waitForSelector(".NfvXc");
    await tab.type(".NfvXc textarea[placeholder='Write a caption…']", caption);
    await tab.waitForSelector(".mXkkY.KDuQp");
    await tab.click(".mXkkY.KDuQp button");
    

}


main()