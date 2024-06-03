import React, { useState, useEffect, useRef, useMemo } from "react";
import { FaBeer } from "react-icons/fa";
import { GiFastBackwardButton } from "react-icons/gi";
import EmiCalculator from "../EmiCalculator";
import EmiPayTable from "../../EmiPayTable";
import {
  closeOngoingLoan,
  deleteApprovalLoan,
  deleteDisburseLoan,
  deleteOnGoingLoan,
  getApprovalLoanDetails,
  getDisburseLoanDetail,
  getOngoingLoanDetail,
  getOngoingLoanEMIDetail,
  updateLoanApprovalStatus,
  updateLoanDisbursalStatus,
} from "../../../apis/apiInterface";
import { ToastContainer, toast } from "react-toastify";
import OngoingEmiTable from "./OngoingEmiTable";

function LoanOngoingDetail({ lead_data, handleCloseCallback }) {
  const [activeTab, setActiveTab] = useState("approveLoans"); // Default active tab
  const [activeTabDocs, setActiveTabDocs] = useState("pancard"); // Default active tab

  const [leads_status, setLeadsStatus] = useState(lead_data.lead_status);

  const [lead_current_data, setLeadCurrentData] = useState(lead_data);

  const [openLeadStatusDialog, setLeadStatusDialog] = useState(false);

  const [ongoingEmiDetail, setonGoingEmiDetail] = useState(null);

  const [emiSchedule, setEmiSchedule] = useState([]); // State for EMI schedule
  const [loanDetails, setLoanDetails] = useState({
    amount: lead_data.leadAmount || 50000,
    tenure: lead_data.tenure || 12,
    tenureUnit: "months",
    processingFees: lead_data.processingFees || 1,
    interestRate: lead_data.lead_interest_rate || 1,
    emi: 0,
    disbursementAmount: 0,
    totalLoan: 0,
    monthlyInterest: 0,
    totalInterest: 0,
  });

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
      const rawJson = { ongoing_loan_id: lead_current_data._id };
      const response = await deleteOnGoingLoan(rawJson);
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
        ongoing_loan_id: lead_data._id,
      };
      const leadDetailsResponse = await getOngoingLoanDetail(rawJson);
      if (leadDetailsResponse.code == 200) {
        setLeadCurrentData(leadDetailsResponse.data);
      } else {
        setLeadCurrentData(lead_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const callOngoingEmiDetail = async () => {
    try {
      const rawJson = {
        ongoing_loan_id: lead_data._id,
      };
      const response = await getOngoingLoanEMIDetail(rawJson);
      if (response.code == 200) {
        console.log(response);

        setonGoingEmiDetail(response.data);
      } else {
        setonGoingEmiDetail(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callOngoingEmiDetail();
  }, []);

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
  const handleUpdateLoanApprovalStatus = async () => {
    try {
      const rawJson = {
        close_loan_id: updateLeadForm.leadId,
        status: "CLOSED",
        amount: "",
        feesAmount: "",
        interestRate: "",
      };
      console.log(rawJson);
      const responseJson = await closeOngoingLoan(rawJson);
      if (responseJson.code == 200) {
        // window.alert(responseJson.message);
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
      lead_current_data.lead_status === "ACTIVE"
        ? "bg-green-400"
        : lead_current_data.lead_status === "ONGOING"
        ? "bg-blue-800"
        : lead_current_data.lead_status === "DISBURSED"
        ? "bg-blue-800"
        : "bg-gray-200" // Default
    }`;
  }, [lead_current_data]);

  const showFinancialFields = leads_status === "DISBURSED";

  if (lead_current_data == null) {
    return (
      <h2 className="text-white text-[21px] font-semibold font-mono bg-green-800 rounded-md p-2">
        No Loan Ongoing Detail Found!!
      </h2>
    );
  }

  return (
    <main>
      <ToastContainer />
      <div className="relative overflow-auto h-full w-full">
        <div className="flex items-center font-mono rounded-none bg-orange-400 border-2 border-red-500  text-white">
          <GiFastBackwardButton
            onClick={() => handleBackpress()}
            className="text-[50px]  m-[10px] text-white"
          />
          <h2 className="text-2xl m-auto">On going Loan Details</h2>
        </div>

        <div id="lead-status-card" className={leadStatusClass}>
          <h2 className="text-xl font-semibold m-auto text-white font-mono w-fit">
            Status : {lead_current_data.lead_status}
          </h2>
        </div>
        <div className="w-fit h-fit rounded-xl m-2 bg-red-600 text-white font-mono text-[21px] p-2">
          <span className="text-xl font-semibold">
            EMPLOYEE LEAD TABLE ID : {lead_current_data.employee_lead_id_linker}
          </span>
        </div>
        <button
          onClick={HandleopenDeleteLeadDialog}
          class="m-[20px] rounded-md bg-rose-900 hover:bg-red-500 font-mono text-white font-bold py-2 px-4"
        >
          DELETE ONGOING LOAN
        </button>
        <button
          onClick={handleOpenLeadStatusDialog}
          class="m-[12px] rounded-md bg-cyan-600 hover:bg-yellow-500 text-white font-bold py-2 border-2 border-red-500 px-4"
        >
          CLOSE THIS LOAN
        </button>
        <OngoingEmiTable on_going_loan_id={lead_current_data._id} />
        <div className="flex">
          <div className="w-1/3 h-fit m-[10px] border-r pr-4 bg-blue-400 rounded-lg shadow-lg p-6 text-gray-700 text-[12px]">
            <h2 className="font-semibold text-[#ffffff] bg-blue-900 rounded-lg p-2 text-[15px]">
              {" "}
              Basic User Information
            </h2>
            <table className="w-full mt-4 bg-white rounded-md shadow-md text-sm  overflow-hidden">
              <tbody>
                <tr className=" font-bold">
                  <td className="p-2  w-40   border">Fields </td>
                  <td className="p-2  w-40  border ">Values</td>
                </tr>
                <tr className="">
                  <td className="p-2  w-40  font-semibold border">
                    First Name
                  </td>
                  <td className="p-2  w-40  border font-semibold">
                    {lead_current_data.firstName}
                  </td>
                </tr>
                <tr className="">
                  <td className="p-2 border w-40  font-semibold">Last Name</td>
                  <td className="p-2 border w-40 font-semibold">
                    {lead_current_data.lastName}
                  </td>
                </tr>
                <tr className="">
                  <td className="p-2 border w-40  font-semibold">Mobile</td>
                  <td className="p-2 border w-40   font-semibold">
                    {lead_current_data.mobileNumber}
                  </td>
                </tr>
                <tr className="">
                  <td className="p-2 border w-40  font-semibold">DOB</td>
                  <td className="p-2 border w-40 font-semibold">
                    {lead_current_data.dob}
                  </td>
                </tr>
                <tr className="">
                  <td className="p-2 border w-40  font-semibold">Gender</td>
                  <td className="p-2 border w-40 font-semibold">
                    {lead_current_data.gender === "2" ? "Female" : "Male"}
                  </td>
                </tr>
                <tr className="">
                  <td className="p-2 border w-40  font-semibold">Pincode</td>
                  <td className="p-2 border w-40 font-semibold">
                    {lead_current_data.pincode}
                  </td>
                </tr>
                <tr className="">
                  <td className="p-2 border w-40  font-semibold">
                    Current Address
                  </td>
                  <td className="p-2 border w-40 font-semibold">
                    {lead_current_data.currentAddress}
                  </td>
                </tr>
                <tr className="">
                  <td className="p-2 border w-40  font-semibold">
                    Relative Name
                  </td>
                  <td className="p-2 border w-40 font-semibold">
                    {lead_current_data.relativeName}
                  </td>
                </tr>
                <tr className="">
                  <td className="p-2 border w-40  font-semibold">
                    Relative Number
                  </td>
                  <td className="p-2 border w-40 font-semibold">
                    {lead_current_data.relativeNumber}
                  </td>
                </tr>
                <tr className="">
                  <td className="p-2 border w-40  font-semibold">State</td>
                  <td className="p-2 border w-40 font-semibold">
                    {lead_current_data.state}
                  </td>
                </tr>
                <tr className="">
                  <td className="p-2 border w-40  font-semibold">Salary</td>
                  <td className="p-2 border w-40 font-semibold ">
                    {lead_current_data.monthlySalary}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-3/3 h-fit m-[10px] border-r pr-4 bg-white rounded-lg shadow-lg p-6 text-gray-700 text-[10px] ">
            <h2 className="font-semibold text-[#ffffff] bg-green-900 rounded-lg p-2 text-[12px]">
              Loan Ongoing Amount Information
            </h2>
            <table className="w-full mt-4 bg-white rounded-md shadow-md overflow-hidden text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-semibold">Customer Loan Amount</td>
                  <td className="p-2 font-semibold">
                    ₹{lead_current_data.customerLoanAmount}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">
                    Employee Approved Amount
                  </td>
                  <td className="p-2 font-semibold">
                    ₹{lead_current_data.empApproveAmount}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">Lead Interest Amount</td>
                  <td className="p-2 font-semibold">
                    ₹{lead_current_data.lead_interest_rate}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">Processing Fees</td>
                  <td className="p-2 font-semibold">
                    ₹{lead_current_data.processingFees}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-semibold">Fees Amount</td>
                  <td className="p-2 font-semibold">
                    ₹{lead_current_data.feesAmount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-2/3 pl-4">
            <h2 className="font-semibold text-[18px] text-[#ffffff] bg-slate-800 rounded-lg p-6 m-[20px]">
              Ongoing Loan Documents
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
                <h2 className="text-xl font-semibold mb-4 text-gray-800 font-mono">
                  Update On going Loan Status
                </h2>
                <div className="mb-4">
                  <label className="block text-gray-500 font-bold mb-2">
                    On Going Loan ID
                  </label>
                  <input
                    name="leadId"
                    value={updateLeadForm.leadId}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="leadId"
                    type="text"
                  />
                  <label className="block text-gray-500 font-bold mb-2">
                    Status
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                    id="leadStatus"
                    value={leads_status}
                    onChange={(e) => setLeadsStatus(e.target.value)}
                  >
                    <option value="CLOSED">CLOSED</option>
                  </select>
                  <label className="block text-red-500 font-semibold mb-2">
                    Note (IN CLOSED STATUS) : You will be moving this LEAD to
                    LOAN-CLOSED-Table (Loan Master Section)
                  </label>
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

export default LoanOngoingDetail;
