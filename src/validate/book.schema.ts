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

export const updateBookSchema = Yup.object({
  params: Yup.object({
    id: Yup.number()
      .label('id')
      .positive()
      .typeError('id must be a number.')
      .required(),
  }),
  body: Yup.object({
    title: Yup.string()
      .label('title')
      .trim()
      .min(3)
      .max(255)
      .transform((value) => (value == '' ? undefined : value)),
    description: Yup.string()
      .label('description')
      .trim()
      .min(3)
      .max(5000)
      .transform((value) => (value == '' ? undefined : value)),
    author: Yup.string()
      .label('author')
      .trim()
      .min(3)
      .max(255)
      .transform((value) => (value == '' ? undefined : value)),
    genre: Yup.string()
      .label('genre')
      .trim()
      .min(3)
      .max(64)
      .transform((value) => (value == '' ? undefined : value)),
    language: Yup.string()
      .label('language')
      .trim()
      .min(3)
      .max(64)
      .transform((value) => (value == '' ? undefined : value)),
    isbn: Yup.string()
      .label('isbn')
      .length(13)
      .nullable()
      .transform((value) => (value == '' ? undefined : value)),
    price: Yup.number()
      .label('price')
      .positive()
      .nullable()
      .transform((value) => (isNaN(value) ? undefined : value)),
    page_count: Yup.number()
      .label('page count')
      .positive()
      .nullable()
      .transform((value) => (isNaN(value) ? undefined : value)),
    published_date: Yup.date()
      .label('published date')
      .nullable()
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(new Date()),
  }),
})
