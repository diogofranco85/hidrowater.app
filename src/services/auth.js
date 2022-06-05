import api from './api';

export async function signIn(user, password){
    api.post('/session', {
        email: user,
        password: password,
        flow: 'app'
    });
}