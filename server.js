// Import required modules
const axios = require('axios'); // for making HTTP requests
const fs = require('fs'); // for working with the file system
const crypto = require('crypto'); // for generating SHA1 hash

// Make a GET request to the API endpoint using axios
axios.get('https://coderbyte.com/api/challenges/json/age-counting')
    .then(response => {
        // Store the API response data as JSON
        const jsonData = response.data;

        // Parse the data and create an array of objects with keys and ages
        const combinedArr = [];
        arr = jsonData.data.split(','); // split the data string into an array
        for (let i = 0; i < arr.length; i += 2) { // iterate over the array in steps of 2
            combinedArr.push({ key: arr[i].split('=')[1], age: arr[i + 1].split('=')[1] }); // create an object with key and age properties and push it to the combinedArr
        }

        // Filter the array to only include objects with age = 32
        const age32list = combinedArr.filter(data => data.age === 32);

        // Write the keys of the filtered objects to a file called "output.txt"
        const outputStream = fs.createWriteStream('output.txt');
        for (let i = 0; i < age32list.length; i++) {
            outputStream.write(age32list[i].key + '\n'); // write the key to the output file followed by a newline character
        }
        outputStream.write('\n'); // Write a newline character to the end of the file

        // Read the contents of the output file
        const inputFileData = fs.readFileSync('./output.txt');

        // Calculate the SHA1 hash of the output file contents
        const sha1Hash = crypto.createHash('sha1').update(inputFileData).digest('hex');

        // Reverse the SHA1 hash string
        const reverseHash = sha1Hash.split('').reverse().join('');

        // Append the reversed hash to the string "dfh7bwrz5"
        const challengString = "dfh7bwrz5";
        console.log(reverseHash + ':' + challengString);
    })
    .catch(error => {
        console.error(error.message); // print error message to the console if the API request fails
    });
