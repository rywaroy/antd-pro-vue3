const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

let login = false;

export const getUserInfoApi = () => {
    if (login) {
        return Promise.resolve({
            code: 200,
            data: {
                username: 'zzh',
                roles: ['admin'],
            },
        });
    }

    Promise.reject({
        code: 403,
    });
};

export const getDataListApi = async (params) => {
    console.log('查询参数为：', params);
    await sleep();
    return Promise.resolve({
        code: 200,
        data: {
            list: [
                { id: 1, no: 'No 1', description: '这是一段描述', callNo: 308, status: 0, updatedAt: '2020-01-01' },
                { id: 2, no: 'No 2', description: '这是一段描述', callNo: 308, status: 1, updatedAt: '2020-01-01' },
                { id: 3, no: 'No 3', description: '这是一段描述', callNo: 308, status: 0, updatedAt: '2020-01-01' },
                { id: 4, no: 'No 4', description: '这是一段描述', callNo: 308, status: 2, updatedAt: '2020-01-01' },
                { id: 5, no: 'No 5', description: '这是一段描述', callNo: 308, status: 1, updatedAt: '2020-01-01' },
                { id: 6, no: 'No 6', description: '这是一段描述', callNo: 308, status: 0, updatedAt: '2020-01-01' },
                { id: 7, no: 'No 7', description: '这是一段描述', callNo: 308, status: 1, updatedAt: '2020-01-01' },
                { id: 8, no: 'No 8', description: '这是一段描述', callNo: 308, status: 2, updatedAt: '2020-01-01' },
                { id: 9, no: 'No 9', description: '这是一段描述', callNo: 308, status: 0, updatedAt: '2020-01-01' },
                { id: 10, no: 'No 10', description: '这是一段描述', callNo: 308, status: 0, updatedAt: '2020-01-01' },
            ],
            total: 100,
        },
    });
};

export const loginApi = async (params) => {
    const { username, password } = params;
    await sleep();
    if (username === 'admin' && password === 'admin') {
        login = true;
        return Promise.resolve({
            code: 200,
            data: {
                username: 'zzh',
                roles: ['admin'],
            },
        });
    }
    return Promise.reject({
        code: 403,
    });
};

export const loginoutApi = () => {
    login = false;
    return Promise.resolve({
        code: 200,
    });
};
