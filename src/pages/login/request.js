// 模拟请求
export const request = function (values) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            const userInfostring = localStorage.getItem("userInfo");
            const userInfo = JSON.parse(userInfostring || "[]");
            if (Array.isArray(userInfo)) {
                const user = userInfo.find(item => item.name === values.username);
                if (user) {
                    if (user.password !== values.password) {
                        return resolve({ success: false, info: "密码错误,请重新检查" });
                    }
                    return resolve({ success: true, info: "登录成功!" });
                } else {
                    // 用户不存在
                    return resolve({ success: false, info: "用户不存在" });
                }

            }
            reject(new Error("请求错误"));
        }, 2000);
    });
}