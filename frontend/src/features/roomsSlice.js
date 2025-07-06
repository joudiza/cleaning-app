import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

// 📌 1. Fetch rooms
export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get('rooms/');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch rooms');
    }
  }
);

// 📌 2. Fetch statuses
export const fetchStatuses = createAsyncThunk(
  'rooms/fetchStatuses',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get('statuses/');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch statuses');
    }
  }
);

// 📌 3. Update room status
export const updateRoomStatus = createAsyncThunk(
  'rooms/updateRoomStatus',
  async ({ roomId, statusId }, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(`/rooms/${roomId}/`, {
        status_id: statusId,
      });
      return res.data;
    } catch (err) {
      console.error("❌ Error updating room status:", err.response?.data);
      return rejectWithValue(err.response?.data || 'Failed to update status');
    }
  }
);



// ✅ Slice
const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    list: [],
    statuses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch rooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch rooms';
      })

      // fetch statuses
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.statuses = action.payload;
      })

      // update room status
.addCase(updateRoomStatus.fulfilled, (state, action) => {
  const updatedRoom = action.payload;
  const index = state.list.findIndex(room => room.id === updatedRoom.id);
  if (index !== -1) {
    state.list[index] = updatedRoom; // تحديث مباشر للغرفة
  }
});
        
  },
});

export default roomsSlice.reducer;
