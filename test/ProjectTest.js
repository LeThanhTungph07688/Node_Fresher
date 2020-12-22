process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const ProjectTypeRouter = require('../routes/ProjectType');
const should = chai.should();
const ProjectType = require('../model/ProjectType');
chai.use(chaiHttp);
/*
  * Test the /GET route
  */
describe('ProjectType', () => {
    it(' ALL ProjectType ', (done) => {
        chai.request(ProjectTypeRouter)
            .get('/projectTypes')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

