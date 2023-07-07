const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const session = require('express-session');


connectToMongo();

const router = require('./routes/auth');


const app = express();
const port = 4000;

app.use(cors())
app.use(express.json())

app.use("/uploads" , express.static('uploads'));

// Configure session middleware
app.use(session({
  secret: 'Bishalgodboy$', 
  resave: false,
  saveUninitialized: true,
}));
  
//Avilable Routes
app.use('/api/auth', require ('./routes/auth'))
app.use('/api/comment', require('./routes/comment'))
app.use('/admin', require('./routes/admin'))

// Mount the router file
app.use('/api', router);





app.listen(port, () => {
  console.log(`FunOlympic app listening on port ${port}`)
})
