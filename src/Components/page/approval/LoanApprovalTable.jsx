import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import LeadDetailsComponent from "../LeadDetailsComponent";
import {
  deleteApprovalLoan,
  filterApprovalLoansByDate,
  getApprovalLoans,
} from "../../../apis/apiInterface";
import LoanApprovalDetail from "./LoanApprovalDetail";
import { ToastContainer, toast } from "react-toastify";

function LoanApprovalTable({ handle }) {
  const [leadsData, setLeadsData] = useState(null);
  const [currentLead, setcurrentLead] = useState(null);
  const [isLeadDetailFrame, setLeadDetailFrame] = useState(false);

  const [isLeadDeleteFrame, setLeadDeleteFrame] = useState(false);

  const [isLeadUserFrame, setLeadUserFrame] = useState(false);

  const [openLeadDetailCompo, setopenLeadDetailCompo] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
    // Perform actions based on the switch state
  };

  const [objwithlinkerid, setobjwithlinkerid] = useState({
    _id: "",
  });

  const handleOpenLeadUser = (lead_data) => {
    setLeadDeleteFrame(false);
    setcurrentLead(lead_data);
    setLeadDetailFrame(false);
    setLeadDetailFrame(false);
    setLeadUserFrame(true);
  };
  const handleOpenUserprofile = (lead_data) => {
    setLeadDeleteFrame(false);
    setobjwithlinkerid({ _id: lead_data.employee_lead_id_linker });
    setLeadDetailFrame(false);
    setLeadDetailFrame(false);
    setLeadUserFrame(false);
    setopenLeadDetailCompo(true);
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
      const response = await getApprovalLoans();
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
      const rawJson = { loan_approval_id: currentLead._id };
      const response = await deleteApprovalLoan(rawJson);
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
  function parseUTCtoIST(utcString) {
    const utcDate = new Date(utcString);
    const options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
    const istString = utcDate.toLocaleString("en-US", options);
    return istString;
  }
  const [searchForm, setSearchForm] = useState({
    fromDate: "",
    toDate: "",
    leadFirstName: "",
  });
  const filterApprovalLoans = async () => {
    const { fromDate, toDate, leadFirstName } = searchForm;

    if (!fromDate || !toDate) {
      toast.warn("From Date and To Date are required");
      return;
    }

    try {
      const response = await filterApprovalLoansByDate(
        fromDate,
        toDate,
        leadFirstName
      );
      if(response.code != 200){
        toast.warn(response.message);
        return;
      }
      console.log(response);
      setLeadsData(response);
    } catch (error) {
      console.error("Error filtering approval loans:", error);
      alert("An error occurred while filtering approval loans.");
    }
  };
  const resetFilters = () => {
    setSearchForm({
      fromDate: "",
      toDate: "",
      leadFirstName: "",
    });
    callLeadApi()
  };

  const handleChange = (e) => {
    console.log(e.target.name + e.target.value);
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const LeadsData = async () => {
      try {
        const response = await getApprovalLoans();
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
  }, [isChecked]);

  if (leadsData == null || leadsData == undefined) {
    return (
      <main>
        <h2 className="text-white text-[21px] font-semibold font-mono bg-green-800 rounded-md p-2 m-2">
          No Approval loans Found !!
        </h2>
      </main>
    );
  }

  return (
    <div className="border-t border-gray-300 relative overflow-auto">
      <ToastContainer/>
      {!isLeadDetailFrame && (
        <div className="relative h-[fill] ">
          <div className="border-green-900 bg-[#86af49] flex flex-row justify-items-start items-center">
            <h2 className=" text-lg  font-sans font-bold  text-white p-4  ">
              Pending for Approval Loans
            </h2>

            <button
              onClick={(e) => setIsChecked(true)}
              className="m-6 border-2 border-white rounded-sm p-2 text-white font-mono text-[16px]"
            >
              All Approval Loans
            </button>
            <button
              onClick={(e) => setIsChecked(false)}
              className="m-6 border-2 border-white rounded-sm p-2 text-white font-mono text-[16px]"
            >
              Only Active Approval Loans
            </button>
            <button
              onClick={filterApprovalLoans}
              className="m-6 border-2 border-white rounded-sm p-2 text-white font-mono text-[16px]"
            >
              Filter Approval Loans
            </button>
            <button onClick={resetFilters} className="m-6 border-2 border-white rounded-sm p-2 text-white font-mono text-[16px]">
              Reset Filter
            </button>
            <div className="flex flex-row"></div>
          </div>

          <div className="bg-[#86af49] w-full">
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
              <tr className="text-sm">
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider border bg-[#F3F4F7]"
                >
                  SNO.
                </th>

                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Loan Approval Id
                </th>

                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Emp Info
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider border"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Mobile Number
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Created At
                </th>

                <th
                  scope="col"
                  className="px-3 py-3   font-medium text-gray-500 uppercase tracking-wider border text-center"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white  divide-gray-200">
              {leadsData != null &&
                isChecked == false &&
                leadsData.data
                  .filter((user) => user.lead_status === "APPROVED")
                  .map((user, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 != 0 ? "bg-[#F4FAFF]" : ""}`}
                    >
                      <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border bg-[#F3F4F7]">
                        {index + 1}.
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-900 border relative group">
                        <div className="whitespace-nowrap overflow-hidden text-ellipsis rounded-lg bg-indigo-800 text-white p-1 m-2">
                          {user._id.substring(20)}
                        </div>
                        <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10">
                          {user._id}
                        </div>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border table-cell">
                        {user && user.user ? (
                          <>
                            {user.user.fullName} <br /> {user.user.employeeId}
                          </>
                        ) : (
                          "N/A" // Or any appropriate placeholder for missing data
                        )}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border">
                        {user.firstName}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border">
                        {user.lastName}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border">
                        {user.mobileNumber}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border">
                        {user.gender}
                      </td>
                      <td
                        className={`px-2 py-2 whitespace-nowrap text-sm font-medium border 
                ${
                  user.lead_status === "PENDING"
                    ? "bg-yellow-500 text-center text-white"
                    : ""
                }
                ${
                  user.lead_status === "DISBURSED"
                    ? "bg-blue-500 rounded-none text-center text-white"
                    : ""
                }

                ${
                  user.lead_status === "APPROVED"
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
                      <td
                        className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border
                  "
                      >
                        {user.leadAmount}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border">
                        {parseUTCtoIST(user.createdAt)}
                      </td>

                      <td className="px-2 py-4 whitespace-nowrap text-right  font-medium flex gap-2">
                        <button
                          onClick={() => handleOpenLeadDetail(user)}
                          className="text-white bg-yellow-500 px-3 py-2 rounded-lg font-mono border-"
                        >
                          Loan Details
                        </button>
                        <button
                          onClick={() => handleOpenLeadUser(user)}
                          className="text-white bg-blue-900 px-3 py-2 rounded-md"
                        >
                          View Employee
                        </button>
                        <button
                          onClick={() => handleOpenUserprofile(user)}
                          className="text-white bg-blue-700 px-3 py-2 rounded-md"
                        >
                          View user profile
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
              {leadsData != null &&
                isChecked == true &&
                leadsData.data.map((user, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 != 0 ? "bg-[#F4FAFF]" : ""}`}
                  >
                    <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border bg-[#F3F4F7]">
                      {index + 1}.
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border relative group">
                      <div className="whitespace-nowrap overflow-hidden text-ellipsis rounded-lg bg-indigo-800 text-white p-1">
                        {user._id.substring(20)}
                      </div>
                      <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded z-10">
                        {user._id}
                      </div>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border table-cell">
                      {user && user.user ? (
                        <>
                          {user.user.fullName} <br /> {user.user.employeeId}
                        </>
                      ) : (
                        "N/A" // Or any appropriate placeholder for missing data
                      )}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border">
                      {user.firstName}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border">
                      {user.lastName}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border">
                      {user.mobileNumber}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border">
                      {user.gender}
                    </td>
                    <td
                      className={`px-2 py-2 whitespace-nowrap text-sm font-medium border 
                ${
                  user.lead_status === "PENDING"
                    ? "bg-yellow-500 text-center text-white"
                    : ""
                }
                ${
                  user.lead_status === "DISBURSED"
                    ? "bg-blue-500 rounded-none text-center text-white"
                    : ""
                }

                ${
                  user.lead_status === "APPROVED"
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
                    <td
                      className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border
                  "
                    >
                      {user.leadAmount}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap  font-medium text-gray-900 border">
                      {parseUTCtoIST(user.createdAt)}
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap text-right  font-medium flex gap-2">
                      <button
                        onClick={() => handleOpenLeadDetail(user)}
                        className="text-white bg-yellow-500 px-3 py-2 rounded-lg font-mono border-"
                      >
                        Loan Details
                      </button>
                      <button
                        onClick={() => handleOpenLeadUser(user)}
                        className="text-white bg-blue-900 px-3 py-2 rounded-md"
                      >
                        View Employee
                      </button>
                      <button
                        onClick={() => handleOpenUserprofile(user)}
                        className="text-white bg-blue-700 px-3 py-2 rounded-md"
                      >
                        View user profile
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
        <LoanApprovalDetail
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
      {openLeadDetailCompo && (
        <div className="absolute h-full w-full top-0 bg-white">
          <LeadDetailsComponent
            lead_data={objwithlinkerid}
            handleCloseCallback={() => setopenLeadDetailCompo(false)}
          />
        </div>
      )}
    </div>
  );
}

export default LoanApprovalTable;
