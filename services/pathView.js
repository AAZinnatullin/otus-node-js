const {program} = require('commander');
const path = require('path');
const fs = require('fs');

program
    .argument('<file>', 'File name')
    .action((file) => {
        const filePath = path.resolve('./fixtures/', file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        printTree({data});
    })

program.parse(process.argv);

function printTree({data, prefix = '', isLast = true, isFirst = true}) {
    if (isFirst) {
        console.log(prefix + '    ' + data.name);
    } else if (!isFirst) {
        console.log(prefix + (isLast ? '└── ' : '├── ') + data.name);
    }

    if (data.items && data.items.length > 0) {
        const newPrefix = prefix + (isLast ? '    ' : '│   ');
        for (let i = 0; i < data.items.length; i++) {
            const childIsLast = i === data.items.length - 1;
            const childIsFirst = false;
            printTree({
                data: data.items[i],
                prefix: newPrefix,
                isLast: childIsLast,
                isFirst: childIsFirst,
            });
        }
    }
}