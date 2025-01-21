import express from 'express';
import mongoose from 'mongoose';
import users from './controller/users.js';
import session from 'express-session';

const app = express();

await mongoose.connect('mongodb://127.0.0.1:27017/auth')

app.set('trust proxy', 1) 
app.use(session({
  secret: 'Slapta unikali frazė',
  resave: false, 
  saveUninitialized: true, 
  cookie: { secure: false } 
}));

app.use(express.json());
app.use('/api', users);
app.listen(3000);