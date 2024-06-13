import React, { useEffect, useState } from "react";
import { getCollectionData } from "../../../apis/apiInterface";

const CollectionDetailsComponent = ({ user_data, handleCloseUserDetails }) => {
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
      <button
        className="bg-red-500 text-white p-2 rounded-lg "
        onClick={handleCloseUserDetails}
      >
        Close
      </button>
      {collectionData ? (
        <div className="grid grid-cols-4 gap-4">
          <table className="min-w-full rounded-3xl  p-1">
            <thead className="border">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border bg-[#F3F4F7]"
                >
                  SNO.
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Collection ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Collection Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Collection Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Collection Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Customer Mobile
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Customer Penalty
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Customer Full Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border whitespace-nowrap"
                >
                  Disbursement Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider border text-center"
                >
                  Action
                </th>
              </tr>
            </thead>
            </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CollectionDetailsComponent;
