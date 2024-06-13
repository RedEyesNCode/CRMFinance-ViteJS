import React, { useState, useEffect, useRef, useMemo } from "react";
import { FaBeer } from "react-icons/fa";
import { GiFastBackwardButton } from "react-icons/gi";
import {
  deleteLead,
  getLeadDetails,
  updateLeadStatus,
  uploadImage,
} from "../../apis/apiInterface";
import UpdateLead from "../UpdateLead";
import { ToastContainer, toast } from "react-toastify";

function LeadDetailsComponent({ lead_data, handleCloseCallback }) {
  const [isUpdateLead, setIsUpdateLead] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [activeTab, setActiveTab] = useState("approveLoans"); // Default active tab
  const [activeTabDocs, setActiveTabDocs] = useState("pancard"); // Default active tab

  const [leads_status, setLeadsStatus] = useState(lead_data.lead_status);

  const [lead_current_data, setLeadCurrentData] = useState(lead_data);

  const [openLeadStatusDialog, setLeadStatusDialog] = useState(false);

  const [openDeleteLeadDialog, setDeleteLeadDialog] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null); //Rishi

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
        console.log("by me -> " , leadDetailsResponse);
      } else {
        setLeadCurrentData(lead_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callLeadDetailsAPI();
  }, [openLeadStatusDialog, isUpdateLead]);

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
      console.log(responseJson);
      if (responseJson.code === 200) {
        toast.success(responseJson.message);
        setLeadStatusDialog(false);
      } else {
        setLeadCurrentData(lead_data);
        toast.info(responseJson.message);
        toast.info('Your Lead Amount was updated !')


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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // if (file && file.type !== "application/pdf") {
    //   alert("Please upload file in PDF format only");
    //   event.target.value = ""; // Clear the input value
    //   setSelectedFile(null);
    //   return;
    // }
    setSelectedFile(file);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    // formData.append("leadId", lead_current_data._id);
    formData.forEach((e) => console.log(e));

    try {
      const response = await fetch("https://megmab2b.com:3000/upload-file", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const sendingURL = await fetch(
        "https://megmab2b.com:3000/upload-lead-pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leadId: lead_current_data._id,
            leadCibilUrl: data.message,
          }),
        }
      );
      if (!sendingURL.ok) {
        throw new Error("Network response was not ok");
      }
      const sendingURLResult = await sendingURL.json();
      toast.success(sendingURLResult.message);
      setSelectedFile(null);
    } catch (error) {
      console.error("PDF upload failed", error);
      alert("File upload failed");
    }
  };

  return (
    <main>
      <ToastContainer />
      <div className="relative ">
        <div className="flex items-center font-semibold  bg-blue-600 text-white rounded-none">
          <GiFastBackwardButton
            onClick={() => handleBackpress()}
            className="text-[50px]  m-[10px] text-white "
          />
          <h2 className="text-2xl m-auto">Customer Profile Information </h2>
        </div>

        <div id="lead-status-card" className={`${leadStatusClass} text-white`}>
          <span className="text-xl font-semibold">
            Lead Status : {lead_current_data.lead_status}
          </span>
        </div>
        <button
          onClick={handleOpen}
          class="m-[20px] rounded-md bg-blue-500 hover:bg-purple-900 text-white font-bold py-2 px-4"
        >
          Update Lead Status
        </button>

        <button
          onClick={HandleopenDeleteLeadDialog}
          class="m-[20px] rounded-md bg-rose-900 hover:bg-red-500 text-white font-bold py-2 px-4"
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
          className="m-[20px] rounded-md bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4"
        >
          UPDATE LEAD
        </button>

        <div className="flex">
          <div className="w-1/3 m-[5px] border-r pr-4 rounded-lg shadow-lg p-6 text-gray-700 text-[12px] bg-blue-500">
            <h2 className="font-semibold text-[#ffffff] bg-blue-900 rounded-lg p-2 text-[15px]">
              Basic User Information
            </h2>
            <table className="w-full mt-4 bg-white rounded-md shadow-md text-sm  overflow-hidden">
              <tbody>
                <tr className=" font-bold">
                  <td className="p-2  w-40   border">Fields </td>
                  <td className="p-2  w-40  border ">Values</td>
                </tr>
                <tr className="bg-indigo-300 text-black">
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
                <tr className="bg-indigo-300 text-black">
                  <td className="p-2 border w-40  font-semibold">Mobile</td>
                  <td className="p-2 border w-40   font-semibold">
                    {lead_current_data.mobileNumber}
                  </td>
                </tr>
                <tr className="bg-indigo-300 text-black">
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
                <tr className="bg-indigo-300 text-black">
                  <td className="p-2 border w-40  font-semibold">Pincode</td>
                  <td className="p-2 border w-40 font-semibold">
                    {lead_current_data.pincode}
                  </td>
                </tr>
                <tr className="bg-indigo-300 text-black">
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
                <tr className="bg-indigo-300 text-black">
                  <td className="p-2 border w-40  font-semibold">Pan Card</td>
                  <td className="p-2 border w-40 font-semibold">
                    {lead_current_data.pancard}
                  </td>
                </tr>

                <tr className="bg-indigo-300 text-black">
                  <td className="p-2 border w-40  font-semibold">
                    Aadhar Card
                  </td>
                  <td className="p-2 border w-40 font-semibold">
                    {lead_current_data.aadhar_card}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-[20%] m-[5px] border-r pr-4 bg-gray-200 rounded-lg shadow-lg p-6 text-gray-700 text-[12px] ">
            <h2 className="font-semibold text-[#ffffff] bg-green-700 rounded-lg p-2 text-[15px]">
              Lead Amount Information
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
                <tr className="border-b bg-indigo-300 text-black font-mono">
                  <td className="p-2 font-semibold">Lead Amount</td>
                  <td className="p-2 font-semibold">
                    ₹{lead_current_data.leadAmount}
                  </td>
                </tr>
              </tbody>
            </table>
            <h2 className="font-semibold text-[#ffffff] bg-amber-700 mt-2 rounded-lg p-2 text-[15px]">
              Employee Information
            </h2>
            <table className="w-full mt-4 bg-white rounded-md shadow-md text-sm  overflow-hidden">
              <tbody>
                <tr className=" font-bold">
                  <td className="p-2  w-40   border">Fields </td>
                  <td className="p-2  w-40  border ">Values</td>
                </tr>
                <tr className=" font-bold">
                  <td className="p-2  w-40   border">Name </td>
                  <td className="p-2  w-40  border ">
                    {lead_data.user.fullName}
                  </td>
                </tr>
                <tr className=" font-bold">
                  <td className="p-2  w-40   border">Telephone Number </td>
                  <td className="p-2  w-40  border ">
                    {lead_data.user.telephoneNumber}
                  </td>
                </tr>
                <tr className=" font-bold">
                  <td className="p-2  w-40   border">Employee Id</td>
                  <td className="p-2  w-40  border ">
                    {lead_data.user.employeeId}
                  </td>
                </tr>
                <tr className=" font-bold">
                  <td className="p-2  w-40   border">Mpass</td>
                  <td className="p-2  w-40  border ">{lead_data.user.mpass}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-2/3 pl-2">
            <h2 className="font-semibold text-[18px] text-[#ffffff] bg-purple-500 rounded-lg p-6 m-[10px]">
              Leads-KYC Documents
            </h2>

            <div className="flex space-x-4 mb-4 ml-[20px]">
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
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTabDocs === "additional"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-400"
                }`}
                onClick={() => setActiveTabDocs("additional")}
              >
                Additional Document
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  activeTabDocs === "upload_pdf"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-400"
                }`}
                onClick={() => setActiveTabDocs("upload_pdf")}
              >
                Upload Cibil Pdf
              </button>
              {/* Add more buttons for 'ENACH' and 'UPDATE KYC' */}
            </div>

            {/* Tab Content */}
            <div className="m-[5px] ml-[10px]">
              {activeTabDocs === "pancard" && (
                <div className="p-4 bg-white  shadow-md m-[10px] border-[2px] rounded-3xl border-green-500">
                  <h2 className="text-xl font-semibold mb-2 text-gray-400 text-[20px]">
                    Pancard Document
                  </h2>
                  <img
                    onClick={() =>
                      window.open(lead_current_data.pancard_img, "_blank")
                    }
                    className="h-[450px] w-full rounded-2xl object-fit"
                    src={lead_data.pancard_img}
                  />
                </div>
              )}
              {activeTabDocs === "additional" && (
                <div className="p-4 bg-white  shadow-md m-[10px] border-[2px] rounded-3xl border-amber-500">
                  <h2 className="text-xl font-semibold mb-2 text-gray-400 text-[20px]">
                    Additional Document
                  </h2>
                  <img
                    onClick={() =>
                      window.open(
                        lead_current_data.additional_document,
                        "_blank"
                      )
                    }
                    className="h-[450px] w-full rounded-2xl object-cover"
                    src={lead_data.additional_document}
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
                    className="h-[450px] w-full rounded-2xl object-cover"
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
                    className="h-[450px] w-full rounded-2xl object-cover"
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
                    className="h-[450px] w-full rounded-2xl object-cover"
                    src={lead_data.aadhar_back}
                  />
                </div>
              )}
              {activeTabDocs === "upload_pdf" && (
                <div className="p-4 bg-white shadow-md border-[2px] rounded-3xl border-green-500">
                  <h2 className="text-xl font-semibold mb-2 text-gray-400">
                    Upload Cibil Pdf here:
                  </h2>
                  <input
                    type="file"
                    // accept="application/pdf"
                    className="mt-5"
                    onChange={handleFileChange}
                  />
                  <button
                    onClick={handleUploadClick}
                    className="mt-5 px-4 py-2 bg-green-500 text-white rounded"
                    disabled={!selectedFile}
                  >
                    Upload
                  </button>
                  {lead_current_data.cibil_pdf.length !== 0 && (
                    <img
                      onClick={() =>
                        window.open(lead_current_data.cibil_pdf, "_blank")
                      }
                      className="h-[100px] w-[100px] rounded-2xl object-cover cursor-pointer" // Added cursor-pointer
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png"
                      alt="CIBIL PDF"
                    />
                  )}
                </div>
              )}
              {/* Add content for 'ENACH' and 'UPDATE KYC' tabs */}
            </div>
          </div>
        </div>
      </div>
      <div className="Loan Detail Component ">
        <h2 className="font-semibold text-[18px] text-[#ffffff] bg-blue-500 rounded-lg p-6 m-[20px]">
          Loan Details
        </h2>
        <div className="flex space-x-4 mb-4 ml-[20px]">
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
              activeTab === "ongoing" ? "bg-blue-500 text-white" : "bg-gray-400"
            }`}
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "closed" ? "bg-blue-500 text-white" : "bg-gray-400"
            }`}
            onClick={() => setActiveTab("closed")}
          >
            Closed
          </button>
          {/* Add more buttons for 'ENACH' and 'UPDATE KYC' */}
        </div>
        <div className="ml-[20px]">
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
              <h2 className="text-xl font-semibold mb-2">User Closed loans</h2>
            </div>
          )}
          {/* Add content for 'ENACH' and 'UPDATE KYC' tabs */}
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
                    <option value="PENDING">PENDING</option>

                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
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
          <UpdateLead
            currentData={currentData}
            close={() => setIsUpdateLead(false)}
          />
        </>
      )}
    </main>
  );
}

export default LeadDetailsComponent;
