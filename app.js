const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
// const bodyParser = require('body-parser')  可以不用額外載入
const methodOverride = require('method-override')
const flash = require('connect-flash')
const routes = require('./routes')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// setting body-parser
app.use(express.urlencoded({ extended: true }))// 改寫成 express，也可以直接取得 urlencoded 方法
app.use(methodOverride('_method'))
usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  // console.log(req.user) 
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})