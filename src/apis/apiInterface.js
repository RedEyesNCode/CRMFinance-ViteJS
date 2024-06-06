import apiService from "./apiService";

export const getAllLeads = async (data) => {
  try {
    const response = await apiService("get-all-leads", "POST",data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchLeads = async (search_data) => {

  try {
    const response = await apiService("search-lead", "POST",search_data);
    return response;
  } catch (error) {
    throw error;
  }


}


export const getAllUsers = async () => {
  try {
    const response = await apiService("get-all-users", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAllCollection = async () => {
  try {
    const response = await apiService("get-users-with-collection", "GET");
    return response;
  } catch (error) {
    throw error;
  }
};
export const getCollectionData = async (data) => {
  try {
    console.log(data);
    const response = await apiService("get-user-collection", "POST",data);
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
export const createVisit = async (formData) => {
  try {
    const response = await apiService(
      "create-visit",
      "POST",formData
    );
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


export const getAllRejectedLoans = async () => {
  try {
    const response = await apiService("get-all-rejected-loans", "GET", );
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteRejectedLoan = async (rejected_loan_id) => {
  try {
    const response = await apiService("delete-rejected-loan", "POST",rejected_loan_id );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getRejectedLoanDetail = async (rejected_loan_id) => {
  try {
    const response = await apiService("get-reject-detail", "POST",rejected_loan_id );
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
export const deleteUserCollection = async (data) => {
  try {
    console.log(data);
    const response = await apiService("delete-user-collection", "POST", data);
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

export const getOngoingLoanDetail = async (delete_disbursal_loan_id) => {
  try {
    const response = await apiService(
      "get-ongoing-loan-detail",
      "POST",
      delete_disbursal_loan_id
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getOngoingLoanEMIDetail = async (delete_disbursal_loan_id) => {
  try {
    const response = await apiService(
      "get-ongoing-emi-detail",
      "POST",
      delete_disbursal_loan_id
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getOngoingEmiAmountDetail = async (delete_disbursal_loan_id) => {
  try {
    const response = await apiService(
      "get-emi-amount-detail",
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

export const getRecycleBin = async () => {
  try {
    const response = await apiService(
      "get-recycle-bin",
      "GET",
      
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAllClosedLoans = async () => {
  try {
    const response = await apiService(
      "get-all-closed-loans",
      "GET",
      
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteClosedLoan = async (delete_loan_id) => {
  try {
    const response = await apiService(
      "delete-closed-loan",
      "POST",
      delete_loan_id
      
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getClosedLoanDetail = async (delete_loan_id) => {
  try {
    const response = await apiService(
      "get-closed-detail",
      "POST",
      delete_loan_id
      
    );
    return response;
  } catch (error) {
    throw error;
  }
};


export const closeOngoingLoan = async (delete_loan_id) => {
  try {
    const response = await apiService(
      "close-ongoing-loan",
      "POST",
      delete_loan_id
      
    );
    return response;
  } catch (error) {
    throw error;
  }
};
// export const createUserLead = async (formData) => {
//   try {
//     const response = await fetch("https://megmab2b.com:3000/create-lead", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }

// };
export const createUserLead = async (formData) => {
  try {
    const response = await apiService(
      "create-lead",
      "POST",formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const createCollection = async (formData) => {
  try {
    const response = await apiService(
      "create-user-collection",
      "POST",formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateUserLead = async (formData) => {
  try {
    const response = await apiService(
      "update-emp-lead",
      "POST",formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const uploadImage = async (formData) => {
  try {
    console.log(formData);
    const response = await apiService("upload-file", "POST", formData);
    return response;
  } catch (error) {
    throw error;
  }
};


// In apis/apiInterface.js
export const updateEmiStatus = async (data) => {
  try {
    const response = await fetch("https://localhost:3000/update-emi-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error("Error updating EMI status:", error);
    throw error;
  }
};

