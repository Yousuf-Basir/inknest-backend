require("dotenv").config();

const express = require("express");
var cors = require('cors');
const app = express();

// Routes
const authRoute = require("./Routes/auth.route");
const getData = require("./Routes/getData.route");
const fileCrude = require("./Routes/fileCrud.route");
const shelfCrud = require("./Routes/shelfCrud.route");
const sharingRoute = require("./Routes/sharing.route");
const exploreRoute = require("./Routes/explore.route");

app.use(cors())
app.use(express.json());

app.use(authRoute);
app.use(getData);
app.use(fileCrude);
app.use(shelfCrud);
app.use(sharingRoute);
app.use(exploreRoute);

module.exports = app;

if(require.main === module) {
    const port = process.env.PORT || 3001

    app.listen(port, ()=> {
        console.log(`Server running on port: ${port}`);
    })
}