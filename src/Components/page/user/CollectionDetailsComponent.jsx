import React, { useEffect, useState } from "react";
import {
  deleteUserCollection,
  getCollectionData,
  updateCollection,
} from "../../../apis/apiInterface";
import { toast } from "react-toastify"; // Make sure to import toast for notifications

const CollectionDetailsComponent = ({ user_data, handleCloseUserDetails }) => {
  const [CollectionData, setCollectionData] = useState(null);
  const [isUpdateCollection, setUpdateCollection] = useState(false);
  const [UpdateFormData, setUpdateFormData] = useState({
    collection_id: "",
    collection_status: "",
    approved_collection_amount: "0",
  });
  const [isUserDeleteFrame, setUserDeleteFrame] = useState(null);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [showBulkUpdatePopup, setShowBulkUpdatePopup] = useState(false);
  const [bulkUpdateStatus, setBulkUpdateStatus] = useState("");

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
    setUpdateCollection(true);

    setCollectionData(user); // Set the current collection to be updated
    setUpdateFormData({
      collection_id: user._id,
      collection_status: UpdateFormData.collection_status,
      approved_collection_amount: "0",
    });
  };
  const handleCloseUpdateCollection = async () => {
    setUpdateCollection(false);
    fetchCollectionData();
  };
  const handleHideUserDeleteFrame = (user) => {
    setUserDeleteFrame(false);
    setCollectionData(user);
  };
  const deleteCurrentUser = async (CurrentUser) => {
    try {
      const rawJson = { collection_id: CurrentUser._id };
      const response = await deleteUserCollection(rawJson);
      console.log("Collection Deleted -> ", response);
      if (response.code == 200) {
        window.alert(response.message);
        handleHideUserDeleteFrame();
        fetchCollectionData();
      } else {
        window.alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const rawJson = {
        userId: user_data._id,

        collection_id: CollectionData._id,
        approved_collection_amount: "0",
        status: UpdateFormData.collection_status,
      };
      const response = await updateCollection(rawJson);
      console.log("Collection Updated -> ", response);
      toast.success(response.message);
      fetchCollectionData();

      setUpdateFormData({
        collection_id: "",
        collection_status: "",
        approved_collection_amount: "0",
      });
      if (response.status === 200) {
        toast.info(response.message);
        fetchCollectionData();
      } else {
        toast.error(response.error);
      }
      setUpdateCollection(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the collection.");
    }
  };

  const handleUserDeleteFrame = (user) => {
    setUserDeleteFrame(true);
    setCollectionData(user);
  };
  const handleCheckboxChange = (collectionId) => {
    if (selectedCollections.includes(collectionId)) {
      setSelectedCollections(
        selectedCollections.filter((id) => id !== collectionId)
      );
    } else {
      setSelectedCollections([...selectedCollections, collectionId]);
    }
  };
  const handleUpdateMultipleCollections = async () => {
    try {
      const responsePromises = selectedCollections.map((collectionId) =>
        updateCollection({
          userId: user_data._id,
          collection_id: collectionId,
          status: bulkUpdateStatus,
        })
      );
      const responses = await Promise.all(responsePromises);
      responses.forEach((response) => {
        console.log(response);
        if (response.code === 200) {
          toast.success(`Collection updated successfully`);
        } else {
          toast.error(`Error updating collection ${response.collection_id}`);
        }
      });
      fetchCollectionData();
      setSelectedCollections([]);
      setShowBulkUpdatePopup(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating multiple collections.");
    }
  };
  

  return (
    <main className=" h-[85%] w-full ">
      <div className=" w-full absolute top-0 left-0 ">
        <div className="flex flex-row items-center justify-center p-1">
          <div
            className="rounded-xl w-40 h-16 p-7 m-2 bg-indigo-700 text-white flex items-center cursor-pointer"
            onClick={handleCloseUserDetails}
          >
            Go Back
          </div>
          <div
            className="rounded-xl w-full p-5 items-center justify-center cursor-pointer  bg-cyan-700 text-white font-mono "
            onClick={handleCloseUserDetails}
          >
            User Collection From Customers
          </div>
          <button
            className="ml-4 px-5 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowBulkUpdatePopup(true)}
          >
            Update Multiple Collections
          </button>
        </div>

        {CollectionData ? (
          <div className="">
            {CollectionData && (
              <div className="overflow-auto h-[531px] relative">
                <table className="min-w-full rounded-3xl p-1">
                  <thead className="border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border bg-[#F3F4F7]">
                        Select
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border bg-[#F3F4F7]">
                        SNO.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                        Collection ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                        Collection Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                        Collection Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                        Collection Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-indigo-300 uppercase tracking-wider border">
                        EMI Bill
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                        Customer Mobile
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                        Customer Penalty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                        Customer Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-gray-200">
                    {CollectionData.data &&
                      CollectionData.data.map((user, index) => (
                        <tr
                          key={index}
                          className={`${index % 2 !== 0 ? "bg-[#F4FAFF]" : ""}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedCollections.includes(user._id)}
                              onChange={() => handleCheckboxChange(user._id)}
                            />
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border bg-[#F3F4F7]">
                            {index + 1}.
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                            {user._id.substring(20)}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 border relative group">
                            <div className="whitespace-nowrap overflow-hidden text-ellipsis rounded-lg bg-indigo-800 text-white p-1">
                              View Address
                            </div>
                            <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10">
                              {user.collection_address}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm font-medium text-gray-900 border relative group">
                            <div className="whitespace-nowrap overflow-hidden text-ellipsis rounded-lg bg-indigo-800 text-white p-1">
                              View Location
                            </div>
                            <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10">
                              {user.collection_location}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-green-800 bg-green-100 border">
                            INR {user.collection_amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-green-800  border">
                            <a
                              href={user.generated_emi_bill} // Assuming this is a valid URL
                              target="_blank" // Open in a new tab
                              rel="noopener noreferrer" // Security: Prevent new tab from accessing parent window
                              className="inline-block px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700" // Styling
                            >
                              View EMI Bill
                            </a>
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
                          <td
                            className={`px-2 py-2 whitespace-nowrap text-sm font-medium border 
                ${
                  user.collection_status === "PENDING"
                    ? "bg-yellow-500 text-center text-white"
                    : ""
                }
                ${
                  user.collection_status === "DISBURSED"
                    ? "bg-blue-500 rounded-none text-center text-white"
                    : ""
                }

                ${
                  user.collection_status === "APPROVED"
                    ? "bg-green-500 text-white text-center"
                    : ""
                }
                ${
                  user.collection_status === "REJECTED"
                    ? "bg-red-500 text-white "
                    : ""
                }`}
                          >
                            {user.collection_status}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-black border">
                            {user.createdAt}
                          </td>
                          <td className="flex justify-between px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                            <button
                              className="outline-none px-4 py-2 bg-yellow-500 text-white rounded-md"
                              onClick={() => updateButton(user)}
                            >
                              Update Collection Status
                            </button>
                            <button
                              className="outline-none px-4 py-2 bg-red-500 text-white rounded-md m-1"
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
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {isUpdateCollection && (
        <div className="backdrop-filter backdrop-blur-sm fixed top-0 left-0 w-full h-full flex items-center justify-center ">
          <div className="flex flex-col bg-[#3B76EF] p-10 rounded-xl text-white text-xl justify-center gap-8">
            <h1 className="font-bold text-center">UPDATE COLLECTION STATUS</h1>
            <h2 className="font-mono text-center bg-indigo-500 rounded-lg p-2">
              Current Status: {CollectionData.collection_status}
            </h2>
            <form
              className="flex flex-col gap-6 items-center text-zinc-700"
              onSubmit={handleUpdateSubmit}
            >
              <div className="flex">
                <select
                  className="px-5 py-2 rounded-md outline-none border border-gray-300 w-full"
                  onChange={handleChangeinupdate}
                  name="collection_status"
                  value={UpdateFormData.collection_status}
                >
                  <option value="" disabled>
                    Select Collection Status
                  </option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>
              <input
                type="submit"
                className="bg-white text-[#3B76EF] font-bold w-full rounded-md px-5 py-2"
                value="Update"
              />
              <button
                onClick={handleCloseUpdateCollection}
                className="bg-white text-[#3B76EF] font-bold w-full rounded-md px-5 py-2"
              >
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
      {isUserDeleteFrame && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-950">
              Are you sure?
            </h2>
            <p className="mb-6 text-red-950 font-semibold">
              This action cannot be undone.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => handleHideUserDeleteFrame(CollectionData)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteCurrentUser(CollectionData)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showBulkUpdatePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Update Collection Status
            </h2>
            <select
              className="px-5 py-2 rounded-md outline-none border border-gray-300 w-full max-w-xs"
              onChange={(e) => setBulkUpdateStatus(e.target.value)}
              value={bulkUpdateStatus}
            >
              <option value="" disabled>
                Select Collection Status
              </option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleUpdateMultipleCollections}
              >
                Update
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
                onClick={() => setShowBulkUpdatePopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CollectionDetailsComponent;
