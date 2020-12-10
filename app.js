require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const db = require('./helper/Connect');
const ProjectType = require('./model/ProjectType');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/ProjectType');
const router2 = require('./routes/Tech_Stack');
const router3 = require('./routes/Customer');
const router4 = require('./routes/Staff');
const router5 = require('./routes/Department');
const router6 = require('./routes/Project');



app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


db.connectDB();

app.use('/', [router, router2, router3, router4, router5, router6]);
app.listen(process.env.PORT, () => console.log(process.env.PORT));