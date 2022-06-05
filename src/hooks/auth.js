import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const AuthContext = createContext({
    user: null,
    loading: false,
    signIn: null,
    signOut: null,
    signed: false,
    updateUser: null
});

export const AuthProvider = ({ children }) => {
    const [data, setData] = useState({ token: '' });
    const [loading, setLoading] = useState(false);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function loadStorageData() {
            setLoading(true);
            const [token, user] = await AsyncStorage.multiGet([
                'hidroToken',
                'hidroUser',
            ]);


            if (token[1] && user[1]) {
                api.defaults.headers.authorization =
                    `Bearer ${token[1]}`;

                setData({ token: token[1], user: JSON.parse(user[1]) });
                setSigned(true);
                console.log(token[1], user[1]);
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    const signIn = useCallback(async ({ email, password }) => {
        await api.post('/session', {
            email,
            password,
            flow: 'web'
        })
            .then(async (response) => {
                const { token, user } = response.data.result;
                await AsyncStorage.multiSet([
                    ['hidroToken', token],
                    ['hidroUser', JSON.stringify(user)],
                ]);

                api.defaults.headers.authorization = `Bearer ${token}`;

                setData({ token, user });
                setSigned(true);
            })
            .catch(err => {
                setData({ token: '', user: null });
                alert(err?.response?.data?.message);
            })
            .finally(() => {
                setLoading(false);
            })

    }, []);

    const signOut = useCallback(async () => {
        setLoading(true);
        await AsyncStorage.multiRemove(['hidroToken', 'hidroUser']);
        setSigned(false);
        setData({ token: '', user: null });
        setLoading(false);
    }, []);

    const updateUser = useCallback(
        async (user) => {
            setLoading(true);
            await AsyncStorage.setItem('hidroUser', JSON.stringify(user));
            setData({
                token: data.token,
                user,
            });
            setSigned(true);
            setLoading(false);
        },
        [setData],
    );

    return (
        <AuthContext.Provider
            value={{ user: data.user, loading, signIn, signOut, updateUser, signed }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}