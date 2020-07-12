const axios = require('axios');
const fetch = require('node-fetch');
let data;

const getData = (
    () =>
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => {
                console.log('HERE', res)
            })
)();





async function print() {
    getData.then(r => {
        console.log('PRINT', data);
    })
}

module.exports = { print };
