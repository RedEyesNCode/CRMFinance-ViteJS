import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { getAllUsers, updateUserLead } from "../apis/apiInterface";

const UpdateLead = ({ close, currentData }) => {
  const [formData, setFormData] = useState(currentData ? currentData : {});
  const [AllUsers, setAllUsers] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [UserName, setUserName] = useState(null);

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
    setFormSubmitting(true); // Start loader
    setImageUploading(true);
    const uploadedUrls = await uploadImages();
    setImageUploading(false);

    const updatedFormData = {
      ...formData,
      ...uploadedUrls,
      leadId: formData._id,
    };

    try {
      const response = await updateUserLead(updatedFormData);
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

  useEffect(() => {
    if (AllUsers && formData.user) {
      const user = AllUsers.data.find((user) => user._id === formData.user);
      setUserName(user ? user.fullName : "");
      console.log(UserName);
    }
  }, [AllUsers, formData.user]);

  return (
    <div className="absolute w-full h-full top-0 backdrop-blur-2xl overflow-y-scroll rounded-2xl z-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6">Update Lead Form</h2>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex justify-between">
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.firstName}
              type="text"
              name="firstName"
              required={true}
              placeholder="Enter first name"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.middleName}
              type="text"
              name="middleName"
              required={true}
              placeholder="Enter middle name"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.lastName}
              type="text"
              name="lastName"
              required={true}
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
              required={true}
              placeholder="Enter mobile number"
            />
            <input
              className="px-10 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.dob}
              type="date"
              name="dob"
              required={true}
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
              required={true}
              placeholder="Enter GS loan number"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.gs_loan_password}
              type="text"
              name="gs_loan_password"
              required={true}
              placeholder="Enter GS loan password"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.gs_loan_userid}
              type="text"
              name="gs_loan_userid"
              required={true}
              placeholder="Enter GS loan user ID"
            />
          </div>
          <div className="flex justify-between">
            <input
              className="w-56 px-5 py-2 rounded-md border outline-none"
              type="text"
              value={UserName}
              readOnly
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.userType}
              type="text"
              name="userType"
              required={true}
              placeholder="Enter user type"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.monthlySalary}
              type="text"
              name="monthlySalary"
              required={true}
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
              required={true}
              placeholder="Enter current address"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.pincode}
              type="text"
              name="pincode"
              required={true}
              placeholder="Enter pincode"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.state}
              type="text"
              name="state"
              required={true}
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
              required={true}
              placeholder="Enter relative name"
            />
            <input
              className="px-5 py-2 rounded-md border outline-none"
              onChange={handleChange}
              value={formData.relativeNumber}
              type="text"
              name="relativeNumber"
              required={true}
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
      {/* Loader */}
      {formSubmitting && (
        <div className="flex justify-center items-center h-[120vh] w-full backdrop-blur-xl absolute top-0 left-0">
          <RotatingLines
            visible={true}
            height={96}
            width={96}
            color="grey"
            strokeWidth={5}
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

export default UpdateLead;
