import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const noOfPages = Math.ceil(totalProducts / itemsPerPage);
  const pages = [...Array(noOfPages).keys()];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(`https://search-sync.vercel.app/products?page=${currentPage}&size=${itemsPerPage}`);

        setProducts(productsResponse.data.products);
        setTotalProducts(productsResponse.data.totalProducts);
        
        const brandsResponse = await axios.get('https://search-sync.vercel.app/brands');
        const categoriesResponse = await axios.get('https://search-sync.vercel.app/categories');
        setBrands(brandsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchFilteredProducts = async () => {
    try {
      const response = await axios.get(`https://search-sync.vercel.app/products?page=${currentPage}&size=${itemsPerPage}`, {
        params: {
          brand: selectedBrand,
          category: selectedCategory,
          minPrice,
          maxPrice,
          search,
          sort: sortOrder
        }
      });
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      // console.error('Error fetching products:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'search') setSearch(value);
    if (name === 'brand') setSelectedBrand(value);
    if (name === 'category') setSelectedCategory(value);
    if (name === 'minPrice') setMinPrice(value);
    if (name === 'maxPrice') setMaxPrice(value);
    if (name === 'sortOrder') setSortOrder(value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchFilteredProducts();
  };

  const handleClear = () => {
    setSelectedBrand('');
    setSearch('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortOrder('');
    setProducts([]);
  };

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-blue-50  p-4">
      <Helmet>
        <title>SearchSync</title>
      </Helmet>
      <form onSubmit={handleFilter} className="mb-8 p-4 bg-blue-100 rounded-lg shadow-md w-full text-sm">
        <div className='flex flex-col gap-6'>
          <div className='flex justify-start'>
            <input
              type="text"
              name="search"
              className="grow px-6 py-2 rounded-lg w-1/2 bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              placeholder="Search"
              value={search}
              onChange={handleFilterChange}
            />
          </div>
          <div className='flex lg:flex-row md:flex-row flex-col gap-4 justify-start'>
            <select
              name="brand"
              value={selectedBrand}
              onChange={handleFilterChange}
              className='px-6 py-2 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
            >
              <option value="">Select Brand</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              name="category"
              value={selectedCategory}
              onChange={handleFilterChange}
              className='px-6 py-2 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className='flex lg:flex-row md:flex-row flex-col justify-start gap-4'>
            <input
              type="number"
              name="minPrice"
              value={minPrice}
              placeholder="Min Price"
              onChange={handleFilterChange}
              className='px-6 py-2 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
            />

            <input
              type="number"
              name="maxPrice"
              value={maxPrice}
              placeholder="Max Price"
              onChange={handleFilterChange}
              className='px-6 py-2 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
            />
          </div>

          <div className='flex justify-start gap-4'>
  <select
    name="sortOrder"
    value={sortOrder}
    onChange={handleFilterChange}
    className='px-6 py-2 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
  >
    <option value="">Sort by</option>
    <option value="asc">Price: Low to High</option>
    <option value="desc">Price: High to Low</option>
    <option value="date_asc">Date: Oldest First</option>
    <option value="date_desc">Date: Newest First</option>
  </select>
</div>

        </div>
        <div className='mt-6 flex gap-4'>
          <input
            type="submit"
            className='px-8 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200'
            value='Search'
          />
          <button
            type="button"
            onClick={handleClear}
            className='px-8 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300'
          >
            Clear
          </button>
        </div>
      </form>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-blue-900">Total Products: {totalProducts}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map(product => (
        <div
          key={product._id}
          className="card bg-base-100 shadow-xl flex flex-col items-center p-4"
        >
          <figure className="mb-4">
            <img
              src={product.image_url}
              alt={product.product_name}
              className="h-40 w-auto"
            />
          </figure>
          <div className="text-left w-full">
            <h2 className="card-title text-center text-lg mb-2">{product.product_name}</h2>
            
            <p className="text-xs mb-2"> {product.description}</p>
            <p className="text-sm font-bold">Brand: {product.brand_name}</p>
            <p className="text-sm font-bold">Category: {product.category_name}</p>
            <p className="text-sm font-bold">Rating: {product.ratings}</p>
            <p className="text-sm font-bold">Price: ${product.price_range}</p>
            <p className="text-sm font-bold">Created On: {product.product_creation_date_time}</p>
          </div>
        </div>
      ))}
    </div>


      <div className='p-4 flex justify-center items-center'>
        <button
          className='px-4 py-2 mr-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700'
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Prev
        </button>
        <div className="flex gap-2">
          {pages.map(page => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg ${page === currentPage ? 'bg-blue-200' : 'bg-white'} border border-blue-300`}
              onClick={() => setCurrentPage(page)}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <button
          className='px-4 py-2 ml-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700'
          onClick={handleNextPage}
          disabled={currentPage === pages.length - 1}
        >
          Next
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <label htmlFor="itemsPerPage" className="text-sm font-medium text-blue-900">
          Number of Products Per Page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          className="px-4 py-2 rounded-lg bg-white text-blue-900 border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Products;
