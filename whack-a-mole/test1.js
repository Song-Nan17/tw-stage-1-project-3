function getRandom() {
  var array = [];
  var rand = Math.floor(Math.random() * 7);
  // var i = array.length - 1;
  if (array.pop === rand) {
    return getRandom();
  }
  array[i+1]=rand;
  console.log(rand);
  // console.log(array);
}
for (var i = 0; i < 20; i++) {
 getRandom();
}