import React from 'react';
import SectionHeader from '../../../components/SectionHeader';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';

const AddItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="px-20">
      <SectionHeader heading="add an item" subHeading="What's new?"></SectionHeader>
      <div className="bg-base-200 p-10 rounded-xl mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mt-6">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input type="text" placeholder="Recipe Name" {...register('name', { required: true })} required className="input input-bordered w-full" />
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select defaultValue="default" {...register('category', { required: true })} className="select select-bordered w-full">
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input type="number" placeholder="Price" {...register('price', { required: true })} className="input input-bordered w-full" />
            </div>
          </div>
          {/* recipe details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Write about the recipe details"></textarea>
          </div>

          <div className="w-full my-6 flex justify-between">
            <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
            <button className="btn w-1/4 uppercase bg-orange-500 hover:bg-orange-600 font-bold text-base text-white">
              Add Item <FaUtensils className="ml-4"></FaUtensils>
            </button>
          </div>

          <div className="flex justify-center mt-9"></div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
