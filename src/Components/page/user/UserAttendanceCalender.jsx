import React, { useState } from 'react';
import Calendar from 'react-calendar';

function UserAttendanceCalender({ attendanceData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const attendanceByDate = attendanceData.reduce((acc, item) => {
    const date = new Date(item.createdAt).toDateString();
    acc[date] = item.status; // Store just the status for each date
    return acc;
  }, {});

  // Custom tile content for each day
  function tileContent({ date, view }) {
    if (view === 'month') {
      const dateString = date.toDateString();
      const status = attendanceByDate[dateString] || 'UNKNOWN';

      return (
        <div className="flex justify-center items-center h-full">
          <p>{date.getDate()}</p>
          {status === 'PRESENT' && <span className="bg-green-500 w-2 h-2 rounded-full ml-1 inline-block"></span>}
          {status === 'ABSENT' && <span className="bg-red-500 w-2 h-2 rounded-full ml-1 inline-block"></span>}
        </div>
      );
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">User Attendance Calendar</h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        view="month"
        tileContent={tileContent} // Custom content for each day
      />

      {/* Optionally display additional info for selected date */}
      {attendanceByDate[selectedDate.toDateString()] && (
        <p className="mt-2">
          Status on {selectedDate.toLocaleDateString()}: {attendanceByDate[selectedDate.toDateString()]}
        </p>
      )}
    </div>
  );
}

export default UserAttendanceCalender;
