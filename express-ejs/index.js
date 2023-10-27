const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const tagsData = require('./data.json');

app.set('view engine', 'ejs');
// set folder views as default folder
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/t/:tag', (req, res) => {
    const number = 2*10;
    const {tag} = req.params;

    const data = tagsData[tag];

    if(data) {
        res.render('tag', {data})
    } else {
        res.render('not-found', {tag})
    }

    const rand = Math.floor(Math.random() * 10) + 2

    const cars = ['bmw', 'honda', 'suzuki', 'tesla', 'toyota']
    res.render('home', {number, tag, rand, cars, data}) // passing data to home.ejs
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})