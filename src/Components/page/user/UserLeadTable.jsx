import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import LeadDetailsComponent from "../LeadDetailsComponent";
import { getUserLeads } from "../../../apis/apiInterface";

function UserLeadTable({ current_user_id }) {
  const [leadsData, setLeadsData] = useState(null);
  const [currentLead, setcurrentLead] = useState(null)
  const [isLeadDetailFrame,setLeadDetailFrame] = useState(false);
  const navigate = useNavigate(); // Initialize useHistory

  const handleOpenLeadDetail = (lead_data) => {
    setcurrentLead(lead_data);

    setLeadDetailFrame(true);
    // navigate("/lead-details");




  };
  const handleCloseLeadDetail = () => {

    setLeadDetailFrame(false);

  }

  useEffect(() => {
    const LeadsData = async () => {
      try {
        const rawJson = {userId : current_user_id}
        const response = await getUserLeads(rawJson);
        
        if(response.code==200){
            setLeadsData(response);
        }else{
            setLeadsData(null);
        }
        
        console.log('USER LEADS RESPONSE --> ',response);
      } catch (error) {
        console.log(error);
      }
    };
    LeadsData();
    console.log("Maindashboarddiv mounted");
  }, []);
  if(leadsData==null){
    return (
        <h2 className="text-white text-[21px] font-semibold font-mono bg-green-800 rounded-md p-2">No leads found !!</h2>
    )

  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-300 ">

      {!isLeadDetailFrame && (
        <div className="relative overflow-auto max-h-[680px] ">
                            <h2 className="m-[10px] text-[20px] text-gray-700 font-mono font-bold">View All Leads</h2>

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
                Lead ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                User Info
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                First Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Last Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Mobile Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Gender
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border whitespace-nowrap"
              >
                Disbursement Date
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider border text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white  divide-gray-200">
            {leadsData != null &&
              leadsData.data.map((user, index) => (
                <tr onClick={() => handleOpenLeadDetail(user)}  key={index} className={`${index % 2 != 0 ? "bg-[#F4FAFF]" : ""}`}>
                  <td  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border bg-[#F3F4F7]">
                    {index + 1}.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {user._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {user.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {user.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {user.mobileNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {user.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {user.lead_status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {user.leadAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {user.disbursementDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                    <button
                      onClick={() => setcurrentLead(user)}
                      className="text-white bg-[#3B76EF] px-3 py-2 rounded-md"
                    >
                      View Lead
                    </button>
                    <button
                      onClick={() => handleViewUser(user)}
                      className="text-white bg-[#fa4845] px-3 py-2 rounded-md"
                    >
                      Delete Lead
                    </button>
                  </td>
                 
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      )}
      {isLeadDetailFrame && (<LeadDetailsComponent lead_data={currentLead} handleCloseCallback={() => handleCloseLeadDetail()}/>)}

      {currentLead && !isLeadDetailFrame && (
        <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div
            className= "p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] bg-[#5AB2FF]" 
          >
            <h2 className="text-lg font-bold mb-4 text-center">Lead Details</h2>
            <p>Name : {currentLead.firstName + " " + currentLead.lastName}</p>
            <p>Mobile : {currentLead.mobileNumber}</p>  
            <p>Employee Id : {currentLead._id}</p>
            <p>Created At : {currentLead.createdAt}</p>
            <p>Updated At : {currentLead.updatedAt}</p>
            <button 
              onClick={() => setcurrentLead(null)}
              className="mt-4 px-4 py-2 bg-[#125c878b] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLeadTable;
