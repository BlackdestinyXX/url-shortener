const express = require('express');
const path = require('path');
const app = express()

app.use(express.static('public'));

const shorten = require("./routes/shorten.route");
const redirect = require("./routes/redirect.route");

app.use("/api", shorten);

app.use("/", redirect);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages', 'index.html'));
})

app.listen(5000, () => {
    console.log('App online')
})