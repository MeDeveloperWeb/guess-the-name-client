/* eslint-disable react/prop-types */
import { useState } from 'react';
import { socket } from '../socket';

export default function VotingBtn({
  userId,
  lobbyId,
  selectedPlayer,
  selectPlayer
}) {
  const [hasVoted, setHasVoted] = useState(false);

  const vote = () => {
    console.log('voted');
    socket.emit('vote', userId, selectedPlayer, lobbyId);
    selectPlayer(null);
    setHasVoted(true);
  };
  return (
    <div className="flex-1 py-20 flex flex-col items-center gap-16">
      <button
        className="bg-red-500 text-white text-2xl font-bold px-8 py-4 rounded-md shadow-md shadow-[#ffffff86] disabled:bg-red-950 disabled:cursor-not-allowed"
        onClick={vote}
        disabled={!selectedPlayer}
      >
        Vote
      </button>
      {!selectedPlayer &&
        (!hasVoted ? (
          <p>Please select a player by clicking on player&apos;s icon</p>
        ) : (
          <p>You have already voted. Please wait for the voting to end.</p>
        ))}
    </div>
  );
}
