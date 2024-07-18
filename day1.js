/**
 * Task 1
 */
let firstName = 'Suganya'
let companyName = "Gartner"
let mobileNumer = 1234567890
let isAutomation = true
let hasPlaywright;

console.log(typeof firstName);
console.log(typeof companyName);
console.log(typeof mobileNumer);
console.log(typeof isAutomation);
console.log(typeof hasPlaywright);

/**
 * Task 2
 */
const browserName = 'chrome'
function getBrowserVersion(data) {
    if (data == 'chrome') {
        console.log("Chrome Browser="+browserName);
    }
    else {
        console.log("Not a chrome browser");
    }
    var browserName = 'Edge'
    console.log(browserName);
}
console.log(browserName);
getBrowserVersion(browserName)