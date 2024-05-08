import { Router, Request, Response, query } from 'express'
import axios from '../../config/axios'

const router = Router()

// get books list
router.get('/', async (req: Request, res: Response) => {
  const { page, page_size, sort, order, search_query, origna } = req.query

  const url = `/book?page=${page}&page_size=${page_size}&search_query=${search_query}&sort=${sort}&order_by=${order}`

  // url from req:Request
  const baseUrl = req.baseUrl

  await axios
    .get(url.replace(/undefined/g, ''), {
      headers: { Authorization: `Bearer ${req.session.user.token}` },
    })
    .then((response) => {
      res.render('pages/books', {
        title: 'home',
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
      return res.render('pages/books', {
        title: 'home',
        user: req.session.user,
        error: data.message,
      })
    })
})

// get book detail by id
router.get('/:id', async (req: Request, res: Response) => {
  await axios
    .get(`/book/${req.params.id}`, {
      headers: { Authorization: `Bearer ${req.session.user.token}` },
    })
    .then((response) => {
      res.render('pages/book_detail', {
        title: 'book detail',
        user: req.session.user,
        book: response.data.book,
      })
    })
    .catch((error) => {
      const { data } = error.response
      return res.render('pages/book_detail', {
        title: 'book detail',
        user: req.session.user,
        error: data.message,
      })
    })
})

export default router

/**

1 take the current page url
example /books?page_size=12

2 put the page number if exist
query :{ page: 1, page_size:12 }

3 make the link

book - base url

loop the query list

const test = (page)=>{
  const base = "book?"
  query.map(i=>{
    i
  })
}

 */
