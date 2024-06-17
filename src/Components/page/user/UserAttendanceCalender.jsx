import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';

function UserAttendanceCalender({ attendanceData  }) {
  // Event data transformation (same logic as before)
  const events = attendanceData.map(item => ({
    title: item.status,
    start: new Date(item.createdAt),
    // Additional event properties if needed (e.g., location from item.address)
  }));

  // Event rendering customization
  const eventContent = ({ event }) => (
    <div className={`fc-event-main ${event.title === 'PRESENT' ? 'bg-green-500' : 'bg-red-500'}`}>
      {event.title}
    </div>
  );

  return (
    <div className="w-[650px] h-fit justify-center items-center bg-white p-2 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 rounded-md bg-indigo-400 text-white p-2">User Attendance Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]} // Add necessary plugins
        initialView="dayGridMonth"
        events={events} 
        height={650} // Example: set height to 500px
        eventContent={eventContent} // Custom event rendering
        // Other FullCalendar options (e.g., headerToolbar, eventClick, etc.)
      />
    </div>
  );
}

export default UserAttendanceCalender;
