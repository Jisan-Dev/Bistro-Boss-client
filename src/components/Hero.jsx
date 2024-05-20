/* eslint-disable react/prop-types */
import { Parallax } from 'react-parallax';

const Hero = ({ title, subtitle, img }) => {
  return (
    <Parallax blur={{ min: -15, max: 15 }} bgImage={img} bgImageAlt="the menu" strength={-200}>
      <div className="h-[750px] flex items-center justify-center">
        <div className="bg-neutral-900 bg-opacity-75 h-[450px] w-3/4 flex flex-col items-center justify-center text-white">
          <h1 className="text-[88px] font-bold uppercase">{title}</h1>
          <p className="text-center uppercase text-2xl font-medium">{subtitle}</p>
        </div>
      </div>
    </Parallax>
  );
};

export default Hero;
