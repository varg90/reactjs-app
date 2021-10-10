import { useAuth } from '../hooks/useAuth';

function Header() {
  let auth = useAuth();

  let signOut = () => {
    auth.signOut();
  };
  return (
    <div className="p-3 bg-green-800 shadow-md text-white">
      <div className="flex items-center justify-between">
        <div className="text-xl">Quacker!</div>
        <div className="flex items-center">
          <div>
            {auth.user.firstName} {auth.user.lastName}
          </div>
          <div className="ml-3">
            <button
              className="flex-shrink-0 bg-white text-black cursor-pointer text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
