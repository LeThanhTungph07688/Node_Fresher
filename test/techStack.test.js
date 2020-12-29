const { expect } = require('chai');
const sinon = require('sinon');
const TechStack = require('../model/Tech_Stack');
const {
    getAll,
    getById,
    createTech,
    deleteTech,
} = require('../service/TechStack.service');

describe('TECH STACK TESTING', () => {
    let techStackFind;
    let techStackCreate;
    let techStackDelete;
    let techStackFindList;

    beforeEach(() => {
        techStackFind = sinon.stub(TechStack, 'findOne');
        techStackCreate = sinon.stub(TechStack, 'create');
        techStackDelete = sinon.stub(TechStack, 'findByIdAndDelete');
        techStackFindList = sinon.stub(TechStack, 'find');
    });

    afterEach(() => {
        techStackFind.restore();
        techStackCreate.restore();
        techStackDelete.restore();
        techStackFindList.restore();
    });

    it('Return array', async () => {
        techStackFindList.resolves([])
        const result = await getAll();
        console.log(result);
        expect(result.data).to.be.an('array');
    });

    it('Return one TechStack', async () => {
        const name = { name: 'Java' };
        techStackFind.resolves(name);
        const result = await getById();
        expect(techStackFind.calledOnce).to.be.true;
        expect(result.status).to.equal(200);
    });

    it('Tech stack created', async () => {
        const name = { name: 'Java' };
        techStackCreate.resolves(name);
        const result = await createTech(name);
        expect(result.status).to.equal(200);
        expect(result.message).to.equal('Post Success');
    });

    it('Tech stack created fail', async () => {
        try {
            const name = { name: 'Java' };
            techStackFind.resolves(name);
            const result = await createTech(name);
        } catch (error) {
            expect(error.message).to.equal('Tech stack already exists');
        }
    });

    it('Should return success when TechStack was deleted', async () => {
        const name = { name: 'Java' };
        techStackFind.resolves(name);
        techStackDelete.resolves(name);
        const result = await deleteTech();
        expect(result.message).to.equal('Delete Success');
    });
});