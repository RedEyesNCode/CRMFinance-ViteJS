import React, { useEffect, useState } from "react";
import { getCollectionData } from "../../../apis/apiInterface";

const CollectionDetailsComponent = ({ user_data }) => {
  const [collectionData, setCollectionData] = useState(null);

  useEffect(() => {
    console.log("CollectionDetailsComponent", user_data);
    const fetchCollectionData = async () => {
      try {
        const json = { userId: user_data._id };
        const response = await getCollectionData(json);
        if (response.code === 200) {
          setCollectionData(response.data);
        } else {
          setCollectionData(null);
        }
        console.log("Collection Detail Compo response -> ", response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCollectionData();
  }, [user_data]);

  return (
    <div className="collection-details h-full w-full absolute top-0 left-0 p-4">
      {collectionData ? (
        <div className="grid grid-cols-4 gap-4">
          {collectionData.map((collection, index) => (
            <div key={index} className="collection-card shadow-lg text-white rounded-lg p-6  bg-blue-500" >
              <h2 className="text-2xl font-bold mb-4">Collection Details</h2>
              <p><strong>Full Name:</strong> {collection.fullName}</p>
              <p><strong>Address:</strong> {collection.collection_address}</p>
              <p><strong>Amount:</strong> {collection.collection_amount}</p>
              <p><strong>Location:</strong> {collection.collection_location}</p>
              <p><strong>Status:</strong> {collection.collection_status}</p>
              <p><strong>Created At:</strong> {new Date(collection.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(collection.updatedAt).toLocaleString()}</p>
              <p><strong>User:</strong> {collection.user}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CollectionDetailsComponent;