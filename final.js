/**Project
 * Using puppeteer to post stories and photos on insta.
 * we take command line argument as story or post.
 * Author: Prateek Kumar Jha
 * Date: 9/5/2021
 */

/**********Set up**********/
const puppy = require("puppeteer");
const id = "godeshwar1213";
const password = "peesha1213";
const caption = "to be or not to be....";
const file = "C://Users//anshu//OneDrive//Pictures//5f08a47c01a844388a1046b5-1000x625.jpg";

//defaults to iphone 6 user agent
const iPhone = puppy.devices['iPhone 6'];
const myArgs = process.argv.slice(2);

/**********Main Program**********/

//check for command line argument
if((myArgs[0] == 'story') || (myArgs[0] == 'post')){

    async function main(){

        //getting browser

        const browser = await puppy.launch({
            headless: false,
            defaultViewport: false
        });

        //getting the tabs
        const tabs = await browser.pages();
        const tab = tabs[0];

        //instagram only allows posting on there mobile site, so we pretend to be a mobile
        await tab.emulate(iPhone);
        
        //go to instagram login
        await tab.goto("https://instagram.com/accounts/login", {waitUntil: "networkidle0"});
        
        //loging in
        await tab.type("input[name='username']", id);
        await tab.type("input[name='password']", password);
        await tab.click("button[type='submit']");

        //clicking on intial dialogues
        await tab.waitForSelector(".cmbtv");
        await tab.click(".cmbtv button",{waitUntil:  "networkidle0"});
        await tab.waitForSelector(".mt3GC");
        let buttons = await tab.$$(".mt3GC button");
        await buttons[1].click();


        //story upload
        if(myArgs[0] == "story"){

            //clicking on the story button on top left
            const [fileChooser] = await Promise.all([
                tab.waitForFileChooser(),
                tab.click('.mTGkH')
            ]);

            //uploading file
            await fileChooser.accept([file]);
            
            //posting as story
            await tab.waitForSelector(".LEJ26 button");
            await Promise.all([
                tab.waitForNavigation({waitUntil: "networkidle2"}),
                await tab.click(".LEJ26 button")
            ]);
        }


        //post upload
        if(myArgs[0] == "post"){

            //clicking on the post button in bottom centre
            const [fileChooser] = await Promise.all([
                tab.waitForFileChooser(),
                tab.click('.q02Nz._0TPg')
            ])
            
            //uploading
            await fileChooser.accept([file], {waituntil: "networkidle0"});

            //clicking on the filter option
            await tab.waitForSelector(".hnYIW");
            await tab.click(".hnYIW button[tabindex='0']");

            //getting the first 5 filter options
            await tab.waitForSelector(".cwqzn.fq6ji");
            buttons = await tab.$$(".cwqzn.fq6ji");

            //selecting the third filter
            await buttons[3].click({waitUntil: "networkidle"});

            //clicking ont the next
            await tab.waitForSelector(".mXkkY.KDuQp");
            await tab.click(".mXkkY.KDuQp button");

            //adding caption
            await tab.waitForSelector(".NfvXc");
            await tab.type(".NfvXc textarea[placeholder='Write a caption…']", caption);
            
            //final posting
            await tab.waitForSelector(".mXkkY.KDuQp");
            await tab.click(".mXkkY.KDuQp button");
        }
        
    
    }
    
    //calling main 
    main();
}

else{
    console.log("invalid input.");
}