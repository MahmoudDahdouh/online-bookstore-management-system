import * as Yup from 'yup'

export const createBookSchema = Yup.object({
  body: Yup.object({
    title: Yup.string().label('title').trim().min(3).max(255).required(),
    description: Yup.string()
      .label('description')
      .trim()
      .min(3)
      .max(5000)
      .required(),
    author: Yup.string().label('author').trim().min(3).max(255).required(),
    genre: Yup.string().label('genre').trim().min(3).max(64).required(),
    language: Yup.string().label('language').trim().min(3).max(64).required(),
    isbn: Yup.string().label('isbn').length(13).required(),
    price: Yup.number().label('price').positive().required(),
    page_count: Yup.number().label('page count').positive().required(),
    published_date: Yup.date()
      .label('published date')
      .max(new Date())
      .required(),
  }),
})
