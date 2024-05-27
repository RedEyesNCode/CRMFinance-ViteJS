import React from "react";
import Admin from "../assets/image.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import image1 from "../assets/ic_cpanel.png";
const AsideDivForDashBoard = () => {
  return (
    <aside className="h-full w-[20%] p-5 bg-blue-100 rounded-xl flex flex-col gap-10 text-[#879097] m-8">
      <div className="AdminDetails flex items-center gap-2   font-bold  ">
        <img className="h-20 w-20 rounded-full" src={Admin} alt="" />
        <div className="mt-5">
          <h1>Mr. Arun</h1>
          <p className="text-nowrap"> Megma IT India</p>
        </div>
      </div>
      <div>
        <h2 className="text-[14px] font-semibold font-mono text-gray-700">
          Notepad
        </h2>
        <div  className="h-[150px] p-4 bg-white border border-gray-300 rounded-md shadow-md font-mono text-gray-800">
          <textarea className="w-full h-full resize-none outline-none" />
        </div>
        <div onClick={()=> window.open('https://13.126.22.120:2087/','_blank')} className="mt-5 flex items-center p-4 bg-white border-[2px] border-green-500 rounded-lg shadow-md">
          <div className="flex-grow">
            <p className="text-gray-800 text-[15px] font-semibold">
              Login to cPanel Account
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <div  onClick={() => window.open('https://lightsail.aws.amazon.com/ls/webapp/home/instances','_blank')} className="mt-10 flex items-center p-4 bg-white border-[2px] border-orange-500 rounded-lg shadow-md">
          <div className="flex-grow">
            <p className="text-gray-800 text-[15px] font-semibold">
              Login to AWS Account
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </aside>
  );
};

export default AsideDivForDashBoard;

//Leads
//Visits
//Attendence
