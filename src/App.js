import { useEffect, useState } from 'react';
import './index.css';
import createMirage from './mirage/config';

createMirage();

function App() {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.users);
      });
  }, []);

  return (
    <div>
      <div className="bg-blue-800 w-full text-white p-5 text-center text-3xl">Quacker</div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
