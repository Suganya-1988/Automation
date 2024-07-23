/**
 * 
 * Task1
 */
let userProfile = function (name) {
    console.log("Hello " + name);
}
userProfile("Suganya")
/**
 * 
 * Task2
 */
let double = (number) => console.log(number);;
double(7)
/**
 * 
 * Task3 
 */
const timeout = function () {
    setTimeout(() => {
        console.log("This is message is delayed for 2 sec");
    }, 2000
    )
}
timeout()
/**
 * 
 * Task4
 */
let user = {
    username: "Sugan",
    age: 18
}
function getUserData(userData, callback) {
    setTimeout(() => {
        console.log("Fetching the user data");
        callback(userData);
    }, 3000)

}

function userDetail(userData) {
    console.log(userData.username);
    console.log(userData.age);
}
getUserData(user, function (data1) {
    userDetail(data1)
})
/**
 * 
 * Odd or even
 */

function isOddOrEven(number) {
    if (number % 2 == 0) {
        console.log("Number is Even");
    }
    else
        console.log("Number is Odd");
}
isOddOrEven(10);

/**
 * Number type
 */
function type(num) {
    // let num=1;
    if (num > 0) {
        console.log("Positive");
    }
    else if (num < 0) {
        console.log("Negative");
    }
    else if (num == 0) {
        console.log("Zero");
    }
}
type(0);

/**
 * Condition statement
 */

function launchBrowser(browsername1) {
    if (browsername1 === 'chrome') {
        console.log("Chrome");
    }
    else {
        console.log("Not chrome");
    }
}
launchBrowser('chrome');

runTest = (testType) => {
    switch (testType) {
        case 'sanity':
            console.log("Sanity");
            break;
        case 'regression':
            console.log("Regression");
            break;
        case 'sanity':
            console.log("Sanity");
            break;
        default:
            console.log("Not functional");
            break;
    }
}
runTest('sanity')

let sc = function (score) {
    switch (true) {
        case score >= 80:
            return "A+";
        case (score >= 60 && score < 80):
            return console.log("A");;
        case (score > 50):
            console.log("B");
            break;
        default:
            return "F";
    }
}
sc(9)
console.log(sc(100));

// const user1 ={
//     A: 'a',
//     B: 'b',
//     C: 'c'
// }
// //console.log(user1.length);
// for (const user2 in user1) {
//     console.log(user2,user1[user2]);
// }



