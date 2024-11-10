// 密码校验
export const customValidator = (_, value) => {
    // 定义正则表达式
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasPunctuation = /[!@#$%^&*(),.?":{}|<>]/; // 可以根据需要扩展标点符号集合
    // 判定密码是否存在
    if (!value) {
        return Promise.reject(new Error('请输入密码'));
    }
    // 判定是否合法
    console.log('hasNumber.test(str): ',value, hasNumber.test(value));
    if (!hasNumber.test(value) || !hasUpperCase.test(value) || !hasLowerCase.test(value) || !hasPunctuation.test(value) || value.length < 8) {
        return Promise.reject(new Error('请输入由数字,大小写字母和符号组成的至少8位密码'));
    } 
    return Promise.resolve();

}