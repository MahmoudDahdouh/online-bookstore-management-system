import { Router } from 'express'
import axios from '../../config/axios'

const router = Router()

// admin page
router.get('/', async (req, res) => {
  const { page, page_size, sort, order, search_query } = req.query

  const url = `/book?page=${page}&page_size=${page_size}&search_query=${search_query}&sort=${sort}&order_by=${order}`
  const baseUrl = req.baseUrl

  await axios
    .get(url.replace(/undefined/g, ''), {
      headers: { Authorization: `Bearer ${req.session.user.token}` },
    })
    .then((response) => {
      return res.render('pages/admin', {
        title: 'admin',
        user: req.session.user,
        books: response.data.books,
        pagination: {
          current_page: response.data.page,
          pages: response.data.number_of_pages,
        },
        query: req.query,
        url: baseUrl,
      })
    })
    .catch((error) => {
      const { data } = error.response
      return res.render('pages/admin', {
        title: 'admin',
        user: req.session.user,
        error: data.message,
      })
    })
  res.render('pages/admin', { title: 'admin', user: req.session.user })
})

// add book page
router.get('/add-book', (req, res) => {
  res.render('pages/add-book', {
    title: 'add book',
    user: req.session.user,
    error: req.query.error,
    success: req.query.success,
  })
})
router.post('/add-book', async (req, res) => {
  const {
    title,
    description,
    author,
    genre,
    language,
    isbn,
    price,
    page_count,
    published_date,
  } = req.body
  console.log({ xxBody: req.body })

  await axios
    .post(
      '/book',
      {
        title,
        description,
        author,
        genre,
        language,
        isbn,
        price,
        page_count,
        published_date,
      },
      {
        headers: { Authorization: `Bearer ${req.session.user.token}` },
      }
    )
    .then(() => {
      return res.redirect('/admin/add-book?success=Book added successfully')
    })
    .catch((error) => {
      const { data } = error.response
      return res.redirect(`/admin/add-book?error=${data.message}`)
    })
})
export default router
