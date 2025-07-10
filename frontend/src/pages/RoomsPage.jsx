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
<div className="mb-8 sticky top-0 z-10 bg-white/90 backdrop-blur-md rounded-t-xl shadow px-4 py-2">
  <div className="flex items-center gap-4">
    <img src={logo} alt="Hotel Logo" className="h-14 drop-shadow-lg" />
    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#5a3e2b] drop-shadow-sm">
      Hotel del Sitjar - Rooms
    </h1>
  </div>
  <span className="text-[#6d4e3c] text-sm sm:text-base font-semibold italic">
    {today}
  </span>
</div>



    {/* Status */}
   {loading && (
  <div className="flex items-center gap-2 text-blue-600 text-base">
    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500"></span>
    Loading rooms...
  </div>
)}
    {error && <p className="text-red-600 font-semibold">{error}</p>}

    {/* Table */}
    <div className="w-full overflow-x-auto rounded-xl shadow-md">
      <table className="min-w-full text-sm sm:text-base text-left text-gray-700">
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
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-[#fef6e4] transition-colors duration-300`}

            >
              <td className="px-4 sm:px-6 py-3 font-medium text-gray-800 border-r border-gray-200">
                {room.number}
              </td>

              <td className="px-4 justify-center items-center sm:px-6 py-3 border-r border-gray-200">
               <span
  className={`inline-flex items-center gap-1 justify-center px-2 py-1 rounded-full text-xs font-bold tracking-wide
    ${
      room.status?.name?.toLowerCase() === 'clean'
        ? 'bg-green-500 text-white'
        : room.status?.name?.toLowerCase() === 'being cleaned'
        ? 'bg-yellow-500 text-white'
        : 'bg-red-500 text-white'
    }`}
>
  {room.status?.name === 'clean' && '✅'}
  {room.status?.name === 'being cleaned' && '🧼'}
  {room.status?.name === 'dirty' && '❌'} 
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
                    className="w-full border border-gray-300 px-2 py-1 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#5a3e2b] bg-white hover:shadow"

                    
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
