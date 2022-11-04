const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = 8080;
const adminRouter = require('./routes/admin')
const usersRouter = require('./routes/users')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const db = require('./config/connection')
const logger = require('morgan')
const admin=require("./routes/admin")

const MongoDBSession = require('connect-mongodb-session')(session);



app.use('/',admin);





app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('views',path.join(__dirname,'views'))
app.set('layout','layouts/layout')


// app.use(logger('dev'))



app.use(express.json())
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/css',express.static(path.join(__dirname + 'public/css')))
app.use('/img',express.static(path.join(__dirname + 'public/img')))
app.use('/js',express.static(path.join(__dirname + 'public/js')))
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(session({
    secret:'fhihiuher98734539845hwefhjkfn',
    saveUninitialized:true,
    cookie:{maxAge:6000000},
    resave:false
}))

app.use(function (req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});


app.use(cookieParser())
db.connect((err)=>{
    if(err) console.log('connection error'+err)
    else console.log("database connected successfully")
})








app.use('/',usersRouter)
app.use('/admin',adminRouter)

app.listen(port,()=>{
    console.log("server started");
})