"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getFlights } from "@/lib/features/flightSlice";
import { Flight } from "@/_utils/types";
import UpdateFlightStatus from "@/components/UpdateFlightStatus";

const statusOptions = ['Delayed', 'Cancelled', 'In-flight', 'Scheduled/En Route', "All"];
const airlineOptions = ["PIA", "Emirates", "Qatar Airlines", "Air India", "All"];
const flightTypeOptions = ["Private", "Commercial", "Military", "All"];

const updateFlightStatusSchema = z.object({
  flightNumber: z.string().min(1),
  status: z.enum(["Delayed", "On Time", "Cancelled"]),
});

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

  useEffect(() => {
    getAndSetFlight();
  }, [currentPage, searchQuery, limit, status, airline, flightType]);

  const getAndSetFlight = async () => {
    const params: any = {};
    if (currentPage) params.page = currentPage;
    if (searchQuery) params.search = searchQuery;
    if (status) params.status = status;
    if (airline) params.airline = airline;
    if (flightType) params.flightType = flightType;
    if (limit) params.limit = limit;  // Passing the limit
    await dispatch(getFlights(params));
  };

  // Form for updating flight status
  const form = useForm({
    resolver: zodResolver(updateFlightStatusSchema),
    defaultValues: {
      flightNumber: selectedFlight?.flightNumber || "",
      status: selectedFlight?.status || "On Time",
    },
  });

  const handleUpdateStatus = async (data: { flightNumber: string; status: string }) => {
    // Implement the status update logic here
  };

  // Handle filters (search, status, airline, flight type)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFilter = (type: string, value: string) => {
    if (type == "status") {
      if (value == "All") {
        setStatus("");
      } else {
        setStatus(value);
      }
    }
    if (type == "airline") {
      if (value == "All") {
        setAirline("");
      } else {
        setAirline(value);
      }
    }

    if (type == "flightType") {
      if (value == "All") {
        setFlightType("");
      } else {
        setFlightType(value);
      }
    }
  };

  // Pagination functions
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
    setCurrentPage(1); // Reset to first page when limit changes
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

  const updateFlightStatus = (flightNumber: string, newStatus: string) => {
    console.log(`Updated flight ${flightNumber} to status: ${newStatus}`);
    // Replace this with API call or state update
  };
  return (
    <div className="p-6 space-y-4">
      {/* Search bar */}
      <Input placeholder="Search Flights" onChange={handleSearch} />

      {/* Filter Dropdowns */}
      <div className="flex space-x-4">
        <Select onValueChange={(value: any) => handleFilter("status", value)}>
          <SelectTrigger>
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
          <SelectTrigger>
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
          <SelectTrigger>
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

      {/* Flight Table */}
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Airline</th>
            <th>Flight Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight._id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{flight.status}</td>
              <td>{flight.airline}</td>
              <td>{flight.flightType}</td>
              <td>
                <Button
                  onClick={() => openModal(flight)}
                >
                  Update Status
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render Modal */}
      {selectedFlight && (
        <UpdateFlightStatus
          isOpen={isModalOpen}
          onClose={closeModal}
          flight={selectedFlight}
          onUpdateStatus={updateFlightStatus}
        />
      )}
      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span>Total Flights: {pagination.totalFlights}</span>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handlePreviousPage} disabled={currentPage <= 1}>
            Previous
          </Button>
          <span>Page {currentPage} of {pagination.totalPages}</span>
          <Button onClick={handleNextPage} disabled={currentPage >= pagination.totalPages}>
            Next
          </Button>
        </div>

        {/* Limit selector */}
        <div>
          <select onChange={handleLimitChange} value={limit} className="p-2">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FlightTable;
