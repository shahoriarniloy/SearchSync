import { useEffect, useState } from 'react';
import axios from 'axios'; 

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        console.log(response.data); 
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const viewProduct = (id) => {
    console.log('View product:', id);
  };

  const addToCart = (product) => {
    console.log('Add to cart:', product);
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Product Name</th>
          <th className="px-4 py-2 border-b">Image</th>
          <th className="px-4 py-2 border-b">Brand Name</th>
          <th className="px-4 py-2 border-b">Category</th>
          <th className="px-4 py-2 border-b">Actions</th>
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
            <td className="px-4 py-2 border-b">
              <button onClick={() => viewProduct(product._id)} className="text-blue-500 hover:text-blue-700 mx-2">
                View
              </button>
              <button onClick={() => addToCart(product)} className="text-green-500 hover:text-green-700 mx-2">
                Add to Cart
              </button>
            </td>
          </tr>
        )) : null}
      </tbody>
    </table>
  );
};

export default Products;
