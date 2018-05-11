function compare(a1, a2) {
  return a1.length === a2.length && a1.every(function (v, i) { return v === a2[i] })
}

const ArrOperation = {
  compare: compare,
}

export default ArrOperation