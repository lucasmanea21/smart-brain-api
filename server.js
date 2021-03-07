import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import exports1 from './controllers/image.js'


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);
// Store hash in your password DB.
const app = express();
app.use(bodyParser.json())
app.use(cors())

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'e1r2i3c4',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
});


app.get('/', (req,res) => {
	res.send('Hello');
})

app.post('/signin', handleSignin(db,bcrypt))
app.post ('/register',(req,res) => {handleRegister(req,res,db,bcrypt, salt)})
app.get('/profile/:id', (req,res) => {handleProfileGet(req,res,db)})
app.put('/image', (req,res) => {exports1[0](req,res,db)}) //handleImage
app.post('/imageurl', (req,res) => {exports1[1](req,res)}) //handleApiCall



app.listen(3001, () => {
	console.log('app is running')
})


