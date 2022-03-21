const express = require('express');
const cors = require('cors')
const app = express();
const port = 3003;
const knex = require('knex')
const bcrypt = require('bcrypt');
const { handleRegister } = require('./controllers/register');
const { handleSignin } = require('./controllers/signin');
const { handleProfile } = require('./controllers/profile');
const { handleImage, handleApiCall } = require('./controllers/image');

const salt = bcrypt.genSaltSync(1);
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'pfvo',
      password : '',
      database : 'smartbraindb'
    }
});
  
app.use(express.json())
app.use(cors())


// metodo basico sem currying? apenas dependency injection
app.post('/signin', (req,res) => {handleSignin(req, res, db, bcrypt)})


// metodo curring? com injection
app.post('/register', handleRegister(bcrypt, salt, db))


// metodo basico sem currying? apenas dependency injection
app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)})
      

// metodo curring? com injection
app.put('/image', handleImage(db))

app.post('/imageurl', (req, res) => {handleApiCall(req, res)})

app.listen(port, ()=> {
    console.log('app is listening on port', port)
})
