//propertyDetails

//create a slice name 
// create initail state
// request starts
// property data recived
//error occurs
//export Actions
//export slice

import { createSlice } from "@reduxjs/toolkit";

const propertyDetailsSlice = createSlice({
    name: "propertyDetails",
    initialState:{
        propertyDetails:null,
        loading:false,
        error:null
    },
    reducers:{
        getListReuest(state){
            state.loading = true
        },
        getPropertyDetails(state,action){
            state.propertyDetails = action.payload;
            state.loading = false
        },
        getErrors(state,action){
             state.error = action.payload;
             state.loading = false
        }
    }
})

export const propertyDetailsActions = propertyDetailsSlice.actions;
export default propertyDetailsSlice;