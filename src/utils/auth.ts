import { fetchWithAuth } from './api';

/**
 * 检查用户是否已经登录
 * @returns Promise<boolean> 表示用户是否已通过身份验证的承诺
 */
export const checkUserAuth = async (): Promise<boolean> => {
  try {
    // 检查使用本地存储的API，直接检查localStorage中是否存在token
    const token = localStorage.getItem('token');
    return !!token;
  } catch (error) {
    console.error('身份验证检查失败:', error);
    return false;
  }
};

/**
 * 执行用户登出操作
 * @returns Promise<boolean> 表示登出操作是否成功的承诺
 */
export const logoutUser = async (): Promise<boolean> => {
  try {
    const result = await fetchWithAuth('/api/user/logout', 'GET');
    if (result.code === 200) {
      // 清除本地存储的认证信息
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      return true;
    }
    return false;
  } catch (error) {
    console.error('登出失败:', error);
    return false;
  }
};

/**
 * 判断本地存储中是否有认证信息
 * 这可用于快速检查，不需要API调用
 */
export const hasLocalAuthInfo = (): boolean => {
  return !!localStorage.getItem('token');
};
