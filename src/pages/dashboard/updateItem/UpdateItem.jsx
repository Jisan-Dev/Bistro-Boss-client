import React, { useEffect, useState } from 'react';
import SectionHeader from '../../../components/SectionHeader';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState({});
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosPublic.get(`/menu/${id}`).then((res) => {
      setMenuItem(res.data);
    });
  }, [id, axiosPublic]);

  const onSubmit = async (data) => {
    if (data.image.length !== 0) {
      // image upload to imgbb & then get an url
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          'content-Type': 'multipart/form-data',
        },
      });
      if (res.data.success) {
        // now send the item data to the server with image display_url
        const itemData = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe || menuItem.recipe,
          image: res.data.data.display_url,
        };
        const menuRes = await axiosSecure.patch(`/menu/${menuItem._id}`, itemData);
        if (menuRes.data.modifiedCount > 0) {
          // reset();
          Swal.fire({
            title: `<strong>${data.name}</strong> <br/> successfully updated to the menu`,
            icon: 'success',
          });
        }
      }
    } else {
      const itemData = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe || menuItem.recipe,
        image: menuItem.image,
      };
      const menuRes = await axiosSecure.patch(`/menu/${menuItem._id}`, itemData);
      if (menuRes.data.modifiedCount > 0) {
        // reset();
        Swal.fire({
          title: `<strong>${data.name}</strong> <br/> successfully updated to the menu`,
          icon: 'success',
        });
      }
    }
  };

  return (
    <div>
      <SectionHeader heading="update an item" subHeading="Renovation" />
      <div className="bg-base-200 p-10 rounded-xl mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mt-6">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input defaultValue={menuItem?.name} type="text" placeholder="Recipe Name" {...register('name')} required className="input input-bordered w-full" />
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select defaultValue={menuItem?.category} {...register('category')} className="select select-bordered w-full">
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
              <input defaultValue={menuItem?.price} type="number" placeholder="Price" {...register('price')} className="input input-bordered w-full" />
            </div>
          </div>
          {/* recipe details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea defaultValue={menuItem?.recipe} {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Write about the recipe details"></textarea>
          </div>

          <div className="w-full my-6 flex justify-between">
            <input {...register('image')} type="file" className="file-input w-full max-w-xs" />

            <button className="btn w-1/4 uppercase bg-orange-500 hover:bg-orange-600 font-bold text-base text-white">
              Update <FaUtensils className="ml-4"></FaUtensils>
            </button>
          </div>

          <div className="flex justify-center mt-9"></div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
