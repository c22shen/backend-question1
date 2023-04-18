// const https = require('https');
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');

// 1) Fetch GET https://coderbyte.com/api/challenges/json/age-counting
// 1.5) use axios instead of http to  parse the response as JSON for easy processing

axios.get('https://coderbyte.com/api/challenges/json/age-counting')
    .then(response => {
        const jsonData = response.data;
        // console.log(jsonData);

        // 2) Count items age = 32 

        const combinedArr = [];
        arr = jsonData.data.split(',');

        for (let i = 0; i < arr.length; i += 2) {
            combinedArr.push({ key: arr[i].split('=')[1], age: arr[i + 1].split('=')[1] });
        }
        console.log("combinedArr");

        console.log(combinedArr);

        const age32list = combinedArr.filter(data => data.age = 32);

        console.log('age32list');
        console.log(age32list);
        // 3) Write file: output.txt 
        const outputStream = fs.createWriteStream('output.txt');

        for (let i = 0; i < age32list.length; i++) {
            outputStream.write(age32list[i].key + '\n');
        }
        // the file should end with a newline character on its own line
        outputStream.write('\n');

        const inputFileData = fs.readFileSync('./output.txt');
        console.log("inputFileData", inputFileData);

        // 4) Calculate the SHA1 hash
        // https://stackoverflow.com/questions/6984139/how-can-i-get-the-sha1-hash-of-a-string-in-node-js
        const sha1Hash = crypto.createHash('sha1').update(inputFileData).digest('hex');

        console.log(sha1Hash)

        // 5) reverse string - for loops works too 
        const reverseHash = sha1Hash.split('').reverse().join('');

        console.log(reverseHash);

        // 6) append hash 
        const challengString = "dfh7bwrz5";
        console.log(reverseHash + ':' + challengString);

        // fs.writeFileSync('./encryption.txt', sha1Hash);

    })
    .catch(error => {
        console.error(error.message);
    });



