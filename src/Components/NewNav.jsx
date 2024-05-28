import React, { useState } from "react";
import { HiChartPie } from "react-icons/hi";
import { IoHomeSharp, IoPerson } from "react-icons/io5";
import Maindashboarddiv from "./Maindashboarddiv";
import AsideDivForDashBoard from "./AsideDivForDashBoard";
import FilterLeadComponent from "./subcomponents/FilterLeadComponent";
import AttendenceTable from "./AttendenceTable";
import VisitTable from "./VisitTable";
import UserTable from "./UserTable";
import LoanMasterComponent from "./page/LoanMasterComponent";
import LoanApprovalTable from "./page/approval/LoanApprovalTable";
import LoanDisburseTable from "./page/disbursal/LoanDisburseTable";
import LoanRejectTable from "./page/reject/LoanRejectTable";
import { FaDotCircle } from "react-icons/fa";
import { LiaDotCircle } from "react-icons/lia";
import { BiLogoPostgresql, BiMoney, BiPackage } from "react-icons/bi";
import { MdReport } from "react-icons/md";
import { GrHadoop } from "react-icons/gr";
import { RiRecycleFill } from "react-icons/ri";
import RecycleBinView from "./page/RecycleBinView";
import LoanOngoingTable from "./page/ongoing/LoanOngoingTable";
import LoanClosedTable from "./page/closed/LoanClosedTable";

import FilterDashboardData from "./FilterDashboardData";

const NewNav = () => {
  const [selected, setSelected] = useState("Home");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown

  var icons = [
    { component: <IoHomeSharp />, name: "Home" },
    { component: <HiChartPie />, name: "Leads" },
    {
      component: <IoPerson />,
      name: "Employee",
      submenu: [
        { name: "Visit", component: <LiaDotCircle /> },
        { name: "Attendence", component: <LiaDotCircle /> },
        { name: "CRM Employee", component: <LiaDotCircle /> },
      ],
    },
    { component: <BiMoney />, name: "Loan Master",submenu : [
      { name: "Approval Loan", component: <LiaDotCircle /> },
      { name: "Disbursal Loan", component: <LiaDotCircle /> },
      { name: "Rejected Loans", component: <LiaDotCircle /> },
      { name: "Ongoing Loans", component: <LiaDotCircle /> },

      { name: "Closed Loans", component: <LiaDotCircle /> },
    ]
  },

    
    {
      component: <BiPackage />,
      name: "Package Master",
      submenu: [
        { name: "Package List", component: <LiaDotCircle /> },
        { name: "Custom Package", component: <LiaDotCircle /> },
      ],
    },
    {
      component: <BiPackage />,
      name: "E-Mandate",
      submenu: [
        { name: "Transaction Schedule", component: <LiaDotCircle /> },
        { name: "Debit Schedule", component: <LiaDotCircle /> },
        { name: "Remaining Debit Schedule", component: <LiaDotCircle /> },

        { name: "History", component: <LiaDotCircle /> },
      ],
    },
    { component: <BiLogoPostgresql />, name: "Banners" },
    {
      component: <MdReport />,
      name: "Reports",
      submenu: [
        { name: "All Paid EMI", component: <LiaDotCircle /> },
        { name: "Balance Outstanding Report", component: <LiaDotCircle /> },
        { name: "Demand Report", component: <LiaDotCircle /> },
        { name: "Overdue", component: <LiaDotCircle /> },
        { name: "Bill Receipt", component: <LiaDotCircle /> },
      ],
    },
    {
      component: <MdReport />,
      name: "Cibil Reports",
      submenu: [
        { name: "TransUnion Report", component: <LiaDotCircle /> },
        { name: "Crif Highmark Report", component: <LiaDotCircle /> },
        { name: "Experience Report", component: <LiaDotCircle /> },
        { name: "Equifax", component: <LiaDotCircle /> },
      ],
    },
    { component: <RiRecycleFill />, name: "Recycle Bin" },
  ]

  const handleMouseEnter = (name) => {
    setActiveDropdown(name); // Set the active dropdown
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null); // Clear the active dropdown

    setDropdownVisible(false);
  };

  const handleSubmenuClick = (name) => {
    setSelected(name);
    handleMouseLeave(); // Close the dropdown after selecting
  };

  return (
    <div className="#FFFFFF  h-screen w-screen">
      <div className="xl:text-black h-full w-full overflow-x-hidden">
        <div className="w-full h-[15%] bg-gradient-to-r from-[#e43364] to-[#3858f9] flex items-center px-10">
          <nav className="w-full rounded-lg bg-white px-16 text-black py-1 ">
            <ul className="flex items-center justify-between cursor-pointer">
              {icons.map((icon, index) => (
                <li
                  key={index}
                  title={icon.name}
                  className={`hover:text-[#3B76EF] text-xl text-center text-nowrap flex justify-center items-center h-fit p-2 transition-all ${
                    selected === icon.name &&
                    !dropdownVisible &&
                    "text-[#3B76EF] bg-[#F6F6FB]"
                  }`}
                  onClick={() => {
                    if (!icon.submenu) setSelected(icon.name);
                  }}
                  onMouseEnter={() => handleMouseEnter(icon.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center gap-2 relative">
                    {icon.component}
                    <h2 className="text-[18px]">{icon.name}</h2>
                    {icon.submenu &&
                      activeDropdown === icon.name && ( // Show dropdown based on activeDropdown
                        <ul
                          className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg z-10"
                          onMouseEnter={() => handleMouseEnter(icon.name)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {icon.submenu.map((sub, subIndex) => (
                            <li
                              key={subIndex}
                              className="hover:text-[#3B76EF] text-xl text-center text-nowrap flex justify-start items-center h-fit p-2 transition-all"
                              onClick={() => handleSubmenuClick(sub.name)}
                            >
                              <div className="flex items-center gap-2">
                                {sub.component}
                                <h2 className="text-[16px]">{sub.name}</h2>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {selected === "Home" && <Maindashboarddiv />}
        {selected === "Leads" && <FilterLeadComponent />}
        {selected === "Visit" && <VisitTable />}
        {selected === "CRM Employee" && <UserTable />}
        {selected === "Attendence" && <AttendenceTable />}
        {selected === "Loan Master" && <LoanMasterComponent />}
        {selected === "Recycle Bin" && <RecycleBinView />}
        {selected === "Ongoing Loans" && <LoanOngoingTable/>}

        {selected === "Approval Loan" && (
          <div>
            <LoanApprovalTable />
          </div>
         )}
         {selected === "Closed Loans" && (
          <div>
            <LoanClosedTable/>
          </div>
         )}
        {selected === "Disbursal Loan" && (
        <LoanDisburseTable/> )}
        {selected === "Rejected Loans" && (
        <LoanRejectTable/> )}

        

      </div>
    </div>
  );
};

export default NewNav;
