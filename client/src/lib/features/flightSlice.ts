import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    FlightParams,
    FlightResponse,
    FlightState,
    FlightUpdatePayload,
    FlightUpdateResponse,
} from "@/_utils/types";

import apiClient from "@/_utils/helpers/apiClient";


export const getFlights = createAsyncThunk<
    FlightResponse,
    FlightParams,
    { rejectValue: string }
>("flight/get", async (params: FlightParams, { rejectWithValue }) => {
    try {
        const response = await apiClient.get<FlightResponse>(
            "/flights",
            {
                params,
            });
        return response.data;
    } catch (error: any) {
        console.log(error);

        return rejectWithValue(
            error.response?.data?.errors ||
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Failed to get user details",
        );
    }
});

export const updateFlight = createAsyncThunk<
    FlightUpdateResponse,
    FlightUpdatePayload,
    { rejectValue: string }
>("flight/update", async (data: FlightUpdatePayload, { rejectWithValue }) => {
    try {
        const response = await apiClient.put<FlightUpdateResponse>("/flights/update", data, {
            headers: {
                "Content-Type": "application/json", // Corrected content type
            },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "Failed to update flight"
        );
    }
});


const initialState: FlightState = {
    flights: [],
    pagination: {
        totalFlights: 0,
        totalPages: 0,
        currentPage: 1
    },
    loading: false,
    error: null,
} satisfies FlightState as FlightState;

const authSlice = createSlice({
    name: "flight",
    initialState,

    reducers: {
        resetError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFlights.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getFlights.fulfilled,
                (state, action: PayloadAction<FlightResponse>) => {
                    state.loading = false;
                    state.flights = action.payload.data.flights;
                    state.pagination = action.payload.data.pagination;
                },
            )
            .addCase(getFlights.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        builder
            .addCase(updateFlight.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                updateFlight.fulfilled,
                (state, action: PayloadAction<FlightUpdateResponse>) => {
                    state.loading = false;
                },
            )
            .addCase(updateFlight.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
