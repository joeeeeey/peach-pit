function isIOS() {
  return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

const deviceDetect = {
  isIOS: isIOS,
}

export default deviceDetect