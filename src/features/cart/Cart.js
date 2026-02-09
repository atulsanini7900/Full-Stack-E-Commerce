import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { deleteItemFromCartAsync, selectCartItems, selectCartStatus, updateCartAsync } from "./cartSlice";




export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems)
  const status = useSelector(selectCartStatus);
  const [open, setOpen] = useState(true);


 function handleQuantity(e, product) {
  const newQty = +e.target.value;

  if (newQty === product.quantity) return;

  dispatch(updateCartAsync({ ...product, quantity: newQty }));
}

const handleDeletIntem= (e,id)=>{
  e.preventDefault();
  dispatch(deleteItemFromCartAsync(id))
}

  const totalAmount = items.reduce((amount, item)=>item.price*item.quantity+amount,0)
  const totalItems = items.reduce((total, item)=>item.quantity+total,0)

  return (
    <div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between"></div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-700">
                Cart
              </h2>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={product.name}
                            src={product.thumbnail}
                            className="size-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className="ml-4">{product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="qty"
                                className="inline mr-4 text-sm/6 font-medium text-gray-900"
                              >
                                Qty :
                              </label>

                              <select  onChange={(e)=>handleQuantity(e, product)} value={product.quantity} className="border-2">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                              onClick={e=>handleDeletIntem(e,product.id)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalAmount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total item in cart</p>
                <p>{totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link to="/">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // </div>
  );
}
