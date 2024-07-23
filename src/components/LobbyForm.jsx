/* eslint-disable react/prop-types */
import { useState } from 'react';
import { socket } from '../socket';

export default function LobbyForm({ setLobby, userId }) {
  const [mode, setMode] = useState(null);
  const [lobbyId, setLobbyId] = useState('');

  const createLobby = () => {
    socket.emit('create_lobby', userId, (lobbyId, error) => {
      if (error) {
        console.log(error);
        return;
      }
      window.location.hash = lobbyId;
      setLobby({
        id: lobbyId,
        isAdmin: true
      });
    });
  };

  return (
    <div className="flex-1 py-20 flex flex-col items-center gap-16">
      {!mode ? (
        <>
          <button
            className="bg-[#004466] text-2xl font-semibold px-8 py-4 rounded-md shadow-md shadow-[#ffffff86]"
            onClick={createLobby}
          >
            Create Lobby
          </button>
          <button
            className="bg-[#004466] text-2xl font-semibold px-12 py-4 rounded-md shadow-md shadow-[#ffffff86]"
            onClick={() => {
              setMode('join');
            }}
          >
            Join Lobby
          </button>
        </>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLobby({
              id: lobbyId,
              isAdmin: false
            });
          }}
          className="flex flex-col gap-4 shadow-md shadow-[#ffffff86] px-8 py-12"
        >
          <label htmlFor="lobby-id" className="font-medium">
            Enter Lobby Id:
          </label>

          <input
            type="text"
            id="lobby-id"
            value={lobbyId}
            onChange={({ target }) => setLobbyId(target.value)}
            className="rounded-md h-10 text-black px-3"
          />

          <input
            type="submit"
            value="Submit"
            className="bg-[#004466] px-4 py-2 font-semibold rounded-md self-center mt-4 cursor-pointer"
          />
        </form>
      )}
    </div>
  );
}
