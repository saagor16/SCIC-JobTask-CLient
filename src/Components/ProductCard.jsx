/* eslint-disable react/prop-types */

const ProductCard = ({ product }) => {
  return (
    <div className="border border-yellow-400 p-4 rounded-lg shadow-lg bg-gradient-to-br from-white via-gray-50 to-yellow-50">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2 rounded-md" />
      <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-bold text-yellow-600">${product.price}</p>
      <p className="text-sm text-gray-500">Category: {product.category}</p>
      <p className="text-sm text-gray-500">Brand: {product.brand}</p>
      <p className="text-sm text-gray-500">Ratings: {product.ratings}</p>
      <p className="text-sm text-gray-500">Added on: {new Date(product.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ProductCard;
