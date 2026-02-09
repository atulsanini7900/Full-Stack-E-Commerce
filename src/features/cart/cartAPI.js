export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  const { id, ...rest } = update;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/cart/" + id, {
        method: "PATCH",
        body: JSON.stringify(rest),
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function deleteCartItem(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/cart/" + itemId, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      const data = await response.json();
      resolve({ data: { id: itemId } });
    } catch (err) {
      reject(err);
    }
  });
}

export function fetchItemByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart?user" + userId);
    const data = await response.json();
    resolve({ data });
  });
}
