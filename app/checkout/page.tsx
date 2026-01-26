"use client";

import { useCartStore } from "@/app/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Total calculation
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Yahan hum sirf aik fake delay add kar rahe hain taake professional feel aaye
    setTimeout(() => {
      alert("Mubarak Ho! Aapka Order receive ho gaya hai. Hum jald hi aap se rabta karenge.");
      clearCart();
      router.push("/"); // Order ke baad home page par wapis
    }, 2000);
  };

  // Agar cart khali hai toh redirect kar dein ya message dikhayein
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Aapka cart khali hai!</h2>
        <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Wapis Shopping Karein</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Shipping Form */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-500 mt-2">Shipping Information (Cash on Delivery)</p>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" placeholder="First Name" required 
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
              <input 
                type="text" placeholder="Last Name" required 
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
            <input 
              type="email" placeholder="Email Address" required 
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
            <input 
              type="text" placeholder="Phone Number (e.g. 03001234567)" required 
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
            <textarea 
              placeholder="Shipping Address" required 
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition h-32"
            ></textarea>

            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
              <input type="radio" checked readOnly className="h-5 w-5 accent-blue-600" />
              <span className="text-blue-900 font-medium">Cash on Delivery (Pay when you receive)</span>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-black text-white active:scale-95"
              }`}
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-100 bg-gray-50 p-8 rounded-3xl h-fit border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.slug} className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 bg-white rounded-lg p-1 border">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-contain" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate w-32">{item.name}</span>
                </div>
                <span className="text-sm font-bold">x{item.quantity}</span>
                <span className="text-sm font-bold text-gray-900">Rs. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-2">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>Rs. {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-xl font-black text-gray-900 pt-4">
              <span>Total</span>
              <span>Rs. {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}