import React, { useState, useEffect, useRef } from "react";
import { deleteAttendance, getAllAttendance } from "../apis/apiInterface";
import image from "../assets/download.jpeg";

const AttendenceTable = () => {
  const [AttendenceData, setAttendenceData] = useState(null);
  const [CurrentAttendence, setCurrentAttendence] = useState(null);

  const [attendanceId, setAttendanceId] = useState(null);

  const [isDeleteAttendance, setDeleteAttendance] = useState(false);
  const handleDeleteAttendance = (current_data) => {
    setAttendanceId(current_data._id);

    setDeleteAttendance(true);
  };
  const handleHideDeleteAttendance = () => {
    setDeleteAttendance(false);
  };
  const deleteCurrentAttendance = async (_id) => {
    try {
      const rawJson = { attendanceId: attendanceId };
      const response = await deleteAttendance(rawJson);
      if (response.code == 200) {
        setDeleteAttendance(false);
        callAttendanceApi();
      } else {
        window.alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const callAttendanceApi = async () => {
    try {
      const response = await getAllAttendance();
      setAttendenceData(response);
      console.log("Attendence Fetched response -> ", response);
    } catch (error) {
      console.log(error);
    }
  };
  function parseUTCtoIST(utcString) {
    const utcDate = new Date(utcString);
    const options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
    const istString = utcDate.toLocaleString("en-US", options);
    return istString;
  }

  useEffect(() => {
    const AttendenceData = async () => {
      try {
        console.log("hello");
        const response = await getAllAttendance();
        console.log(response);
        if (response.status == "success") {
          setAttendenceData(response);
        } else {
          setAttendenceData(null);
        }

        console.log("Attendence Fetched response -> ", response);
        if (response.code === 400) setAttendenceData(response);
      } catch (error) {
        console.log(error);
      }
    };
    AttendenceData();
  }, []);
  if (AttendenceData == null) {
    return (
      <main className="h-full w-full ">
        <h2 className="text-white text-[21px] font-semibold font-mono bg-green-800 rounded-md m-2 p-2">
          No Attendance found !!
        </h2>
      </main>
    );
  }

  return (
    <main className="h-full w-full">
      <div className="border border-gray-300 relative">
        <div className="relative overflow-x max-h-[680px]">
          <h2 className="m-[10px] text-[20px] font-mono font-bold">
            View All Attendance
          </h2>
          <table className="min-w-full rounded-3xl table-auto p-1">
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
                  Employee Info
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Attendence Id
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Attendance Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Remark
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Selfie Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  View User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Delete Attendence
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-gray-200">
              {AttendenceData != undefined &&
                AttendenceData.data.map((attendence, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 != 0 ? "bg-[#F4FAFF]" : ""}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border bg-[#F3F4F7]">
                      {index + 1}.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                      {attendence && attendence.user ? (
                        <>
                          {attendence.user.fullName} <br />{" "}
                          {attendence.user.employeeId}
                        </>
                      ) : (
                        "N/A" // Or any appropriate placeholder for missing data
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                      {attendence._id.substring(20)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border relative group">
                      <div className="whitespace-nowrap overflow-hidden text-ellipsis rounded-lg bg-indigo-800 text-white p-1">
                        View Address
                      </div>
                      <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10">
                        {attendence.address}
                      </div>
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-md   border font-bold text-white ${
                        attendence.status === "PRESENT"
                          ? "bg-green-500 "
                          : "bg-red-500 "
                      }`}
                    >
                      {attendence.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                      {attendence.remark}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                      {parseUTCtoIST(attendence.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                      <img
                    
                    onClick={() =>
                      window.open(attendence.photo, "_blank")
                    }
                        src={attendence.photo}
                        alt="Attendance Image"
                        className="rounded-xl"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border">
                      <button
                        onClick={() => setCurrentAttendence(attendence.user)}
                        className="text-white bg-[#3B76EF] px-3 py-2 rounded-md"
                      >
                        View User
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border">
                      <button
                        onClick={() => handleDeleteAttendance(attendence)}
                        className="text-white bg-[#fa4845] px-3 py-2 rounded-md"
                      >
                        Delete Attendence
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isDeleteAttendance && (
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
                onClick={() => handleHideDeleteAttendance(CurrentAttendence)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteCurrentAttendance(CurrentAttendence)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {CurrentAttendence && (
        <div className="text-white fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div className="p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] bg-[#5AB2FF]">
            <h2 className="text-lg font-bold mb-4 text-center">User Details</h2>
            <p>User Id : {CurrentAttendence}</p>
            <p>Name : {CurrentAttendence.fullName}</p>
            <p>Mobile : {CurrentAttendence.telephoneNumber}</p>
            <p>Emp Id : {CurrentAttendence.employeeId}</p>
            <p>Mpass : {CurrentAttendence.mpass}</p>
            <button
              onClick={() => setCurrentAttendence(null)}
              className="mt-4 px-4 py-2 bg-[#125c878b] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AttendenceTable;
