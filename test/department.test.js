const { expect } = require('chai');
const sinon = require('sinon');
const Department = require('../model/Department');
const {
  getAll,
  getById,
  insertDepartment,
  removeDepartment,
} = require('../service/Department.service');

describe('DEPARTMENT TESTING', () => {
  let departmentFind;
  let departmentCreate;
  let departmentDelete;
  let departmentFindList;

  beforeEach(() => {
    departmentFind = sinon.stub(Department, 'findOne');
    departmentCreate = sinon.stub(Department, 'create');
    departmentDelete = sinon.stub(Department, 'findByIdAndDelete');
    departmentFindList = sinon.stub(Department, 'find');
  });

  afterEach(() => {
    departmentFind.restore();
    departmentCreate.restore();
    departmentDelete.restore();
    departmentFindList.restore();
  });

  it('Department list', async () => {
    departmentFindList.resolves();
    const result = await getAll;
    expect(result);
  });

  it('Tech stack list one', async () => {
    const name = { name: 'Java' };
    departmentFindList.resolves(name);
    const result = await getById(name);
    expect(result);
  });

  it('Department created', async () => {
    const name = { name: 'Java' };
    departmentCreate.resolves(name);
    const result = await insertDepartment(name);
    expect(result.status).to.equal(200);
    expect(result.message).to.equal('Post Success');
  });

  it('Department created fail', async () => {
    try {
      const name = { name: 'Java' };
      departmentFind.resolves(name);
      const result = await insertDepartment(name);
    } catch (error) {
      expect(error.message).to.equal('Tech stack already exists');
    }
  });

  it('Should return success when Department was deleted', async () => {
    const name = { name: 'Java' };
    departmentFind.resolves(name);
    departmentDelete.resolves(name);
    const result = await removeDepartment();
    expect(result.message).to.equal('Delete Success');
  });
});
