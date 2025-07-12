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
  console.log("✅ rooms:", rooms);
  const date = new Date();
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  const today = `${days[date.getDay()]} ${date.toLocaleDateString()}`;

useEffect(() => {
  dispatch(fetchStatuses()); // مرة وحدة
}, [dispatch]);

useEffect(() => {
  const interval = setInterval(() => {
    dispatch(fetchRooms()); // كل 10 ثواني
  }, 10000);

  return () => clearInterval(interval);
}, [dispatch]);



  const isAdmin = localStorage.getItem('access') !== null;

const handleStatusChange = (roomId, statusId = null, is_available = null) => {
  console.log("🌀 Updating:", { roomId, statusId, is_available }); // ✅ للتأكد
  dispatch(updateRoomStatus({ roomId, statusId, is_available }))
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
    <th className="px-4">Room</th>
    <th className="px-4">Status</th>
    <th className="px-4">Disponibilité</th> {/* ✅ هنا */}
  </tr>
</thead>
<tbody>
  {rooms.map((room, index) => (
    <tr
      key={room.id}
      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-[#fef6e4] transition-colors duration-300`}
    >
      {/* Room number */}
      <td className="px-4 sm:px-6 py-3 font-medium text-gray-800 border-r border-gray-200">
        {room.number} 
      </td>

      {/* Room status */}
<td className="px-4 sm:px-6 py-3 border-r border-gray-200">
  <div className="flex flex-col items-start gap-1">
    {/* Display current status with color and icon */}
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

    {/* Select only for admin */}
    {isAdmin && (
      <select
        value={String(room.status?.id)}
        onChange={(e) =>
          handleStatusChange(room.id, parseInt(e.target.value), room.is_available)
        }
        className="mt-1 border border-gray-300 px-2 py-1 rounded-md text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#5a3e2b]"
      >
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
    )}
  </div>
</td>


      {/* Disponibilité */}
<td className="px-4 sm:px-6 py-3 border-r border-gray-200">
  {isAdmin ? (
    <select
      value={room.is_available ? 'true' : 'false'}
      onChange={(e) => {
        const newAvailability = e.target.value === 'true';
        handleStatusChange(room.id, room.status?.id, newAvailability);
      }}
      className="w-full border border-gray-300 px-2 py-1 rounded-md text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#5a3e2b]"
    >
      <option value="true">🟢 🛏️ Disponible</option>
      <option value="false">🔴 🚫 Occupée</option>
    </select>
  ) : (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold tracking-wide ${
        room.is_available ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
      }`}
    >
      {room.is_available ? '🟢 🛏️' : '🔴 🚫'}
      {room.is_available ? 'Disponible' : 'Occupée'}
    </span>
  )}
</td>


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
