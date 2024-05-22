import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
  // withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json"
  // }
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
