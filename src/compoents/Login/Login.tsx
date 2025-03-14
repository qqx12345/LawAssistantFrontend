import { Dispatch, SetStateAction, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//定义LoginForm的props的接口
interface LoginFormProps {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    rememberMe: boolean;
    setRememberMe: Dispatch<SetStateAction<boolean>>;
    onLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    error: string;
}

// 登陆表单组件
const LoginForm: React.FC<LoginFormProps> = ({
    username,
    setUsername,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    onLogin,
    error
}) => {
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
                    className="input input-bordered w-full" />
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
                    className="input input-bordered w-full" />
            </label>

            <label className="form-control">
                <div className="label cursor-pointer">
                    <span className="label-text">记住我</span>
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)} />
                </div>
            </label>

            {error && (
                <div className='toast toast-top toast-end'>
                    <div className='alert alert-info'>
                    <span>{error}</span>
                    </div>
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary w-full">
                登陆
            </button>

            <p className="text-center text-xs">没有账号？</p>
            <Link to="/register" className="btn btn-secondary w-full">注册</Link>
        </form>
    </div>
    );
}  

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const onLogin = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setError('用户名或密码不能为空');
            return;
        }
        setError('');
        try {
            const timeoutPromise = new Promise<Response>((_, reject) => {
                setTimeout(() => { reject(new Error('Login failed')); }, 2000);
            });
            const response = await Promise.race<Response>([
                fetch('/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                }),
                timeoutPromise
            ]);
            if (!response.ok) {
                console.error(response);
                setError('登录失败');
                return;
            }
            console.log('login success');
            if (rememberMe) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                localStorage.setItem('rememberMe', 'false');
            }
            setTimeout(() => navigate('/login'), 2000);
        } catch (e) {
            console.error(e);
            setError('登录失败');
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <p>Login</p>
            <LoginForm 
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
                onLogin={onLogin}
                error={error} />
        </div>
    )
}

export default Login;