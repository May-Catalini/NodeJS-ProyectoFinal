const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const postRouter = require('../routes/post_routes');

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/', postRouter);
app.use(cors());


const mongoDBURI = process.env.MONGODB_URI;

mongoose
    .connect(mongoDBURI)
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });



const server = app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

server.on('error', error => console.log(`Server error ${error}`));