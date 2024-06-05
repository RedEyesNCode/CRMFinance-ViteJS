import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import LeadDetailsComponent from "../LeadDetailsComponent";
import {
  deleteApprovalLoan,
  deleteDisburseLoan,
  deleteOnGoingLoan,
  getApprovalLoans,
  getDisburseLoans,
  getOnGoingLoans,
} from "../../../apis/apiInterface";
import LoanApprovalDetail from "../approval/LoanApprovalDetail";
import LoanDisburseDetail from "../disbursal/LoanDisburseDetail";
import LoanOngoingDetail from "./LoanOngoingDetail";

function LoanOngoingTable({ handle }) {
  const [leadsData, setLeadsData] = useState(null);
  const [currentLead, setcurrentLead] = useState(null);
  const [isLeadDetailFrame, setLeadDetailFrame] = useState(false);

  const [isLeadDeleteFrame, setLeadDeleteFrame] = useState(false);

  const [isLeadUserFrame, setLeadUserFrame] = useState(false);

  function parseUTCtoIST(utcString) {
    const utcDate = new Date(utcString);
    const options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
    const istString = utcDate.toLocaleString("en-US", options);
    return istString;
  }
  function unixToIST(unixTimestamp) {
    // Check for validity, ensuring the timestamp is not too far in the future
    const maxAllowedTimestamp = Date.now() + (100 * 365 * 24 * 60 * 60 * 1000); // 100 years from now
    if (unixTimestamp > maxAllowedTimestamp) {
      throw new Error('Unix timestamp is too far in the future and cannot be processed.');
    }
  
    // If valid, proceed with conversion
    const date = new Date(unixTimestamp);
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
  
    return date.toLocaleString('en-IN', options); 
  }


  const [searchForm, setSearchForm] = useState({
    fromDate: "",
    toDate: "",
    leadStatus: "",
    leadFirstName: "",
  });
  const handleChange = (e) => {
    console.log(e.target.name + e.target.value);
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value,
    });
  };


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
      const response = await getOnGoingLoans();
      if (response.code == 200) {
        setLeadsData(response);
      } else {
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
      const rawJson = { ongoing_loan_id: currentLead._id };
      const response = await deleteOnGoingLoan(rawJson);
      if (response.code == 200) {
        window.alert(response.message);
        handleCloseDeleteLead();

        callLeadApi();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseLeadDetail = () => {
    setLeadDetailFrame(false);
    setLeadDeleteFrame(false);
    setLeadUserFrame(false);
    callLeadApi();
  };

  useEffect(() => {
    const LeadsData = async () => {
      try {
        const response = await getOnGoingLoans();
        if (response.code == 200) {
          setLeadsData(response);
          console.log(response);
        } else {
          setLeadsData(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    LeadsData();
    console.log("Maindashboarddiv mounted");
  }, []);

  if (leadsData == null) {
    return (
      <h2 className="text-white text-[21px] font-semibold m-5 font-mono bg-orange-500 rounded-md p-2">
        No On-Going Loans Found !!
      </h2>
    );
  }

  return (
    <div className="overflow-hidden border border-gray-300 relative ">
      {!isLeadDetailFrame && (
        <div className="relative overflow-auto max-h-[680px] ">
          <h2 className="px-5 py-4 text-base  font-sans font-bold  text-white p-2  border-amber-800 bg-amber-600">
            Ongoing Loans
          </h2>
          <div
                            
                            className="bg-amber-800"
                            >
                              <button
               className="m-6 border-2 border-white rounded-sm p-2 text-white font-mono text-[16px]">
               
               Filter Ongoing Loans
             </button>
             <button
               className="m-6 border-2 border-white rounded-sm p-2 text-white font-mono text-[16px]">
               
               Reset Filter
             </button>
             </div>
             <div className="bg-amber-700 p-1 w-full">
            <div className="flex">
                <div class="date-input">
                  <label
                    for="fromDate"
                    className="text-white text-[18px] font-mono p-1 m-1"
                  >
                    From Date :{" "}
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    onChange={handleChange}
                    value={searchForm.fromDate}
                    name="fromDate"
                    className="text-black text-[18px] font-mono p-1 m-1 rounded-xl"
                  />
                </div>
                <div>
                  <label
                    for="toDate"
                    className="text-white text-[18px] font-mono p-1 m-1"
                  >
                    To Date :
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    onChange={handleChange}
                    value={searchForm.toDate}
                    className="text-black text-[18px] font-mono p-1 m-1 rounded-xl"
                    name="toDate"
                  />
                </div>
                <div>
                <label className="items-center mt-1 font-mono font-semibold text-white mt-1">
                Search By First Name
              </label>
              <input
                type="text"
                id="leadFirstName"
                value={searchForm.leadFirstName}
                name="leadFirstName"
                onChange={handleChange}
                className="text-black text-[18px] font-mono p-1 m-1 rounded-xl"
              ></input>
                </div>
                
            </div>
            

           


            </div>

          <table className="min-w-full table-auto p-1">
            <thead className="border">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border bg-[#F3F4F7]"
                >
                  SNO.
                </th>

                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Ongoing Loan ID
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  User Info
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Mobile Number
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Disbursement Date
                </th>

                <th
                  scope="col"
                  className="px-2 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider border text-center"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white  divide-gray-200">
              {leadsData != null &&
                leadsData.data
                  .filter((user) => user.lead_status === "ACTIVE")
                  .map((user, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 != 0 ? "bg-[#F4FAFF]" : ""}`}
                    >
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border bg-[#F3F4F7]">
                        {index + 1}.
                      </td>

                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user._id}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.user}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.firstName}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.lastName}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.mobileNumber}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.gender}
                      </td>
                      <td
                        className={`px-2 py-2 whitespace-nowrap text-[11px] font-medium border 
                ${
                  user.lead_status === "PENDING"
                    ? "bg-yellow-500 text-center text-white"
                    : ""
                }
                ${
                  user.lead_status === "DISBURSED"
                    ? "bg-blue-500  text-center text-white"
                    : ""
                }
                ${
                  user.lead_status === "CLOSED"
                    ? "bg-slate-500  text-center text-white"
                    : ""
                }

                ${
                  user.lead_status === "ACTIVE"
                    ? "bg-green-500 text-white text-center"
                    : ""
                }
                ${
                  user.lead_status === "REJECTED"
                    ? "bg-red-500 text-white "
                    : ""
                }`}
                      >
                        {user.lead_status}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.leadAmount}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {parseUTCtoIST(user.createdAt)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {unixToIST(Number(user.disbursementDate))}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                        <button
                          onClick={() => handleOpenLeadDetail(user)}
                          className="text-white bg-yellow-500 px-3 py-2 rounded-xl font-mono border-2"
                        >
                          Loan Details
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
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
      {isLeadDetailFrame && (
        <LoanOngoingDetail
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
            <h2 className="text-lg font-bold mb-4 text-center">Lead Details</h2>
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
    </div>
  );
}

export default LoanOngoingTable;
