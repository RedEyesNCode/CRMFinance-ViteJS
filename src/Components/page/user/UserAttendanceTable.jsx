import React, { useState, useEffect, useRef } from "react";
import image from "../../../assets/download.jpeg"
import { getUserAttendance } from "../../../apis/apiInterface";
import UserAttendanceCalender from "./UserAttendanceCalender";

const UserAttendanceTable = ({current_user_id,current_user_name}) => {
  const [AttendenceData, setAttendenceData] = useState(null);
  const [CurrentAttendence, setCurrentAttendence] = useState(null);

  useEffect(() => {
    const AttendenceData = async () => {
      try {
        const rawJson = {
            userId : current_user_id


        };
        const response = await getUserAttendance(rawJson);
        if(response.code==200){
            setAttendenceData(response);

        }else{
            setAttendenceData(null);

        }

        console.log("User Attendence Fetched response -> ", response);
      } catch (error) {
        console.log(error);
      }
    };
    AttendenceData();
  }, [current_user_id]);

  if(AttendenceData==null){
    return (
        <h2 className="text-white text-[21px] font-semibold font-mono bg-purple-800 rounded-md p-2">No Attendance Found !</h2>
    )

  }
  function parseUTCtoIST(utcString) {
    const utcDate = new Date(utcString);
    const options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
    const istString = utcDate.toLocaleString("en-US", options);
    return istString;
  }
  function unixToIST(unixTimestamp) {
    // Check for validity, ensuring the timestamp is not too far in the future
    const maxAllowedTimestamp = Date.now() + 100 * 365 * 24 * 60 * 60 * 1000; // 100 years from now
    if (unixTimestamp > maxAllowedTimestamp) {
      throw new Error(
        "Unix timestamp is too far in the future and cannot be processed."
      );
    }

    // If valid, proceed with conversion
    const date = new Date(unixTimestamp);
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return date.toLocaleString("en-IN", options);
  }

  return (
    <main className="h-full px-4 pt-4 bg-[#F4FAFF] rounded-[50px] ">
      {AttendenceData!=undefined && (
                        <UserAttendanceCalender attendanceData={AttendenceData.data} />

          )}
                                  <h2 className=" bg-gradient-to-r from-[#e43364] to-[#3858f9]  p-2   m-[10px] text-[20px] text-white rounded-xl font-mono font-bold">View All Attendance by {current_user_name}</h2>


    <div className="rounded-3xl border border-gray-300 relative ">

      <div className="relative h-[680px]">
        

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
    {CurrentAttendence && (
        <div className="text-white fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div
            className= "p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] bg-[#5AB2FF]" 
          >
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

export default UserAttendanceTable;
