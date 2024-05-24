import React, { useState, useEffect, useRef } from "react";
import { deleteVisit, getAllVisits } from "../apis/apiInterface";
import image from "../assets/download.jpeg"

const VisitTable = () => {
  const [VisitData, setVisitData] = useState(null);
  const [CurrentVisit, setCurrentVisit] = useState(null);

  
  const[visitId,setVisitId] = useState(null);

  const [isDeleteVisit,setDeleteVisit] = useState(false);
  const handleDeleteVisit = (current_data) => {
    setVisitId(current_data._id);

    setDeleteVisit(true);



  }
  const handleHideDeleteVisit = () => {
    setDeleteVisit(false);


  }
  const callVisitsApi = async () => {
    try {
      const response = await getAllVisits();
      setVisitData(response);
      console.log("Visit Fetched response -> ", response);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCurrentVisit = async (_id) => {
    

    try{
      const rawJson = {visit_Id : visitId}
      const response = await deleteVisit(rawJson);
      if(response.code==200){
        window.alert(response.message);
        setDeleteVisit(false);
        callVisitsApi();
        
      }else{
        window.alert(response.message);

      }


    }catch(error){
      console.log(error);
    }



  }

  useEffect(() => {
    const VisitData = async () => {
      try {
        const response = await getAllVisits();
        if(response.code==200){
          setVisitData(response);

        }else{
          setVisitData(null);
          
        }
        console.log("Visit Fetched response -> ", response);
      } catch (error) {
        console.log(error);
      }
    };
    VisitData();
  }, []);

  if(VisitData==null){
    return (
      <main className="h-full w-[90%] px-4 pt-4 bg-[#F4FAFF] rounded-[50px] -ml-[5%]">
              <h2 className="text-white text-[21px] font-semibold font-mono bg-blue-800 rounded-md p-2">No Visit Found !!</h2>

        </main>
  )
  }

  return (
    <main className="h-full w-[90%] px-4 pt-4 bg-[#F4FAFF] rounded-[50px] -ml-[5%]">
    <div className="overflow-hidden rounded-3xl border border-gray-300 relative">
      {VisitData && (
        <div className="relative overflow-auto h-[680px]">
          <h2 className="m-[10px] text-[20px] font-mono font-bold bg-sky-500 text-white p-2 rounded-md">View All Visits</h2>
        <table className="min-w-full rounded-3xl table-auto p-1">
          <thead className="border">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border bg-[#F3F4F7]"
              >
                SNO.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Visit ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                User info
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Customer Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
               Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
               Latitude
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Longitude
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
               Photo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
               View User
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
               Emp Number
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border"
              >
              Delete Visit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200">
            {VisitData != null &&
              VisitData.data.map((Visit, index) => (
                <tr
                  key={index}
                  className={`${index % 2 != 0 ? "bg-[#F4FAFF]" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border bg-[#F3F4F7]">
                    {index + 1}.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {Visit._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    fill user
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {Visit.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {Visit.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm  font-medium border ">
                    {Visit.latitude}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {Visit.longitude}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    {Visit.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border">
                    <img src={Visit.photo ? image: image} alt="" />
                    
                  </td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border">
                    <button
                      onClick={() => setCurrentVisit(Visit.user)}
                      className="text-white bg-[#3B76EF] px-3 py-2 rounded-md"
                    >
                      View User
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border">
                    <button
                      onClick={() => setCurrentVisit(Visit.user)}
                      className="text-white bg-[#3B76EF] px-3 py-2 rounded-md"
                    >
                     {Visit.customerNumber}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border">
                    <button
                    onClick={() => handleDeleteVisit(Visit)}
                      className="text-white bg-[#fa4845] px-3 py-2 rounded-md"
                    >
                      Delete Visit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      )}
      
    </div>
    {isDeleteVisit && (
         <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
         <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm">
           <h2 className="text-xl font-semibold mb-4 text-gray-950">Are you sure?</h2>
           <p className="mb-6 text-red-950 font-semibold">This action cannot be undone.</p>
           <div className="flex justify-end">
             <button onClick={() => handleHideDeleteVisit(CurrentVisit)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2">Cancel</button>
             <button onClick={() => deleteCurrentVisit(CurrentVisit)} className="px-4 py-2 bg-red-500 text-white rounded-md">Confirm</button>
           </div>
         </div>
       </div>
      )}
    {CurrentVisit && (
        <div className="text-white fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm">
          <div
            className= "p-8 rounded-lg flex flex-col items-left gap-3 text-[20px] bg-[#5AB2FF]" 
          >
            <h2 className="text-lg font-bold mb-4 text-center">User Details</h2>
            <p>User Id : {CurrentVisit}</p>
            <p>Name : {CurrentVisit.fullName}</p>
            <p>Mobile : {CurrentVisit.telephoneNumber}</p>  
            <p>Emp Id : {CurrentVisit.employeeId}</p>  
            <p>Mpass : {CurrentVisit.mpass}</p>
            <button 
              onClick={() => setCurrentVisit(null)}
              className="mt-4 px-4 py-2 bg-[#125c878b] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
     
  </main>
  
  );
};

export default VisitTable;
