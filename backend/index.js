import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Book } from './models/bookmodel.js';
// import router from './routes/bookRoutes.js';
import * as routerModule from './routes/bookRoutes.js';
import cors from 'cors';
const app = express();

app.use(express.json());

// var cors = require('cors')
app.use(cors()) // Use this after the variable declaration

dotenv.config();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    console.log(req);
    return res.send('Welcome to my page');
});

app.use('/books', routerModule.router);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB connection successful");
    })
    .catch((err) => {
        console.log("DB connection issue");
        console.error(err);
        process.exit(1);
    });


app.listen(PORT, () => {
    console.log(`App is started on port ${PORT}`);
});
