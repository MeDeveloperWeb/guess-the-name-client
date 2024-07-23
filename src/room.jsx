import { useState, useEffect, useRef } from 'react';
import { socket } from './socket';
import UserForm from './components/UserForm';
import LobbyForm from './components/LobbyForm';
import StartGameButton from './components/StartGameBtn';
import Players from './components/Players';
import Modal from './components/Modal';
import MeetingBtn from './components/MeetingButton';
import VotingBtn from './components/VoteBtn';
import { getResultDescription } from './lib';

export default function Room() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [user, setUser] = useState({});
  const [lobby, setLobby] = useState({
    id: window.location.hash.substring(1),
    isAdmin: false,
    isImposter: false,
    ongoing: false,
    inMeeting: false
  });

  const [players, setPlayers] = useState([]);
  const [word, setWord] = useState('');

  const [selectedPlayer, selectPlayer] = useState(null);

  const modalRef = useRef(null);

  // const getResult = useCallback(
  //   (result) => {
  //     console.log(lobby.isImposter);

  //   },
  //   [lobby.isImposter, players]
  // );

  // const getResult = (result) =>
  //   getResultDescription(result, players, lobby.isImposter);

  useEffect(() => {
    function onConnect() {
      console.log('connected');
      if (user._id) {
        socket.emit('old_user', user._id);
      }
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log('disconnected');
      setPlayers([]);
      setIsConnected(false);
      setLobby((lobby) => ({ ...lobby, isAdmin: false }));
    }

    function onAdminChange(id) {
      console.log('adminChange');

      if (user._id === id) {
        setLobby((lobby) => ({
          ...lobby,
          isAdmin: true
        }));
        console.log('you are chosen one');
      } else
        setLobby((lobby) => ({
          ...lobby,
          isAdmin: false
        }));
    }

    function startGame(isImposter, word) {
      if (isImposter) {
        setLobby((lobby) => ({ ...lobby, isImposter: true }));

        modalRef.current?.showModal({
          heading: 'You are the Imposter.',
          info: 'Guess the word or pretend to win! (Whenever someone (or even you) calls a meeting you can guess the word.)',
          danger: true
        });
      } else {
        setWord(word);

        modalRef.current?.showModal({
          heading: `Your word is: ${word}`,
          info: 'Find Imposter to win.',
          danger: false
        });
      }

      setLobby((lobby) => ({ ...lobby, ongoing: true }));
    }

    function addPlayer(player) {
      setPlayers((prev) => [...prev, player]);
    }

    function removePlayer(user) {
      setPlayers((prev) => prev.filter(({ _id }) => user._id !== _id));
    }

    function startMeeting() {
      setLobby((prev) => ({ ...prev, inMeeting: true }));

      modalRef.current.showModal({
        heading: 'Voting Starts',
        info: 'Click on any player to select. And the click on vote button to vote.'
      });
    }

    function endMeeting(result) {
      setLobby((prev) => ({ ...prev, inMeeting: false, ongoing: false }));

      modalRef.current?.showModal(
        getResultDescription(result, players, lobby.isImposter)
      );
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('new_lobby_admin', onAdminChange);
    socket.on('new_player', addPlayer);
    socket.on('player_exit', removePlayer);
    socket.on('start', startGame);
    socket.on('meeting_start', startMeeting);
    socket.on('meeting_end', endMeeting);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('new_lobby_admin', onAdminChange);
      socket.off('new_player', addPlayer);
      socket.off('player_exit', removePlayer);
      socket.off('start', startGame);
      socket.off('meeting_start', startMeeting);
      socket.off('meeting_end', endMeeting);
    };
  }, [user._id, players, lobby.isImposter]);

  useEffect(() => {
    if (isConnected && lobby.id && user._id) {
      socket.emit('join_lobby', user._id, lobby.id, (lobby, players, error) => {
        if (error) {
          console.log(error);
          return;
        }
        window.location.hash = lobby;
        setPlayers(players);
        console.log('Joined room');
      });
    }
  }, [isConnected, lobby.id, user._id]);

  return (
    <div className="flex-1 flex flex-col">
      {user._id && lobby.id && lobby.ongoing && word && (
        <p className="font-bold text-lg px-2 pb-4 self-center">
          Your Word: {word}
        </p>
      )}
      {!user._id ? (
        <UserForm setUser={setUser} />
      ) : !lobby.id ? (
        <LobbyForm setLobby={setLobby} userId={user._id} />
      ) : (
        <Players
          players={players}
          user={user}
          selectPlayer={selectPlayer}
          selectedPlayer={selectedPlayer}
          inMeeting={lobby.inMeeting}
        />
      )}

      {user._id &&
        lobby.id &&
        lobby.isAdmin &&
        isConnected &&
        !lobby.ongoing && (
          <StartGameButton
            lobbyId={lobby.id}
            userId={user._id}
            onClick={() => setLobby((prev) => ({ ...prev, ongoing: true }))}
          />
        )}

      {user._id &&
        lobby.id &&
        lobby.ongoing &&
        (lobby.inMeeting ? (
          <VotingBtn
            userId={user._id}
            lobbyId={lobby.id}
            selectPlayer={selectPlayer}
            selectedPlayer={selectedPlayer}
          />
        ) : (
          <MeetingBtn userId={user._id} lobbyId={lobby.id} />
        ))}

      <Modal ref={modalRef} />
    </div>
  );
}
