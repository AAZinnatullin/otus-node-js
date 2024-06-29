const {program} = require('commander');
const path = require('path');
const fs = require('fs');
const printTree = require('./printTree');

program
    .argument('<file>', 'File name')
    .action((file) => {
        const filePath = path.resolve('./fixtures/treeView/', file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        printTree({data});
    })

program.parse(process.argv);

