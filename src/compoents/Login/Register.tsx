import { useState } from "react";
import { Link } from 'react-router-dom';

// 定义Userdata类型
type UserData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm = ({ userdata, setUserdata }: { userdata: UserData, setUserdata: React.Dispatch<React.SetStateAction<UserData>> }) => {
    // 使用useState来管理局部状态

    // 提交表单时的处理函数
    const onRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (userdata.password !== userdata.confirmPassword) {
            alert("两次密码不一致");
            return;
        }
        const submit = async () => {
            try {
                const response = await fetch('/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: userdata.username,
                        password: userdata.password,
                        email: userdata.email
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                } else {
                    alert(data.message);
                    throw new Error(`注册失败: ${data.message || '未知错误'}`);
                }
            } catch (error) {
                console.error("请求失败：", (error as Error).message); // 使用类型断言
            }
        };
        submit();
        console.log("注册信息", { userdata });
    };

    return (
        <div className="Card shadow-lg w-96">
            <form className="space-y-4 p-6 bg-base-300 rounded-lg" onSubmit={onRegister}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">用户名</span>
                    </div>
                    <input
                        type="text"
                        placeholder="输入你的用户名"
                        value={userdata.username}
                        onChange={(e) => {
                            setUserdata((prevState) => ({ ...prevState, username: e.target.value }));
                        }}
                        className="input input-bordered w-full"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">邮箱</span>
                    </div>
                    <input
                        type="email"
                        placeholder="输入邮箱"
                        value={userdata.email}
                        onChange={(e) => {
                            setUserdata((prevState) => ({ ...prevState, email: e.target.value }));
                        }}
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
                        value={userdata.password}
                        onChange={(e) => {
                            setUserdata((prevState) => ({ ...prevState, password: e.target.value }));
                        }}
                        className="input input-bordered w-full"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">确认密码</span>
                    </div>
                    <input
                        type="password"
                        placeholder="确认密码"
                        value={userdata.confirmPassword}
                        onChange={(e) => {
                            setUserdata((prevState) => ({ ...prevState, confirmPassword: e.target.value }));
                        }}
                        className="input input-bordered w-full"
                    />
                </label>

                <button className="btn btn-primary w-full">注册</button>
                <Link to="/login" className="btn btn-secondary w-full">返回登录</Link>
            </form>
        </div>
    );
};
const Register = () => {
    const [userdata, setUserdata] = useState<UserData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    return (
        <div className="flex justify-center items-center h-screen bg-base-200">
            <RegisterForm userdata={userdata} setUserdata={setUserdata}/>
        </div>
    )
}

export default Register;