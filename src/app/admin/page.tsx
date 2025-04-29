'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login - in a real app, this would validate against a backend
    if (loginData.username === 'admin' && loginData.password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please sign in to access the admin dashboard
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
            <div className="text-sm text-center">
              <p className="text-gray-500">
                For demo purposes, use: admin / password
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Velvet Odyssey Admin</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">Welcome, Admin</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        activeTab === 'dashboard'
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('cruises')}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        activeTab === 'cruises'
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Manage Cruises
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('pages')}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        activeTab === 'pages'
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Edit Pages
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('users')}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        activeTab === 'users'
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      User Management
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        activeTab === 'settings'
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      Settings
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mt-4 bg-white shadow rounded-lg p-4">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 flex items-center"
                target="_blank"
              >
                <span>View Website</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white shadow rounded-lg p-6">
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="font-bold text-lg text-blue-800">Cruises</h3>
                      <p className="text-3xl font-bold">6</p>
                      <p className="text-sm text-gray-600">Active listings</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <h3 className="font-bold text-lg text-green-800">Inquiries</h3>
                      <p className="text-3xl font-bold">12</p>
                      <p className="text-sm text-gray-600">Last 30 days</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h3 className="font-bold text-lg text-purple-800">Visitors</h3>
                      <p className="text-3xl font-bold">1,248</p>
                      <p className="text-sm text-gray-600">Last 30 days</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Activity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Apr 24, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Added new cruise: Mediterranean Dream
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            admin
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Apr 23, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            Updated About page content
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            admin
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Apr 22, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            New contact form submission
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            system
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'cruises' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Manage Cruises</h2>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Add New Cruise
                    </button>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Destination
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date Range
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Mediterranean Dream
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Greece & Italy
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            June 15 - June 29, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Caribbean Bliss
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Eastern Caribbean
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            July 10 - July 17, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Exotic Asia
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Thailand & Vietnam
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            October 5 - October 19, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'pages' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Edit Pages</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">Home Page</h3>
                        <button className="text-blue-600 hover:text-blue-900">
                          Edit
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Last updated: Apr 20, 2025
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">About Page</h3>
                        <button className="text-blue-600 hover:text-blue-900">
                          Edit
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Last updated: Apr 23, 2025
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">Contact Page</h3>
                        <button className="text-blue-600 hover:text-blue-900">
                          Edit
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Last updated: Apr 22, 2025
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">User Management</h2>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Add New User
                    </button>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Username
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            admin
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            admin@velvetodyssey.com
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Administrator
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              Edit
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            editor
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            editor@velvetodyssey.com
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Editor
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Settings</h2>
                  <form className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">General Settings</h3>
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label htmlFor="site-title" className="block text-sm font-medium text-gray-700 mb-1">
                            Site Title
                          </label>
                          <input
                            type="text"
                            id="site-title"
                            name="site-title"
                            defaultValue="Velvet Odyssey"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="site-description" className="block text-sm font-medium text-gray-700 mb-1">
                            Site Description
                          </label>
                          <textarea
                            id="site-description"
                            name="site-description"
                            rows={3}
                            defaultValue="Experience luxury cruises designed for adults seeking adventure, relaxation, and unforgettable experiences."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            id="contact-email"
                            name="contact-email"
                            defaultValue="info@velvetodyssey.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Phone
                          </label>
                          <input
                            type="text"
                            id="contact-phone"
                            name="contact-phone"
                            defaultValue="800-123-4567"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Social Media</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
                            Facebook URL
                          </label>
                          <input
                            type="url"
                            id="facebook"
                            name="facebook"
                            defaultValue="https://facebook.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                            Instagram URL
                          </label>
                          <input
                            type="url"
                            id="instagram"
                            name="instagram"
                            defaultValue="https://instagram.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                      >
                        Save Settings
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
