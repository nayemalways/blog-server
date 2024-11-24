// DEPENDENCIES
import express from "express";
import cors from "cors";
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import router from "./routes/api.js";
import {DATABASE, PORT, REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME, WEB_CACHE, URL_ENCODED, MAX_JSON_SIZE, DB_USERNAME, DB_PASSWORD} from './app/config/config.js';


// APP
const app = express();


// APPLICATION GLOBAL MIDDLEWARE
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(express.urlencoded({extended: URL_ENCODED}));
app.use(express.json({limit: MAX_JSON_SIZE}));

// REQUEST LIMITTER
const limitter = rateLimit({windowMs: REQUEST_LIMIT_TIME, max: REQUEST_LIMIT_NUMBER});
app.use(limitter);

// WEB CACHE
app.set('etag', false );

// STATIC FOLDER
app.use(express.static('storage'));

// DATABASE CONNECTION
let options = {
    user:  DB_USERNAME,
    pass:  DB_PASSWORD,
    autoIndex: true,
    serverSelectionTimeoutMS: 30000 // ৩০ সেকেন্ড
};
mongoose.connect(DATABASE, options)
    .then((res) => {
        console.log('DB connect success');
    })
    .catch((err) => {
        console.log(err);

    });



// ROUTING
app.use('/api',  router);


// *** APPLICATION LISTENING ***
app.listen(PORT, () => {
    console.log(`Application running on http://localhost:${PORT}`);
})