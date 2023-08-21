import {createSlice} from '@reduxjs/toolkit'

const ChainSlice = createSlice({
    name:"chain",
    initialState:{},
    reducers: {
        addChainData(state,action){
            if (Object.keys(state).length === 0) {
                state = action.payload;
                console.log(" state form addChainData ")
                console.log("yhi hai na "+state)
                console.log(state)
                return state
            }

        }
    }
})

export {ChainSlice};
export const {addChainData} = ChainSlice.actions;