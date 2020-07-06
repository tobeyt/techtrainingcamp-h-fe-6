/**
 * 随机整数服务
 *
 * @param upper_bound number 要生成的随机数上界
 * @param lower_bound number 要生成的随机数下界
 *
 * @return number 处于 [lower_bound, upper_bound) 的随机数
 */
export function nextInt(upper_bound, lower_bound = 0) {
    if (upper_bound < lower_bound)
        return nextInt(lower_bound, upper_bound);
    else if (upper_bound === lower_bound)
        return lower_bound;
    const t = upper_bound - lower_bound;
    const ran = Math.random() * t + lower_bound;
    return Math.floor(ran);
}

/**
 * 随机字符串服务
 *
 * @param length number 要生成的字符串长度
 *
 * @return string number 随机生成的字符串
 */
export function nextString(length) {
    const dict = '0123456789qwertyuioplkjhgfdsazxcvbnm';
    const param = 998244353;
    let target = '';
    while (length --) {
        const ind = Math.random() * param % dict.length;
        target += dict.charAt(ind);
    }
    return target;
}
