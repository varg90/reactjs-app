import { useEffect, useState } from 'react';
import Quack from './components/Quack';
import './index.css';
import createMirage from './mirage/config';

createMirage();

function App() {
  let [quacks, setQuacks] = useState([]);
  let [deletingQuackId, setDeletingQuackId] = useState(null);

  useEffect(() => {
    fetch('/api/quacks')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setQuacks(json.quacks);
      });
  }, []);

  let removeQuack = async (quack) => {
    setDeletingQuackId(quack.id);
    let delRes = await fetch(`/api/quacks/${quack.id}`, { method: 'DELETE' });
    console.log(delRes);
    if (delRes.status !== 200) {
      throw 'FUCK!';
    }
    let res = await fetch('/api/quacks');
    let json = await res.json();
    setQuacks(json.quacks);
    setDeletingQuackId(null);
  };

  let quackItems = quacks.map((quack) => (
    <div key={quack.id}>
      <Quack quack={quack} removeQuack={removeQuack} isDeleting={quack.id === deletingQuackId} />
    </div>
  ));

  return (
    <div>
      <div className="flex justify-center">
        <div className="md:w-full lg:w-200 bg-gray-100">{quackItems}</div>
      </div>
    </div>
  );
}

export default App;
