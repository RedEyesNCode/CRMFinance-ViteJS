import React, { useState, useEffect, useRef } from "react";
import {
  deleteLead,
  filterLeadsbyDateStatusName,
  getAllLeads,
  searchLeads,
} from "../../apis/apiInterface";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import LeadDetailsComponent from "../page/LeadDetailsComponent";
import CreateNewLead from "./CreateNewLead";
import { ToastContainer, toast } from "react-toastify";
import apiService from "../../apis/apiService";
import ReactPaginate from "react-paginate";
import { BsBack } from "react-icons/bs";

function ItemLeadComponent({ userData }) {
  const [leadsData, setLeadsData] = useState(null);
  const [currentLead, setcurrentLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [FirstName, setFirstName] = useState("");

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  useEffect(() => {
    callLeadApi();
  }, [currentPage, rowsPerPage]);

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
  ///////////////////Rishi////////////////////
  const filterLeads = async () => {
    const { fromDate, toDate, leadStatus, leadFirstName } = searchForm;

    if (!fromDate || !toDate) {
      toast.warn("From Date and To Date are required");
      return;
    }

    try {
      const response = await filterLeadsbyDateStatusName(
        fromDate,
        toDate,
        leadFirstName,
        leadStatus
      );
      if (response.code != 200) {
        toast.warn(response.message);
        return;
      }
      console.log(response);
      setLeadsData(response);
    } catch (error) {
      console.error("Error filtering Leads:", error);
      alert("An error occurred while filtering Leads.");
    }
  };
  const resetFilters = () => {
    setSearchForm({
      fromDate: "",
      toDate: "",
      leadStatus: "",
      leadFirstName: "",
    });
    callLeadApi();
  };

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
      const rawJson = { page: currentPage, limit: rowsPerPage };
      // apiService('get-all-leads', 'POST',rawJson)
      //   .then(response => {
      //     if (response.status == "success") {
      //     setLeadsData(response);
      //   } else {
      //     setLeadsData(null);
      //   }
      //   console.log(response);

      //   })
      //   .catch(error => console.error('Error fetching leads:', error));

      const response = await getAllLeads(rawJson);
      if (response.status == "success") {
        setLeadsData(response);
        
      } else {
        setLeadsData(null);
      }
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
  function parseUTCtoIST(utcString) {
    const utcDate = new Date(utcString);
    const options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
    const istString = utcDate.toLocaleString("en-US", options);
    return istString;
  }
  function unixToIST(unixTimestamp) {
    // Check for validity, ensuring the timestamp is not too far in the future
    const maxAllowedTimestamp = Date.now() + 100 * 365 * 24 * 60 * 60 * 1000; // 100 years from now
    if (unixTimestamp > maxAllowedTimestamp) {
      throw new Error(
        "Unix timestamp is too far in the future and cannot be processed."
      );
    }

    // If valid, proceed with conversion
    const date = new Date(unixTimestamp);
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return date.toLocaleString("en-IN", options);
  }

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
  };

  const callSearchLeadAPI = async () => {
    try {
      if (searchForm.fromDate.length === 0) {
        toast.error("Please enter from date");
      } else if (searchForm.toDate.length === 0) {
        toast.error("Please enter toDate");
      } else if (searchForm.leadStatus.length === 0) {
        toast.error("Please enter lead status");
      } else if (searchForm.leadFirstName.length === 0) {
        toast.error("Please enter lead first name");
      } else {
        const response = await searchLeads(searchForm);
        if (response.status == "success") {
          setLeadsData(response);
        } else {
          setLeadsData(null);
        }
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const LeadsData = async () => {
      try {
        const rawJson = { page: currentPage, limit: rowsPerPage };

        // apiService('get-all-leads', 'POST',rawJson)
        // .then(response => {
        //   if (response.status == "success") {

        //   setLeadsData(response);
        // } else {
        //   setLeadsData(null);
        // }
        // console.log(response);

        // })
        // .catch(error => console.error('Error fetching leads:', error));
        const response = await getAllLeads(rawJson);
        if (response.status == "success") {
          setLeadsData(response);
        } else {
          setLeadsData(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    LeadsData();
  }, [addLead]);

  const closeleadform = () => {
    setaddLead(false);
  };
  if (leadsData == null) {
    <main className="h-full w-[90%] px-4 pt-4 bg-[#F4FAFF] rounded-[50px] -ml-[5%]">
      <h2 className="text-white text-[21px] font-semibold font-mono bg-blue-800 rounded-md p-2">
        No Leads found !!
      </h2>
    </main>;
  }

  return (
    <div className="border-gray-300 h-full w-full ">
      <ToastContainer />
      {!isLeadDetailFrame && (
        <div className=" flex flex-col  ">
          {/* <h2 className="m-[10px] text-[20px]  font-mono font-bold  text-white p-2 rounded-md">View All Leads</h2> */}
          <div className="flex  px-5 py-2 items-center bg-gradient-to-r from-[#3858f9] to-[#e43364] text-white">
            <div className="flex flex-row">
              <h2 className="m-[10px] text-[20px] font-mono font-bold">
                View All Leads
              </h2>
              <div className="flex flex-row justify-normal item-center">
                <div className="date-input">
                  <label
                    htmlFor="fromDate"
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
                <div>
                  <label
                    htmlFor="toDate"
                    className="text-white text-[18px] font-mono p-1 m-1"
                  >
                    To Date :
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    onChange={handleChange}
                    value={searchForm.toDate}
                    className="text-black text-[18px] font-mono p-1 m-1 rounded-md outline-none "
                    name="toDate"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <label className="items-center mt-1 font-mono font-semibold ">
                Search By Name or Number
              </label>
              <input
                type="text"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-black text-[18px] font-mono p-2 m-1 rounded-md outline-none"
                placeholder="Enter name or number"
              ></input>

              <select
                id="leadStatus"
                value={searchForm.leadStatus}
                onChange={handleChange}
                name="leadStatus"
                className="text-black text-[16px] font-mono  p-1 m-1 rounded-md"
              >
                <option value="">Select Lead Status</option>
                <option value="APPROVED">APPROVED</option>
                <option value="PENDING">PENDING</option>
                <option value="REJECTED">REJECTED</option>
                <option value="DISBURSED">DISBURSED</option>
              </select>
            </div>

            <div className="flex flex-row justify-between">
              <button
                onClick={filterLeads}
                className="border-2 border-amber-400 bg-slate-700  px-3 h-15 rounded-xl m-4 font-semibold"
              >
                Filter Leads
              </button>
              <button
                onClick={resetFilters}
                className="border-2 border-amber-400 bg-red-700  px-3 h-15 rounded-xl m-4 font-semibold"
              >
                Reset Filter
              </button>
              <button
                onClick={() => setaddLead(true)}
                className="border  px-3 h-15 rounded-xl m-4 font-semibold"
              >
                Add Lead
              </button>
            </div>
          </div>

          <table className="min-w-full rounded-3xl  p-1">
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
                  Generated Loan ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                >
                  Employee Info
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
                  className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border whitespace-wrap"
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
              {leadsData &&
                leadsData.status != "fail" &&
                leadsData.data
                  .filter((lead) => (lead.firstName.toLowerCase().includes(FirstName.toLowerCase())) || 
                  (lead.mobileNumber.includes(FirstName)))
                  .map((user, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? "bg-[#F4FAFF]" : ""}`}
                    >
                      <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border bg-[#F3F4F7]">
                        {index + 1}.
                      </td>

                      <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user._id.substring(20)}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.generated_loan_id}
                      </td>
                      <td className="px-2 py-2 whitespace-wrap text-sm font-medium text-gray-900 border table-cell">
                        {user && user.user ? (
                          <>
                            {user.user.fullName} <br /> {user.user.employeeId}
                          </>
                        ) : (
                          "N/A" // Or any appropriate placeholder for missing data
                        )}
                      </td>
                      <td className="px-2 py-2 whitespace-wrap text-sm font-medium text-gray-900 border">
                        {user.firstName}
                      </td>
                      <td className="px-2 py-2 whitespace-wrap text-sm font-medium text-gray-900 border">
                        {user.lastName}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.mobileNumber}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border">
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

                      <td className="px-2 py-4  whitespace-nowrap text-sm font-medium text-gray-900 border">
                        {user.leadAmount}
                      </td>
                      <td className="px-2 py-4 w-20 whitespace-pre-wrap text-sm font-medium text-gray-900 border">
                        {parseUTCtoIST(user.createdAt)}
                      </td>
                      <td className="px-2 py-4 w-20 whitespace-pre-wrap text-sm font-medium text-gray-900 border">
                        {unixToIST(Number(user.disbursementDate))}
                      </td>
                      <td className="px-2 py-4  text-right text-sm font-medium flex gap-2">
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
                    </tr>
                  ))}
            </tbody>
          </table>
          {leadsData && (
            <div className="flex justify-between items-center mb-4 bg-gradient-to-r from-[#e43364] to-[#3858f9] p-2">
              <div>
                <span className="text-white font-mono text-[18px]">
                  Rows per page:{" "}
                </span>
                <select
                  value={rowsPerPage}
                  className="rounded-lg border-2 border-slate-600"
                  onChange={handleRowsPerPageChange}
                >
                  <option value={100}>100</option>
                  <option value={25}>25</option>
                  <option value={5}>5</option>

                  <option value={50}>50</option>
                  <option value={200}>200</option>
                  <option value={250}>250</option>
                  <option value={500}>500</option>
                </select>
              </div>

              <ReactPaginate
                breakLabel="..."
                nextLabel={
                  <button className="text-white text-[19px] font-mono rounded-md bg-cyan-800 p-1">
                    Next
                  </button>
                }
                onPageChange={handlePageChange}
                pageRangeDisplayed={5}
                pageCount={leadsData.totalPages}
                previousLabel={
                  <button className="text-white text-[19px] font-mono rounded-md bg-cyan-800 p-1">
                    Previous
                  </button>
                }
                containerClassName="pagination-buttons flex"
                activeClassName="bg-indigo-900 text-white"
                pageClassName="px-3 py-1 rounded bg-gray-200 mx-1 hover:bg-gray-300"
              />
            </div>
          )}
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

      {addLead && (
        <>
          <CreateNewLead close={closeleadform} />
          <p
            className="absolute top-6 left-[75%] cursor-pointer"
            onClick={() => setaddLead(false)}
          >
            ❌
          </p>
        </>
      )}
    </div>
  );
}

export default ItemLeadComponent;
