function getRandom() {
  var array = [];
  var rand = Math.floor(Math.random() * 7);
  if (array.pop == rand) {
    return false;
  }
  array.push(rand);
  return rand;
}
for (var i = 0; i < 20; i++) {
  console.log(getRandom());
}