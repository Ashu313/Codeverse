import { error, success } from '../toaster';
import http from './http';

export const getKey = async () => {
  try {
    const response = await http
      .get(`api/users/api/razorpay/key`);
    return response?.data?.key;
  } catch (err) {
    console.log(err);
    error(err?.response?.data.error || 'Something went wrong');
  }
};
export const checkout = async (data) => {
  try {
    const response = await http
      .post(`api/checkout`, data);
    return response?.data?.order;
  } catch (err) {
    error(err?.response?.data?.error || 'Something went wrong');
  }
};
export const paymentVerification = async (data) => {
  try {
    const response = await http
      .post(`api/paymentverification`, data);
    success(response?.data?.message);
    return response?.data?.message;
  } catch (err) {
    console.log(err);
  }
};

export const createCourse = async (course) => {
  try {
    const response = await http
      .post('api/admin/course/create', course);
    success(response?.data?.message || 'Created');
  } catch (err) {
    error(err?.response.data.error || 'Something went wrong');
  }
};
