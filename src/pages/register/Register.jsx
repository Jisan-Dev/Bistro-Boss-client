import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin';

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const { user } = await createUser(data.email, data.password);
      console.log(user);
      await updateUserProfile(data.name, data.photo);
      const userInfo = { name: data.name, email: data.email };
      const { data: res } = await axiosPublic.post('/users', userInfo);
      console.log(res);
      if (res.insertedId) {
        toast.success('Registered successfully', {
          style: {
            border: '1px solid #ca8a04',
            padding: '16px',
            color: '#ca8a04',
          },
          iconTheme: {
            primary: '#ca8a04',
            secondary: '#FFFAEE',
          },
        });
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.code || error.message, {
        style: {
          border: '1px solid #ca8a04',
          padding: '16px',
          color: '#ca8a04',
        },
        iconTheme: {
          primary: '#ca8a04',
          secondary: '#FFFAEE',
        },
      });
    }
  };

  // console.log(watch('name')); // watch input value by passing the name of it

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" placeholder="Name" {...register('name', { required: true })} className="input input-bordered" />
              {errors.name?.type === 'required' && <span className="text-red-600">Name is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input type="url" placeholder="Photo URL" {...register('photo')} className="input input-bordered" />
              {/* {errors.photoURL && <span className="text-red-600">Photo URL is required</span>} */}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" {...register('email', { required: true })} />
              {errors.email && <span className="text-red-600">Email is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
                {...register('password', { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })}
              />
              {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
              {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
              {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
              {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Sign Up" />
            </div>
          </form>
          <SocialLogin />
          <p className="flex items-center justify-center mb-5">
            <small>
              Already have an account{' '}
              <Link to="/login" className="font-semibold underline">
                Login
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
