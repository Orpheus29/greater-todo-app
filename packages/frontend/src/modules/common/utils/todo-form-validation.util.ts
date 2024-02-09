import * as yup from 'yup';

export const todoFormSchema = yup.object({
  title: yup.string().max(100).required('title is required'),
  description: yup.string().required('description is required')
});
