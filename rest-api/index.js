const path = require('path')
const express = require('express')
const app = express()
const port = 8080
const {v4:uuidv4} = require('uuid')
const methodOverride = require('method-override')

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// untuk mengambil data dari json
app.use(express.json())
// untuk mengambil data dari form
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

let comments = [{
    id: uuidv4(), name: 'Haris', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
}, {
    id: uuidv4(), name: 'Rizky', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
}, {
    id: uuidv4(),name: 'Rizal', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
}]

// index comments
app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})

// create comments
app.get('/comments/create', (req, res) => {
    res.render('comments/create')
})

// store comments
app.post('/comments', (req, res) => {
    const {name, text} = req.body
    comments.push({name, text, id: uuidv4()})
    // res.send('it works')
    res.redirect('/comments')
})

// show comments
app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', {comment})
})

// edit comments
app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', {comment})
})
// update comments
app.patch('/comments/:id', (req, res) => {
    const {id} = req.params;
    const newText = req.body.text
    const foundComment = comments.find(c => c.id === id)
    foundComment.text = newText
    res.redirect('/comments')
    // res.send('it works')
})

// delete comments
app.delete('/comments/:id', (req, res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

app.get('/order', (req, res) => {
    res.send('GET request')
})

app.post('/order', (req, res) => {
    // console.log(req.body)
    const {item, qty} = req.body
    res.send(`Item: ${item} dan Qty: ${qty}`)
})