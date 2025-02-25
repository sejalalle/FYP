import React from 'react';

function Cards() {
  return (
    <div className="flex justify-around py-10 bg-gray-100">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded shadow-lg w-5/12">
        <h3 className="font-bold text-blue-600">NEWS AND EVENTS</h3>
        <h2 className="text-xl font-bold mt-2">Parksons-MK Printpack Announcement</h2>
        <p className="mt-4"> Warburg Pincus backed Parksons Packaging, a leading paper packaging company in India, today announced that…</p>
        <a href="#" className="text-blue-500 mt-2 inline-block">Read more</a>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded shadow-lg w-5/12">
        <h3 className="font-bold text-blue-600">INNOVATION AND TECHNOLOGY</h3>
        <h2 className="text-xl font-bold mt-2">Smart Solutions for Business Success</h2>
        <p className="mt-4">Leveraging our deep technical expertise, we provide innovative packaging solutions that help our customers' brands advance.
        </p>
        <a href="#" className="text-blue-500 mt-2 inline-block">Read more</a>
      </div>
      {/* Another card */}
    </div>
  );
}

export default Cards;
