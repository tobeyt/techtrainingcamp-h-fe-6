const roomID = Math.floor(Math.random() * 9e5 + 1e5);
const godToken = (Math.random() * 1e17).toString(36);

console.log(roomID);
console.log(godToken);

const array = [1, 2, 3, 4, 5];
array.forEach((cur) => cur + 1);
console.log(array);

let res = "女巫" in ["预言家", "女巫", "猎人", "平民"];
console.log(res);