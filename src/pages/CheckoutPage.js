import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt: "Salmon orange fabric pouch",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt: "Blue canvas satchel",
  },
  {
    id: 3,
    name: "Zip Tote Basket",
    href: "#",
    color: "White and black",
    price: "$140.00",
    quantity: 1,
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg",
    imageAlt: "Zip tote basket",
  },
];

export default function CheckoutPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
          {/* ================= LEFT : FORM ================= */}
          <div className="rounded-xl bg-white shadow-xl p-7">
            <form className="space-y-12 ">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-6 gap-6">
                  <div className="sm:col-span-3">
                    <label className="form-label">First name</label>
                    <input className="form-input" />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="form-label">Last name</label>
                    <input className="form-input" />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-input" />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="form-label">Country</label>
                    <div className="relative mt-2">
                      <select className="form-input appearance-none pr-10">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-gray-500" />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="form-label">Street address</label>
                    <input className="form-input" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="form-label">City</label>
                    <input className="form-input" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="form-label">State / Province</label>
                    <input className="form-input" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="form-label">ZIP / Postal code</label>
                    <input className="form-input" />
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
                Choose from Existing addresses
              </p>

              <div className="mt-6 space-y-4">
                {/* Address 1 */}
                <label className="flex cursor-pointer items-start gap-4 rounded-md border p-4 hover:border-indigo-600">
                  <input
                    type="radio"
                    name="address"
                    defaultChecked
                    className="mt-1 h-4 w-4 text-indigo-600"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">John wick</p>
                        <p className="text-sm text-gray-500">11th Main</p>
                        <p className="text-sm text-gray-500">110001</p>
                      </div>

                      <div className="text-right text-sm text-gray-500">
                        <p>Phone: 12312321331</p>
                        <p>Delhi</p>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Address 2 */}
                <label className="flex cursor-pointer items-start gap-4 rounded-md border p-4 hover:border-indigo-600">
                  <input
                    type="radio"
                    name="address"
                    className="mt-1 h-4 w-4 text-indigo-600"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-500">15th Main</p>
                        <p className="text-sm text-gray-500">560034</p>
                      </div>

                      <div className="text-right text-sm text-gray-500">
                        <p>Phone: 123123123</p>
                        <p>Bangalore</p>
                      </div>
                    </div>
                  </div>
                </label>
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
                    defaultChecked
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
              {products.map((product) => (
                <li key={product.id} className="flex py-6">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-24 w-24 rounded-md border object-cover"
                  />

                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between font-medium">
                      <a href={product.href}>{product.name}</a>
                      <p>{product.price}</p>
                    </div>

                    <p className="text-sm text-gray-500">{product.color}</p>

                    <div className="mt-auto flex justify-between text-sm">
                      <span>Qty {product.quantity}</span>
                      <button className="text-indigo-600 hover:text-indigo-500">
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
                <span>$262.00</span>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>

              <button className="mt-6 w-full rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-700">
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
  );
}
