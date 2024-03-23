import React from "react";

const Events = () => {
  return (
    <div className="md:max-w-screen-xl mx-auto mt-20">
      <div className="p-5 text-center">
        <h2 className="text-4xl text-rose-400 font-bold">Upcoming Events</h2>
        {/* You can add a progress bar or loading indicator here if needed */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-4 md:mx-0">
        {/* Event Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src="https://i.ibb.co/Lz7wpMs/Tech-Square-Card-1.png"  style={{width:"700px",height:'700px'}}alt="Event 1" className="w-full h-auto rounded-md mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Tech Square</h3>
          <p className="text-gray-600">Talk with product experts, experience innovations in Tech Sq,Talk with product experts, experience innovations in Tech SqTalk with product experts, experience innovations in Tech SqTalk with product experts, experience innovations in Tech Sq</p>
          <div class="card-actions justify-end" style={{display:'flex'}}>
<a class="text-white w-full mt-2 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" href="/event/4">Details</a>
</div>
        </div>
        
        {/* Event Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src="https://i.ibb.co/9tPfT1y/gaming.jpg" alt="Event 2" className="w-full h-auto rounded-md mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Creatively designed video editing</h3>
          <p className="text-gray-600">Description for Event 2</p>
          <div class="card-actions justify-end" style={{display:'flex'}}>
<a class="text-white w-full mt-2 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" href="/event/4">Details</a>
</div>
        </div>
        
        {/* Event Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src="https://i.ibb.co/9tPfT1y/gaming.jpg" alt="Event 3" className="w-full h-auto rounded-md mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Expo promoting artificial</h3>
          <p className="text-gray-600">Description for Event 3</p>
          <div class="card-actions justify-end" style={{display:'flex'}}>
<a class="text-white w-full mt-2 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" href="/event/4">Details</a>
</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src="https://i.ibb.co/6BGjs8N/coding-for-clidren.jpg" alt="Event 3" className="w-full h-auto rounded-md mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Young students eagerly coding</h3>
          <p className="text-gray-600">Description for Event 3</p>
          <div class="card-actions justify-end" style={{display:'flex'}}>
<a class="text-white w-full mt-2 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" href="/event/4">Details</a>
</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src="https://i.ibb.co/jWqPzMg/busines-workshop.jpg" alt="Event 3" className="w-full h-auto rounded-md mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Workshop</h3>
          <p className="text-gray-600">Description for Event 3</p>
          <div class="card-actions justify-end" style={{display:'flex'}}>
<a class="text-white w-full mt-2 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" href="/event/4">Details</a>
</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src="https://i.ibb.co/QcMZNcx/digital-workshop.jpg" alt="Event 3" className="w-full h-auto rounded-md mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Digital Workshop</h3>
          <p className="text-gray-600">Description for Event 3,Talk with product experts, experience innovations in Tech SqTalk with product experts, experience innovations in Tech Sq,sjsjjssssssssssssssssssssssssssssssssss</p>
          <div class="card-actions justify-end" style={{display:'flex'}}>
<a class="text-white w-full mt-2 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" href="/event/4">Details</a>
</div>
        </div>
        
        {/* Repeat the above HTML for the remaining events */}
      </div>
    </div>
  );
};

export default Events;
