/**
 * Task1
 */

//const s = "madam";
let s2 = "";
function palindrome(data) {
    console.log("Pla");
    for (let i = data.length - 1; i >= 0; i--) {
        let s1 = data.charAt(i);
        s2 = s2.concat(s1)
    }
    console.log(s2);
    if (data === s2) {
        console.log("Palindrome");
    }
    else {
        console.log("Not a palindrome");
    }
}
palindrome("madamm");

/**
 * Task 2
 */
printodd = () => {
    for (let i = 1; i <= 25; i += 2) {
        console.log(i);
    }
}
printodd()

/**
 * Task3-Example 1
 */

let s3 = "Hello World";
let s4 = s3.split(" ");
let count = 0;
for (let i = s4.length - 1; i >= s4.length - 1; i--) {
    let lastWord = s4[i]
    console.log(lastWord);
    for (let j = lastWord.length - 1; j >= 0; j--) {
        count++;
    }
    console.log(count);
}
//Example 2

let s5 = " fly me to the moon ";
let trim_s5 = s5.trim();
let split_s5 = trim_s5.split(" ");
let count1 = 0;
for (let k = split_s5.length - 1; k >= split_s5.length - 1; k--) {
    let lastWord_s5 = split_s5[k];
    console.log(lastWord_s5);
    for (let l = lastWord_s5.length - 1; l >= 0; l--) {
        count1++
    }
    console.log(count1);
}

//Example 3

let a = "silent";
let a1 = "listen";
let count2 = 0;
if (a.length == a1.length) {
    for (let m = a.length - 1; m >= 0; m--) {
        for (let n = a1.length - 1; n >= 0; n--) {
            if (a[m] === a1[n]) {
                count2++;
            }
        }
    }
    if (count2 == a.length) {
        console.log("Anagram");
    }
} else {
    console.log("Not an anagram");
}

//Simplest way to find anagram
if (a.length == a1.length) {
    const arr1 = Array.from(a);
    const arr2 = Array.from(a1);
    const sort1 = arr1.sort();
    const sort2 = arr2.sort();
    const str1 = sort1.join().replaceAll(',', '');
    const str2 = sort2.join().replaceAll(',', '');
    console.log(str1);
    console.log(str2);
    if (str1 === str2) {
        console.log("Anagram");
    }
    else {
        console.log("Not an anagram");
    }
}
else {
    console.log("Not an anagram");
}