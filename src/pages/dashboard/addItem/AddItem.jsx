import React, { useState } from 'react';
import SectionHeader from '../../../components/SectionHeader';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    // image upload to imgbb & then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-Type': 'multipart/form-data',
      },
    });
    console.log(res.data);
    if (res.data.success) {
      // now send the item data to the server with image display_url
      const itemData = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosSecure.post('/menu', itemData);
      console.log(menuRes.data);
      setLoading(false);
      if (menuRes.data.insertedId) {
        reset();
        Swal.fire({
          title: `<strong>${data.name}</strong> <br/> successfully added to the menu`,
          icon: 'success',
        });
      }
    }
  };

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
              {loading ? 'Loading...' : 'Add Item'} <FaUtensils className="ml-4"></FaUtensils>
            </button>
          </div>

          <div className="flex justify-center mt-9"></div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
