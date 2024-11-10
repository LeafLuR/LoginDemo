import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/login';
import SignIn from './pages/signin';
import { Button } from 'antd';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState(false); // false 未登录 true 已登录
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // 添加一个localStorage 模拟服务端数据
    if (!localStorage.getItem("userInfo")) {
      localStorage.setItem("userInfo", JSON.stringify([{ name: "admin", password: "1234Qwer~" }]))
    }

  }, [])

  const userInfoString = localStorage.getItem("userInfo");

  if (!status) {
    // 未登录
    return (
      <>
        <div style={{ width: 400 }}>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h2>{isLogin ? "登录" : "注册"}</h2>
        <div>
          {isLogin
            ? <Login setIsLogin={setIsLogin} setStatus={setStatus} />
            : <SignIn setIsLogin={setIsLogin} setStatus={setStatus} />
          }
        </div>
        <div style={{ width: "400px" }}>
          <p>{userInfoString}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div style={{ width: 400 }}>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>已登录</h2>
      <Button type="link" onClick={() => setStatus(false)}>退出登录</Button>
      <p>{userInfoString}</p>
    </>
  )
}

export default App
