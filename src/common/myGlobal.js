/**
 * 数组添加
 * @param index
 * @param item
 */
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};
/**
 * 数组删除项
 * @param index
 */
Array.prototype.delete = function (index) {
  this.splice(index, 1);
};
Array.prototype.contains = function (item) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === item) {
      return true;
    }
  }
  return false;
};

/**
 * 计算不同的数据 [1,2,4].diff([1,2]) = [4]
 * @param item
 * @returns {*[]}
 */
Array.prototype.diff = function (item) {
  return this.filter(function (currentValue) {
    return item.indexOf(currentValue) < 0;
  });
};
export default class myGlobal {
}
