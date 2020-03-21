const mongoose = require("mongoose")
const express = require("express")
const app = express()
//const MongoClient = require("mongodb").MongoClient;


app.use('/api', require('./Routes/index'))
app.use("/uploads", express.static('uploads'))


// mongoose.connect("mongodb://moksh:moksh123@ds121176.mlab.com:21176/quest", { useNewUrlParser: true })
mongoose.connect("mongodb://localhost/quest", { useNewUrlParser: true })
    .then(app => {
        // console.log("Hello")
    })
    .catch((err) => {
        // console.log(console.error("error"+err))
    });

app.listen(5000, () => console.log('Server started on port 5000'));
