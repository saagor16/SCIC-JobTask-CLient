import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  // Sort options
  const sortOptions = [
    { value: 'createdAt', label: 'Date Added' },
    { value: 'price', label: 'Price' }
  ];

  // Order options
  const orderOptions = {
    createdAt: [
      { value: 'desc', label: 'Newest' },
      { value: 'asc', label: 'Oldest' }
    ],
    price: [
      { value: 'asc', label: 'Low to High' },
      { value: 'desc', label: 'High to Low' }
    ]
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/productUp', {
          params: {
            page: currentPage,
            limit: 10,
            search,
            category,
            brand,
            minPrice,
            maxPrice,
            sort,
            order
          }
        });
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [currentPage, search, category, brand, minPrice, maxPrice, sort, order]);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 bg-white p-6 rounded-lg shadow-lg border border-yellow-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Product List</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {(orderOptions[sort] || []).map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProductList;
