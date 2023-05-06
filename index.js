const express = require('express')
const bodyParser = require('body-parser')
const { Pool } = require('pg')
const ejs = require('ejs')
const path = require('path')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const pool = new Pool({
  user: 'postgres',
  host: '34.134.182.32',
  database: 'postgres',
  password: 'postgres',
  port: 5432
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))
})

app.post('/', (req, res) => {
    const { username, password } = req.body
    pool.query(`SELECT * FROM public.users WHERE username='${username}' AND password='${password}' LIMIT 1`, (err, result) => {
        if (err) return res.render(path.join(__dirname, 'views/error.ejs'))
        if (result?.rows?.length > 0) res.render(path.join(__dirname, 'views/page.ejs'), { 'username': result.rows[0].username, 'todo': result.rows[0].todo })
        else res.redirect('/')
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})