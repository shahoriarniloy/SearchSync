import { useEffect, useState } from 'react';
import axios from 'axios'; 

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (searchQuery = '') => {
    try {
      const response = await axios.get('http://localhost:5000/products', {
        params: { search: searchQuery }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    fetchProducts(searchText);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" className="grow" placeholder="Search" />
        <input type="submit" className='btn' value='Search' />
      </form>
      
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Product Name</th>
            <th className="px-4 py-2 border-b">Image</th>
            <th className="px-4 py-2 border-b">Brand Name</th>
            <th className="px-4 py-2 border-b">Category</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) ? products.map((product) => (
            <tr key={product._id} className="text-center">
              <td className="px-4 py-2 border-b">{product.product_name}</td>
              <td className="px-4 py-2 border-b">
                <img 
                  src={product.image_url} 
                  alt={product.product_name} 
                  style={{ height: '100px' }} 
                />
              </td>
              <td className="px-4 py-2 border-b">{product.brand_name}</td>
              <td className="px-4 py-2 border-b">{product.category_name}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
