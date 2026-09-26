import React, { useEffect, useState } from "react";

import "../../css/PropertyListing.css";

import PropertyImg from "./PropertyImg";
import PaymentForm from "./PaymentForm";
import PropertyAmenities from "./PropertyAmenities";
import PropertMapInfo from "./PropertyMapInfo";

import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { getPropertyDetails } from "../../store/PropertyDetails/propertyDetails-action";
import { axiosInstance } from "../../utils/axios";

const PropertyListing = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [propertydetails, setPropertyDetails] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log("Property ID:", id);

        const response = await axiosInstance.get(
          `/v1/rent/listing/${id}`
        );

        console.log("Property Response:", response.data);

        setPropertyDetails(response.data.data);
      } catch (error) {
        console.log("Property Error:", error);
        setPropertyDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="row justify-content-around mt-5">
        <LoadingSpinner />
      </div>
    );
  }

  if (!propertydetails) {
    return <p className="not_found">Property not found</p>;
  }

  const {
    propertyName,
    address,
    description,
    images,
    amenities,
    maximumGuest,
    price,
    currentBookings,
  } = propertydetails;

  return (
    <div className="property-container">

      <p className="property-header">
        {propertyName}
      </p>

      <h6 className="property-location">
        <span className="material-symbols-outlined">
          house
        </span>

        <span className="location">
          {`${address?.area || ""}, ${address?.city || ""}, ${
            address?.state || ""
          }`}
        </span>
      </h6>

      <PropertyImg images={images} />

      <div className="middle-container row">

        <div className="des-and-amenities col-md-8 col-sm-12 col-12">

          <h2 className="property-description-header">
            Description
          </h2>

          <p className="property-description">
            {description}
            <br />
            <br />
            Max number of guests: {maximumGuest}
          </p>

          <hr />

          <PropertyAmenities amenities={amenities} />

        </div>

        <div className="property-payment col-md-4 col-sm-12 col-12">

          <PaymentForm
            propertyId={id}
            price={price}
            propertyName={propertyName}
            address={address}
            maximumGuest={maximumGuest}
            currentBookings={currentBookings}
          />

        </div>

      </div>

      <hr />

      <div className="property-map">

        <div className="map-image-exinfo-container row">

          <PropertMapInfo address={address} />

        </div>

      </div>

    </div>
  );
};

export default PropertyListing;