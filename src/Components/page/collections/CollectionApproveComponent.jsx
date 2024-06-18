import React, { useState, useEffect, useRef } from "react";
import {
  createCollection,
  createUser,
  deleteApprovedCollection,
  deleteUser,
  deleteUserCollection,
  getAllCollection,
  getAllUsers,
  getApprovedCollections,
  getCollectionData,
  updateCollection,
  updateUserCollectionAmount,
} from "../../../apis/apiInterface";
import { ToastContainer, toast } from "react-toastify";

const CollectionApproveComponent = () => {
  const [UserData, setUserData] = useState(null);
  const [AllCollection, setAllCollection] = useState(null);
  const [CollectionData, setCollectionData] = useState(null);
  const [CurrentUser, setCurrentUser] = useState(null);
  const [isUserDeleteFrame, setUserDeleteFrame] = useState(null);
  const [isUserDetailsFrame, setUserDetailFrame] = useState(null);
  const [addCollection, setaddCollection] = useState(false);
  const [isUpdateCollection, setisUpdateCollection] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    telephoneNumber: "",
  });
  const [UpdateFormData, setUpdateFormData] = useState({
    userId: "",
    collection_amount: "",
  });
  const deleteCurrentUser = async (CurrentUser) => {
    try {
      const rawJson = { collection_id: CurrentUser._id };
      const response = await deleteApprovedCollection(rawJson);
      console.log("Collection Deleted -> ", response);
      if (response.code == 200) {
        window.alert(response.message);
        handleHideUserDeleteFrame();
        callGetUsersAPI();
      } else {
        window.alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserDeleteFrame = (user) => {
    setUserDetailFrame(false);
    setUserDeleteFrame(true);
    setCurrentUser(user);
  };
  const handleHideUserDeleteFrame = (user) => {
    setUserDetailFrame(false);
    setUserDeleteFrame(false);
    setCurrentUser(user);
  };
  const handleOpenUserDetails = (user) => {
    setCurrentUser(user);
    setUserDeleteFrame(false);

    setUserDetailFrame(true);
  };
  const handleCloseUserDetails = () => {
    setUserDetailFrame(false);
    setUserDeleteFrame(false);
    callGetUsersAPI();
  };
  const callGetUsersAPI = async () => {
    try {
      const response = await getApprovedCollections();
      setCollectionData(response);
      console.log("Collection Fetched response -> ", response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const CollectionData = async () => {
      try {
        const response = await getApprovedCollections();
        if (response.code == 200) {
          setCollectionData(response);
        } else {
          setCollectionData(null);
        }
        console.log("Collection Fetched response -> ", response);
      } catch (error) {
        console.log(error);
      }
    };
    CollectionData();
  }, [addCollection, isUserDeleteFrame, isUpdateCollection]);
  useEffect(() => {
    const UsersData = async () => {
      try {
        const response = await getApprovedCollections();
        if (response.code == 200) {
          setUserData(response);
        } else {
          setUserData(null);
        }
        console.log("Users Fetched response -> ", response);
      } catch (error) {
        console.log(error);
      }
    };
    UsersData();
  }, [addCollection, isUserDeleteFrame]);
  const collforSelect = (user) => {
    const fetchAllCollection = async () => {
      try {
        const json = { userId: user._id };
        const response = await getCollectionData(json);
        if (response.code === 200) {
          setAllCollection(response.data);
        } else {
          setAllCollection(null);
        }
        console.log("All Collection for select  -> ", response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCollection();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [maxAmount, setMaxAmount] = useState(0);
  const handleChangeinupdate = (e) => {
    const { name, value } = e.target;

    setUpdateFormData({
      ...UpdateFormData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createCollection(formData);
    console.log("Collection Created -> ", response);
    setFormData({
      fullName: "",
      telephoneNumber: "",
    });
    if (response.status === 200) {
      setCollectionData((prevData) => {
        return {
          ...prevData,
          data: [...prevData.data, response.data],
        };
      });
    }
    setaddCollection(false);
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const response = await updateUserCollectionAmount(UpdateFormData);
    console.log("Collection Updated -> ", response);
    toast.success(response.message);

    setUpdateFormData({
      userId: UpdateFormData.userId,
      collection_amount: UpdateFormData.collection_amount,
    });
    if (response.status === 200) {
      toast.info(response.message);
      callGetUsersAPI();

      setCollectionData((prevData) => {
        return {
          ...prevData,
          data: [...prevData.data, response.data],
        };
      });
    } else {
      toast.error(response.error);
    }
    setisUpdateCollection(null);
  };
  const updateButton = async (user) => {
    collforSelect(user);
    setCurrentUser(user);

    setUpdateFormData({ userId: user._id });
    setisUpdateCollection(true);
  };
  if (CollectionData == null) {
    return (
      <h2 className="text-white text-[21px] font-semibold font-mono  rounded-md p-2">
        No Approved Collections Found !!
      </h2>
    );
  }

  return (
    <main className=" w-full">
      <ToastContainer />
      <div className="  border border-gray-300 relative">
        {!isUserDetailsFrame && CollectionData && (
          <div className="overflow-auto h-[615px] relative">
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
                      <td className=" flex justify-between px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        <button
                          className="outline-none px-4 py-2 bg-red-500 text-white rounded-md"
                          onClick={() => handleUserDeleteFrame(user)}
                        >
                          Delete Approved Collection
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
                onClick={() => handleHideUserDeleteFrame(CurrentUser)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteCurrentUser(CurrentUser)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CollectionApproveComponent;
