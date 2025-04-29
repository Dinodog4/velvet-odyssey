'use client';

import { useAuth } from '@/hooks/useDatabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Admin layout wrapper that checks authentication
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Render admin layout if authenticated
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
