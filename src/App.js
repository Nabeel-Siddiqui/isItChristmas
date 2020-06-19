import React, { useEffect, useState, useRef } from "react";

import logo from './logo.svg';
import './App.css';

function App() {

  const [dayTimer, setdayTimer] = useState('00');
  const [hourTimer, sethourTimer] = useState('00');
  const [minuteTimer, setminuteTimer] = useState('00');
  const [secondsTimer, setsecondsTimer] = useState('00');

  let date = new Date()
  let dateOptions = { month: 'long', day: 'numeric'};
  let currentDate = new Intl.DateTimeFormat('default', dateOptions).format(date);
  let christmas = new Intl.DateTimeFormat('default', dateOptions).format(date.setMonth(11,25));

  const isItChristmas = () => {
    return currentDate === christmas ? "YES" : "NO"
  }

  
  
  let timer = useRef();
  
  const christmasCountdown = () => {

    let todaysDate = new Date();
    let currentYear = todaysDate.getFullYear();
    let christmasDate = new Date('12/25/' + currentYear + ' 00:00:00 ').getTime();  

    timer = setInterval(() => {
      let today = todaysDate.getTime();
      let timeLeft = christmasDate - today;
      
      let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (timeLeft < 0) {
        clearInterval(timer.current);
      } else {
        setdayTimer(days);
        sethourTimer(hours);
        setminuteTimer(minutes);
        setsecondsTimer(seconds);
      }

    }, 1000);

  };

  useEffect(() => {
    christmasCountdown();
  })

  return (
    <div className="App">
      <header className="App-header">
         <h1 className='large'>{isItChristmas()}</h1>
         <h3>Time Remaining: {dayTimer} Days {hourTimer} Hours {minuteTimer} Minutes {secondsTimer} Seconds</h3>
      </header>
    </div>
  );
}

export default App;
