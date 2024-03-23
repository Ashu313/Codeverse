import { error, success } from '../toaster';
import http from './http';

export const getCourse = async () => {
  try {
    const response = await http
      .get(`api/users/user/courses`);
    return response?.data?.courses || [];
  } catch (err) {
    throw err?.response?.data;
  }
};
export const getCourseDetails = async (courseId) => {
  try {
    const response = await http
      .get(`api/users/user/course/${courseId}`);
    return response?.data?.course;
  } catch (err) {
    throw err?.response?.data?.error;
  }
};
export const getPurchasedCourse = async () => {
  try {
    const response = await http
      .get(`api/users/user/purchased`);
    return response?.data?.purchases;
  } catch (err) {
    error(err?.message || 'Something went wrong');
  }
};

export const createCourse = async (course) => {
  try {
    const response = await http
      .post('api/users/admin/course/create', course);
    success(response?.data?.message || 'Created');
    return response?.data?.message;
  } catch (err) {
    console.log(err);
    error(err?.message || 'Something went wrong');
    throw err;
  }
};
