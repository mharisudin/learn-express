const path = require('path')
const express = require('express')
const app = express()
const port = 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.use(express.json())
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

const comments = [{
    name: 'Haris', comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
}, {
    name: 'Rizky', comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
}, {
    name: 'Rizal', comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
}]

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})


app.get('/order', (req, res) => {
    res.send('GET request')
})

app.post('/order', (req, res) => {
    // console.log(req.body)
    const {item, qty} = req.body
    res.send(`Item: ${item} dan Qty: ${qty}`)
})