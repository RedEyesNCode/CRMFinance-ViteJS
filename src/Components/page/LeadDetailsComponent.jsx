import React, { useState, useEffect, useRef, useMemo } from "react";
import { FaBeer } from "react-icons/fa";
import { GiFastBackwardButton } from "react-icons/gi";
import {
  deleteLead,
  getLeadDetails,
  updateLeadStatus,
} from "../../apis/apiInterface";
import UpdateLead from "../UpdateLead";

function LeadDetailsComponent({ lead_data, handleCloseCallback }) {
  const [isUpdateLead, setIsUpdateLead] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [activeTab, setActiveTab] = useState("approveLoans"); // Default active tab
  const [activeTabDocs, setActiveTabDocs] = useState("pancard"); // Default active tab

  const [leads_status, setLeadsStatus] = useState(lead_data.lead_status);

  const [lead_current_data, setLeadCurrentData] = useState(lead_data);

  const [openLeadStatusDialog, setLeadStatusDialog] = useState(false);

  const [openDeleteLeadDialog, setDeleteLeadDialog] = useState(false);

  const HandleopenDeleteLeadDialog = () => {
    setDeleteLeadDialog(true);
  };
  const CloseDeleteLeadDialog = () => {
    setDeleteLeadDialog(false);
  };
  const deleteCurrentLead = async () => {
    try {
      const rawJson = {
        leadId: lead_current_data._id,
      };
      const responseDelete = await deleteLead(rawJson);
      if (responseDelete.code == 200) {
        window.alert(responseDelete.message);
        setDeleteLeadDialog(false);
        handleCloseCallback();
      } else {
        window.alert(responseDelete.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const callLeadDetailsAPI = async () => {
    try {
      const rawJson = {
        leadId: lead_data._id,
      };
      const leadDetailsResponse = await getLeadDetails(rawJson);
      if (leadDetailsResponse.code == 200) {
        setLeadCurrentData(leadDetailsResponse.data);
      } else {
        setLeadCurrentData(lead_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callLeadDetailsAPI();
  }, [openLeadStatusDialog]);

  const [updateLeadForm, setUpdateLeadForm] = useState({
    leadId: lead_data._id,
    status: leads_status,
    amount: "",
    feesAmount: "",
    interestRate: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateLeadForm((prevLeadForm) => ({
      ...prevLeadForm,
      [name]: value,
    }));
  };

  const handleOpen = () => setLeadStatusDialog(true);
  const handleClose = () => {
    setLeadStatusDialog(false);
  };
  const handleBackpress = () => {
    handleCloseCallback();
  };
  const handleUpdateLeadStatus = async () => {
    try {
      const rawJson = {
        leadId: updateLeadForm.leadId,
        status: leads_status,
        amount: updateLeadForm.amount,
        feesAmount: updateLeadForm.feesAmount,
        interestRate: updateLeadForm.interestRate,
      };
      console.log(rawJson);
      const responseJson = await updateLeadStatus(rawJson);
      if (responseJson.code == 200) {
        // window.alert(responseJson.message);
        setLeadStatusDialog(false);
      } else {
        setLeadCurrentData(lead_data);
        window.alert("Lead Status NOT Updated !");
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Update lead status");
  };

  const leadStatusClass = useMemo(() => {
    return `w-[100%] p-6 rounded-b-lg flex items-center justify-center ${
      lead_current_data.lead_status === "APPROVED"
        ? "bg-green-500"
        : lead_current_data.lead_status === "PENDING"
        ? "bg-yellow-400"
        : lead_current_data.lead_status === "REJECTED"
        ? "bg-red-400"
        : lead_current_data.lead_status === "DISBURSED"
        ? "bg-blue-800"
        : "bg-gray-200" // Default
    }`;
  }, [lead_current_data]);

  const showFinancialFields = leads_status === "APPROVED";

  if (lead_current_data == null) {
    return (
      <h2 className="text-white text-[21px] font-semibold font-mono bg-green-800 rounded-md p-2">
        No lead detail Found !!
      </h2>
    );
  }

  return (
    <main>
      <div className="relative">
        <div className="flex flex-row gap-[400px] items-center font-semibold rounded-md bg-blue-600 text-white">
          <GiFastBackwardButton
            onClick={() => handleBackpress()}
            className="text-[50px]  m-[10px] text-white"
          />
          <h2 className="text-2xl">Lead Details Information</h2>
        </div>

        <div id="lead-status-card" className={leadStatusClass}>
          <span className="text-xl font-semibold">
            Lead Status : {lead_current_data.lead_status}
          </span>
        </div>
        <button
          onClick={handleOpen}
          class="m-[20px] rounded-[20px] bg-blue-500 hover:bg-purple-900 text-white font-bold py-2 px-4"
        >
          Update Lead Status
        </button>

        <button
          onClick={HandleopenDeleteLeadDialog}
          class="m-[20px] rounded-[2px] bg-rose-900 hover:bg-red-500 text-white font-bold py-2 px-4"
        >
          DELETE LEAD
        </button>
        <button
        onClick={() => {
          setCurrentData(lead_current_data);
          setIsUpdateLead(true);
          console.log(lead_current_data); // Logs the incoming data
          console.log(currentData); // Logs the incoming data (note this might still show previous state)
        }}
        className="m-[20px] rounded-[2px] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4"
      >
        UPDATE LEAD
      </button>


        <div className="flex">
          <div className="w-1/3 m-[10px] border-r pr-4 bg-white rounded-lg shadow-lg p-6 text-gray-700 text-[12px]">
            <h2 className="font-semibold text-[#ffffff] bg-blue-900 rounded-lg p-2 text-[15px]">
              {" "}
              Basic User Information
            </h2>
            <ul>
              <li className="m-[10px]">
                First Name {lead_current_data.firstName}
              </li>
              <li className="m-[10px]">
                Last Name {lead_current_data.lastName}
              </li>
              <li className="font-bold text-[20px] m-[10px]">
                Mobile: {lead_current_data.mobileNumber}
              </li>
              <li className="m-[10px]">DOB: {lead_current_data.dob}</li>
              <li className="m-[10px]">
                Gender: {lead_current_data.gender === "2" ? "Female" : "Male"}
              </li>
              <li className="m-[10px]">
                Pincode: {lead_current_data.pincode} ₹
              </li>
              <li className="m-[10px]">
                Current Address: {lead_current_data.currentAddress}
              </li>
              <li className="m-[10px]">
                Relative Name: {lead_current_data.relativeName}
              </li>
              <li className="m-[10px]">
                Relative Number {lead_current_data.relativeNumber}
              </li>
              <li className="m-[10px]">State {lead_current_data.state}</li>
              <li className="m-[10px]">
                Salary {lead_current_data.monthlySalary}
              </li>
            </ul>
          </div>
          <div className="w-3/3 m-[10px] border-r pr-4 bg-white rounded-lg shadow-lg p-6 text-gray-700 text-[10px] ">
            <h2 className="font-semibold text-[#ffffff] bg-green-900 rounded-lg p-2 text-[12px]">
              Lead Amount Information
            </h2>
            <ul>
              <li className="m-[10px]">
                Customer Loan Amount ₹{lead_current_data.customerLoanAmount}{" "}
              </li>
              <li className="m-[10px]">
                Employee Approved Amount ₹{lead_current_data.empApproveAmount}
              </li>
              <li className="font-bold text-[15px] m-[10px]">
                Lead Interest Amount: ₹{lead_current_data.lead_interest_rate}
              </li>
              <li className="m-[10px]">
                Processing Fees : ₹{lead_current_data.processingFees}
              </li>
              <li className="m-[10px]">
                {" "}
                Fees Amount ₹{lead_current_data.feesAmount}{" "}
              </li>
            </ul>
          </div>

          <div className="w-2/3 pl-4">
            <h2 className="font-semibold text-[18px] text-[#ffffff] bg-blue-500 rounded-lg p-6 m-[20px]">
              Loan Details
            </h2>

            <div className="flex space-x-4 mb-4">
              {" "}
              {/* Tab bar */}
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTab === "approveLoans"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400"
                }`}
                onClick={() => setActiveTab("approveLoans")}
              >
                Approve Loans
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTab === "ongoing"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400"
                }`}
                onClick={() => setActiveTab("ongoing")}
              >
                Ongoing
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTab === "closed"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400"
                }`}
                onClick={() => setActiveTab("closed")}
              >
                Closed
              </button>
              {/* Add more buttons for 'ENACH' and 'UPDATE KYC' */}
            </div>
            <div>
              {activeTab === "approveLoans" && (
                <div className="p-4 bg-white rounded-md shadow-md">
                  <h2 className="text-xl font-semibold mb-2">
                    User Approved Loans
                  </h2>
                </div>
              )}
              {activeTab === "ongoing" && (
                <div className="p-4 bg-white rounded-md shadow-md">
                  <h2 className="text-xl font-semibold mb-2">
                    User On-going loans
                  </h2>
                </div>
              )}
              {activeTab === "closed" && (
                <div className="p-4 bg-white rounded-md shadow-md">
                  <h2 className="text-xl font-semibold mb-2">
                    User Closed loans
                  </h2>
                </div>
              )}
              {/* Add content for 'ENACH' and 'UPDATE KYC' tabs */}
            </div>
            <h2 className="font-semibold text-[18px] text-[#ffffff] bg-purple-500 rounded-lg p-6 m-[20px]">
              Leads-KYC Documents
            </h2>

            <div className="flex space-x-4 mb-4">
              {" "}
              {/* Tab bar */}
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTabDocs === "pancard"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-400"
                }`}
                onClick={() => setActiveTabDocs("pancard")}
              >
                Pancard
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTabDocs === "selfie"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-400"
                }`}
                onClick={() => setActiveTabDocs("selfie")}
              >
                Selfie
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTabDocs === "aadhar_front"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-400"
                }`}
                onClick={() => setActiveTabDocs("aadhar_front")}
              >
                Adhar Front
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTabDocs === "aadhar_back"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-400"
                }`}
                onClick={() => setActiveTabDocs("aadhar_back")}
              >
                Adhar Back
              </button>
              {/* Add more buttons for 'ENACH' and 'UPDATE KYC' */}
            </div>

            {/* Tab Content */}
            <div className="m-[5px]">
              {activeTabDocs === "pancard" && (
                <div className="p-4 bg-white  shadow-md m-[10px] border-[2px] rounded-3xl border-green-500">
                  <h2 className="text-xl font-semibold mb-2 text-gray-400 text-[20px]">
                    Pancard Document
                  </h2>
                  <img
                    onClick={() =>
                      window.open(lead_current_data.pancard_img, "_blank")
                    }
                    className="h-[100px] w-[100px] rounded-2xl object-cover"
                    src={lead_data.pancard_img}
                  />
                </div>
              )}
              {activeTabDocs === "selfie" && (
                <div className="p-4 bg-white  shadow-md rounded-3xl border-[2px] border-green-500">
                  <h2 className="text-xl font-semibold mb-2 text-gray-400">
                    Selfie Document
                  </h2>
                  <img
                    onClick={() =>
                      window.open(lead_current_data.selfie, "_blank")
                    }
                    className="h-[100px] w-[100px] rounded-2xl object-cover"
                    src={lead_data.selfie}
                  />
                </div>
              )}
              {activeTabDocs === "aadhar_front" && (
                <div className="p-4 bg-white  shadow-md  border-[2px] rounded-3xl border-green-500">
                  <h2 className="text-xl font-semibold mb-2 text-gray-400">
                    Aadhar Front
                  </h2>
                  <img
                    onClick={() =>
                      window.open(lead_current_data.aadhar_front, "_blank")
                    }
                    className="h-[100px] w-[100px] rounded-2xl object-cover"
                    src={lead_data.aadhar_front}
                  />
                </div>
              )}
              {activeTabDocs === "aadhar_back" && (
                <div className="p-4 bg-white  shadow-md border-[2px] rounded-3xl border-green-500">
                  <h2 className="text-xl font-semibold mb-2 text-gray-400">
                    Aadhar Back
                  </h2>
                  <img
                    onClick={() =>
                      window.open(lead_current_data.aadhar_back, "_blank")
                    }
                    className="h-[100px] w-[100px] rounded-2xl object-cover"
                    src={lead_data.aadhar_back}
                  />
                </div>
              )}
              {/* Add content for 'ENACH' and 'UPDATE KYC' tabs */}
            </div>
          </div>
        </div>
      </div>

      {openLeadStatusDialog && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <div>
            <div className="fixed inset-0 flex items-center justify-center z-150">
              <div className="bg-white p-10 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Update Lead Status
                </h2>
                <div className="mb-4">
                  <label className="block text-gray-500 font-bold mb-2">
                    Lead ID
                  </label>
                  <input
                    name="leadId"
                    value={updateLeadForm.leadId}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="leadId"
                    type="text"
                  />
                  <label className="block text-gray-500 font-bold mb-2">
                    Lead Status
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                    id="leadStatus"
                    value={leads_status}
                    onChange={(e) => setLeadsStatus(e.target.value)}
                  >
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="DISBURSED">DISBURSED</option>
                  </select>
                  {showFinancialFields && (
                    <>
                      <label className="block text-red-500 font-thin mb-2">
                        Note (IN APPROVED STATUS) : You will be moving this LEAD
                        to Loan-Approval-Table (Loan Master Section)
                      </label>
                      <label className="block text-gray-500 font-bold mb-2">
                        Lead Amount
                      </label>
                      <input
                        name="amount"
                        value={updateLeadForm.amount}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="amount"
                        type="number"
                      />
                      <label className="block text-gray-500 font-bold mb-2">
                        Fees Amount
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="feesAmount"
                        onChange={handleChange}
                        name="feesAmount"
                        value={updateLeadForm.feesAmount}
                        type="number"
                      />
                      <label className="block text-gray-500 font-bold mb-2">
                        Interest Amount
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="interestRate"
                        onChange={handleChange}
                        name="interestRate"
                        value={updateLeadForm.interestRate}
                        type="text"
                      />
                    </>
                  )}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateLeadStatus}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {openDeleteLeadDialog && (
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
                onClick={() => CloseDeleteLeadDialog(lead_current_data)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteCurrentLead(lead_current_data)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {isUpdateLead && (
        <>
          <p
            className="absolute top-8 z-50 left-[70%] cursor-pointer"
            onClick={() => setIsUpdateLead(false)}
          >
            ❌
          </p>{" "}
          <UpdateLead currentData={currentData} />
        </>
      )}
    </main>
  );
}

export default LeadDetailsComponent;
