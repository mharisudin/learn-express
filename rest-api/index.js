const path = require('path')
const express = require('express')
const app = express()
const port = 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// untuk mengambil data dari json
app.use(express.json())
// untuk mengambil data dari form
app.use(express.urlencoded({extended: false}))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

const comments = [{
    id: 1, name: 'Haris', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
}, {
    name: 'Rizky', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
}, {
    name: 'Rizal', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
}]

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})

app.get('/comments/create', (req, res) => {
    res.render('comments/create')
})

app.post('/comments', (req, res) => {
    const {name, text} = req.body
    comments.push({name, text})
    // res.send('it works')
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === parseInt(id))
    res.render('comments/show', {comment})
})

app.get('/order', (req, res) => {
    res.send('GET request')
})

app.post('/order', (req, res) => {
    // console.log(req.body)
    const {item, qty} = req.body
    res.send(`Item: ${item} dan Qty: ${qty}`)
})