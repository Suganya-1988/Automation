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
function getUserData(userData,callback) {
    setTimeout(() => {
        console.log("Fetching the user data");
        callback(userData);
    }, 3000)
    
}

function userDetail(userData) {
    console.log(userData.username);
    console.log(userData.age);
}
getUserData(user,function(data1) {
    userDetail(data1)
})


// const user1 ={
//     A: 'a',
//     B: 'b',
//     C: 'c'
// }
// //console.log(user1.length);
// for (const user2 in user1) {
//     console.log(user2,user1[user2]);
// }



