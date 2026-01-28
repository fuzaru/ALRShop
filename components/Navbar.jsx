"use client"
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {

  const { isSeller, router, user } = useAppContext(); //ADD API HERE
  const { openSignIn } = useClerk()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/95 shadow-lg border-b border-gray-100">
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4">
        {/* Logo */}
        <Image
          className="cursor-pointer w-28 md:w-32 hover:opacity-80 transition-opacity duration-200"
          onClick={() => router.push('/')}
          src={assets.logo}
          alt="logo"
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 font-medium hover:text-red-600 transition-colors duration-200">
            Home
          </Link>
          <Link href="/all-products" className="text-gray-700 font-medium hover:text-red-600 transition-colors duration-200">
            Shop
          </Link>
          <Link href="/about-us" className="text-gray-700 font-medium hover:text-red-600 transition-colors duration-200">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-700 font-medium hover:text-red-600 transition-colors duration-200">
            Contact
          </Link>

          {isSeller && <button onClick={() => router.push('/seller')} className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-full hover:shadow-lg hover:shadow-red-200 transition-all duration-200 transform hover:scale-105">Seller Dashboard</button>}
        </div>

        {/* Right Side - Desktop */}
        <ul className="hidden md:flex items-center gap-6">
          {
            user
              ? <>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                  </UserButton.MenuItems>
                  <UserButton.MenuItems>
                    <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
                  </UserButton.MenuItems>
                </UserButton>
              </>
              : <button onClick={openSignIn} className="flex items-center gap-2 px-6 py-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 font-medium transition-all duration-200">
                <Image src={assets.user_icon} alt="user icon" width={20} height={20} />
                <span>Account</span>
              </button>}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 justify-center items-center"
        >
          <div className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link href="/" className="text-gray-700 font-medium hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/all-products" className="text-gray-700 font-medium hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </Link>
            <Link href="/" className="text-gray-700 font-medium hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/about-us" className="text-gray-700 font-medium hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 font-medium hover:text-red-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>

            {isSeller && (
              <button 
                onClick={() => { router.push('/seller'); setMobileMenuOpen(false); }} 
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-full hover:shadow-lg transition-all"
              >
                Seller Dashboard
              </button>
            )}

            <div className="border-t border-gray-200 pt-4">
              {user ? (
                <>
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => { router.push('/'); setMobileMenuOpen(false); }} />
                    </UserButton.MenuItems>
                    <UserButton.MenuItems>
                      <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => { router.push('/all-products'); setMobileMenuOpen(false); }} />
                    </UserButton.MenuItems>
                    <UserButton.MenuItems>
                      <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => { router.push('/cart'); setMobileMenuOpen(false); }} />
                    </UserButton.MenuItems>
                    <UserButton.MenuItems>
                      <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => { router.push('/my-orders'); setMobileMenuOpen(false); }} />
                    </UserButton.MenuItems>
                  </UserButton>
                </>
              ) : (
                <button 
                  onClick={() => { openSignIn(); setMobileMenuOpen(false); }} 
                  className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700 font-medium rounded-lg transition-all"
                >
                  <Image src={assets.user_icon} alt="user icon" width={20} height={20} />
                  <span>Account</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;