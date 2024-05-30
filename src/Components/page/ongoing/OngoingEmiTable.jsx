import React, { useState, useEffect, useRef, useMemo } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getOngoingEmiAmountDetail, getOngoingLoanEMIDetail } from "../../../apis/apiInterface";
import { ToastContainer, toast } from "react-toastify";

const OngoingEmiTable = ({ on_going_loan_id }) => {
    const [ongoingEmiDetail,setonGoingEmiDetail] = useState(null);

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
            console.log(response);
            toast.error('Total Unpaid '+response.totalPaid+'\n Total Paid '+response.totalUnpaid)
          } else {
            window.alert('Failed to get EMI Amount Details');

          }
        } catch (error) {
          console.log(error);
        }
      };



      useEffect(() => {
        callOngoingEmiDetail();
      }, []);

  return (
    (ongoingEmiDetail!=null && (
        <div className="bg-white rounded-lg shadow-md w-full h-[550px] border-4 border-indigo-600 p-4 overflow-y-scroll mx-[20]">
            <ToastContainer/>
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-3 px-10 h-16">
        <h2 className="text-xl bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">ON-GOING EMI DETAILS</h2>
        <button className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
          Print Emi Statement
        </button>
      </div>
      <div className="flex flex-row justify-evenly">
        <h2 
        onClick={(e) => callOngoingEmiAmountDetail(ongoingEmiDetail._id)}
        className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none"> Loan Amount : ₹ {Math.round(ongoingEmiDetail.totalLoanAmount)}</h2>
        <h2 className="text-sm bg-cyan-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none"> Disbursed Amount : ₹ {Math.round(ongoingEmiDetail.totalLoanAmount)}</h2>
        <h2 className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none"> Total Interest : ₹ {Math.round(ongoingEmiDetail.totalInterest)}</h2>
        <h2 className="text-sm bg-cyan-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none"> Monthly Interest : ₹ {Math.round(ongoingEmiDetail.monthlyInterest)}</h2>
        <h2 className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none"> Loan Tenure : ₹ {Math.round(ongoingEmiDetail.loanTenureMonths)}</h2>

        <h2 className="text-sm bg-cyan-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none"> Amount Paid : ₹ Un-defined</h2>
        <h2 className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none"> Amount UnPaid : ₹ Un-defined</h2>

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
                    <tr key={emi.emiId} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border relative">
                        {index + 1}
                        {/* <IoIosAddCircleOutline className="text-green-500 text-3xl border-2 border-green-500 rounded-full absolute right-14 top-7" /> */}
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
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {emi.paymentStatus}
                      </td>
                      <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-800 w-40">
                        <button className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
                          Pay Now
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Add more table rows here for additional installments */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    ))
  );
};

export default OngoingEmiTable;
