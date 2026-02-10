import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/authSlice";
import { addOrderAsync } from "../features/orders/orderSlice";

export default function CheckoutPage() {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const user = useSelector(selectLoggedInUser);
  const address = user?.addresses || [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleDeletIntem = (e, id) => {
    e.preventDefault();
    dispatch(deleteItemFromCartAsync(id));
  };

  function handleQuantity(e, product) {
    const newQty = +e.target.value;
    if (newQty === product.quantity) return;
    dispatch(updateCartAsync({ ...product, quantity: newQty }));
  }

  const totalAmount = items
    .reduce((amount, item) => item.price * item.quantity + amount, 0)
    .toFixed(2);

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const [open, setOpen] = useState(true);

  const onSubmit = async (data) => {
    // const result = await dispatch(loginUserAsync(data));
    // if (loginUserAsync.fulfilled.match(result)) {
    //   navigate(from, { replace: true });
    // }

    dispatch(
      updateUserAsync({
        ...user,
        addresses: [...(user.addresses || []), data],
      }),
      reset(),
    );
    console.log("data", data);
  };

  const handleOrder = () => {
    const order = {
      items,
      user,
      totalAmount,
      totalItems,
      paymentMethod,
      selectedAddress,
    };
    dispatch(addOrderAsync(order));
    console.log("Order Now", order);
  };
  useEffect(() => {
    if (address.length) {
      setSelectedAddress(address.length - 1);
    }
  }, [address]);

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
            {/* ================= LEFT : FORM ================= */}
            <div className="rounded-xl bg-white shadow-xl p-7">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 ">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-6 gap-6">
                    <div className="sm:col-span-4">
                      <label className="form-label">Full name</label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        className="form-input"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-4">
                      <label className="form-label">Email address</label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                        })}
                        type="email"
                        className="form-input"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-4">
                      <label className="form-label">Phone</label>
                      <div className="relative mt-2">
                        <input
                          {...register("phone", {
                            required: "Phone No. is required",
                          })}
                          type="tel"
                          className="form-input "
                        ></input>
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-6">
                      <label className="form-label">Street address</label>
                      <input
                        {...register("address", {
                          required: "Address is required",
                        })}
                        className="form-input"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="form-label">City</label>
                      <input
                        {...register("city", { required: "City is required" })}
                        className="form-input"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="form-label">State / Province</label>
                      <input
                        {...register("state", {
                          required: "State is required",
                        })}
                        className="form-input"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="form-label">ZIP / Postal code</label>
                      <input
                        {...register("zipcode", {
                          required: "ZIP / Postal Code is required",
                        })}
                        className="form-input"
                      />
                      {errors.zipcode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.zipcode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Save
                  </button>
                </div>
              </form>
              {/* ================= ADDRESSES ================= */}
              <div className="border-t border-gray-200 pt-10">
                <h2 className="text-base font-semibold text-gray-900">
                  Addresses
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Choose from existing addresses
                </p>

                <div className="mt-6 space-y-4">
                  {address.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No saved addresses. Please add one above.
                    </p>
                  )}

                  {address.map((address, index) => (
                    <label
                      key={index}
                      className={`flex cursor-pointer items-start gap-4 rounded-md border p-4
        ${selectedAddress === index ? "border-indigo-600" : "border-gray-300"}
        `}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress?.zipcode === address.zipcode}
                        onChange={() => setSelectedAddress(address)}
                        className="mt-1 h-4 w-4 text-indigo-600"
                      />

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {address.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {address.address}
                            </p>
                            <p className="text-sm text-gray-500">
                              {address.city}, {address.state} -{" "}
                              {address.zipcode}
                            </p>
                          </div>

                          <div className="text-right text-sm text-gray-500">
                            <p>Phone: {address.phone}</p>
                            <p>{address.city}</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* ================= PAYMENT METHODS ================= */}
              <div className="border-t border-gray-200 pt-10">
                <h2 className="text-base font-semibold text-gray-900">
                  Payment Methods
                </h2>
                <p className="mt-1 text-sm text-gray-500">Choose One</p>

                <div className="mt-6 space-y-4">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      defaultChecked
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      Cash
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      Card Payment
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* ================= RIGHT : CART ================= */}
            <div className="rounded-xl bg-white shadow-xl">
              <div className="px-6 py-5 flex justify-between items-center border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>
                <button onClick={() => setOpen(false)}>
                  <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                </button>
              </div>

              <ul className="divide-y px-6">
                {items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-24 w-24 rounded-md border object-cover"
                    />

                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between font-medium">
                        <a href={product.href}>{product.title}</a>
                        <p>{product.price}</p>
                      </div>

                      <p className="text-sm text-gray-500">{product.color}</p>

                      <div className="mt-auto flex justify-between text-sm">
                        {/* <span>Qty {product.quantity}</span> */}

                        <div className="text-gray-500">
                          <label
                            htmlFor="qty"
                            className="inline mr-4 text-sm/6 font-medium text-gray-900"
                          >
                            Qty :
                          </label>

                          <select
                            onChange={(e) => handleQuantity(e, product)}
                            value={product.quantity}
                            className="border-2"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <button
                          onClick={(e) => handleDeletIntem(e, product.id)}
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t px-6 py-5">
                <div className="flex justify-between font-medium">
                  <span>Subtotal</span>
                  <span>{totalAmount}</span>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>

                <button
                  onClick={handleOrder}
                  className="mt-6 w-full rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-700"
                >
                  Pay and Order
                </button>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to="/cart">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit Cart
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COMMON INPUT STYLES ================= */}
        <style jsx global>{`
          .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #111827;
          }
          .form-input {
            margin-top: 0.5rem;
            width: 100%;
            border-radius: 0.375rem;
            border: 1px solid #d1d5db;
            padding: 0.5rem 0.75rem;
            outline: none;
          }
          .form-input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 1px #6366f1;
          }
        `}</style>
      </div>
    </>
  );
}
