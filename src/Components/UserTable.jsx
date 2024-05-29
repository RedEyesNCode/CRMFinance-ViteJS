import React, { useState, useEffect, useRef } from "react";
import { deleteUser, getAllUsers, createUser } from "../apis/apiInterface";
import UserDetailsComponent from "./page/UserDetailsComponent";

const UserTable = () => {
  const [UserData, setUserData] = useState(null);
  const [CurrentUser, setCurrentUser] = useState(null);
  const [isUserDeleteFrame, setUserDeleteFrame] = useState(null);
  const [isUserDetailsFrame, setUserDetailFrame] = useState(null);
  const [addUser, setaddUser] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    telephoneNumber: "",
  });
  const deleteCurrentUser = async () => {
    try {
      const rawJson = { userId: CurrentUser._id };
      const response = await deleteUser(rawJson);
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
      const response = await getAllUsers();
      setUserData(response);
      console.log("Users Fetched response -> ", response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const UserData = async () => {
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
    UserData();
  }, [addUser,isUserDeleteFrame]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createUser(formData);
    console.log("User Created -> ", response);
    setFormData({
      fullName: "",
      telephoneNumber: "",
    });
    if (response.status === 200) {
      setUserData((prevData) => {
        return {
          ...prevData,
          data: [...prevData.data, response.data],
        };
      });
    }
    console.log("hello");
    setaddUser(false);
  };
  if (UserData == null) {
    return (
      <main className="w-full bg-blue-800 flex items-center justify-between px-10 py-3 relative">
        <h2 className="text-white text-[21px] font-semibold font-mono  rounded-md p-2">
          No Users found !!
        </h2>
        <button
          onClick={() => setaddUser(true)}
          className="border  px-3 h-10 rounded-xl font-semibold bg-white"
        >
          ADD USER
        </button>
        {addUser && (
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
    <main className="h-full w-full overflow-hidden">
      <div className="overflow-hidden  border border-gray-300 relative">
        {!isUserDetailsFrame && UserData && (
          <div className="relative overflow-auto max-h-[680px]">
            <div className="flex justify-between px-5 py-2 items-center bg-indigo-700 text-white">
              <h2 className="m-[10px] text-[20px] font-mono font-bold">
                View All Users
              </h2>
              <button
                onClick={() => setaddUser(true)}
                className="border  px-3 h-10 rounded-xl font-semibold"
              >
                ADD USER
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
                    Telephone Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Employee ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Mpass (Click to Update)
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-gray-200">
                {UserData  && UserData.data &&
                  UserData.data.map((user, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 != 0 ? "bg-[#F4FAFF]" : ""}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border bg-[#F3F4F7]">
                        {index + 1}.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.telephoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.employeeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.mpass}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border">
                        <button
                          onClick={() => handleUserDeleteFrame(user)}
                          className="text-white bg-[#fa4845] px-3 py-2 rounded-md"
                        >
                          Delete User
                        </button>
                        <button
                          onClick={() => handleOpenUserDetails(user)}
                          className="text-white bg-yellow-600 px-3 py-2 rounded-md m-2"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {CurrentUser && isUserDetailsFrame && (
          <UserDetailsComponent
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
      {addUser && (
        <div className="absolute top-0 h-full w-full flex items-center justify-center backdrop-blur-lg">
          <div className="flex flex-col  bg-[#3B76EF] p-10 rounded-xl text-white text-xl justify-center gap-8 ">
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
};

export default UserTable;
