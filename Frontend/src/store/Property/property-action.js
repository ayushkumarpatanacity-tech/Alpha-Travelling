import {propertyActions} from "./property-slice";
import {axiosInstance} from "../../utils/axios";

// get all properties
//1. start api req
//2. tell redux loading start
//3. Get search parameters
//4. Call backend api 
//5. wait for response
//6. Get property data
//7.send data to the redux store
//.8 if error => send error to redux

//dispacth => Send to redux
//getstate => get from redux

export const getAllProperties =() => async(dispatch,getState)=>{
    try{
        console.log("API call started");

        dispatch(propertyActions.getRequest())

       const { searchParams } = getState().properties;

        console.log(searchParams)

        const response = await axiosInstance.get(`/v1/rent/listing`,{
            params:{...searchParams}
        })
        if (!response){
            throw new Error("could not fecth any properties")
        }
        const {data} = response;
        console.log(data);

        dispatch(propertyActions.getProperties(data))

    }catch(error){
      dispatch(propertyActions.getErrors(error.message))
    }
}