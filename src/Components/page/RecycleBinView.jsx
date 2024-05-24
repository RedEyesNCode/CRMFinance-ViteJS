import React, { useState, useEffect } from 'react';
import { getRecycleBin } from '../../apis/apiInterface';

function RecycleBinView() {
  const [recycleItems, setRecycleItems] = useState([]);

  useEffect(() => {
    async function fetchRecycleItems() {
      try {
        const data = await getRecycleBin();
        if(data.code==200){
            setRecycleItems(data.data); 

        }else{
            setRecycleItems(null);

        }
      } catch (error) {
        console.error('Error fetching recycle items:', error);
      }
    }

    fetchRecycleItems(); 
  }, []); 
  
  const renderTable = (jsonData) => {
    try {
      const parsedData = JSON.parse(jsonData);

      // Base case: if not an object, display as preformatted text
      if (typeof parsedData !== "object" || parsedData === null) {
        return <pre>{JSON.stringify(parsedData, null, 2)}</pre>;
      }

      const keys = Object.keys(parsedData);

      return (
        <table className="table-auto w-full">
          <thead>
                
          </thead>
          <tbody>
            {Object.keys(parsedData).map((key) => (
              <tr key={key}>
                <td className="border px-4 py-2">
                  {typeof parsedData[key] === "object"
                    ? renderTable(JSON.stringify(parsedData[key]))
                    : parsedData[key]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return <div>Invalid JSON data</div>;
    }
  };





  if(recycleItems==null){
    return (
      <main className="h-full w-[90%] px-4 pt-4 bg-[#F4FAFF] rounded-[50px] -ml-[5%]">
              <h2 className="text-white text-[21px] font-semibold font-mono bg-blue-800 rounded-md p-2">No Recycler Items found !!</h2>

        </main>
  )
  }

  return (

    <main className="h-full w-[90%] px-4 pt-4 bg-[#F4FAFF] rounded-[50px] -ml-[5%] overflow-hidden">
    <div className="overflow-hidden rounded-3xl border border-gray-300 relative">
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Recycle Bin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recycleItems!=null && recycleItems.map((item) => (
          <div 
            key={item._id} 
            className="bg-white rounded-lg shadow-md p-4"
          >
                        {renderTable(item.json_recycle)}

            
            <div className="text-gray-600 text-xs mt-2">
              Created: {new Date(item.createdAt).toLocaleString()} 
              <br />
              Updated: {new Date(item.updatedAt).toLocaleString()} 
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

    </main>

   
  );
}

export default RecycleBinView;
