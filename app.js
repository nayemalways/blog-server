// DEPENDENCIES
import express from "express";
import cors from "cors";
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import router from "./routes/api.js";
import dotenv from 'dotenv';
import { WEB_CACHE } from "./app/config/config.js";
dotenv.config();


// APP
const app = express();


// APPLICATION GLOBAL MIDDLEWARE
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(express.urlencoded({extended:process.env.URL_ENCODED}));
app.use(express.json({limit: process.env.MAX_JSON_SIZE}));

// REQUEST LIMITTER
const limitter = rateLimit({windowMs: process.env.REQUEST_LIMIT_TIME, max: process.env.REQUEST_LIMIT_NUMBER});
app.use(limitter);

// WEB CACHE
app.set('etag', WEB_CACHE );

// STATCI FOLDER
app.use(express.static('storage'));

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE, {autoIndex: true}).then(() => {
    console.log(`Database connected`);
}).catch((e) => {
    console.log(e);
})

// ROUTING
app.use('/api',  router);


// *** APPLICATION LISTENING ***
app.listen(process.env.PORT, () => {
    console.log(`Application running on http://localhost:${process.env.PORT}`);
})