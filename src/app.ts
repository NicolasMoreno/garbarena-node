import express from 'express'
import bodyParser from "body-parser"
import mongoose from "mongoose"


const app = express();
app.set("port", process.env.PORT || 9000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/garbarena');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected!')
});

export default app;