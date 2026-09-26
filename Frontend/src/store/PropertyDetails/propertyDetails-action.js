import { propertyDetailsActions } from "./propertDetails-slice";
import { axiosInstance } from "../../utils/axios"

// fetch details of one specific property using its id 
//recv property id 
//start loading 
//call backend api
//wait for response 
//get the property data 
//store details in redux
//if error store error in redux 

export const getPropertyDetails =(id) => async(dispatch)=>{
    try{
        dispatch(propertyDetailsActions.getListRequest());
        const response = await axiosInstance.get(`/v1/rent/listing/${id}`)
        console.log(response);
        if(!response){
            throw new Error ("Could not fetch any propertyDetails")
        }
         
        const {data} = response;
        dispatch(propertyDetailsActions.getPropertyDetails(data))
    }catch(error){
     dispatch(propertyDetailsActionsActions.getErrors(error.response.data.error))
    }
}