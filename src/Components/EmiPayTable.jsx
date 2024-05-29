import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const EmiPayTable = ({ emiSchedule,data,loanDetails }) => {
  console.log(emiSchedule);
  return (
    <div className="bg-white rounded-lg shadow-md w-full h-[71%] p-4 overflow-y-scroll">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-3 px-10 h-16">
        <h2 className="text-xl font-bold text-gray-800">PACKAGE</h2>
        <button className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
          Print Emi Statement
        </button>
      </div>
      <div className="first_row flex justify-between font-bold w-[80%] m-auto border px-10 py-2 rounded-md h-14">
        <div className="flex flex-nowrap gap-2 py-2 w-32">
          <div className="text-nowrap">Loan Amount:</div>
          <div>₹{data.leadAmount}</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5 w-32">
          <div className="text-nowrap">Amount Paid:</div>
          <div>none</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5 w-32">
          <div className="text-nowrap">Penalty:</div>
          <div>0</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5 w-32">
          <div className="text-nowrap">Status:</div>
          <div className="text-nowrap">none</div>
        </div>
      </div>
      <div className="Second_row flex justify-between font-bold w-[80%] m-auto border px-10 py-2 rounded-md border-t-0">
        <div className="flex flex-nowrap gap-2 py-2 w-32">
          <div className="text-nowrap">Displaced amt:</div>
          <div>₹{loanDetails.disbursementAmount}</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5 w-32">
          <div className="text-nowrap">Amount Unpaid:</div>
          <div>₹{data.leadAmount}</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5 w-32">
          <div className="text-nowrap">Total amt:</div>
          <div>{loanDetails.totalLoan}</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5 w-32">
          <div className="text-nowrap">Total Interest:</div>
          <div>₹{loanDetails.totalInterest}</div>
        </div>
      </div>
      <div className="flex justify-end py-4">
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-1"
        />
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
                      EMI id
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
                      Paid Amt
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
                  {emiSchedule.map((emi, index) => (
                    <tr key={emi.emiId} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border relative">
                        {index + 1}
                        <IoIosAddCircleOutline className="text-green-500 text-3xl border-2 border-green-500 rounded-full absolute right-14 top-7" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {emi.emiId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {emi.dueDate.toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {emi.installmentAmount}₹
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {emi.paidAmount}₹
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {emi.status}
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
  );
};

export default EmiPayTable;
