import { createSlice } from '@reduxjs/toolkit'

const store = createSlice({
    name: 'farms',
    initialState: {
        data: [{ id: 1, nome: 'Diogo' }, { id: 2, nome: "Franco" }],
        item: {},
        loading: false,
        error: false,
        message: ''
    },
    reducers: {
        setData(state, { payload }) {
            state.data = payload
        },

        setItem(state, { payload }) {
            state.item = payload
        },

        setLoading(state, { payload }) {
            state.loading = payload
        },

        setError(state, { payload }) {
            state.error = payload
        },

        setMessage(state, { payload }) {
            state.message = payload
        }
    },

})

export const { setData, setError, setMessage, setLoading, setItem } = store.actions;

export default store.reducer;