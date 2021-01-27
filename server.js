const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db');
const postRoutes = require('./routes/posts')

const app = express();

connectDB();

app.use(express.json({ extended: false })) //this allows us to get the data in req.body

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());

app.get('/', (req, res) => {
    res.send("api running");
});

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`));