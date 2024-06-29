const {program} = require('commander');
const path = require('path');
const fs = require('fs');
const {Transform} = require('stream');

program
    .argument('<file>', 'File name')
    .action(async (file) => {
        const filePath = path.resolve('./fixtures/texts/', file);
        await writeCountOfWords(filePath);
    })

program.parse(process.argv);

async function writeCountOfWords(filePath) {
    const readStream = fs.createReadStream(filePath, {encoding: 'utf-8'});
    const writeStream = fs.createWriteStream('./output/outputText.txt', {encoding: 'utf-8'});

    const outPutData = new Transform({
        transform(chunk, encoding, callback) {
            let elementCount = {};

            // Remove special characters and convert to lowercase
            const cleanedText = chunk.toString().trim().replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase();

            // Split the text into an array of words
            const wordsArray = cleanedText.split((/\s+/));

            // Sort the array of words
            const sortedWordsArray = wordsArray.sort();

            // Count the number of times each word appears in the array
            sortedWordsArray.forEach((word) => {
                if (elementCount[word]) {
                    elementCount[word]++;
                } else {
                    elementCount[word] = 1;
                }
            });
            callback(null, Object.values(elementCount).join(' '));
        }
    });

    readStream.pipe(outPutData).pipe(writeStream);
}