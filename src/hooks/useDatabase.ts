'use client';

import { useState, useEffect } from 'react';
import { getDatabase, Cruise, Page } from '@/lib/db';

// Custom hook for accessing and manipulating cruises
export function useCruises() {
  const [cruises, setCruises] = useState<Cruise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get database instance
  const db = getDatabase();
  
  // Load all cruises
  const loadCruises = () => {
    setLoading(true);
    try {
      const allCruises = db.getCruises();
      setCruises(allCruises);
      setError(null);
    } catch (err) {
      setError('Failed to load cruises');
      setCruises([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Get a single cruise by slug
  const getCruiseBySlug = (slug: string) => {
    try {
      return db.getCruiseBySlug(slug);
    } catch (err) {
      setError('Failed to load cruise');
      return undefined;
    }
  };
  
  // Get featured cruises
  const getFeaturedCruises = () => {
    try {
      return db.getFeaturedCruises();
    } catch (err) {
      setError('Failed to load featured cruises');
      return [];
    }
  };
  
  // Create a new cruise
  const createCruise = (cruise: Omit<Cruise, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newCruise = db.createCruise(cruise);
      loadCruises(); // Reload cruises after creating
      return newCruise;
    } catch (err) {
      setError('Failed to create cruise');
      return null;
    }
  };
  
  // Update an existing cruise
  const updateCruise = (id: string, cruise: Partial<Cruise>) => {
    try {
      const updatedCruise = db.updateCruise(id, cruise);
      loadCruises(); // Reload cruises after updating
      return updatedCruise;
    } catch (err) {
      setError('Failed to update cruise');
      return null;
    }
  };
  
  // Delete a cruise
  const deleteCruise = (id: string) => {
    try {
      const success = db.deleteCruise(id);
      if (success) {
        loadCruises(); // Reload cruises after deleting
      }
      return success;
    } catch (err) {
      setError('Failed to delete cruise');
      return false;
    }
  };
  
  // Load cruises on component mount
  useEffect(() => {
    loadCruises();
  }, []);
  
  return {
    cruises,
    loading,
    error,
    loadCruises,
    getCruiseBySlug,
    getFeaturedCruises,
    createCruise,
    updateCruise,
    deleteCruise,
  };
}

// Custom hook for accessing and manipulating pages
export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get database instance
  const db = getDatabase();
  
  // Load all pages
  const loadPages = () => {
    setLoading(true);
    try {
      const allPages = db.getPages();
      setPages(allPages);
      setError(null);
    } catch (err) {
      setError('Failed to load pages');
      setPages([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Get a single page by slug
  const getPageBySlug = (slug: string) => {
    try {
      return db.getPageBySlug(slug);
    } catch (err) {
      setError('Failed to load page');
      return undefined;
    }
  };
  
  // Update an existing page
  const updatePage = (id: string, page: Partial<Page>) => {
    try {
      const updatedPage = db.updatePage(id, page);
      loadPages(); // Reload pages after updating
      return updatedPage;
    } catch (err) {
      setError('Failed to update page');
      return null;
    }
  };
  
  // Load pages on component mount
  useEffect(() => {
    loadPages();
  }, []);
  
  return {
    pages,
    loading,
    error,
    loadPages,
    getPageBySlug,
    updatePage,
  };
}

// Custom hook for user authentication
export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get database instance
  const db = getDatabase();
  
  // Login user
  const login = (username: string, password: string) => {
    setLoading(true);
    try {
      const authenticatedUser = db.authenticateUser(username, password);
      if (authenticatedUser) {
        setUser(authenticatedUser);
        setError(null);
        
        // Store user session in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('velvet_odyssey_user', JSON.stringify(authenticatedUser));
        }
        
        return true;
      } else {
        setError('Invalid username or password');
        return false;
      }
    } catch (err) {
      setError('Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout user
  const logout = () => {
    setUser(null);
    
    // Remove user session from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('velvet_odyssey_user');
    }
  };
  
  // Check if user is logged in on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('velvet_odyssey_user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (err) {
          // Invalid stored user, clear it
          localStorage.removeItem('velvet_odyssey_user');
        }
      }
    }
  }, []);
  
  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };
}
