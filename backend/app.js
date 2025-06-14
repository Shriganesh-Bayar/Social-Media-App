require("dotenv").config();

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

// routers
const UserRouter = require('./routes/UserRouter');
const PostRouter = require('./routes/PostRouter');
const Activity = require('./routes/ActivityRouter');

const mongoose = require("mongoose");
main()
    .then((res) => {
        console.log("connection established");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

// endpoints
app.get('/', (req, res) => {
    console.log("Server has started....");
    res.json({ message: "Server has started....." });
});

app.use('/user', UserRouter);
app.use('/post', PostRouter);
app.use('/activity', PostRouter);

// error handling
app.use((err, req, res, next) => {
    console.error(err.message);
    res.json({ status: 500, error: (err.message) ? err.message : "Something broke" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}.....`);
});

//qHPmWWbIeZgeIqfw