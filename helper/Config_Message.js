const notFound = () => {
    return {
        message: 'Not Found',
        message_code: 'INVALID',
        status: 404
    }
};

const postSuccess = (data) => {
    return {
        message: 'Post Success',
        message_code: 'POST SUCCESS',
        status: 200,
        data,
    }
};
const putSuccess = (data) => {
    return {
        message: 'Put Success',
        message_code: 'PUT SUCCESS',
        status: 200,
        data,
    }
};

const getSuccess = (data) => {
    return {
        message: 'Get Success',
        message_code: 'GET SUCCESS',
        status: 200,
        data,
    }
};

const deleteSuccess = (data) => {
    return {
        message: 'Delete Success',
        message_code: 'DELETE SUCCESS',
        status: 200,
        data,
    }
};
const searchSuccess = (data) => {
    return {
        message: 'Search Success',
        message_code: 'SEARCH SUCCESS',
        status: 200,
        data,
    }
};


module.exports = {
    notFound,
    putSuccess,
    getSuccess,
    postSuccess,
    searchSuccess,
    deleteSuccess
};



