/* eslint-disable react/prop-types */
export default function Players({
  players,
  user,
  selectedPlayer,
  selectPlayer,
  inMeeting
}) {
  return (
    <div className="flex-1 flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-3 w-[min(90vw,600px)] gap-8 px-8">
        {players.map((player) => (
          <div
            key={player._id}
            className="flex flex-col gap-4"
            onClick={() => inMeeting && selectPlayer(player._id)}
          >
            <div
              className={`rounded-full overflow-hidden p-2 bg-transparent border-4 border-solid ${
                selectedPlayer === player._id
                  ? 'border-red-500'
                  : 'border-transparent'
              }`}
            >
              <img
                src={`https://api.multiavatar.com/${player.username}.svg`}
                alt={player.username}
              />
            </div>

            <p className="text-center font-medium text-md">
              {player.username}
              {player._id === user._id ? '(You)' : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
