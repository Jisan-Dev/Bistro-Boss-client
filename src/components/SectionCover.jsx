/* eslint-disable react/prop-types */
import { Parallax } from 'react-parallax';

const SectionCover = ({ img, title, subtitle }) => {
  return (
    <header>
      <Parallax blur={{ min: -15, max: 15 }} className="bg-cover object-cover" bgImage={img} bgImageAlt="the menu" strength={-200}>
        <div className="h-[700px] flex items-center justify-center">
          <div className="bg-neutral-900 bg-opacity-75 h-[450px] w-3/4 flex flex-col items-center justify-center text-white">
            <h1 className="text-[45px] font-bold uppercase">{title}</h1>
            <p className="text-center uppercase text-base font-semibold px-20">{subtitle}</p>
          </div>
        </div>
      </Parallax>
    </header>
  );
};

export default SectionCover;
