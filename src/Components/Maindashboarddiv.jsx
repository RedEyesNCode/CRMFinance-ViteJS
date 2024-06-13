import React, { useEffect, useState } from "react";
import { FiSearch, FiClock } from "react-icons/fi";
import image1 from "../assets/team-lead.png";
import image2 from "../assets/doctor-visit.png";
import image3 from "../assets/immigration.png";
import image4 from "../assets/app_traffic.png";
import image5 from "../assets/ic_collections.png";
import {
  getAdminDashboardApi,
  getAllAttendance,
  getAllLeads,
  getAllUsers,
  getAllVisits,
} from "../apis/apiInterface";
import AsideDivForDashBoard from "./AsideDivForDashBoard";
import FilterDashboardData from "./FilterDashboardData";
import apiService from "../apis/apiService";

const Maindashboarddiv = () => {

  const [dashboardData,setDashboardData] = useState(null);


  //Code for Date timer
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = dateTime.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    const LeadsData = async () => {
      try {
        const responseDashboard = await getAdminDashboardApi();
        console.log(responseDashboard)
        setDashboardData(responseDashboard);

        
      } catch (error) {
        console.log(error);
      }
    };
    LeadsData();
    console.log("Maindashboarddiv mounted");
  }, []);
  function parseUTCtoIST(utcString) {
    const utcDate = new Date(utcString);
    const options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
    const istString = utcDate.toLocaleString("en-US", options);
    return istString;
  }

  return (
    <>
      <div className="flex">
        <main className="h-full  text-white rounded-[50px] flex flex-col gap-12 w-[80%] ">
          <div className="Search  xl:text-black flex flex-col">
            <header className="flex justify-between items-center  rounded-[50px] text-[#93B0C8] font-semibold">
              <div className="flex items-center w-3/4 bg-white rounded-full pl-4 pr-2  shadow-sm m-[10px]">
                <h2 className="text-gray-600 text-[20px] m-[10px]">
                  GS FINANCE CRM V2
                </h2>
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                <FiClock className=" text-3xl mr-2" />
                <span className="">
                  {formattedTime} {formattedDate}
                </span>
              </div>
            </header>
          </div>

          <div className="Boxes w-full flex justify-between  px-5">
            <div className="box1 pt-4 pl-10  bg-[#3C76ED]  h-100 w-80 rounded-[30px] ">
              <h1 className="text-[20px] font-semibold animate-pulse">
                Overall Leads : {dashboardData && dashboardData.data.totalLeads}
              </h1>

              <img className="h-32 w-32 " src={image1} alt="" />
              <p className="text-lg font-semibold animate-pulse mt-2">Last Lead Date : {dashboardData && parseUTCtoIST(dashboardData.data.latestLeadEntry.createdAt)}</p>
            </div>
            <div className="box2 pt-5 pl-6  bg-[#63C7FF]  h-100 w-80 rounded-[30px] ">
              <h1 className="text-[20px] font-semibold animate-pulse">
                Overall Visits : {dashboardData && dashboardData.data.totalVisits}
              </h1>

              <img className="h-32 w-32 " src={image2} alt="" />
              <p className="text-lg font-semibold animate-pulse">last Visited Person : {dashboardData && parseUTCtoIST(dashboardData.data.latestVisitEntry.createdAt)}</p>
            </div>
            <div className="box3 pt-5 pl-6  bg-[rgb(166,108,212)]  h-52 w-80 rounded-[30px] ">
              <h1 className="text-[20px] font-semibold animate-[pulse_2s_ease-in-out_infinite]">
                Overall Attendence : {dashboardData && dashboardData.data.totalAttendance}
              </h1>

              <img className="h-32 w-32 " src={image3} alt="" />
            </div>
          </div>

          <div className="status w-full flex justify-between px-5 ">
            <div className="box3 pt-5 pl-6  bg-[#36486b]  h-100 w-80 rounded-[30px] ">
              <h1 className="text-[20px] font-semibold animate-[pulse_2s_ease-in-out_infinite]">
                Overall Collections :{dashboardData && dashboardData.data.totalCollections}
              </h1>

              <img
                className="h-32 w-32 rounded-[30px] m-2"
                src={image5}
                alt=""
              />
              <p className="text-lg font-semibold animate-pulse">Last Collected Person : {dashboardData && parseUTCtoIST(dashboardData.data.latestCollectionEntry.createdAt)}</p>
            </div>
            <div className="box3 pt-5 pl-6  bg-blue-900  h-56 w-80 rounded-[30px] ">
              <h1 className="text-[20px] font-semibold animate-[pulse_2s_ease-in-out_infinite]">
                Overall Employees : {dashboardData && dashboardData.data.totalEmployees}
              </h1>

              <img
                className="h-32 w-32 rounded-[30px] m-2"
                src={image4}
                alt=""
              />
            </div>
            
          </div>
        </main>
        <AsideDivForDashBoard />
      </div>
      <FilterDashboardData/>
        
    </>
  );
};

export default Maindashboarddiv;

//bg-[#F4FAFF]
