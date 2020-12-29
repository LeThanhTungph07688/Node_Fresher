const { expect } = require('chai');
const sinon = require('sinon');
const Customer = require('../model/Customer');
const {
    getAll,
    getById,
    insertCustomer,
    deleteCustomer,
} = require('../service/Customer.service');

describe('CUSTOMER TESTING', () => {
    let customerFind;
    let customerCreate;
    let customerDelete;
    let customerFindList;

    beforeEach(() => {
        customerFind = sinon.stub(Customer, 'findOne');
        customerCreate = sinon.stub(Customer, 'create');
        customerDelete = sinon.stub(Customer, 'findByIdAndDelete');
        customerFindList = sinon.stub(Customer, 'find');
    });

    afterEach(() => {
        customerFind.restore();
        customerCreate.restore();
        customerDelete.restore();
        customerFindList.restore();
    });

    it('Return array', async () => {
        customerFindList.resolves([])
        const result = await getAll();
        expect(result.data).to.be.an('Array');
    });

    it('Return one customer', async () => {
        const name = { name: 'Java' };
        customerFind.resolves(name);
        const result = await getById();
        expect(customerFind.calledOnce).to.be.true;
        expect(result.status).to.equal(200);
    });

    it('Tech stack created', async () => {
        const name = { name: 'Java' };
        customerCreate.resolves(name);
        const result = await insertCustomer(name);
        expect(result.status).to.equal(200);
        expect(result.message).to.equal('Post Success');
    });

    it('Tech stack created fail', async () => {
        try {
            const name = { name: 'Java' };
            customerFind.resolves(name);
            const result = await insertCustomer(name);
        } catch (error) {
            expect(error.message).to.equal('Tech stack already exists');
        }
    });

    it('Should return success when customer was deleted', async () => {
        const name = { name: 'Java' };
        customerFind.resolves(name);
        customerDelete.resolves(name);
        const result = await deleteCustomer();
        expect(result.message).to.equal('Delete Success');
    });
});