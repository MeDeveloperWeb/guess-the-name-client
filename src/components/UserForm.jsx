/* eslint-disable react/prop-types */
import { useState } from 'react';
import { socket } from '../socket';

export default function UserForm({ setUser }) {
  const [username, setUsername] = useState('');

  const createUser = (username) => {
    socket.emit('new_user', username, async (user, error) => {
      if (!user) {
        console.log(error);
        return;
      }

      const myUser = await user;
      setUser(myUser);
    });
  };

  return (
    <div className="flex justify-center items-center my-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(username);
          createUser(username);
        }}
        className="flex flex-col gap-4 shadow-md shadow-[#ffffff86] px-8 py-12 rounded-md"
      >
        <label htmlFor="username" className="font-medium">
          Enter Username:
        </label>

        <input
          type="text"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          className="rounded-md h-10 text-black px-3"
        />

        <input
          type="submit"
          value="Submit"
          className="bg-[#004466] px-4 py-2 font-semibold rounded-md self-center mt-4 cursor-pointer"
        />
      </form>
    </div>
  );
}
