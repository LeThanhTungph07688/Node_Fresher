require('dotenv').config()
const express = require('express');
const db = require('./helper/Connect');
const ProjectType = require('./model/ProjectType');
const port = 3000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const ProjectTyperouter = require('./routes/ProjectType');
const Tech_Stackrouter = require('./routes/Tech_Stack');
const Customerouter = require('./routes/Customer');
const Staffrouter = require('./routes/Staff');
const Departmentrouter = require('./routes/Department');
const Projectrouter = require('./routes/Project');
const Skillrouter = require('./routes/Skill');
const Authrouter = require('./routes/Auth');
const Reportrouter = require('./routes/Report');


const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());

db.connectDB();

app.use('/api',
    [ProjectTyperouter,
        Tech_Stackrouter,
        Customerouter,
        Staffrouter,
        Departmentrouter,
        Projectrouter,
        Skillrouter,
        Authrouter,
        Reportrouter]);

app.listen(process.env.PORT, () => console.log('Start Serve PORT :' + process.env.PORT));