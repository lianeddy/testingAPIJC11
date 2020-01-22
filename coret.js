// const { createJWTToken } = require('./helper/jwt')
// const Crypto = require('crypto');

// let password ='123123123'

// let hashPassword = Crypto.createHmac("sha256", "uniqueKey").update(password).digest("hex")

// console.log(hashPassword.length)

function duplicateCount(text){
    let count = 0;
    let buffer = '';
     text = text.split('').sort().join('');
   
     for(var i = 0; i < text.length; i++) {
       if (text[i] === text[i+1]  && text[i] != buffer) {
         buffer = text[i];
         count++;
       }
     }
     return count;
}
















    //buat sebuah function untuk mengihitung jumlah karakter duplikat didalam string
    // apabila satu karakter muncul lebih dari satu kali dihitung sebagai satu duplikat
    // eg. console.log('aabc') => return 1 duplikat huruf a
    // eg. console.log('aabbcd') -> return 2 duplikat huruf a dan b
    // eg. console.log('aaabcdef') = return 1 duplikat huruf a
    // eg. console.log('aa11222') => return 3 duplikat di a, 1, dan 2

    console.log(duplicateCount('aa11222'))