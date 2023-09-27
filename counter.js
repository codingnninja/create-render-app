export const Counter = (count = 0) => {
  return `
    <div id="counter">
      <div>${count}</div>
      <button 
        onClick="$render(Counter, ${count + 1})" 
        style="height:30px; width:50px">Increase</button>
    </div>
  `;
};