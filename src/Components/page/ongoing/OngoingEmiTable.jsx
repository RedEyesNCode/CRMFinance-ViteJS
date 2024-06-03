import React, { useState, useEffect, useRef, useMemo } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  getOngoingEmiAmountDetail,
  getOngoingLoanEMIDetail,
  updateEmiStatus, // Add your update API here
} from "../../../apis/apiInterface";
import { ToastContainer, toast } from "react-toastify";

const OngoingEmiTable = ({ on_going_loan_id }) => {
  const [ongoingEmiDetail, setonGoingEmiDetail] = useState(null);
  const [IsChangeStatusOpen, setIsChangeStatusOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("pending");
  const [paidAmt, setpaidAmt] = useState(0)
  const [unpaidAmt, setunpaidAmt] = useState(0)

  const callOngoingEmiDetail = async () => {
    try {
      const rawJson = {
        ongoing_loan_id: on_going_loan_id,
      };
      const response = await getOngoingLoanEMIDetail(rawJson);
      if (response.code == 200) {
        console.log(response);
        callOngoingEmiAmountDetail(response.data[0]._id);

        setonGoingEmiDetail(response.data[0]);
      } else {
        setonGoingEmiDetail(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const callOngoingEmiAmountDetail = async (emi_payment_id) => {
    try {
      const rawJson = {
        emi_payment_id: emi_payment_id,
      };
      const response = await getOngoingEmiAmountDetail(rawJson);
      if (response.code == 200) {
        setpaidAmt(response.totalPaid)
        setunpaidAmt(response.totalUnpaid)
        console.log(response);
        toast.message(
          "Total Unpaid " +
            response.totalPaid +
            "\n Total Paid " +
            response.totalUnpaid
        );
      } else {
        window.alert("Failed to get EMI Amount Details");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callOngoingEmiDetail();
  }, []);

  const ChangeStatusofpaid = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setIsChangeStatusOpen(true);
  };

  const handleUpdateStatus = async () => {
    try {
      const rawJson = {
        emi_id: ongoingEmiDetail._id,
        payment_id: selectedPaymentId,
        paymentStatus: selectedPaymentStatus,
      };
      const response = await updateEmiStatus(rawJson);
      if (response.code == 200) {
        toast.success("EMI status updated successfully!");
        setIsChangeStatusOpen(false);
        callOngoingEmiDetail(); // Refresh EMI details
      } else {
        toast.error("Failed to update EMI status");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating EMI status");
    }
  };

  return (
    ongoingEmiDetail != null && (
      <div className="bg-white  rounded-lg shadow-md w-full h-[550px] border-4 border-indigo-600 p-4 overflow-y-scroll mx-[20]">
        <ToastContainer />
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-3 px-10 h-16">
          <h2 className="text-xl bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
            ON-GOING EMI DETAILS
          </h2>
          <button className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
            Print Emi Statement
          </button>
        </div>
        <div className="flex flex-row justify-evenly">
          <h2
            onClick={(e) => callOngoingEmiAmountDetail(ongoingEmiDetail._id)}
            className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none"
          >
            {" "}
            Loan Amount : ₹ {Math.round(ongoingEmiDetail.totalLoanAmount)}
          </h2>
          <h2 className="text-sm bg-cyan-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
            {" "}
            Disbursed Amount : ₹ {Math.round(ongoingEmiDetail.totalLoanAmount)}
          </h2>
          <h2 className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
            {" "}
            Total Interest : ₹ {Math.round(ongoingEmiDetail.totalInterest)}
          </h2>
          <h2 className="text-sm bg-cyan-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
            {" "}
            Monthly Interest : ₹ {Math.round(ongoingEmiDetail.monthlyInterest)}
          </h2>
          <h2 className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
            {" "}
            Loan Tenure : ₹ {Math.round(ongoingEmiDetail.loanTenureMonths)}
          </h2>

          <h2 className="text-sm bg-cyan-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
            {" "}
            Amount Paid : ₹ {paidAmt}
          </h2>
          <h2 className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
            {" "}
            Amount UnPaid : ₹ {unpaidAmt}
          </h2>
        </div>

        <div className="flex flex-col">
          <div className="">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className=" shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-zinc-600 ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border"
                      >
                        S.No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        EMI ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Due Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Installment Amt
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {ongoingEmiDetail.payments.map((emi, index) => (
                      <tr
                        key={emi._id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border relative">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {emi._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {emi.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {emi.amountDue}₹
                        </td>

                        <td
                          className={`uppercase px-6 py-4 whitespace-nowrap text-sm font-medium text-white ${
                            emi.paymentStatus === "paid"
                              ? "bg-green-500 "
                              : "bg-yellow-500"
                          }`}
                        >
                          {emi.paymentStatus}
                        </td>
                        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-800 w-40 flex items-center justify-center">
                          <button
                            onClick={() => ChangeStatusofpaid(emi._id)}
                            className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none"
                          >
                            Pay Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {IsChangeStatusOpen && (
          <div className="absolute h-full w-full flex items-center justify-center -top-28 left-0 backdrop-blur-lg">
            <div className="h-[300px] w-[400px] bg-white border-2 border-green-600 rounded-xl gap-10 flex items-center justify-center flex-col">
              <h1 className="text-center bg-blue-400 px-4 py-3 text-white rounded-lg">
                UPDATE STATUS
              </h1>
              <select
                className="border rounded-lg bg-zinc-500 px-4 py-3 text-white outline-none"
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              >
                <option value="pending" className="uppercase">
                  pending
                </option>
                <option value="paid" className="uppercase">
                  paid
                </option>
                <option value="overdue" className="uppercase">
                  overdue
                </option>
              </select>
              <button
                onClick={handleUpdateStatus}
                className="px-11 h-10 bg-indigo-600 text-white rounded-md"
              >
                UPDATE
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default OngoingEmiTable;
