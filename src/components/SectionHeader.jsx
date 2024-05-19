/* eslint-disable react/prop-types */
import React from 'react';

const SectionHeader = ({ heading, subHeading }) => {
  return (
    <header>
      <div className="mx-auto text-center md:w-4/12 my-8">
        <p className="text-yellow-600 mb-2 italic">--- {subHeading} ---</p>
        <h3 className="text-3xl uppercase border-y-4 py-4">{heading}</h3>
      </div>
    </header>
  );
};

export default SectionHeader;
