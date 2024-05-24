import React, { useState } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { HiChartPie } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { IoHomeSharp, IoPerson } from "react-icons/io5";
import Maindashboarddiv from "./Maindashboarddiv";
import AsideDivForDashBoard from "./AsideDivForDashBoard";
import FilterLeadComponent from "./subcomponents/FilterLeadComponent";
import LeadDetailsComponent from "./page/LeadDetailsComponent";
import AttendenceTable from "./AttendenceTable";
import { MdOutlineCoPresent } from "react-icons/md";
import { TbHomeSearch } from "react-icons/tb";
import VisitTable from "./VisitTable";
import UserTable from "./UserTable";
import { BiLogoMongodb } from "react-icons/bi";
import LoanMasterComponent from "./page/LoanMasterComponent";
import RecycleBinView from "./page/RecycleBinView";
import { FaRecycle } from "react-icons/fa";

const Dashboard = () => {
  const [selected, setSelected] = useState('Home');

  const icons = [
    { component: <IoHomeSharp />, name: "Home" },

    { component: <HiChartPie />, name: "Leads" },
    { component: <BiLogoMongodb />, name: "Loan Master" },

    { component: <TbHomeSearch />, name: "Visit" },
    { component: <IoPerson />, name: "Users" },
    { component: <MdOutlineCoPresent />, name: "Attendence" },
    { component: <FaRecycle />, name: "Recycle Bin" },

  ];

  return (
    <div className="#FFFFFF p-3 h-screen w-screen">
      <div className="xl:text-black h-full w-full flex">
        <nav className="overflow-y-scroll h-full w-[15%] bg-[#3B76EF] rounded-[50px] flex justify-between pl-8 py-7 flex-col text-white text-3xl">
          
          <div>
            <ul className="flex flex-col gap-14">
              {icons.map((icon, index) => (
                <li
                  key={index}
                  title={icon.name}
                  className={`text-center flex justify-center items-center h-fit w-[110px] p-2  rounded-lg  transition-all ${
                    selected === icon.name
                      ? "bg-white text-[#3B76EF]"
                      : "hover:bg-white hover:text-[#3B76EF]"
                  }`}
                  onClick={() => setSelected(icon.name)}
                >
                  <div className="flex flex-col items-center justify-center">
                  {icon.component}
                  <h2 className="text-lg">{icon.name}</h2>

                  </div>
                </li>
              ))}
            </ul>
          </div>
          
        </nav>
        {selected=='Home' && <> <Maindashboarddiv/> <AsideDivForDashBoard/></>}
        {selected=='Leads' && <FilterLeadComponent/>}
        {selected=='Visit' && <VisitTable/>}
        {selected=='Users' && <UserTable/>}
        {selected=='Attendence' && <AttendenceTable/>}
        {selected=='Loan Master' && <LoanMasterComponent/>}
        {selected=='Recycle Bin' && <RecycleBinView/>}

      </div>
    </div>
  );
};

export default Dashboard;
