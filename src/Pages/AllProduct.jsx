import { useState, useEffect } from 'react';
import axios from 'axios';

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for Newest, 'asc' for Oldest
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/productAll');
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter and sort products based on price and sort order
    const filterAndSortProducts = () => {
      let filtered = products.filter((product) => (
        product.price >= priceRange.min &&
        product.price <= priceRange.max
      ));

      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });

      setFilteredProducts(filtered);
    };

    filterAndSortProducts();
  }, [products, priceRange, sortOrder]);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen mt-32">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Products</h2>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <label htmlFor="minPrice" className="mr-2 text-gray-700">Min Price:</label>
            <input
              id="minPrice"
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="maxPrice" className="mr-2 text-gray-700">Max Price:</label>
            <input
              id="maxPrice"
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="sortOrder" className="mr-2 text-gray-700">Sort by Date:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="p-3 text-left text-gray-600">#</th>
              <th className="p-3 text-left text-gray-600">Image</th>
              <th className="p-3 text-left text-gray-600">Name</th>
              <th className="p-3 text-left text-gray-600">Description</th>
              <th className="p-3 text-left text-gray-600">Price</th>
              <th className="p-3 text-left text-gray-600">Category</th>
              <th className="p-3 text-left text-gray-600">Brand</th>
              <th className="p-3 text-left text-gray-600">Ratings</th>
              <th className="p-3 text-left text-gray-600">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product, index) => (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="p-3">{startIndex + index + 1}</td>
                <td className="p-3">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.description}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.brand}</td>
                <td className="p-3">{product.ratings}</td>
                <td className="p-3">{new Date(product.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredProducts.length / itemsPerPage)))}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProduct;
