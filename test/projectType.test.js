const { expect } = require('chai');
const sinon = require('sinon');
const ProjectType = require('../model/ProjectType');
const {
  getAll,
  getById,
  insertProjectType,
  removeProjectType,
} = require('../service/ProjectType.service');

describe('PROJECT TYPE TESTING', () => {
  let projectTypeFind;
  let projectTypeCreate;
  let projectTypeDelete;
  let projectTypeFindList;

  beforeEach(() => {
    projectTypeFind = sinon.stub(ProjectType, 'findOne');
    projectTypeCreate = sinon.stub(ProjectType, 'create');
    projectTypeDelete = sinon.stub(ProjectType, 'findByIdAndDelete');
    projectTypeFindList = sinon.stub(ProjectType, 'find');
  });

  afterEach(() => {
    projectTypeFind.restore();
    projectTypeCreate.restore();
    projectTypeDelete.restore();
    projectTypeFindList.restore();
  });

  it('ProjectType list', async () => {
    projectTypeFindList.resolves();
    const result = await getAll;
    expect(result);
  });

  it('ProjectType list one', async () => {
    const name = { name: 'Java' };
    projectTypeFindList.resolves(name);
    const result = await getById(name);
    expect(result);
  });

  it('ProjectType created', async () => {
    const name = { name: 'Java' };
    projectTypeCreate.resolves(name);
    const result = await insertProjectType(name);
    expect(result.status).to.equal(200);
    expect(result.message).to.equal('Post Success');
  });

  it('ProjectType created fail', async () => {
    try {
      const name = { name: 'Java' };
      projectTypeFind.resolves(name);
      const result = await insertProjectType(name);
    } catch (error) {
      expect(error.message).to.equal('ProjectType already exists');
    }
  });

  it('Should return success when ProjectType was deleted', async () => {
    const name = { name: 'Java' };
    projectTypeFind.resolves(name);
    projectTypeDelete.resolves(name);
    const result = await removeProjectType();
    expect(result.message).to.equal('Delete Success');
  });
});
