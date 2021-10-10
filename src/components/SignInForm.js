import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Alert from './Alert';

function SignInForm() {
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  let handleSubmit = (e) => {
    e.preventDefault();
    auth.signIn(username, password, {
      onError: (errors) => {
        setErrors(errors);
      },
    });
  };
  return (
    <>
      <form className="p-5 bg-green-100 rounded shadow-md" onSubmit={handleSubmit}>
        <div className="text-center mb-5 text-xl">Quacker!</div>
        {errors.length > 0 ? (
          <div className="mb-5">
            <Alert>
              {errors.map((error) => {
                return <div key={error.text}>{error.text}</div>;
              })}
            </Alert>
          </div>
        ) : (
          ''
        )}
        <div className="mb-3">
          <label htmlFor="username" className="block mb-3">
            Name
          </label>
          <input
            type="text"
            id="username"
            className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="block mb-3">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          value="Sign in"
          className="flex-shrink-0 bg-green-600 text-white cursor-pointer text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200"
        />
      </form>
    </>
  );
}

export default SignInForm;
