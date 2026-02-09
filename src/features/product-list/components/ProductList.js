"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchAllBrandsAsync,
  fetchAllCategoryAsync,
  fetchProductsByFilterAsync,
  selectAllBrands,
  selectAllCategories,
  selectAllProducts,
} from "../productSlice";

import { SET_LIMIT_PER_PAGE } from "../../../app/constant";

import {
  FunnelIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc" },
  { name: "Price: Low to High", sort: "price", order: "asc" },
  { name: "Price: High to Low", sort: "price", order: "desc" },
];

export default function ProductList() {
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);

  const [sortOpen, setSortOpen] = useState(false);

  const [query, setQuery] = useState({
    filter: {},
    sort: {},
    page: 1,
  });

  // ---------------- FETCH FILTER DATA ----------------
  useEffect(() => {
    dispatch(fetchAllBrandsAsync());
    dispatch(fetchAllCategoryAsync());
  }, [dispatch]);

  // ---------------- MAIN API CALL ----------------
  useEffect(() => {
    dispatch(
      fetchProductsByFilterAsync({
        filter: {
          ...query.filter,
          ...query.sort,
        },
        pagination: {
          _page: query.page,
          _limit: SET_LIMIT_PER_PAGE,
        },
      })
    );
  }, [dispatch, query]);

  // ---------------- FILTER CONFIG ----------------
  const filters = [
    {
      id: brands?.id,
      name: brands?.name,
      options: brands?.options || [],
    },
    {
      id: categories?.id,
      name: categories?.name,
      options: categories?.options || [],
    },
  ];

  // ---------------- HANDLERS ----------------
  function handleFilter(e, value, sectionId) {
    const checked = e.target.checked;

    setQuery((prev) => {
      const prevValues = prev.filter[sectionId] || [];
      const updatedValues = checked
        ? [...prevValues, value]
        : prevValues.filter((v) => v !== value);

      const updatedFilter = { ...prev.filter };

      if (updatedValues.length > 0) {
        updatedFilter[sectionId] = updatedValues;
      } else {
        delete updatedFilter[sectionId];
      }

      return {
        ...prev,
        filter: updatedFilter,
        page: 1,
      };
    });
  }

  function handleSort(option) {
    setSortOpen(false);
    setQuery((prev) => ({
      ...prev,
      sort: {
        _sort: option.sort,
        _order: option.order,
      },
      page: 1,
    }));
  }

  function handlePage(page) {
    setQuery((prev) => ({
      ...prev,
      page,
    }));
  }

  // ---------------- UI ----------------
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>

          {/* SORT */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 border px-4 py-2 rounded-md text-sm bg-white hover:bg-gray-50"
            >
              Sort
              <ChevronDownIcon className="h-5 w-5" />
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                {sortOptions.map((option) => (
                  <p
                    key={option.name}
                    onClick={() => handleSort(option)}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  >
                    {option.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* FILTERS */}
          <aside className="hidden lg:block">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FunnelIcon className="h-5 w-5" />
              Filters
            </h2>

            {filters.map(
              (section) =>
                section?.id && (
                  <div key={section.id} className="mb-6">
                    <h3 className="font-medium text-gray-700 mb-2">
                      {section.name}
                    </h3>

                    {section.options.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 text-sm text-gray-600 mb-1"
                      >
                        <input
                          type="checkbox"
                          checked={
                            query.filter[section.id]?.includes(option.value) ||
                            false
                          }
                          onChange={(e) =>
                            handleFilter(e, option.value, section.id)
                          }
                          className="accent-indigo-600"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                )
            )}
          </aside>

          {/* PRODUCTS */}
          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product-detail/${product.id}`}
                  className="group"
                >
                  <div className="bg-white border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-48 w-full object-cover rounded group-hover:opacity-90"
                    />
                    <h3 className="mt-3 font-medium text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Rating: {product.rating}
                    </p>
                    <p className="mt-1 font-semibold text-indigo-600">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() =>
                  handlePage(Math.max(query.page - 1, 1))
                }
                className="p-2 border rounded hover:bg-gray-100"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePage(num)}
                  className={`px-4 py-2 border rounded ${
                    query.page === num
                      ? "bg-indigo-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => handlePage(query.page + 1)}
                className="p-2 border rounded hover:bg-gray-100"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
