/* eslint-disable react-refresh/only-export-components */
import SectionHeader from '../../../../components/SectionHeader';
import featuredImg from '../../../../assets/home/featured.jpg';

const CTA = () => {
  return (
    <div className="featured-item bg-fixed text-white my-20 bg-[url(./src/assets/home/featured.jpg)]">
      <div className="bg-neutral-900 bg-opacity-60  pt-8">
        <SectionHeader subHeading="check it out" heading="FROM OUR MENU"></SectionHeader>
        <div className="md:flex justify-center items-center  pb-20 pt-12 px-36">
          <div>
            <img src={featuredImg} alt="" />
          </div>
          <div className="md:ml-10">
            <p>Aug 20, 2029</p>
            <p className="uppercase">Where can i get some?</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate expedita hic dolorem, iusto vel suscipit nam excepturi debitis magnam nostrum! Ut eum dignissimos
              culpa doloremque eligendi consectetur blanditiis laboriosam fugiat ea quia similique quam nisi reprehenderit numquam magnam nemo vitae cupiditate, atque maiores dicta
              minus pariatur. Perspiciatis nobis vero quas?
            </p>
            <button className="btn btn-outline text-white hover:text-black hover:bg-white hover:border-amber-500 border-0 border-b-4 mt-4">Order Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
