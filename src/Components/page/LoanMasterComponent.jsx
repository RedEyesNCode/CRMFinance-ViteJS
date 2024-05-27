import React, { useState,useEffect } from 'react';
import LoanApprovalTable from './LoanApprovalTable';
import LoanDisburseTable from './LoanDisburseTable';
import LoanOngoingTable from './LoanOngoingTable';

const LoanMasterComponent = () => {
    const [isApprovalFrame,setApprovalFrame] = useState(true);
    const [isDisburseFrame,setDisburseFrame] = useState(false);
    const [isOngoingFrame, setOnGoingFrame] = useState(false);

    const handleDisburseFrame = async () => {
      setApprovalFrame(false);
      setOnGoingFrame(false);
      setDisburseFrame(true);

    }

    const handleApprovalFrame = async () => {
        setApprovalFrame(true);
        setOnGoingFrame(false);
        setDisburseFrame(false);
    }


    const handleOnGoingFrame = async () => {
      setApprovalFrame(false);
      setOnGoingFrame(true);

      setDisburseFrame(false);
  }
  return (
      <main className="h-full w-full">
              {true && (<div>
                <h2 className="text-white text-[21px] font-semibold font-mono bg-blue-800 rounded-md p-2">Loan Master !!</h2>
              <div className='flex flex-row'>
                <div 
                onClick={handleApprovalFrame}
                className=' p-2 rounded-lg w-fit m-2 text-white font-serif border-2 shadow-xl border-green-900 bg-[#86af49] text-[21px]'>
                    <h2>Approval/Waiting Loans</h2>
                </div>
                <div 
                onClick={handleDisburseFrame}
                className=' p-2 rounded-lg w-fit m-2 text-white font-serif border-2 shadow-2xl border-blue-500 bg-[#80ced6] text-[21px]'>
                    <h2>Pending Disbursement Loans</h2>
                </div>
                <div 
                onClick={handleOnGoingFrame}
                className=' p-2 rounded-lg w-fit m-2 text-white font-serif border-2 border-amber-700 bg-[#feb236] text-[21px]'>
                    <h2>Ongoing Loans</h2>
                </div>
                <div className=' p-2 rounded-lg w-fit m-2 text-white font-serif border-2 border-red-500 bg-red-800 text-[21px]'>
                    <h2>Rejected Loans</h2>
                </div>
                <div className=' p-2 rounded-lg w-fit m-2 text-white font-serif border-2 border-black-500 bg-black text-[21px]'>
                    <h2>Closed Loans</h2>
                </div>
              </div>
              </div>)}
              {isApprovalFrame && <LoanApprovalTable/>}
              {isDisburseFrame && <LoanDisburseTable/>}
              {isOngoingFrame && <LoanOngoingTable/>}

        </main>
  )
  
}

export default LoanMasterComponent;
