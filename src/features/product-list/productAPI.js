// productAPI.js

export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchSingleProduct(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/products?id=${id}`);
    const data = await response.json();
    resolve({ data });
  });
}


// ✅ Filter + Sort + Pagination
export function fetchProductByFilter(filter = {}, pagination = {}) {
  const params = new URLSearchParams();

  // 🔹 Filters + Sort
  for (let key in filter) {
    const value = filter[key];

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  }

  // 🔹 Pagination
  if (pagination._page && pagination._limit) {
    const start = (pagination._page - 1) * pagination._limit;
    params.append("_start", start);
    params.append("_limit", pagination._limit);
  }


  const url = `http://localhost:8000/products?${params.toString()}`;
  console.log("🌐 API URL:", url);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

