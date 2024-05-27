import React, { useState } from "react";
import { HiChartPie } from "react-icons/hi";
import { IoHomeSharp, IoPerson } from "react-icons/io5";
import { MdOutlineCoPresent } from "react-icons/md";
import { TbHomeSearch } from "react-icons/tb";
import { BiLogoMongodb } from "react-icons/bi";
import Maindashboarddiv from "./Maindashboarddiv";
import AsideDivForDashBoard from "./AsideDivForDashBoard";
import FilterLeadComponent from "./subcomponents/FilterLeadComponent";
import AttendenceTable from "./AttendenceTable";
import VisitTable from "./VisitTable";
import UserTable from "./UserTable";
import LoanMasterComponent from "./page/LoanMasterComponent";

const NewNav = () => {
  const [selected, setSelected] = useState("Home");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const icons = [
    { component: <IoHomeSharp />, name: "Home" },
    { component: <HiChartPie />, name: "Leads" },
    { component: <BiLogoMongodb />, name: "Loan Master" },
    {
      component: <IoPerson />, name: "Employee", submenu: [
        { name: "Visit", component: <TbHomeSearch /> },
        { name: "Attendence", component: <MdOutlineCoPresent /> },
        { name: "CRM Employee", component: <MdOutlineCoPresent /> },
      ]
    },
  ];

  const handleMouseEnter = (name) => {
    if (name === "Employee") {
      setDropdownVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleSubmenuClick = (name) => {
    setSelected(name);
    setDropdownVisible(false);
  };

  return (
    <div className="#FFFFFF  h-screen w-screen">
      <div className="xl:text-black h-full w-full ">
        <div className="w-full h-[15%] bg-gradient-to-r from-[#e43364] to-[#3858f9] flex items-center px-10">
        <nav className="w-full rounded-lg bg-white px-16 text-black py-1 ">
          <ul className="flex items-center justify-between cursor-pointer">
            {icons.map((icon, index) => (
              <li
                key={index}
                title={icon.name}
                className={`hover:text-[#3B76EF] text-xl text-center text-nowrap flex justify-center items-center h-fit p-2 transition-all ${
                  selected === icon.name && !dropdownVisible && "text-[#3B76EF] bg-[#F6F6FB]"
                }`}
                onClick={() => {
                  if (!icon.submenu) setSelected(icon.name);
                }}
                onMouseEnter={() => handleMouseEnter(icon.name)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center gap-2 relative">
                  {icon.component}
                  <h2 className="text-lg">{icon.name}</h2>
                  {icon.submenu && dropdownVisible && (
                    <ul
                      className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg z-10"
                      onMouseEnter={() => setDropdownVisible(true)}
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
                            <h2 className="text-lg">{sub.name}</h2>
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
        {selected === "Home" && (
          <div className="w-full h-[70%] flex">
            <Maindashboarddiv /><AsideDivForDashBoard />
          </div>
        )}
        {selected === "Leads" && <FilterLeadComponent />}
        {selected === "Visit" && <VisitTable />}
        {selected === "CRM Employee" && <UserTable />}
        {selected === "Attendence" && <AttendenceTable />}
        {selected === "Loan Master" && <LoanMasterComponent />}
      </div>
    </div>
  );
};

export default NewNav;
