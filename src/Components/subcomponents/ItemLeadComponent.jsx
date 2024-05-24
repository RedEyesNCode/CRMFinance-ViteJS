import React, { useState, useEffect, useRef } from "react";
import { deleteLead, getAllLeads } from "../../apis/apiInterface";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import LeadDetailsComponent from "../page/LeadDetailsComponent";
import CreateNewLead from "./CreateNewLead";

function ItemLeadComponent({ userData }) {
  const [leadsData, setLeadsData] = useState(null);
  const [currentLead, setcurrentLead] = useState(null);
  const [isLeadDetailFrame, setLeadDetailFrame] = useState(false);

  const [isLeadDeleteFrame, setLeadDeleteFrame] = useState(false);

  const [isLeadUserFrame, setLeadUserFrame] = useState(false);
  const [addLead, setaddLead] = useState(false);

  const handleOpenLeadUser = (lead_data) => {
    setLeadDeleteFrame(false);
    setcurrentLead(lead_data);
    setLeadDetailFrame(false);
    setLeadDetailFrame(false);
    setLeadUserFrame(true);
  };
  const handleCloseLeadUser = (lead_data) => {
    setLeadDeleteFrame(false);
    setcurrentLead(lead_data);
    setLeadDetailFrame(false);
    setLeadDetailFrame(false);
    setLeadUserFrame(false);
  };

  const handleOpenDeleteLead = (lead_data) => {
    setLeadDeleteFrame(true);
    setcurrentLead(lead_data);
    setLeadDetailFrame(false);
    setLeadDetailFrame(false);
    setLeadUserFrame(false);
  };

  const handleCloseDeleteLead = (lead_data) => {
    setLeadDeleteFrame(false);
    setcurrentLead(lead_data);
    setLeadDetailFrame(false);
    setLeadDetailFrame(false);
    setLeadUserFrame(false);
  };
  const callLeadApi = async () => {
    try {
      const response = await getAllLeads();
      if(response.status=='success'){
        setLeadsData(response);
      }else{
        setLeadsData(null);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate(); // Initialize useHistory

  const handleOpenLeadDetail = (lead_data) => {
    setcurrentLead(lead_data);
    setLeadUserFrame(false);
    setLeadDetailFrame(true);
    setLeadDeleteFrame(false);
    // navigate("/lead-details");
  };

  const deleteCurrentLead = async () => {
    try {
      const rawJson = { leadId: currentLead._id };
      const response = await deleteLead(rawJson);
      window.alert(response.message);
      callLeadApi();

      handleCloseDeleteLead();

     
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseLeadDetail = () => {
    setLeadDetailFrame(false);
    setLeadDeleteFrame(false);
    setLeadUserFrame(false);
    callLeadApi();
    

  }

  useEffect(() => {
    const LeadsData = async () => {
      try {
        const response = await getAllLeads();
        if(response.status=='success'){
          setLeadsData(response);

        }else{
          setLeadsData(null);

        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    LeadsData();
    console.log("Maindashboarddiv mounted");
  }, [addLead]);

  const closeleadform = ()=>{
    setaddLead(false);
  }
  if(leadsData==null){
    
    <main className="h-full w-[90%] px-4 pt-4 bg-[#F4FAFF] rounded-[50px] -ml-[5%]">
    <h2 className="text-white text-[21px] font-semibold font-mono bg-blue-800 rounded-md p-2">No Leads found !!</h2>

</main>

  }

  return (
   
      <div className="rounded-3xl border border-gray-300 h-full w-full relative overflow-y-scroll">
        {!isLeadDetailFrame && (
          <div className="relative overflow-auto max-h-[680px] ">
            {/* <h2 className="m-[10px] text-[20px]  font-mono font-bold  text-white p-2 rounded-md">View All Leads</h2> */}
            <div className="flex justify-between px-5 py-2 items-center bg-amber-500 text-white">
              <h2 className="m-[10px] text-[20px] font-mono font-bold">
                View All Leads
              </h2>
              <button
                onClick={() => setaddLead(true)}
                className="border  px-3 h-10 rounded-xl font-semibold"
              >
                Add Lead
              </button>
            </div>

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
                    className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider border text-center"
                  >
                    Action
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
                </tr>
              </thead>
              <tbody className="bg-white  divide-gray-200">
                {leadsData && leadsData.status != "fail" &&
                  leadsData.data.map((user, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 != 0 ? "bg-[#F4FAFF]" : ""}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border bg-[#F3F4F7]">
                        {index + 1}.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                        <button
                          onClick={() => handleOpenLeadDetail(user)}
                          className="text-white bg-[#3B76EF] px-3 py-2 rounded-md"
                        >
                          View Lead
                        </button>
                        <button
                          onClick={() => handleOpenLeadUser(user)}
                          className="text-white bg-blue-900 px-3 py-2 rounded-md"
                        >
                          View User
                        </button>
                        <button
                          onClick={() => handleOpenDeleteLead(user)}
                          className="text-white bg-[#fa4845] px-3 py-2 rounded-md"
                        >
                          Delete Lead
                        </button>
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
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {isLeadDetailFrame && (
          <LeadDetailsComponent
            lead_data={currentLead}
            handleCloseCallback={() => handleCloseLeadDetail()}
          />
        )}
        {isLeadDeleteFrame && (
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
                  onClick={() => handleCloseDeleteLead(currentLead)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteCurrentLead(currentLead)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {isLeadUserFrame && (
          <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
            <div className="p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] bg-[#5AB2FF]">
              <h2 className="text-lg font-bold mb-4 text-center">
                Lead Details
              </h2>
              <p>Name : {currentLead.firstName + " " + currentLead.lastName}</p>
              <p>Mobile : {currentLead.mobileNumber}</p>
              <p>Employee Id : {currentLead._id}</p>
              <p>Created At : {currentLead.createdAt}</p>
              <p>Updated At : {currentLead.updatedAt}</p>
              <button
                onClick={() => handleCloseLeadUser(currentLead)}
                className="mt-4 px-4 py-2 bg-[#125c878b] text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {addLead &&  <><CreateNewLead close={closeleadform}/><p className="absolute top-6 left-[75%] cursor-pointer" onClick={()=>setaddLead(false)}>❌</p></>}
        
      </div>
 
  );
}

export default ItemLeadComponent;
