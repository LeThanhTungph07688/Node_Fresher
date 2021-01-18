const { expect } = require('chai');
const sinon = require('sinon');
const Project = require('../model/Project');
const {
  getAll,
  getById,
  insertProject,
  removeProject,
} = require('../service/Project.service');

describe('PROJECT TESTING', () => {
  let projectFind;
  let projectCreate;
  let projectDelete;
  let projectFindList;

  beforeEach(() => {
    projectFind = sinon.stub(Project, 'findOne');
    projectCreate = sinon.stub(Project, 'create');
    projectDelete = sinon.stub(Project, 'findByIdAndDelete');
    projectFindList = sinon.stub(Project, 'find');
  });

  afterEach(() => {
    projectFind.restore();
    projectCreate.restore();
    projectDelete.restore();
    projectFindList.restore();
  });

  it('Project list', async () => {
    projectFindList.resolves();
    const result = await getAll;
    expect(result);
  });

  it('Project list one', async () => {
    const name = { name: 'Java' };
    projectFindList.resolves(name);
    const result = await getById(name);
    expect(result);
  });

  it('Project created', async () => {
    const name = { name: 'Java' };
    projectCreate.resolves(name);
    const result = await insertProject(name);
    expect(result.status).to.equal(200);
    expect(result.message).to.equal('Post Success');
  });

  it('Project created fail', async () => {
    try {
      const name = { name: 'Java' };
      projectFind.resolves(name);
      const result = await insertProject(name);
    } catch (error) {
      expect(error.message).to.equal('Tech stack already exists');
    }
  });

  it('Should return success when Project was deleted', async () => {
    const name = { name: 'Java' };
    projectFind.resolves(name);
    projectDelete.resolves(name);
    const result = await removeProject();
    expect(result.message).to.equal('Delete Success');
  });
});
