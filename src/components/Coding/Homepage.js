import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Homepage() {
  useEffect(() => {
    ReactGA.initialize('');
    ReactGA.pageview('/');
  }, []);

  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const [cards] = useState([
    {
      index: '1',
      title: 'Array',
      text: 'Total Questions: 22',
      onClick: () => navigateTo('/Array'),
    },
    {
      index: '2',
      title: 'String',
      text: 'Total Questions: 24',
      onClick: () => navigateTo('/String'),
    },
    {
      index: '3',
      title: 'Search & Sort',
      text: 'Total Questions: 24',
      onClick: () => navigateTo('/Searchsort'),
    },
    {
      index: '4',
      title: 'Stack & Queue',
      text: 'Total Questions: 24',
      onClick: () => navigateTo('/Stackqueue'),
    },
    {
      index: '5',
      title: 'Linked List',
      text: 'Total Questions: 20',
      onClick: () => navigateTo('/Linkedlist'),
    },
    {
      index: '6',
      title: 'Matrix',
      text: 'Total Questions: 15',
      onClick: () => navigateTo('/Matrix'),
    },
  ]);

  return (
    <div className='Homepagee bg-gray-100 min-h-screen flex justify-center items-center'>
      <section>
        <div className='containerr'>
          <div className='heading'>
            <h1 className='text-5xl font-bold text-center py-6'>
              DSA TRACKER DASHBOARD
            </h1>
          </div>
          <div className='cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {cards.map((card, i) => (
              <div
                key={i}
                className='card bg-blue-200 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer p-8'
                onClick={card.onClick}
              >
                <div className='text-center'>
                  <h2 className='text-6xl font-bold text-gray-900 mb-4'>
                    {card.index}
                  </h2>
                  <h4 className='text-3xl font-semibold text-gray-800 mb-2'>
                    {card.title}
                  </h4>
                  <p className='text-lg text-gray-700 mb-6'>{card.text}</p>
                  <button
                    className='bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out hover:bg-green-600 focus:outline-none'
                    onClick={card.onClick}
                  >
                    <FontAwesomeIcon icon={faPlay} className='mr-2' />
                    Start Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
