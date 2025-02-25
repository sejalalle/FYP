import React from 'react';

function BoxCategories() {
  return (
    <section className="py-10">
      <h2 className="text-center text-2xl font-bold">YOUR CUSTOM PACKAGING PARTNER</h2>
      <p className="text-center mt-4 text-gray-600">We provide the best packaging solutions...</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 shadow rounded">
          <img src="/images/categories/Folding_cartons.jpeg" alt="Folding Cartons" className="w-full" />
          <h3 className="text-center mt-2">Folding Cartons</h3>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <img src="/images/categories/Gable_top.jpeg" alt="Folding Cartons" className="w-full" />
          <h3 className="text-center mt-2">Gable_top</h3>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <img src="/images/categories/specialty.jpeg" alt="Folding Cartons" className="w-full" />
          <h3 className="text-center mt-2">specialty</h3>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <img src="/images/categories/Litholam.jpeg" alt="Folding Cartons" className="w-full" />
          <h3 className="text-center mt-2">Litholam</h3>
        </div><div className="bg-white p-4 shadow rounded">
          <img src="/images/categories/rigid.jpeg" alt="Folding Cartons" className="w-full" />
          <h3 className="text-center mt-2">rigid</h3>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <img src="/images/categories/box6.webp" alt="Folding Cartons" className="w-full" />
          <h3 className="text-center mt-2">Canister </h3>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <img src="/images/categories/box7.webp" alt="Folding Cartons" className="w-full" />
          <h3 className="text-center mt-2">Paper Rod</h3>
        </div>


        {/* More categories with images */}
      </div>
    </section>
  );
}

export default BoxCategories;
