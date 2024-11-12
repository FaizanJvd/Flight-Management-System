"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getFlights } from "@/lib/features/flightSlice";
import { Flight } from "@/_utils/types";
import UpdateFlightStatus from "@/components/UpdateFlightStatus";
import { getRole, removeAccessToken, removeRole } from "@/_utils/helpers/auth";
import { useRouter } from "next/navigation";
const statusOptions = ['Delayed', 'Cancelled', 'In-flight', 'Scheduled/En Route', "All"];
const airlineOptions = ["PIA", "Emirates", "Qatar Airlines", "Air India", "All"];
const flightTypeOptions = ["Private", "Commercial", "Military", "All"];

const FlightTable = () => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");
  const [airline, setAirline] = useState("");
  const [flightType, setFlightType] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error, flights, pagination } = useAppSelector((state) => state.flight);
  const role = getRole();
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      getAndSetFlight();
    };

    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    getAndSetFlight();
  }, [currentPage, searchQuery, limit, status, airline, flightType]);
  const router = useRouter();
  const getAndSetFlight = async () => {
    
    const params: any = {};
    if (currentPage) params.page = currentPage;
    if (searchQuery) params.search = searchQuery;
    if (status) params.status = status;
    if (airline) params.airline = airline;
    if (flightType) params.flightType = flightType;
    if (limit) params.limit = limit;
    await dispatch(getFlights(params));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFilter = (type: string, value: string) => {
    if (type == "status") {
      setStatus(value === "All" ? "" : value);
    }
    if (type == "airline") {
      setAirline(value === "All" ? "" : value);
    }
    if (type == "flightType") {
      setFlightType(value === "All" ? "" : value);
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFlight(null);
  };
const logout = () => {
  removeAccessToken();
  removeRole();
  router.replace("/login");
}
  return (
    <div className="p-8 space-y-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Flight Management System</h1>
        <Button onClick={logout}>Logout</Button>
      </div>

      {/* Search bar */}
      <Input
        placeholder="Search Flights"
        onChange={handleSearch}
        className="w-full max-w-md p-3 bg-white rounded-md shadow-md"
      />

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-4">
        <Select onValueChange={(value: any) => handleFilter("status", value)}>
          <SelectTrigger className="p-2 bg-white rounded-md shadow-md w-48">
            <span>Status</span>
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value: any) => handleFilter("airline", value)}>
          <SelectTrigger className="p-2 bg-white rounded-md shadow-md w-48">
            <span>Airline</span>
          </SelectTrigger>
          <SelectContent>
            {airlineOptions.map((airline) => (
              <SelectItem key={airline} value={airline}>
                {airline}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value: any) => handleFilter("flightType", value)}>
          <SelectTrigger className="p-2 bg-white rounded-md shadow-md w-48">
            <span>Flight Type</span>
          </SelectTrigger>
          <SelectContent>
            {flightTypeOptions.map((flightType) => (
              <SelectItem key={flightType} value={flightType}>
                {flightType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {loading && !isModalOpen && (
        <div className="flex justify-center py-4">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-600 py-4">
          <p>{error}</p>
        </div>
      )}

      {/* No Data Found */}
      {!loading && !error && flights.length === 0 && (
        <div className="text-center text-gray-600 py-4">
          <p>No Data Found</p>
        </div>
      )}

      {/* Flight Table */}
      {!loading && !error && flights.length > 0 && (
        <table className="w-full bg-white rounded-md shadow-md border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              <th className="p-4">Flight Number</th>
              <th className="p-4">Origin</th>
              <th className="p-4">Destination</th>
              <th className="p-4">Status</th>
              <th className="p-4">Airline</th>
              <th className="p-4">Flight Type</th>
              {role == "admin" && <th className="p-4">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr
                key={flight._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <td className="p-4">{flight.flightNumber}</td>
                <td className="p-4">{flight.origin}</td>
                <td className="p-4">{flight.destination}</td>
                <td className="p-4">{flight.status}</td>
                <td className="p-4">{flight.airline}</td>
                <td className="p-4">{flight.flightType}</td>
                {role == "admin" && <td className="p-4">
                  <Button onClick={() => openModal(flight)} className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition">
                    Update Status
                  </Button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-gray-600">Total Flights: {pagination.totalFlights}</span>
        <div className="flex items-center space-x-2">
          <Button onClick={handlePreviousPage} disabled={currentPage <= 1} className="p-2 bg-black rounded-md">
            Previous
          </Button>
          <span>Page {currentPage} of {pagination.totalPages}</span>
          <Button onClick={handleNextPage} disabled={currentPage >= pagination.totalPages} className="p-2 bg-black rounded-md">
            Next
          </Button>
        </div>
        <select onChange={handleLimitChange} value={limit} className="p-2 bg-white border border-gray-300 rounded-md shadow-sm">
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Modal */}
      {selectedFlight && (
        <UpdateFlightStatus
          isOpen={isModalOpen}
          onClose={closeModal}
          flight={selectedFlight}
        />
      )}
    </div>
  );
};

export default FlightTable;
