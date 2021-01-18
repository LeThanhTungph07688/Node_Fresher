const { expect } = require('chai');
const sinon = require('sinon');
const Staff = require('../model/Staff');
const {
  getAll,
  getById,
  insertStaff,
  removeStaff,
} = require('../service/Staff.service');

describe('STAFF TESTING', () => {
  let staffFind;
  let staffCreate;
  let staffDelete;
  let staffFindList;

  beforeEach(() => {
    staffFind = sinon.stub(Staff, 'findOne');
    staffCreate = sinon.stub(Staff, 'create');
    staffDelete = sinon.stub(Staff, 'findByIdAndDelete');
    staffFindList = sinon.stub(Staff, 'find');
  });

  afterEach(() => {
    staffFind.restore();
    staffCreate.restore();
    staffDelete.restore();
    staffFindList.restore();
  });

  it('Staff list', async () => {
    staffFindList.resolves();
    const result = await getAll;
    expect(result);
  });

  it('Staff list one', async () => {
    const name = { name: 'Java' };
    staffFindList.resolves(name);
    const result = await getById(name);
    expect(result);
  });

  it('Staff created', async () => {
    const name = { name: 'Java' };
    staffCreate.resolves(name);
    const result = await insertStaff(name);
    expect(result.status).to.equal(200);
    expect(result.message).to.equal('Post Success');
  });

  it('Staff created fail', async () => {
    try {
      const name = { name: 'Java' };
      staffFind.resolves(name);
      const result = await insertStaff(name);
    } catch (error) {
      expect(error.message).to.equal('Staff already exists');
    }
  });

  it('Should return success when Staff was deleted', async () => {
    const name = { name: 'Java' };
    staffFind.resolves(name);
    staffDelete.resolves(name);
    const result = await removeStaff();
    expect(result.message).to.equal('Delete Success');
  });
});
