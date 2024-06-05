import React, { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi'; 
import ItemLeadComponent from './ItemLeadComponent';
import CreateNewLead from './CreateNewLead';

function FilterLeadComponent() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = dateTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <main className=" w-full ">

      <ItemLeadComponent/>
     
    </main>
  );
}

export default FilterLeadComponent;
