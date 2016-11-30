let arr = [1,2,3];
var p = 2;
var sum = arr.reduce((prev, curr, index) => {
    return prev + Math.pow(curr, p+index);
  }, 0);
console.log(sum);