import express from 'express';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import router from './routes/routes';

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true }, () => console.log('connected to mongodb...'));

app.use('/api', router);

export default app;