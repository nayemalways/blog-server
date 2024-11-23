// DEPENDENCIES
import express from "express";
import cors from "cors";
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import { DATABASE, MAX_JSON_SIZE, PORT, REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME, URL_ENCODED, WEB_CACHE } from "./app/config/config.js";
import router from "./routes/api.js";

// APP
const app = express();


// APPLICATION GLOBAL MIDDLEWARE
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(express.urlencoded({extended:URL_ENCODED}));
app.use(express.json({limit: MAX_JSON_SIZE}));

// REQUEST LIMITTER
const limitter = rateLimit({windowMs: REQUEST_LIMIT_TIME, max: REQUEST_LIMIT_NUMBER});

// WEB CACHE
app.set('etag', WEB_CACHE);

// STATCI FOLDER
app.use(express.static('storage'));

// DATABASE CONNECTION
mongoose.connect(DATABASE, {autoIndex: true}).then(() => {
    console.log(`Database connected`);
}).catch((e) => {
    console.log(e);
})

// ROUTING
app.use('/api',  router);


// *** APPLICATION LISTENING ***
app.listen(PORT, () => {
    console.log(`Application running on http://localhost:${PORT}`);
})