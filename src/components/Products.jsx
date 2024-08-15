import { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:5000/products');
        setProducts(productsResponse.data);
        
        const brandsResponse = await axios.get('http://localhost:5000/brands');
        console.log(brandsResponse);
        const categoriesResponse = await axios.get('http://localhost:5000/categories');
        setBrands(brandsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchFilteredProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products', {
        params: {
          brand: selectedBrand,
          category: selectedCategory,
          minPrice,
          maxPrice,
          search
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'search') setSearch(value);

    if (name === 'brand') setSelectedBrand(value);
    if (name === 'category') setSelectedCategory(value);
    if (name === 'minPrice') setMinPrice(value);
    if (name === 'maxPrice') setMaxPrice(value);  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchFilteredProducts();
  };

  return (
    <div>
        
      <form onSubmit={handleFilter}>
        <div className='flex flex-col gap-4 '>
        <div>
           <input 
            type="text" 
            name="search" 
            className="grow" 
            placeholder="Search" 
            value={search} 
            onChange={handleFilterChange} 
            /> 
        </div>
        <div>
          <select name="brand" value={selectedBrand} onChange={handleFilterChange}>
          <option value="">Select Brand</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
        
        <select name="category" value={selectedCategory} onChange={handleFilterChange}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>  
        </div>
        <div>
            <input
          type="number"
          name="minPrice"
          value={minPrice}
          placeholder="Min Price"
          onChange={handleFilterChange}
        />
        
        <input
          type="number"
          name="maxPrice"
          value={maxPrice}
          placeholder="Max Price"
          onChange={handleFilterChange}
        />
        </div>
      

        </div>
        
        
        

        
        <input type="submit" className='btn' value='Search' />
      </form>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Product Name</th>
            <th className="px-4 py-2 border-b">Image</th>
            <th className="px-4 py-2 border-b">Brand Name</th>
            <th className="px-4 py-2 border-b">Category</th>
            <th className="px-4 py-2 border-b">Price</th>
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
              <td className="px-4 py-2 border-b">${product.price_range}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
