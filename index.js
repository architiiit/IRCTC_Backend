require('dotenv').config();
const express = require('express');
const sequelize = require('./Config/db');

const app = express();
const cookieParser=require('cookie-parser');
app.use(cookieParser());
app.use(express.json());


// route import and mount
const route=require("./routes/route");
app.use("/api/v1",route);


// Test Route
app.get('/', (req, res) => {
    res.send('IRCTC API is Running...');
});
// app.listen(process.env.PORT,()=>{
//     console.log(`App is listening at ${process.env.PORT}`);
// })
// Sync Database
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => console.log('Error: ' + err));
