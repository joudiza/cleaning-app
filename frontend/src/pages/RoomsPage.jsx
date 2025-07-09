import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRooms,
  fetchStatuses,
  updateRoomStatus,
} from '../features/roomsSlice';

import logo from '../assets/logo-color-positivo-hotel-del-sitjar.webp';
const RoomsPage = () => {
  const dispatch = useDispatch();
  const { list: rooms, statuses, loading, error } = useSelector((state) => state.rooms);

  const date = new Date();
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  const today = `${days[date.getDay()]} ${date.toLocaleDateString()}`;

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchStatuses());
  }, [dispatch]);

  const isAdmin = localStorage.getItem('access') !== null;

  const handleStatusChange = (roomId, statusId) => {
    dispatch(updateRoomStatus({ roomId, statusId }))
      .unwrap()
      .then(() => dispatch(fetchRooms()))
      .catch((err) => console.error("❌ Failed to update room:", err));
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#f9f5f0] to-[#e0d4c2]">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#cabba9]">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
               src={logo} 
              alt="Hotel del Sitjar Logo"
              className="h-14 w-auto drop-shadow-md"
            />
         
          </div>
          <span className="text-[#6d4e3c]  uppercase font-bold">{today}</span>
        </div>

        {/* Status */}
        {loading && <p className="text-blue-600 text-lg">⏳ Loading rooms...</p>}
        {error && <p className="text-red-600 font-semibold">{error}</p>}

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-full text-sm text-left text-gray-700">
            {/* Header */}
            <thead className="text-xs text-white uppercase bg-[#2f3e46]">
              <tr>
                <th className="px-6 py-4 border-r border-gray-600">Room Number</th>
                <th className="px-6 py-4 border-r border-gray-600">Status</th>
                {isAdmin && (
                  <th className="px-6 py-4">Change Status</th>
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {rooms.map((room, index) => (
                <tr
                  key={room.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-[#f1f5f9] transition`}
                >
                  {/* Room Number */}
                  <td className="px-6 py-4 font-medium text-gray-800 border-r border-gray-200">
                    {room.number}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 border-r border-gray-200">
  <span
  className={`inline-block w-[120px] text-center px-3 py-1 rounded-full text-xs font-semibold
    ${
      room.status?.name?.toLowerCase() === 'clean'
        ? 'bg-green-500 text-white'
        : room.status?.name?.toLowerCase() === 'being cleaned'
        ? 'bg-yellow-500 text-white'
        : 'bg-red-500 text-white'
    }`}
>
  {room.status?.name}
</span>

                  </td>

                  {/* Select */}
                  {isAdmin && (
                    <td className="px-6 py-4">
                      <select
                        value={String(room.status?.id)}
                        onChange={(e) =>
                          handleStatusChange(room.id, parseInt(e.target.value))
                        }
                        className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        {statuses.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
