import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { useTrail, animated } from '@react-spring/web';
import Loading from './Loading';

function Dashboard() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Simulating loading completion
    }, 5000);
  }, []);

  const cards = [
    { title: 'Total Loan Count', icon: <BsFillArchiveFill className='card_icon' />, value: 300 },
    { title: 'Due This Month', icon: <BsFillGrid3X3GapFill className='card_icon' />, value: 12 },
    { title: 'Overdue', icon: <BsPeopleFill className='card_icon' />, value: 33 },
    { title: 'Status Pending', icon: <BsFillBellFill className='card_icon' />, value: 42 },
  ];

  // Animation setup using useTrail hook
  const trail = useTrail(cards.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 250, friction: 20 },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        {trail.map((style, index) => (
          <animated.div key={index} style={style} className='card'>
            <div className='card-inner'>
              <h3>{cards[index].title}</h3>
              {cards[index].icon}
            </div>
            <h1>{cards[index].value}</h1>
          </animated.div>
        ))}
      </div>
    </main>
  );
}

export default Dashboard;
