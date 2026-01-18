import { useState } from 'react';
import './styles.css';


const Counter = ({ initialValue = 0, label }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div className="counter">
      <h3>{label}</h3>
      <p>Значення: <strong>{count}</strong></p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};


const Wrapper = ({ title, children }) => {
  return (
    <div className="wrapper">
      <h1>{title}</h1>
      
      <section className="children-container">
        {children}
      </section>
    </div>
  );
};


const App = () => {
  return (
    <Wrapper title="Домашнє завдання: React + Webpack">
      
      <Counter initialValue={0} label="Лічильник А" />
      <Counter initialValue={10} label="Лічильник Б (start: 10)" />
    </Wrapper>
  );
};

export default App;