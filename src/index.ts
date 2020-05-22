import express from 'express'
import mongoose from 'mongoose'
import { routes } from './routes'
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config()

const requireDir = require('require-dir')
const app = express();

mongoose.connect(`${process.env.MONGODB_URL}`, {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'parkapi'},
(err) => {
    if (err) {
        console.log(`ERROR connecting to: Local MongoDB. ${err}`);
    } else {
        console.log('Successfully connected to Server');
    }
});
requireDir('./models')

app.use(bodyParser.json())
app.use(cors());
app.use(routes)

const port = process.env.PORT;
app.listen(port, () => console.log('Server on port: ' + port))