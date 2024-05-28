import React, { useEffect, useState } from "react";
import { createUserLead, getAllUsers } from "../../apis/apiInterface";
import { RotatingLines } from "react-loader-spinner";

const CreateNewLead = ({ close }) => {
  const [AllUsers, setAllUsers] = useState(null);
  const [formData, setFormData] = useState({
    userId: "",
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
  const [formSubmitting, setFormSubmitting] = useState(false); // New state for loader
  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFiles((prevFiles) => [...prevFiles, { fieldName, file }]);
  };

  const uploadImages = async () => {
    const uploadedUrls = {};

    for (const { fieldName, file } of imageFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("https://megmab2b.com:3000/upload-file", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        uploadedUrls[fieldName] = data.message;
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length != 5) {
      alert("Please upload all required images.");
      return;
    }

    setFormSubmitting(true); // Start loader
    setImageUploading(true);
    const uploadedUrls = await uploadImages();
    setImageUploading(false);

    const updatedFormData = {
      ...formData,
      ...uploadedUrls,
    };

    try {
      console.log(updatedFormData);
      const response = await createUserLead(updatedFormData);
      console.log("User Lead response -> ", response);
      // Reset form data or handle success state here
    } catch (error) {
      console.error("Error creating user lead", error);
    }

    setFormSubmitting(false); // Stop loader
    close();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllUsers();
        if (response.code === 200) {
          setAllUsers(response);
        } else {
          setAllUsers(null);
        }
        console.log("Users Fetched response -> ", response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

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
            <select
              className="w-56 px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.userId}
              name="userId"
              required={true}
            >
              <option value="">Select User</option>
              {AllUsers &&
                AllUsers.data.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName}
                  </option>
                ))}
            </select>
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
            <div className="flex justify-between items-center gap-2">
            <label htmlFor="aadhar_front" className="text-gray-600">
              Upload Aadhar Front
            </label>
            <input
              className="px-3 py-2 rounded-md border outline-none"
              type="file"
              name="aadhar_front"
              onChange={(e) => handleImageUpload(e, "aadhar_front")}
            />
            <label htmlFor="aadhar_back" className="text-gray-600">
              Upload Aadhar Back
            </label>
            <input
              className="px-3 py-2 rounded-md border outline-none"
              type="file"
              name="aadhar_back"
              onChange={(e) => handleImageUpload(e, "aadhar_back")}
            />
          </div>
          <div className="flex justify-between items-center gap-2">
            <label htmlFor="pancard_img" className="text-gray-600">
              Upload PAN Image
            </label>
            <input
              className="px-4 py-2 rounded-md border outline-none w-72"
              type="file"
              name="pancard_img"
              onChange={(e) => handleImageUpload(e, "pancard_img")}
            />
            <label htmlFor="pancard_img" className="text-gray-600">
              Upload Selfie
            </label>
            <input
              className="px-5 py-2 rounded-md border outline-none"
              type="file"
              name="selfie"
              onChange={(e) => handleImageUpload(e, "selfie")}
            />
          </div>
          <div className="flex  items-center gap-2">
            <label htmlFor="pancard_img" className="text-gray-600">
              Upload Additional Document
            </label>
            <input
              className="px-5 py-2 rounded-md border outline-none"
              type="file"
              name="additional_document"
              onChange={(e) => handleImageUpload(e, "additional_document")}
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
      {formSubmitting && (
        <div className="flex justify-center items-center h-[120vh] w-full backdrop-blur-xl absolute top-0 left-0">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
};

export default CreateNewLead;
