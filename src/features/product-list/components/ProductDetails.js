"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  fetchSingleProductAsync,
  selectSelectedProduct,
} from "../productSlice";
import { addToCartAsync } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
// import {
//   fetchSingleProductAsync,
//   selectSelectedProduct,
// } from "../productSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const productArr = useSelector(selectSelectedProduct);
  const product = productArr?.[0];

  function handleCart(e) {
e.preventDefault()
    dispatch(addToCartAsync({ ...product, quantity: 1, user }))
  }
  // 🔥 Fetch product by ID
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProductAsync(id));
    }
  }, [dispatch, id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="pt-6 max-w-7xl mx-auto px-4">
        {/* ---------- Breadcrumb ---------- */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="capitalize">{product.category}</li>
            <li>/</li>
            <li className="font-medium text-gray-900">{product.title}</li>
          </ol>
        </nav>

        {/* ---------- Images ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-[420px] object-cover rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {product.images?.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.title}
                className="h-40 w-full object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* ---------- Info ---------- */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <p className="mt-4 text-gray-700">{product.description}</p>

            {/* Reviews */}
            <div className="mt-6 flex items-center">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon
                  key={i}
                  className={classNames(
                    product.rating > i ? "text-yellow-400" : "text-gray-300",
                    "h-5 w-5",
                  )}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} rating
              </span>
            </div>

            {/* Reviews list */}
            {product.reviews?.length > 0 && (
              <div className="mt-10">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Customer Reviews
                </h3>

                <div className="space-y-4">
                  {product.reviews.map((review, idx) => (
                    <div key={idx} className="border rounded-md p-4">
                      <div className="flex items-center mb-1">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <StarIcon
                            key={i}
                            className={classNames(
                              review.rating > i
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "h-4 w-4",
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        — {review.reviewerName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="border rounded-lg p-6 h-fit">
            <p className="text-3xl font-bold text-indigo-600">
              ₹{product.price}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Brand: <span className="font-medium">{product.brand}</span>
            </p>

            <button
              onClick={handleCart}
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>

            <Link
              to="/"
              className="block text-center mt-4 text-sm text-indigo-600 hover:underline"
            >
              ← Back to products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
