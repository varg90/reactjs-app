import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Quack({ quack, removeQuack, isDeleting }) {
  return (
    <div className={`flex p-5 border-b border-l border-r ${isDeleting ? 'opacity-50' : ''}`}>
      <div className="flex-shrink-0">
        <img src={quack.user.avatarUrl} alt="avatar" className="rounded-full w-16 h-16" />
      </div>
      <div className="ml-3">
        <div className="flex">
          <div className="font-bold">
            {quack.user.firstName} {quack.user.lastName}
          </div>
          <div className="text-gray-500 ml-1">@{quack.user.username}</div>
          <div className="ml-1">▫</div>
          <div className="ml-1">2 ч</div>
        </div>
        <div>{quack.text}</div>
      </div>

      <div className="ml-3">
        <button onClick={() => (isDeleting ? null : removeQuack(quack))}>
          <FontAwesomeIcon icon={faTrash} className="text-red-400" />
        </button>
      </div>
    </div>
  );
}

export default Quack;
