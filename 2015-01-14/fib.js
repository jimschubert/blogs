var fibonacci = { };
fibonacci[Symbol.iterator] = function*() {
  var pre = 0, cur = 1;
  for (;;) {
    var temp = pre;
    pre = cur;
    cur += temp;
    yield cur;
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000) {
    break;
  }
  process.stdout.write(n + '\n');
}
