import React from 'react';

function VideoSection() {
  return (
    <div className="relative h-screen">
      <video autoPlay muted loop className="w-full h-full object-cover">
        <source src="/Media1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-black bg-opacity-50">
        <h1 className="text-4xl font-bold">Innovative and Sustainable Packaging Solutions</h1>
        <p className="text-lg mt-2">As India’s foremost packaging solutions provider, we innovate for a more sustainable future.</p>
      </div>
    </div>
  );
}

export default VideoSection;
