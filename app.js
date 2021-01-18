require('dotenv').config()
const express = require('express');
const db = require('./helper/Connect');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const projectTypeRouter = require('./routes/ProjectType');
const techStackRouter = require('./routes/Tech_Stack');
const customeRouter = require('./routes/Customer');
const staffRouter = require('./routes/Staff');
const departmentRouter = require('./routes/Department');
const projectRouter = require('./routes/Project');
const skillRouter = require('./routes/Skill');
const authRouter = require('./routes/Auth');
const reportRouter = require('./routes/Report');
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

db.connectDB();

app.use('/api',
  [projectTypeRouter,
    techStackRouter,
    customeRouter,
    staffRouter,
    departmentRouter,
    projectRouter,
    skillRouter,
    authRouter,
    reportRouter]);

app.listen(process.env.PORT, () => console.log('Start Serve PORT :' + 3000));
