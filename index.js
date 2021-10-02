require("dotenv").config();

const express = require("express");
const app = express();

// Routes
const authRoute = require("./Routes/auth.route");
const getData = require("./Routes/getData.route");
const fileCrude = require("./Routes/fileCrud.route");
const shelfCrud = require("./Routes/shelfCrud.route");

app.use(express.json());

app.use(authRoute);
app.use(getData);
app.use(fileCrude);
app.use(shelfCrud);

module.exports = app;

if(require.main === module) {
    const port = process.env.PORT || 3001

    app.listen(port, ()=> {
        console.log(`Server running on port: ${port}`);
    })
}