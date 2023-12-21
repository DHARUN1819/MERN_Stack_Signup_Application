require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const path = require('path');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

const _dirname=path.dirname("")
const buildPath=path.join(_dirname ,"../client/build")

app.use(express.static(buildPath))

app.get("/*",function(req,res){

    res.sendFile(
        path.join(__dirname,"../client/build/index.html"),
        function(err){
            res.status(500).send(err);
        }
    )
});