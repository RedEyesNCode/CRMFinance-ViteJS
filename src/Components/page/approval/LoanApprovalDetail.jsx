import React, { useState, useEffect, useRef, useMemo } from "react";
import { FaBeer } from "react-icons/fa";
import { GiFastBackwardButton } from "react-icons/gi";
import EmiCalculator from "../EmiCalculator";
import {
  deleteApprovalLoan,
  getApprovalLoanDetails,
  updateLoanApprovalStatus,
} from "../../../apis/apiInterface";
import { ToastContainer, toast } from "react-toastify";

function LoanApprovalDetail({ lead_data, handleCloseCallback }) {
  const [activeTab, setActiveTab] = useState("approveLoans"); // Default active tab
  const [activeTabDocs, setActiveTabDocs] = useState("pancard"); // Default active tab

  const [leads_status, setLeadsStatus] = useState(lead_data.lead_status);

  const [lead_current_data, setLeadCurrentData] = useState(lead_data);

  const [openLeadStatusDialog, setLeadStatusDialog] = useState(false);

  const handleOpenLeadStatusDialog = () => {
    setLeadStatusDialog(true);
  };
  const handleCloseLeadStatusDialog = () => {
    setLeadStatusDialog(false);
  };

  const [openDeleteLeadDialog, setDeleteLeadDialog] = useState(false);

  const HandleopenDeleteLeadDialog = () => {
    setDeleteLeadDialog(true);
  };

  const CloseDeleteLeadDialog = () => {
    setDeleteLeadDialog(false);
  };
  const deleteCurrentLead = async (lead_current_data) => {
    try {
      const rawJson = { loan_approval_id: lead_current_data._id };
      const response = await deleteApprovalLoan(rawJson);
      if (response.code == 200) {
        window.alert(response.message);
        handleCloseCallback();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const callLeadDetailsAPI = async () => {
    try {
      const rawJson = {
        loan_approval_id: lead_data._id,
      };
      const leadDetailsResponse = await getApprovalLoanDetails(rawJson);
      if (leadDetailsResponse.code == 200) {
        setLeadCurrentData(leadDetailsResponse.data);
        window.alert(leadDetailsResponse.data.lead_status);

        setLeadsStatus(leadDetailsResponse.data.lead_status);
      } else {
        setLeadCurrentData(lead_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [updateLeadForm, setUpdateLeadForm] = useState({
    leadId: lead_data._id,
    status: leads_status,
    disbursement_date: "",
    amount : "",
    feesAmount : "",
    interestRate : "",
    emi_first_date: "",
    emi_tenure : ""
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateLeadForm((prevLeadForm) => ({
      ...prevLeadForm,
      [name]: value,
    }));
  };
  const handleUpdateLoanApprovalStatus = async () => {
    try {
      const rawJson = {
        loan_approval_id: updateLeadForm.leadId,
        status: leads_status,
        amount: updateLeadForm.amount,
        emi_first_date: updateLeadForm.emi_first_date,
        disbursement_date: updateLeadForm.disbursement_date,
        feesAmount: updateLeadForm.feesAmount,
        interestRate: updateLeadForm.interestRate,
        emi_tenure : updateLeadForm.emi_tenure
      };
      console.log(rawJson);
      const responseJson = await updateLoanApprovalStatus(rawJson);
      if (responseJson.code == 200) {
        toast.success(responseJson.message);
        setLeadStatusDialog(false);
        callLeadDetailsAPI();
      } else {
        setLeadCurrentData(lead_data);
        toast.error(responseJson.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Update lead status");
  };

  const handleBackpress = () => {
    handleCloseCallback();
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

  const showFinancialFields = leads_status === "DISBURSED";

  if (lead_current_data == null) {
    return (
      <h2 className="text-white text-[21px] font-semibold font-mono bg-green-800 rounded-md p-2">
        No lead detail Found !!
      </h2>
    );
  }

  return (
    <main>
      <ToastContainer />
      <div className="relative ">
        <div className="flex items-center font-semibold  bg-green-900 text-white">
          <GiFastBackwardButton
            onClick={() => handleBackpress()}
            className="text-[50px]  m-[10px] text-white"
          />
          <h2 className="text-2xl m-auto">Loan Approval Details</h2>
        </div>

        <div id="lead-status-card" className={leadStatusClass}>
          <span className="text-xl font-thin font-mono text-white">
            Loan Approval Status : {lead_current_data.lead_status}
          </span>
        </div>
        <div className="w-full px-5 py-8  flex items-center gap-[6.9rem]">
          <span className=" rounded-md bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4">
            EMPLOYEE LEAD TABLE ID : {lead_current_data.employee_lead_id_linker}
          </span>
          <button
            onClick={handleOpenLeadStatusDialog}
            class=" rounded-md bg-cyan-900 hover:bg-cyan-500 text-white font-bold py-2 px-4"
          >
            UPDATE APPROVAL LOAN STATUS
          </button>
          <button
            onClick={HandleopenDeleteLeadDialog}
            class=" rounded-md bg-rose-900 hover:bg-red-500 text-white font-bold py-2 px-4"
          >
            DELETE APPROVAL LOAN
          </button>
        </div>

        <div className="flex w-full flex-col">
          <div className="w-full flex  p-2">
            <div className=" m-[10px] mt-0">
              <h2 className="font-semibold text-[18px] text-[#ffffff] bg-rose-500 rounded-lg p-6 mb-2 ">
                EMI Calculator
              </h2>
              <EmiCalculator data={lead_current_data} />
            </div>
            <div className=" border rounded-lg shadow-xl py-6 px-4 text-gray-700 text-md font-semibold">
              <h2 className="font-semibold text-[#ffffff] bg-green-900 rounded-lg p-2 text-[15px] mb-2">
                Lead Amount Information
              </h2>
              <table className="border-collapse border-gray-400 rounded-lg ">
                <tbody>
                  <tr className="bg-gray-200">
                    <td className="p-2 border border-gray-400">Parameter</td>
                    <td className="p-2 border border-gray-400">Value</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">
                      Customer Loan Amount
                    </td>
                    <td className="p-2 border border-gray-400">
                      ₹{lead_current_data.customerLoanAmount}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">
                      Employee Approved Amount
                    </td>
                    <td className="p-2 border border-gray-400">
                      ₹{lead_current_data.empApproveAmount}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">
                      Lead Interest Amount
                    </td>
                    <td className="p-2 border border-gray-400">
                      ₹{lead_current_data.lead_interest_rate}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">
                      Processing Fees
                    </td>
                    <td className="p-2 border border-gray-400">
                      ₹{lead_current_data.processingFees}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">Fees Amount</td>
                    <td className="p-2 border border-gray-400">
                      ₹{lead_current_data.feesAmount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Basic user info and one more panel */}
          {/* <div className="w-full flex p-2">
            <div className="w-1/2 bg-white rounded-lg shadow-lg p-6  text-gray-700 text-md font-semibold ">
              <h2 className="font-semibold text-[#ffffff] bg-blue-900 rounded-lg p-6 text-[18px] mb-2 ">
                {" "}
                Basic User Information
              </h2>
              <table className="border-collapse border border-gray-400 w-full">
                <tbody>
                  <tr className="bg-gray-200">
                    <td className="p-2 border border-gray-400">Parameter</td>
                    <td className="p-2 border border-gray-400">Value</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">First Name</td>
                    <td className="p-2 border border-gray-400">
                      {lead_current_data.firstName}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">Last Name</td>
                    <td className="p-2 border border-gray-400">
                      {lead_current_data.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">Mobile</td>
                    <td className="p-2 border border-gray-400">
                      {lead_current_data.mobileNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">DOB</td>
                    <td className="p-2 border border-gray-400">
                      {lead_current_data.dob}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">Gender</td>
                    <td className="p-2 border border-gray-400">
                      {lead_current_data.gender === "2" ? "Female" : "Male"}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">Pincode</td>
                    <td className="p-2 border border-gray-400">
                      {lead_current_data.pincode}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">
                      Current Address
                    </td>
                    <td className="p-2 border border-gray-400">
                      {lead_current_data.currentAddress}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">
                      Relative Name
                    </td>
                    <td className="p-2 border border-gray-400">
                      {lead_current_data.relativeName}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">
                      Relative Number
                    </td>
                    <td className="p-2 border border-gray-400">
                      {lead_current_data.relativeNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">State</td>
                    <td className="p-2 border border-gray-400">
                      {lead_current_data.state}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-gray-400">Salary</td>
                    <td className="p-2 border border-gray-400">
                      {lead_current_data.monthlySalary}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-1/2 pl-6 pt-1">
              <h2 className="font-semibold text-[18px] text-[#ffffff] bg-purple-500 rounded-lg p-6  m-[20px]">
                Leads-KYC Documents
              </h2>

              <div className="flex space-x-4 mb-4 m-[20px]">
                {" "}
          
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
        
              </div>

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
           
              </div>
            </div>
          </div> */}
        </div>
      </div>

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
      {openLeadStatusDialog && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <div>
            <div className="fixed inset-0 flex items-center justify-center z-150">
              <div className="bg-white p-10 rounded-md shadow-md">
                <h2 className="text-xl text-white font-semibold mb-4 font-mono border-2 border-amber-500 rounded-xl p-2 bg-emerald-400">
                  Update Loan Approval Status
                </h2>
                <div className="mb-4">
                  <label className="block text-gray-500 font-bold mb-2">
                    Loan Approval ID
                  </label>
                  <input
                    name="leadId"
                    value={updateLeadForm.leadId}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="leadId"
                    type="text"
                  />
                  <label className="block text-gray-500 font-bold mb-2">
                    Loan Approval Status
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                    id="leadStatus"
                    value={leads_status}
                    onChange={(e) => setLeadsStatus(e.target.value)}
                  >
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="DISBURSED">DISBURSED</option>
                  </select>
                  {showFinancialFields && (
                    <div className="rounded-xl border-2 border-blue-400 p-2 m-2">
                      <label className="text-red-500 font-thin mb-2">
                        {
                          "Note (IN DISBURSEMENT STATUS) : \n  You will be moving this LEAD to Loan-Disburment-Table (Loan Master Section)"
                        }
                      </label>
                      <label className="block text-gray-500 font-bold mb-2">
                        Disbursement Date
                      </label>
                      <input
                        name="disbursement_date"
                        value={updateLeadForm.disbursement_date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="disbursement_date"
                        type="date"
                      />
                      <label className="block text-gray-500 font-bold mb-2">
                        Emi First Date
                      </label>
                      <input
                        name="emi_first_date"
                        value={updateLeadForm.emi_first_date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="emi_first_date"
                        type="date"
                      />
                      <label className="block text-rose-500 font-bold mb-2">
                        FINAL TENURE (Months)
                      </label>
                      <input
                        name="emi_tenure"
                        value={updateLeadForm.emi_tenure}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="emi_tenure"
                        type="number"
                      />
                      <label className="block text-red-500 font-bold mb-2">
                        FINAL LOAN AMOUNT
                      </label>
                      <input
                        name="amount"
                        value={updateLeadForm.amount}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="amount"
                        type="number"
                      />
                      <label className="block text-red-500 font-bold mb-2">
                        FINAL FEES AMOUNT
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="feesAmount"
                        onChange={handleChange}
                        name="feesAmount"
                        value={updateLeadForm.feesAmount}
                        type="number"
                      />
                      <label className="block text-red-500 font-bold mb-2">
                        FINAL INTEREST AMOUNT
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="interestRate"
                        onChange={handleChange}
                        name="interestRate"
                        value={updateLeadForm.interestRate}
                        type="text"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleCloseLeadStatusDialog}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateLoanApprovalStatus}
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
    </main>
  );
}

export default LoanApprovalDetail;
