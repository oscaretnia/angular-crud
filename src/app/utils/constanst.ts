const HOST = 'http://localhost:3000';

export const CONSTANST = {
    permissions: {},
    routes: {
        authorization: {
            login: HOST + '/api/auth/login',
            logout: HOST + '/api/auth/logout'
        },
        product: {
            list: HOST + '/api/product',
            delete: HOST + '/api/product/:id',
            save: HOST + '/api/product',
            update: HOST + '/api/product/:id',
            get: HOST + '/api/product/:id'
        },
        user: {}
    },
    lang: {},
    session: {},
    parameters: {}
};
