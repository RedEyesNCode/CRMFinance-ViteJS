import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import LeadDetailsComponent from "../LeadDetailsComponent";
import {
  deleteApprovalLoan,
  deleteClosedLoan,
  deleteDisburseLoan,
  deleteOnGoingLoan,
  deleteRejectedLoan,
  filterClosedLoansByDate,
  getAllClosedLoans,
  getAllRejectedLoans,
  getApprovalLoans,
  getDisburseLoans,
  getOnGoingLoans,
} from "../../../apis/apiInterface";
import LoanClosedDetail from "./LoanClosedDetail";
import { ToastContainer, toast } from "react-toastify";

function LoanClosedTable({ handle }) {
  const [leadsData, setLeadsData] = useState(null);
  const [currentLead, setcurrentLead] = useState(null);
  const [isLeadDetailFrame, setLeadDetailFrame] = useState(false);

  const [isLeadDeleteFrame, setLeadDeleteFrame] = useState(false);

  const [isLeadUserFrame, setLeadUserFrame] = useState(false);
  const [FirstName, setFirstName] = useState("");

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
      const response = await getAllClosedLoans();
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
  function parseUTCtoIST(utcString) {
    const utcDate = new Date(utcString);
    const options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
    const istString = utcDate.toLocaleString("en-US", options);
    return istString;
  }
  const handleOpenLeadDetail = (lead_data) => {
    setcurrentLead(lead_data);
    setLeadUserFrame(false);
    setLeadDetailFrame(true);
    setLeadDeleteFrame(false);
    // navigate("/lead-details");
  };

  const deleteCurrentLead = async () => {
    try {
      const rawJson = { rejected_loan_id: currentLead._id };
      const response = await deleteClosedLoan(rawJson);
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
        const response = await getAllClosedLoans();
        if (response.status == "success") {
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
  const [searchForm, setSearchForm] = useState({
    fromDate: "",
    toDate: "",
    leadFirstName: "",
  });
  const filterClosedLoans = async () => {
    const { fromDate, toDate, leadFirstName } = searchForm;

    if (!fromDate || !toDate) {
      toast.warn("From Date and To Date are required");
      return;
    }

    try {
      const response = await filterClosedLoansByDate(
        fromDate,
        toDate,
        leadFirstName
      );
      if (response.code != 200) {
        toast.warn(response.message);
        return;
      }
      console.log(response);
      setLeadsData(response);
    } catch (error) {
      console.error("Error filtering Closed loans:", error);
      alert("An error occurred while filtering Closed loans.");
    }
  };
  const resetFilters = () => {
    setSearchForm({
      fromDate: "",
      toDate: "",
      leadFirstName: "",
    });
    callLeadApi();
  };

  const handleChange = (e) => {
    console.log(e.target.name + e.target.value);
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value,
    });
  };

  if (leadsData == null) {
    return (
      <h2 className="m- text-white text-[21px] font-semibold font-mono bg-black rounded-md p-2 m-2">
        No Closed Loans Found !!
      </h2>
    );
  }

  return (
    <div className="border border-gray-300 relative">
      <ToastContainer />
      {!isLeadDetailFrame && (
        <div className="relative h-[85%] overflow-hidden">
          <div className="px-4 bg-gradient-to-r from-[#e43364] to-[#3858f9] flex flex-row justify-between items-center p-4">
            <h2 className="text-lg  px-5 py-4   font-sans font-bold  text-white p-2  ">
              All Closed Loans
            </h2>

            <div className="flex flex-col">
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
                className="text-black text-[18px] font-mono p-1 m-1 rounded-md outline-none"
              />
            </div>
            <div className="flex flex-col">
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
                className="text-black text-[18px] font-mono p-1 m-1 rounded-md outline-none"
                name="toDate"
              />
            </div>
            <div className="flex flex-col mr-20">
              <label className="items-center mt-5 font-mono font-semibold  text-center text-white">
                Search by name or number :
              </label>
              <input
                type="text"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-black text-[18px] font-mono p-2 m-1 h-10 rounded-md outline-none border-[3px] border-indigo-200"
                placeholder="Enter name or number"
              ></input>
            </div>

            <button
              onClick={filterClosedLoans}
              className="m-4 border-2 border-white rounded-md shadow-2xl hover:shadow-none h-16 w-40 p-2 text-white font-mono text-[16px]"
            >
              Filter Loans
            </button>
            <button
              onClick={resetFilters}
              className="m-2 -ml-10 border-2 border-white rounded-md shadow-2xl hover:shadow-none h-16 w-40 p-2 text-white font-mono text-[16px]"
            >
              Reset Filter
            </button>
          </div>

          <div className="max-h-[490px] overflow-auto">
            <table className="min-w-full  p-1">
              <thead className="border">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider border bg-[#F3F4F7]"
                  >
                    SNO.
                  </th>

                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Reject Loan ID
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    User Info
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Mobile Number
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider border"
                  >
                    Created At
                  </th>

                  <th
                    scope="col"
                    className="px-2 py-3  text-[11px] font-medium text-gray-500 uppercase tracking-wider border text-center"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white  divide-gray-200">
                {leadsData != null &&
                  leadsData.data
                    .filter(
                      (lead) =>
                        lead.firstName
                          .toLowerCase()
                          .includes(FirstName.toLowerCase()) ||
                        lead.mobileNumber.includes(FirstName)
                    )
                    .map((user, index) => (
                      <tr
                        key={index}
                        className={`${index % 2 != 0 ? "bg-[#F4FAFF]" : ""}`}
                      >
                        <td className="px-2 py-4 whitespace-nowrap text-[15px] font-medium text-gray-900 border bg-[#F3F4F7]">
                          {index + 1}.
                        </td>

                        <td className="px-2 py-4 whitespace-nowrap text-[15px] font-medium text-gray-900 border">
                          {user._id}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-[15px] font-medium text-gray-900 border">
                          {user.user}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-[15px] font-medium text-gray-900 border">
                          {user.firstName}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-[15px] font-medium text-gray-900 border">
                          {user.lastName}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-[15px] font-medium text-gray-900 border">
                          {user.mobileNumber}
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap text-[15px] font-medium text-gray-900 border">
                          {user.gender}
                        </td>
                        <td
                          className={`px-2 py-2 whitespace-nowrap text-[15px] font-medium border 
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

                        <td className="px-2 py-4 max-w-28 whitespace-wrap text-wrap text-[15px] font-medium text-gray-900 border">
                          {parseUTCtoIST(user.createdAt)}
                        </td>

                        <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-between">
                          <button
                            onClick={() => handleOpenLeadDetail(user)}
                            className="text-white bg-yellow-500 px-3 py-2 rounded-xl font-sans border-2 "
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
        </div>
      )}
      {isLeadDetailFrame && (
        <LoanClosedDetail
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

export default LoanClosedTable;
