/* eslint-disable react/prop-types */
import { socket } from '../socket';

export default function StartGameButton({ userId, lobbyId, onClick }) {
  const start = () => {
    socket.emit('start_game', userId, lobbyId);
  };
  return (
    <div className="flex-1 py-20 flex flex-col items-center gap-16">
      <button
        className="bg-[#004466] text-2xl font-semibold px-8 py-4 rounded-md shadow-md shadow-[#ffffff86]"
        onClick={() => {
          onClick();
          start();
        }}
      >
        Start Game
      </button>
    </div>
  );
}
