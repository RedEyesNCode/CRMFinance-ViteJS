import React, { useState, useEffect, useRef } from "react";
import {
  createCollection,
  createUser,
  deleteUser,
  deleteUserCollection,
  getAllCollection,
  getAllUsers,
  getCollectionData,
  updateCollection,
} from "../../../apis/apiInterface";
import CollectionDetailsComponent from "./CollectionDetailsComponent";

const UserCollectionTable = () => {
  const [UserData, setUserData] = useState(null);
  const [AllCollection, setAllCollection] = useState(null)
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
    collection_id: "",
    status: "",
    approved_collection_amount: "",
  });
  const deleteCurrentUser = async (CurrentUser) => {
    try {
      const rawJson = { collection_id: CurrentUser._id };
      const response = await deleteUserCollection(rawJson);
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
      const response = await getAllCollection();
      setCollectionData(response);
      console.log("Collection Fetched response -> ", response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const CollectionData = async () => {
      try {
        const response = await getAllCollection();
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
        const response = await getAllUsers();
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
 const collforSelect = (user) =>
 {
  const fetchAllCollection = async () => {
    try {
      const json = { userId: user._id};
      const response = await getCollectionData(json);
      if (response.code === 200) {
        setAllCollection(response.data);
      } else {
        setAllCollection(null);
      }
      console.log("Collection Fetched response -> ", response);
    } catch (error) {
      console.log(error);
    }
  };
  fetchAllCollection();
 } 
    
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeinupdate = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    const response = await updateCollection(UpdateFormData);
    console.log("Collection Updated -> ", response);
    setUpdateFormData({
      collection_id: "",
      status: "",
      approved_collection_amount: "",
    });
    if (response.status === 200) {
      setCollectionData((prevData) => {
        return {
          ...prevData,
          data: [...prevData.data, response.data],
        };
      });
    }
    setisUpdateCollection(null);
  };
  const updateButton = async (user) => {
    collforSelect(user);
    setUpdateFormData({ collection_id: coll._id, userId: user._id });
    setisUpdateCollection(true);
  };

  if (CollectionData == null) {
    return (
      <main className="w-full bg-blue-800 flex items-center justify-between px-10 py-3 relative">
        <h2 className="text-white text-[21px] font-semibold font-mono  rounded-md p-2">
          No Users found !!
        </h2>
        <button
          onClick={() => setaddCollection(true)}
          className="border  px-3 h-10 rounded-xl font-semibold bg-white"
        >
          ADD USER
        </button>
        {addCollection && (
          <div className="absolute  h-full w-full flex items-center justify-center backdrop-blur-lg">
            <div className="flex flex-col  bg-[#3B76EF] p-10 rounded-xl text-white text-xl justify-center gap-8 mt-[400px]">
              <h1 className="font-bold text-center ">ADD USER</h1>
              <form
                className="flex flex-col gap-6 items-center text-zinc-700"
                onSubmit={handleSubmit}
              >
                <input
                  className="px-5 py-2 rounded-md outline-none"
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  placeholder="Enter name of user"
                />
                <input
                  className="px-5 py-2 rounded-md outline-none"
                  onChange={handleChange}
                  type="text"
                  name="telephoneNumber"
                  value={formData.telephoneNumber}
                  placeholder="Enter number of user"
                />
                <input
                  type="submit"
                  className="bg-white text-[#3B76EF] font-bold w-1/2 rounded-md px-5 py-2"
                />
              </form>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="h-full w-full">
      <div className="  border border-gray-300 relative">
        {!isUserDetailsFrame && CollectionData && (
          <div className="relative overflow-auto h-fill">
            <div className="flex justify-between px-5 py-2 items-center bg-cyan-400 text-black">
              <h2 className="m-[10px] text-[20px] font-mono font-bold">
                Users Collection
              </h2>
              <button
                onClick={() => setaddCollection(true)}
                className="border  px-3 h-10 rounded-xl font-semibold bg-white"
              >
                ADD COLLECTION
              </button>
            </div>

            <table className="min-w-full  table-auto p-1">
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
                    User ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Total Collection Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Employee ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3  text-xs text-center font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Actions
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-green-800 bg-green-100 border">
                        ₹ {user.totalCollectionAmount}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.employeeId}
                      </td>
                      <td className=" flex justify-between px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        <button
                          className="outline-none px-4 py-2 bg-blue-500 text-white rounded-md"
                          onClick={() => handleOpenUserDetails(user)}
                        >
                          View
                        </button>
                        <button
                          className="outline-none px-4 py-2 bg-red-500 text-white rounded-md"
                          onClick={() => handleUserDeleteFrame(user)}
                        >
                          Delete
                        </button>
                      </td>
                      <td className="flex justify-between px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        <select name="" id="" className="border bg-zinc-400 rounded-lg px-2 text-white outline-none">
                          <option>Select Collection</option>

                        </select>
                        <button
                          className="outline-none px-4 py-2 bg-yellow-500 text-white rounded-md"
                          onClick={() => updateButton(user)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {CurrentUser && isUserDetailsFrame && (
          <CollectionDetailsComponent
            user_data={CurrentUser}
            handleCloseUserDetails={handleCloseUserDetails}
          />
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
      {addCollection && (
        <div className="absolute top-0 h-full w-full flex items-center justify-center backdrop-blur-lg">
          <div className="flex flex-col  bg-[#3B76EF] p-10 rounded-xl text-white text-xl justify-center gap-8 ">
            <h1 className="font-bold text-center ">ADD USER</h1>
            <form
              className="flex flex-col gap-6 items-center text-zinc-700"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-6">
                <select
                  onChange={handleChange}
                  className="px-6 py-2 rounded-md outline-none"
                  name="userId"
                  id=""
                >
                  <option>Select User</option>
                  {UserData &&
                    UserData.data &&
                    UserData.data.map((user, index) => (
                      <option key={index} value={user._id}>
                        {user.fullName}
                      </option>
                    ))}
                </select>
                <input
                  className="px-5 py-2 rounded-md outline-none"
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  placeholder="Enter name of user"
                />
                <select
                  name="collection_status"
                  id=""
                  onChange={handleChange}
                  className="px-16 py-2 rounded-md outline-none"
                >
                  <option>Select Status</option>
                  <option value="EMPTY">EMPTY</option>
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="DISBURSED">DISBURSED</option>
                </select>
              </div>
              <div className="flex gap-6">
                <input
                  className="px-5 py-2 rounded-md outline-none"
                  onChange={handleChange}
                  type="text"
                  name="gs_loan_number"
                  value={formData.gs_loan_number}
                  placeholder="Enter Gs Loan Number"
                />
                <input
                  className="px-5 py-2 rounded-md outline-none"
                  onChange={handleChange}
                  type="text"
                  name="gs_loan_password"
                  value={formData.gs_loan_password}
                  placeholder="Enter Gs Loan Password"
                />
                <input
                  className="px-5 py-2 rounded-md outline-none"
                  onChange={handleChange}
                  type="text"
                  name="gs_loan_userid"
                  value={formData.gs_loan_userid}
                  placeholder="Enter Gs Loan UserId"
                />
              </div>
              <div className="flex gap-6">
                {" "}
                <input
                  className="px-5 py-2 rounded-md outline-none"
                  onChange={handleChange}
                  type="number"
                  name="collection_amount"
                  value={formData.collection_amount}
                  placeholder="Enter Collection Amount"
                />
                <input
                  className="px-5 py-2 rounded-md outline-none"
                  onChange={handleChange}
                  type="text"
                  name="collection_location"
                  value={formData.collection_location}
                  placeholder="Enter Collection Location"
                />
                <input
                  className="px-5 py-2 rounded-md outline-none"
                  onChange={handleChange}
                  type="text"
                  name="collection_address"
                  value={formData.collection_address}
                  placeholder="Enter Collection Address"
                />
              </div>

              <input
                type="submit"
                className="bg-white text-[#3B76EF] font-bold w-1/2 rounded-md px-5 py-2"
              />
            </form>
          </div>
        </div>
      )}
      {isUpdateCollection && (
        <div className="absolute top-0 h-full w-full flex items-center justify-center backdrop-blur-lg">
          <div className="flex flex-col  bg-[#3B76EF] p-10 rounded-xl text-white text-xl justify-center gap-8 ">
            <h1 className="font-bold text-center ">UPDATE DETAIL</h1>
            <form
              className="flex flex-col gap-6 items-center text-zinc-700"
              onSubmit={handleUpdateSubmit}
            >
              <div className="flex gap-6">
                <select
                  name="status"
                  id=""
                  onChange={handleChangeinupdate}
                  className="px-16 py-2 rounded-md outline-none"
                >
                  <option>Select Status</option>

                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>
              <div className="flex gap-6">
                <input
                  className="px-5 py-2 rounded-md outline-none"
                  onChange={handleChangeinupdate}
                  type="text"
                  name="approved_collection_amount"
                  value={UpdateFormData.approved_collection_amount}
                  placeholder="Enter Approved Amount"
                />
              </div>

              <input
                type="submit"
                className="bg-white text-[#3B76EF] font-bold w-1/2 rounded-md px-5 py-2"
              />
            </form>
          </div>
          <button
            className="absolute top-5 right-5"
            onClick={() => setisUpdateCollection(false)}
          >
            ❌
          </button>
        </div>
      )}
    </main>
  );
};

export default UserCollectionTable;
