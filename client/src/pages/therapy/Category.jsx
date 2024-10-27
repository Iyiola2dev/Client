
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import { IoChevronUpOutline } from 'react-icons/io5';

const category = [
  {
    id: 1,
    category: "CLINICAL THERAPY",
  },
  {
    id: 2,
    category: "SERVICE TYPE",
  },
  {
    id: 3,
    category: "CLIENT AGE",
  },
  {
    id: 4,
    category: "LANGUAGE",
  },
];


const Category = () => {
     const [isOpen, setIsOpen] = useState(false);
     const handleToggle = (id) => {
       setIsOpen((prevId) => (prevId === id ? null : id));
     };

  return (
    <div>
      <div className="h-auto max-w-lg ">
        <div>
          {category.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center justify-center "
            >
              <div className="flex items-center justify-center gap-4 border-2 border-slate-300 rounded-3xl py-2 px-4 mb-2 bg-white font-semibold ">
                <h1 className="font-b">{category.category}</h1>
                <span>
                  <button
                    onClick={() => handleToggle(category.id)}
                    className="text-blue-500"
                  >
                    {isOpen === category.id ? (
                      <IoChevronUpOutline className="text-black" />
                    ) : (
                      <FaChevronDown className="text-black" />
                    )}
                  </button>
                </span>
              </div>
              {isOpen === category.id && (
                <p className="py-4">{category.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category