import React, { useState } from "react";
import { createUserLead } from "../../apis/apiInterface";

const CreateNewLead = () => {
  const [formData, setFormData] = useState({
    userId: "664efd939f722439984134de",
    firstName: "",
    lastName: "",
    middleName: "",
    mobileNumber: "",
    dob: "",
    gender: "",
    pincode: "",
    gs_loan_number: "",
    gs_loan_password: "",
    gs_loan_userid: "",
    userType: "",
    monthlySalary: "",
    relativeName: "",
    relativeNumber: "",
    currentAddress: "",
    state: "",
    aadhar_front: "",
    aadhar_back: "",
    pancard: "",
    pancard_img: "",
    aadhar_card: "",
    selfie: "",
    additional_document: "",
    cibil_pdf: "",
    leadAmount: "",
    lead_interest_rate: "",
    processingFees: "",
    feesAmount: "",
    customerLoanAmount: "",
    empApproveAmount: "",
    lead_status: "PENDING",
    dateOfBirth: "",
    disbursementDate: "",
  });

  const [imageUploading, setImageUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    setImageUploading(true);

    try {
      const formData = new FormData();
      formData.append("user_id", "664efd939f722439984134de");
      formData.append("file", file);

      const response = await fetch("http://192.168.1.6:3000/upload-file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.alert(fieldName + " uploaded successfully");
      const data = await response.json();
      console.log("Upload successful:", data);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: data.message,
      }));
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setImageUploading(false);
      console.log("Current form data", formData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }


    // if (!formData.aadhar_front || !formData.pancard_img) {
    //   alert("Please upload all required images.");
    //   return;
    // }
    // try {
    //   const response = await createUserLead(formData);
    //   console.log("User Lead response -> ", response);
    //   // Reset form data or handle success state here
    // } catch (error) {
    //   console.error("Error creating user lead", error);
    // }
  };

  return (
    <div className="absolute w-full h-full top-0 backdrop-blur-2xl overflow-y-scroll rounded-2xl">
      <form
        className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">User Lead Form</h2>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex justify-between">
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.firstName}
              type="text"
              name="firstName"
              placeholder="Enter first name"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.middleName}
              type="text"
              name="middleName"
              placeholder="Enter middle name"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.lastName}
              type="text"
              name="lastName"
              placeholder="Enter last name"
            />
          </div>
          <div className="flex justify-between">
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.mobileNumber}
              type="text"
              name="mobileNumber"
              placeholder="Enter mobile number"
            />
            <input
              className="px-10 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.dob}
              type="date"
              name="dob"
              placeholder="Enter date of birth"
            />
            <select
              className="px-[51px] py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.gender}
              name="gender"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex justify-between">
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.gs_loan_number}
              type="text"
              name="gs_loan_number"
              placeholder="Enter GS loan number"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.gs_loan_password}
              type="text"
              name="gs_loan_password"
              placeholder="Enter GS loan password"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.gs_loan_userid}
              type="text"
              name="gs_loan_userid"
              placeholder="Enter GS loan user ID"
            />
          </div>
          <div className="flex justify-between">
            <input
              className="px-5 py-2 rounded-md border outline-none"
              // onChange={handleChange}
              value={formData.userId}
              // type="text"
              name="userId"
              placeholder="Enter user ID"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.userType}
              type="text"
              name="userType"
              placeholder="Enter user type"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.monthlySalary}
              type="text"
              name="monthlySalary"
              placeholder="Enter monthly salary"
            />
          </div>

          <div className="flex justify-between">
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.currentAddress}
              type="text"
              name="currentAddress"
              placeholder="Enter current address"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.pincode}
              type="text"
              name="pincode"
              placeholder="Enter pincode"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.state}
              type="text"
              name="state"
              placeholder="Enter state"
            />
          </div>
          <div className="flex gap-6">
            <input
              className="px-5 py-2 rounded-md border outline-none "
              onChange={handleChange}
              value={formData.relativeName}
              type="text"
              name="relativeName"
              placeholder="Enter relative name"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.relativeNumber}
              type="text"
              name="relativeNumber"
              placeholder="Enter relative number"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="aadhar_front" className="text-gray-600">
              Upload Aadhar Front
            </label>
            <input
              className="px-5 py-2 rounded-md border outline-none"
              type="file"
              name="aadhar_front"
              // onChange={handleImageUpload}
              onChange={(e) => handleImageUpload(e, "aadhar_front")}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="aadhar_back" className="text-gray-600">
              Upload Aadhar Back
            </label>
            <input
              className="px-5 py-2 rounded-md border outline-none"
              type="file"
              name="aadhar_back"
              onChange={(e) => handleImageUpload(e, "aadhar_back")}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="pancard_img" className="text-gray-600">
              Upload PAN Card Image
            </label>
            <input
              className="px-5 py-2 rounded-md border outline-none"
              type="file"
              name="pancard_img"
              onChange={(e) => handleImageUpload(e, "pancard_img")}
            />
          </div>
          {/* Add more file upload fields as needed */}
          <input
            type="submit"
            className="bg-blue-500 text-white font-bold w-full rounded-md px-5 py-2 mt-4"
            disabled={imageUploading}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateNewLead;
