import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import LeadDetailsComponent from "../LeadDetailsComponent";
import { getUserLeads } from "../../../apis/apiInterface";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";

function UserLeadTable({ current_user_id, current_user_name }) {
  const [leadsData, setLeadsData] = useState(null);
  const [currentLead, setcurrentLead] = useState(null);
  const [isLeadDetailFrame, setLeadDetailFrame] = useState(false);
  const navigate = useNavigate(); // Initialize useHistory
  const [FirstName, setFirstName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  const handleOpenLeadDetail = (lead_data) => {
    setcurrentLead(lead_data);

    setLeadDetailFrame(true);
    // navigate("/lead-details");
  };
  const handleCloseLeadDetail = () => {
    setLeadDetailFrame(false);
  };
  useEffect(() => {
    const LeadsData = async () => {
      try {
        const rawJson = {
          userId: current_user_id,
          page: currentPage,
          limit: rowsPerPage,
        };
        const response = await getUserLeads(rawJson);

        if (response.code == 200) {
          setLeadsData(response);
          toast.info(response.data.length + " leads ");
        } else {
          setLeadsData(null);
        }

        console.log("USER LEADS RESPONSE --> ", response);
      } catch (error) {
        console.log(error);
      }
    };
    LeadsData();
  }, [currentPage, rowsPerPage]);
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
  if (leadsData == null) {
    return (
      <h2 className="text-white text-[21px] font-semibold font-mono bg-green-800 rounded-md p-2">
        No leads found !!
      </h2>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-300 ">
      <ToastContainer />

      {!isLeadDetailFrame && (
        <div className="relative max-h-[680px] ">
          <div className="flex flex-row">
            <h2 className=" bg-gradient-to-r from-[#e43364] to-[#3858f9]  p-1  m-[10px] text-[20px] w-fit text-white rounded-xl font-mono font-bold">
              View All Leads by {current_user_name}
            </h2>
            <label className="items-center mt-5 font-mono font-semibold  text-center ">
              As you type filter :
            </label>
            <input
              type="text"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="text-black text-[18px] font-mono p-2 m-1 rounded-md outline-none border-2 border-indigo-800"
              placeholder="Enter name or number"
            ></input>
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
                          View Details
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
          {leadsData.data && (
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
    </div>
  );
}

export default UserLeadTable;
