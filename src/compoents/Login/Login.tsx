import React, { ReactEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Login failed'));
      }, 2000);
    });

    try {
      const response = await Promise.race([
        fetch('/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        }),
        timeoutPromise,
      ]);

      if (!response.ok) {
        toast.error('Login failed');
        return;
      }
      toast.success('Login successful');

      if (rememberMe) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.setItem('rememberMe', 'false');
      }

      setTimeout(() => navigate('/'), 2000);
    } catch (e) {
      console.error(e);
      toast.error('Login failed');
    }
  };

  const LoginForm = React.memo(() => {
    return (
      <div className="card shadow-lg w-96">
        <form className="space-y-4 p-6 bg-base-200 rounded-lg" onSubmit={onLogin}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">用户名</span>
            </div>
            <input
              type="text"
              placeholder="输入你的用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">密码</span>
            </div>
            <input
              type="password"
              placeholder="输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control">
            <div className="label cursor-pointer">
              <span className="label-text">记住我</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </div>
          </label>

          <button className="btn btn-primary w-full">提交</button>
        </form>
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Login</p>
      <LoginForm />
    </div>
  );
};

export default Login;
