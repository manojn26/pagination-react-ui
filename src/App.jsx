

import { useEffect } from 'react';
import './App.css'
import { useState } from 'react';

function App() {

  const [products, setProducts] = useState()
  const [page, setPage] = useState(1)

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100")
    const data = await res.json()
    if (data && data.products) {
      setProducts(data.products)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page)
      setPage(selectedPage)
  }

  return (
    <>
      <div>
        {
          products && products.length > 0 ? <div className='products'>
            {
              products.slice(page * 10 - 10, page * 10).map((prod) => (
                <div className='products__single' key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <p>{prod.title}</p>
                </div>
              ))
            }
          </div> : null
        }
        {
          products && products.length > 0 ? <div className='pagination'>

            <span className={page > 1 ? "" : "pagination__disabled"} onClick={() => selectPageHandler(page - 1)}>◀</span>
            {
              [...Array(products.length / 10)].map((_, i) => (
                <span className={page === i + 1 ? "pagination__selected" : ""} key={i} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
              ))
            }

            <span className={page < products.length / 10 ? "" : "pagination__disabled"} onClick={() => selectPageHandler(page + 1)}>▶</span>
          </div> : null
        }
      </div>
    </>
  )
}

export default App
