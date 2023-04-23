require('dotenv').config('./.env');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

//Connect to mongo
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to mongodb successfully"))
    .catch(err => console.log(err));

//Routes    
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
})