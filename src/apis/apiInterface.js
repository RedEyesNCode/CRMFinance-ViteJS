import apiService from "./apiService";

export const getAllLeads = async () => {
  try {
    const response = await apiService("get-all-leads", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAllUsers = async () => {
  try {
    const response = await apiService("get-all-users", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};
export const createUser = async (formData) => {
  try {
    const response = await apiService("create-user", "POST", formData);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAllVisits = async () => {
  try {
    const response = await apiService("get-all-visits", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAllAttendance = async () => {
  try {
    const response = await apiService("get-all-attendance", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUserLeads = async (user_lead_data) => {
  try {
    const response = await apiService("get-user-leads", "POST", user_lead_data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUserAttendance = async (user_attendance_data) => {
  try {
    const response = await apiService(
      "get-user-attendance",
      "POST",
      user_attendance_data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getUserVisits = async (user_attendance_data) => {
  try {
    const response = await apiService(
      "get-user-visit",
      "POST",
      user_attendance_data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteLead = async (lead_delete_data) => {
  try {
    const response = await apiService("delete-lead", "POST", lead_delete_data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteVisit = async (lead_delete_data) => {
  try {
    const response = await apiService("delete-visit", "POST", lead_delete_data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (lead_delete_data) => {
  try {
    const response = await apiService("delete-user", "POST", lead_delete_data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteAttendance = async (lead_delete_data) => {
  try {
    const response = await apiService(
      "delete-attendance",
      "POST",
      lead_delete_data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getLeadDetails = async (lead_id) => {
  try {
    const response = await apiService("get-lead-details", "POST", lead_id);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getApprovalLoans = async () => {
  try {
    const response = await apiService("get-all-approval-loans", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOnGoingLoans = async () => {
  try {
    const response = await apiService("get-all-ongoing-loans", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDisburseLoans = async () => {
  try {
    const response = await apiService("get-all-disburse-loans", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteDisburseLoan = async (delete_disbursal_loan_id) => {
  try {
    const response = await apiService(
      "delete-disbursal-loan",
      "POST",
      delete_disbursal_loan_id
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDisburseLoanDetail = async (delete_disbursal_loan_id) => {
  try {
    const response = await apiService(
      "get-disbursal-loan-detail",
      "POST",
      delete_disbursal_loan_id
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteApprovalLoan = async (delete_approval_id) => {
  try {
    const response = await apiService(
      "delete-approval-loan",
      "POST",
      delete_approval_id
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteOnGoingLoan = async (delete_approval_id) => {
  try {
    const response = await apiService(
      "delete-ongoing-loan",
      "POST",
      delete_approval_id
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateLoanApprovalStatus = async (update_approval_loan_status) => {
  try {
    const response = await apiService(
      "update-approval-loan-status",
      "POST",
      update_approval_loan_status
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateLoanDisbursalStatus = async (
  update_approval_loan_status
) => {
  try {
    const response = await apiService(
      "update-disbursal-loan-status",
      "POST",
      update_approval_loan_status
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getApprovalLoanDetails = async (update_approval_loan_status) => {
  try {
    const response = await apiService(
      "get-approval-loan-detail",
      "POST",
      update_approval_loan_status
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateLeadStatus = async (update_lead_data) => {
  try {
    const response = await apiService(
      "update-lead-status",
      "POST",
      update_lead_data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const createUserLead = async (formData) => {
  try {
    console.log(formData);
    const response = await fetch("http://192.168.1.6:3000/create-lead", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Upload successful:", data);

  } catch (error) {
    throw error;
  }
};
// export const createUserLead = async (formData) => {
//   try {
//     console.log("obj",JSON.stringify(formData) );
//     const response = await apiService("create-lead", "POST",{body:formData});
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };
export const uploadImage = async (Userwithimage) => {
  try {
    console.log(Userwithimage.file);
    const response = await apiService("upload-file", "POST", Userwithimage);
    return response;
  } catch (error) {
    throw error;
  }
};