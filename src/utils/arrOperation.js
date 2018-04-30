function compare(a1, a2) {
  a1.length === a2.length && a1.every(function (v, i) { return v === a2[i] })
}

const ArrOperation = {
  compare: compare,
}

export default ArrOperation