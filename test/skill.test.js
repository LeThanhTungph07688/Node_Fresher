const { expect } = require('chai');
const sinon = require('sinon');
const Skill = require('../model/Skill');
const {
  getAll,
  getById,
  insertSkill,
  removeSkill,
} = require('../service/Skill.service');

describe('STAFF TESTING', () => {
  let skillfFind;
  let skillfCreate;
  let skillfDelete;
  let skillfFindList;

  beforeEach(() => {
    skillfFind = sinon.stub(Skill, 'findOne');
    skillfCreate = sinon.stub(Skill, 'create');
    skillfDelete = sinon.stub(Skill, 'findByIdAndDelete');
    skillfFindList = sinon.stub(Skill, 'find');
  });

  afterEach(() => {
    skillfFind.restore();
    skillfCreate.restore();
    skillfDelete.restore();
    skillfFindList.restore();
  });

  it('Skill list', async () => {
    skillfFindList.resolves();
    const result = await getAll;
    expect(result);
  });

  it('Skill list one', async () => {
    const name = { name: 'Java' };
    skillfFindList.resolves(name);
    const result = await getById(name);
    expect(result);
  });

  it('Skill created', async () => {
    const name = { name: 'Java' };
    skillfCreate.resolves(name);
    const result = await insertSkill(name);
    expect(result.status).to.equal(200);
    expect(result.message).to.equal('Post Success');
  });

  it('Skill created fail', async () => {
    try {
      const name = { name: 'Java' };
      skillfFind.resolves(name);
      const result = await insertSkill(name);
    } catch (error) {
      expect(error.message).to.equal('Skill already exists');
    }
  });

  it('Should return success when Skill was deleted', async () => {
    const name = { name: 'Java' };
    skillfFind.resolves(name);
    skillfDelete.resolves(name);
    const result = await removeSkill();
    expect(result.message).to.equal('Delete Success');
  });
});
