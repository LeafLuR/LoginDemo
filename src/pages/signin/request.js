// 模拟请求
export const signInRequest = function (values) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            const userInfostring = localStorage.getItem("userInfo");
            const userInfo = JSON.parse(userInfostring || "[]");
            if (Array.isArray(userInfo)) {
                const user = userInfo.find(item => item.name === values.username);
                if (user) {
                    return resolve({ success: false, info: "该用户名已存在" });
                } else {
                    userInfo.push({name:values.username,password:values.password});
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                    return resolve({ success: true, info: "注册成功,已登录" });
                }

            }
            reject(new Error("请求错误"))
        }, 2000);
    });
}