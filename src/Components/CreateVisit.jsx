import React, { useEffect, useState } from "react";
import { createUserLead, getAllUsers, createVisit } from "../apis/apiInterface";
import { RotatingLines } from "react-loader-spinner";

const CreateVisit = ({ close }) => {
  const [AllUsers, setAllUsers] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    photo: "",
    latitude: null,
    longitude: null,
    customerNumber: "",
    remark: "",
    userId: "",
  });
  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === "userId") {
      // Convert the value to string to ensure compatibility
      const userId = e.target.value.toString();
      setFormData({
        ...formData,
        userId: userId,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    console.log(formData);
  };

  const handleImageUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFiles((prevFiles) => [...prevFiles, { fieldName, file }]);
  };

  const uploadImages = async (userId) => {
    const uploadedUrls = {};

    for (const { fieldName, file } of imageFiles) {
      const formData = new FormData();
      formData.append("user_id", userId);
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

    if (imageFiles.length != 1) {
      alert("Please upload all required images.");
      return;
    }

    setFormSubmitting(true); // Start loader
    setImageUploading(true);
    const uploadedUrls = await uploadImages(formData.userId);
    setImageUploading(false);

    const updatedFormData = {
      ...formData,
      ...uploadedUrls,
    };

    try {
      console.log(updatedFormData);
      const response = await createVisit(updatedFormData);
      console.log("Visit response -> ", response);
      // Reset form data or handle success state here
    } catch (error) {
      console.error("Error creating visit", error);
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
    <div className="absolute w-full h-full top-0 left-0 backdrop-blur-2xl overflow-y-scroll rounded-2xl">
      <form
        className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Visit Form</h2>

        <div className="flex flex-col items-center gap-5">
          <input
            className="px-5 py-2 rounded-md border outline-none"
            onChange={handleChange}
            value={formData.customerName}
            type="text"
            name="customerName"
            placeholder="Enter customerName"
          />
          <input
            className="px-5 py-2 rounded-md border outline-none"
            onChange={handleChange}
            value={formData.address}
            type="text"
            name="address"
            placeholder="Enter address"
          />
          <input
            className="px-5 py-2 rounded-md border outline-none"
            onChange={handleChange}
            value={formData.latitude}
            type="text"
            name="latitude"
            placeholder="Enter latitude"
          />
          <input
            className="px-5 py-2 rounded-md border outline-none"
            onChange={handleChange}
            value={formData.longitude}
            type="text"
            name="longitude"
            placeholder="Enter longitude"
          />
          <input
            className="px-5 py-2 rounded-md border outline-none"
            onChange={handleChange}
            value={formData.customerNumber}
            type="text"
            name="customerNumber"
            placeholder="Enter customerNumber"
          />
          <input
            className="px-5 py-2 rounded-md border outline-none"
            onChange={handleChange}
            value={formData.remark}
            type="text"
            name="remark"
            placeholder="Enter remark"
          />
          <select
            className="w-56 px-5 py-2 rounded-md border outline-none"
            onChange={handleChange}
            value={formData.userId}
            name="userId"
            required={true}
          >
            <option value="">Select User</option> {/* Empty option */}
            {AllUsers &&
              AllUsers.data.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullName}
                </option>
              ))}
          </select>

          <div className="flex flex-col justify-between items-center gap-2">
            <label htmlFor="aadhar_front" className="text-gray-600">
              Upload Aadhar Front
            </label>
            <input
              className="px-3 py-2 rounded-md border outline-none"
              type="file"
              name="aadhar_front"
              onChange={(e) => handleImageUpload(e, "aadhar_front")}
            />
          </div>
          <input
            type="submit"
            disabled={imageUploading}
            className="bg-blue-500 text-white font-bold rounded-md px-5 py-2 mt-4"
          />
        </div>
      </form>
      {formSubmitting && (
        <div className="flex justify-center items-center h-full w-full backdrop-blur-xl absolute top-0 left-0">
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

export default CreateVisit;
