"use client";

import { useState, useEffect } from 'react';

const elements = ['earth', 'air', 'fire', 'water', 'ether'];

const Rewards = () => {
  const [counters, setCounters] = useState({
    earth: 0,
    air: 0,
    fire: 0,
    water: 0,
    ether: 0,
  });

  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);
  const nextLevelThreshold = 10;

  const incrementCounter = (element: string) => {
    setCounters(prevCounters => ({
      ...prevCounters,
      [element]: prevCounters[element as keyof typeof counters] + 1,
    }));
    setTotalTasksCompleted(prevTotal => prevTotal + 1);
  };

  const randomIncrement = () => {
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    incrementCounter(randomElement);
  };

  useEffect(() => {
    const interval = setInterval(randomIncrement, 3000);
    return () => clearInterval(interval);
  }, []);

  const progressPercent = ((totalTasksCompleted % nextLevelThreshold) / nextLevelThreshold) * 100;

  return (
    <div className='flex'>
      <div className='content-reward'>
        <h1>MEMETROPOLIS Element Rewards</h1>
        <div className='elementGrid'>
          {elements.map((element) => (
            <button
              key={element}
              className={`elementButton ${[element]} font-auto`}
              onClick={() => incrementCounter(element)}
            >
              {element.charAt(0).toUpperCase() + element.slice(1)}
            </button>
          ))}
        </div>

        <div className='tokenInfo'>
          <div className='tokenValue'>
            <div>LIKES (EARTH): <span id="earthCount">{counters.earth}</span></div>
          </div>
          <div className='tokenValue'>
            <div>COMMENTS (AIR): <span id="airCount">{counters.air}</span></div>
          </div>
          <div className='tokenValue'>
            <div>REPOSTS (FIRE): <span id="fireCount">{counters.fire}</span></div>
          </div>
          <div className='tokenValue'>
            <div>INVITES (WATER): <span id="waterCount">{counters.water}</span></div>
          </div>
          <div className='tokenValue'>
            <div>BADGES (ETHER): <span id="etherCount">{counters.ether}</span></div>
          </div>
        </div>

        <div className='progressBar'>
          <div id="progress" className='progress' style={{ width: `${progressPercent}%` }}></div>
        </div>

        <div id="totalTokens">Total Tasks Completed: {totalTasksCompleted}</div>
        <div id="nextLevelTokens">Tasks to Next Level: {nextLevelThreshold - (totalTasksCompleted % nextLevelThreshold)}</div>
      </div>
    </div>
  );
};

export default Rewards;