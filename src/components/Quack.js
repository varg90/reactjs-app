function Quack({ quack }) {
  return (
    <div className="flex p-5 border-b border-l border-r">
      <div className="flex-shrink-0">
        <img src={quack.user.avatarUrl} className="rounded-full w-16 h-16" />
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
    </div>
  );
}

export default Quack;
