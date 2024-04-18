const fs = require('fs');


const data = [];

const randomWords = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
for (let i = 0; i < 100; i++) {
    const randomDate = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
    const randomTitle = `Random Title number ${Math.random() > 0.5 ? i + 1 : i + 100} - ${Math.random().toString(36).substring(7)}`;

    const json = {
        date: randomDate.toISOString(),
        title: randomTitle
    };

    data.push(json);
}

const jsonData = JSON.stringify(data, null, 2);

fs.writeFile('/workspaces/Testing/Pagination/public/data.js', `const data = ${jsonData};\n\nmodule.exports = data;`, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data has been written to data.js');
});