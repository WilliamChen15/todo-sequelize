const express = require('express')
const exphbs = require('express-handlebars')
//const bodyParser = require('body-parser') 可以不用額外載入
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const routes = require('./routes')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// setting body-parser
app.use(express.urlencoded({ extended: true }))//改寫成 express，也可以直接取得 urlencoded 方法
app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})