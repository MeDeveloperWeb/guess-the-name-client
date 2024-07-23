/* eslint-disable react/prop-types */
import { socket } from '../socket';

export default function MeetingBtn({ userId, lobbyId }) {
  const start = () => {
    socket.emit('meeting_start', userId, lobbyId);
  };
  return (
    <div className="flex-1 py-20 flex flex-col items-center gap-16">
      <button
        className="bg-green-700 text-white text-2xl font-bold px-8 py-4 rounded-md shadow-md shadow-[#ffffff86]"
        onClick={start}
      >
        Call Meeting
      </button>
    </div>
  );
}
