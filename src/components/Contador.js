import useContador from "./hooks/useContador"
const Contador = () => {
  const {count, increment, decrement, reset} = useContador(0);
  return(
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Contador;  