import { useState } from "react";

const RegisterForm = ({username, setUsername, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, onRegister}) => {
    return (
        <div className="Card shadow-lg w-96">
            <form className="space-y-4 p-6 bg-base-300 rounded-lg " onSubmit={onRegister}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">用户名</span>
                    </div>
                    <input type="text" placeholder="输入你的用户名" value={username} 
                    onChange={(e) => setUsername(e.target.value)} className="input input-bordered w-full"/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">邮箱</span>
                    </div>
                    <input type="email" placeholder="输入邮箱" value={email} 
                    onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full"/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">密码</span>
                    </div>
                    <input type="password" placeholder="输入密码" value={password} 
                    onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full"/>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">确认密码</span>
                    </div>
                    <input type="password" placeholder="确认密码" value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} className="input input-bordered w-full"/>
                </label>
                <button className="btn btn-primary w-full" >注册</button>
            </form>
        </div>
    )
}
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className="flex justify-center items-center h-screen bg-base-200">
            <RegisterForm 
            username={username} 
            setUsername={setUsername} 
            email={email} 
            setEmail={setEmail} 
            password={password} 
            setPassword={setPassword} 
            confirmPassword={confirmPassword} 
            setConfirmPassword={setConfirmPassword} 
            onRegister={onRegister} />
        </div>
    )
}

export default Register;