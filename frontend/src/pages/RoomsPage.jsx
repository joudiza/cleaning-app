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
<div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-[#f9f5f0] to-[#e0d4c2]">
  <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-4 sm:p-8 border border-[#cabba9]">

    {/* Header */}
{/* Header */}
<div className="mb-8 flex justify-between items-center flex-col sm:flex-row gap-4 text-center sm:text-left">
  <div className="flex items-center gap-4">
    <img
      src={logo}
      alt="Hotel del Sitjar Logo"
      className="h-14 w-auto drop-shadow-md"
    />
  </div>
  <span className="text-[#6d4e3c] uppercase font-bold">{today}</span>
</div>


    {/* Status */}
    {loading && <p className="text-blue-600 text-base">⏳ Loading rooms...</p>}
    {error && <p className="text-red-600 font-semibold">{error}</p>}

    {/* Table */}
    <div className="w-full overflow-x-auto rounded-xl shadow-md">
      <table className="min-w-full text-xs sm:text-sm text-left text-gray-700">
        <thead className="text-white uppercase bg-[#2f3e46]">
          <tr>
            <th className="px-4 sm:px-6 py-3 border-r border-gray-600">Room</th>
            <th className="px-4 sm:px-6 py-3 border-r border-gray-600">Status</th>
            {isAdmin && (
              <th className="px-4 sm:px-6 py-3">Change</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr
              key={room.id}
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-[#f1f5f9] transition`}
            >
              <td className="px-4 sm:px-6 py-3 font-medium text-gray-800 border-r border-gray-200">
                {room.number}
              </td>

              <td className="px-4 sm:px-6 py-3 border-r border-gray-200">
                <span
                  className={`inline-block w-[100px] sm:w-[120px] text-center px-2 py-1 rounded-full text-xs font-semibold
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

              {isAdmin && (
                <td className="px-4 sm:px-6 py-3">
                  <select
                    value={String(room.status?.id)}
                    onChange={(e) =>
                      handleStatusChange(room.id, parseInt(e.target.value))
                    }
                    className="w-full border border-gray-300 px-2 py-1 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
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
