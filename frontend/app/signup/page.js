'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { registerUser } from '../api/userService';
import { useRouter } from 'next/navigation';

export default function signup() {

    const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
    const router = useRouter();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await registerUser(formData);
        alert('User registered successfully');
        router.push('/signin');
      } catch (err) {
        alert(err.response.data.error);
      }
    };

  return (
    <div className='bg-gray-100 flex items-center justify-center min-h-screen'>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-center mb-6">
        <Image
          alt="capx logo"
          className="h-10"
          height={40}
          src="/assets/logo.png"
          width={103}
        />
      </div>
      <h2 className="text-2xl font-semibold text-center mb-4 text-black">
        Create Your Account
      </h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Full Name
          </label>
          <input
            className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="name"
            required
            type="text"
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email address
          </label>
          <input
            className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="email"
            required
            type="email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            id="password"
            required
            type="password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md text-center font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          type="submit"
        >
          Continue
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/signin" className='text-blue-600 hover:underline"'>
            Log in
          </Link>
          
        </p>
      </div>
      <p className="text-xs text-gray-500 text-center mt-6">
        When you create a CapX account, you agree to the{' '}
        <a className="text-blue-600 hover:underline" href="#">
          Terms
        </a>{' '}
        and{' '}
        <a className="text-blue-600 hover:underline" href="#">
          Privacy Policy
        </a>
        .
      </p>
    </div>
    </div>
    
  );
}