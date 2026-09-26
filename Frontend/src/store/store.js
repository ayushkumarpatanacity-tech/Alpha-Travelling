import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./Property/property-slice";
import propertyDetailsSlice from "./PropertyDetails/propertDetails-slice";
import userSlice from "./User/user-slice";
import bookingReducer from "./Booking/booking-slice";
import accomodationSlice from "./Accomodation/Accomodation-slice";
import paymentSlice from "./Payment/payment-slice";


const store = configureStore({
    reducer:{
        properties: propertySlice.reducer,
        propertyDetails: propertyDetailsSlice.reducer,
        user: userSlice.reducer,
        booking: bookingReducer,
        accomodation: accomodationSlice.reducer,
        payment: paymentSlice.reducer
    }
})

export default store;