import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { showToast } from '../utils/toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        
        if (token) {
          // If token exists, consider user authenticated
          setIsAuthenticated(true);
        } else {
          // No token means not authenticated
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication verification error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to allow state to update
    setTimeout(verifyAuth, 100);
  }, []);

  if (isLoading) {
    // 显示加载指示器
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#e0e8ff] to-[#f5f7ff]">
        <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-[#5d76c5] border-r-[#5d76c5] border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#3a5199] font-medium">验证登录状态...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    showToast('请先登录再访问此页面', 'warning');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
