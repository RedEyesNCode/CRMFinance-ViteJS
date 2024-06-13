import React, { useEffect, useState } from "react";
import {
  getCollectionData,
  updateCollection,
} from "../../../apis/apiInterface";

const CollectionDetailsComponent = ({ user_data, handleCloseUserDetails }) => {
  const [CollectionData, setCollectionData] = useState(null);
  const [isUpdateCollection, setUpdateCollection] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);

  const [UpdateFormData, setUpdateFormData] = useState({
    collection_id: "",
    collection_status: "",
    approved_collection_amount: "0",
  });
  const handleChangeinupdate = (e) => {
    const { name, value } = e.target;

    setUpdateFormData({
      ...UpdateFormData,
      [name]: value,
    });
  };
  const fetchCollectionData = async () => {
    try {
      const json = { userId: user_data._id };
      const response = await getCollectionData(json);
      if (response.code === 200) {
        setCollectionData(response);
      } else {
        setCollectionData(null);
      }
      console.log("Collection Detail Compo response -> ", response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("CollectionDetailsComponent", user_data);

    fetchCollectionData();
  }, [user_data]);
  const updateButton = async (user) => {
    setCollectionData(user);

    setUpdateFormData({ collection_id: user._id });
    setUpdateCollection(true);
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const response = await updateCollection(UpdateFormData);
    console.log("Collection Updated -> ", response);
    toast.success(response.message);

    setUpdateFormData({
      collection_id: UpdateFormData.userId,
      collection_amount: "0",
      collection_status: UpdateFormData.collection_status,
    });
    if (response.status === 200) {
      toast.info(response.message);
      fetchCollectionData();

      setCollectionData((prevData) => {
        return {
          ...prevData,
          data: [...prevData.data, response.data],
        };
      });
    } else {
      toast.error(response.error);
    }
    setUpdateCollection(null);
  };

  return (
    <div className="collection-details h-full w-full absolute top-0 left-0 p-4 ">
      <button
        className="bg-red-500 text-white p-2 rounded-lg "
        onClick={handleCloseUserDetails}
      >
        Close
      </button>
      {CollectionData ? (
        <div>
          <div className="overflow-auto-x relative">
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
                  Created At
                </th>

                <th
                  scope="col"
                  className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider border text-center"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-gray-200">
              {CollectionData &&
                CollectionData.data &&
                CollectionData.data.map((user, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 != 0 ? "bg-[#F4FAFF]" : ""}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border bg-[#F3F4F7]">
                      {index + 1}.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                      {user._id.substring(20)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 border">
                      {user.collection_address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-black border">
                      {user.collection_location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-green-800 bg-green-100 border">
                      INR {user.collection_amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-black border">
                      +91 {user.customer_mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-black border bg-red-100">
                      INR {user.customer_penalty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-black border">
                      {user.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-black border">
                      {user.collection_status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-black border">
                      {user.createdAt}
                    </td>
                    <td className=" flex justify-between px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                      <button
                        className="outline-none px-4 py-2 bg-yellow-500 text-white rounded-md"
                        onClick={() => updateButton(user)}
                      >
                        Update Collection Status
                      </button>
                      <button
                        className="outline-none px-4 py-2 bg-red-500 text-white rounded-md"
                        onClick={() => handleUserDeleteFrame(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
         
        </div>
        {isUpdateCollection && (
            <div className="absolute top-0 h-full w-full flex items-center justify-center ">
              <div className="flex flex-col bg-[#3B76EF] p-10 rounded-xl text-white text-xl justify-center gap-8">
                <h1 className="font-bold text-center">
                  UPDATE EMPLOYEE COLLECTION STATUS
                </h1>
                <h2 className="font-mono text-center bg-indigo-500 rounded-lg">
                  {" "}
                  Current Status{" "}
                  {CollectionData && CollectionData.collection_status}
                </h2>
                <form
                  className="flex flex-col gap-6 items-center text-zinc-700"
                  onSubmit={handleUpdateSubmit}
                >
                  <div className="flex">
                    <select
                      className="px-5 py-2 rounded-md outline-none border border-gray-300 w-full" // Applied Tailwind CSS classes
                      onChange={handleChangeinupdate}
                      name="collection_status"
                      value={UpdateFormData.collection_status}
                    >
                      <option value="" disabled>
                        Select Collection Status
                      </option>{" "}
                      {/* Placeholder */}
                      <option value="APPROVED">APPROVED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </div>
                  <input
                    type="submit"
                    className="bg-white text-[#3B76EF] font-bold w-full rounded-md px-5 py-2"
                  />
                  <button
                    onClick={() => setUpdateCollection(false)}
                    className="bg-white text-[#3B76EF] font-bold w-full  rounded-md px-5 py-2"
                  >
                    {" "}
                    Close
                  </button>
                </form>
              </div>
              <button
                className="absolute top-5 right-5 text-white"
                onClick={() => setUpdateCollection(false)}
              >
                ❌
              </button>
            </div>
          )}

        </div>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CollectionDetailsComponent;
