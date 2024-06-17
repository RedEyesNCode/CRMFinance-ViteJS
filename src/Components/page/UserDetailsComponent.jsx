import React, { useState } from "react";
import UserLeadTable from "./user/UserLeadTable";
import AttendenceTable from "../AttendenceTable";
import UserAttendanceTable from "./user/UserAttendanceTable";
import { GiFastBackwardButton } from "react-icons/gi";
import UserVisitTable from "./user/UserVisitTable";

function UserDetailsComponent({ user_data, handleCloseUserDetails }) {
  const [isLeadFrame, setLeadFrame] = useState(true);
  const [isVisitFrame, setVisitFrame] = useState(false);
  const [isAttendanceFrame, setAttendanceFrame] = useState(false);

  const handleLeadFrame = () => {
    setAttendanceFrame(false);
    setVisitFrame(false);
    setLeadFrame(true);
  };
  function parseUTCtoIST(utcString) {
    const utcDate = new Date(utcString);
    const options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
    const istString = utcDate.toLocaleString("en-US", options);
    return istString;
  }
  const handleVisitFrame = () => {
    setAttendanceFrame(false);
    setVisitFrame(true);
    setLeadFrame(false);
  };
  const handleAttendanceFrame = () => {
    setAttendanceFrame(true);
    setVisitFrame(false);
    setLeadFrame(false);
  };
  const handleBackpress = () => {
    handleCloseUserDetails();
};

  return (
    <main className="flex  flex-col">
      <div className='flex flex-row  text-cent items-center font-semibold rounded-md bg-gradient-to-r from-[#e43364] to-[#3858f9] text-white'>
        <GiFastBackwardButton onClick={() => handleBackpress()} className='text-[50px]  m-[10px] text-white'  />
        <h2 className='text-2xl text-center'>Employee {user_data.fullName} Details </h2>


        </div>
      <div className="flex flex-row">
      
        <div className="w-1/3">
          <div className="bg-white p-4 rounded-md shadow-md w-80 m-[10px] border-2 border-amber-500">
            <h2 className="text-xl font-semibold mb-2  rounded-lg border-2 bg-blue-700 p-2 text-white">
              User Information
            </h2>

            <div className="mb-2">
              <p className="text-gray-600">Full Name</p>
              <p className="font-medium">{user_data.fullName}</p>
            </div>

            <div className="mb-2">
              <p className="text-gray-600">Telephone Number</p>
              <p className="font-medium">{user_data.telephoneNumber}</p>
            </div>

            <div className="mb-2">
              <p className="text-gray-600">Employee ID</p>
              <p className="font-medium">{user_data.employeeId}</p>
            </div>

            <div className="mb-2">
              <p className="text-gray-600">Created At :</p>
              <p className="font-medium">{parseUTCtoIST(user_data.createdAt)}</p>
            </div>

            <div>
              <p className="text-gray-600">MPass</p>
              <p className="font-medium">{user_data.mpass}</p>
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <div className="bg-white p-4 rounded-md shadow-md w-80 m-[10px]">
            <h2
              onClick={handleLeadFrame}
              className="text-xl font-semibold mb-2  rounded-lg border-2 bg-green-700 p-2 text-white"
            >
              User Leads
            </h2>
            <h2
              onClick={handleVisitFrame}
              className="text-xl font-semibold mb-2  rounded-lg border-2 bg-cyan-700 p-2 text-white"
            >
              User Visits
            </h2>
            <h2
              onClick={handleAttendanceFrame}
              className="text-xl font-semibold mb-2  rounded-lg border-2 bg-purple-700 p-2 text-white"
            >
              User Attendance
            </h2>
          </div>
         
        </div>
      </div>
      <div >
      {isLeadFrame && <UserLeadTable current_user_id={user_data._id} current_user_name={user_data.fullName} />}
          {isAttendanceFrame && <UserAttendanceTable current_user_id={user_data._id} current_user_name={user_data.fullName}/> }
          {isVisitFrame && <UserVisitTable current_user_id={user_data._id} current_user_name={user_data.fullName}/>}
      </div>
    </main>
  );
}

export default UserDetailsComponent;
