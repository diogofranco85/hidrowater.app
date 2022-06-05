import { configureStore } from '@reduxjs/toolkit'

import farms from './farms';

const store = configureStore({
    reducer: {
        farms
    }
})

export default store;