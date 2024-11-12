import React, { useState } from "react";
import { Flight } from "@/_utils/types";

interface UpdateFlightStatusProps {
  isOpen: boolean;
  flight: Flight;
  onClose: () => void;
}

const statusOptions = ["Delayed", "On Time", "Cancelled", "In-flight", "Scheduled/En Route"];

const UpdateFlightStatus: React.FC<UpdateFlightStatusProps> = ({
  flight,
  isOpen,
  onClose,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(flight.status);

  if (!isOpen) return null;

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateClick = () => {
    // onUpdateStatus(flight.flightNumber, selectedStatus);
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#272A40] text-white rounded-lg w-full max-w-md md:max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl hover:text-gray-400"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-4">Update Status for Flight {flight.flightNumber}</h2>

        {/* Status Dropdown */}
        <div className="mb-4">
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-400">
            Select Status
          </label>
          <select
            id="status"
            value={selectedStatus}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 bg-[#3B3F5C] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Update Button */}
        <div className="mt-4">
          <button
            onClick={handleUpdateClick}
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateFlightStatus;
