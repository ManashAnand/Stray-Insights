import { configureStore } from '@reduxjs/toolkit'
import { ChainSlice } from './slice/BlockchainSlice'

const store = configureStore({
    reducer: {
        chain: ChainSlice.reducer,
    }
})

export default store;