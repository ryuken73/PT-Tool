const { ipcRenderer } = require('electron');
const MEDIA_EXTENSIONS = ['MP4', 'OGG', 'WEBM'];

const getVersion = async () => {
  return ipcRenderer.invoke('getVersion');
};

const getIpAddresses = async () => {
  return ipcRenderer.invoke('getIpAddresses');
};

// const captureScreen = async () => {
//   return ipcRenderer.invoke('captureScreen');
// };

const toggleWindowMaximize = async () => {
  return ipcRenderer.invoke('toggleWindowMaximize');
};

const quitApp = async () => {
  return ipcRenderer.invoke('quitApp');
};

const isHlsStream = (url) => {
  const hasMediaFileExt = MEDIA_EXTENSIONS.some((ext) => url.toUpperCase().endsWith(ext));
  return !hasMediaFileExt;
}

const secondsToTime = (seconds, format='mm:ss') => {
  // console.log('####', seconds)
  const startIndex = format.startsWith('hh:') ? 11 :
                     format.startsWith('mm:') ? 14 :
                     17
  const sliceLength = format.length;
  if(isNaN(seconds) || typeof(seconds) !== 'number' || seconds === Infinity){
    return '00:00'
  }
  return new Date(seconds*1000).toISOString().substr(startIndex, sliceLength)
}

const arrayAvg = (sources) => {
  const { length } = sources;
  const sum = sources.reduce((acct, source) => {
    return acct + source
  }, 0)
  return sum / length;
};

const arrayBitWiseSum = (arrayParent) => {
  return arrayParent.reduce((acct, arrayChild) => {
    return arrayChild.map((value, childIndex) => {
      return value + (acct[childIndex] === undefined ? 0 : acct[childIndex]);
    })
  }, []);
};

const arrayBitWiseAvg = (arrayParent) => {
  const { length } = arrayParent;
  const sumArray = arrayBitWiseSum(arrayParent);
  return sumArray.map((value) => value / length);
};

const pickArrayFraction = (array, from, to) => {
  return array.slice(from, to + 1);
};

// positions = [[x0,y0], [x1,y1]....,[xx, yy]]
const getSmoothLine = (positions, level = 5) => {
  const fractions = positions.slice(level * 2 * -1);
  // console.log(fractions)
  const { length } = fractions;
  const fromLength = Math.ceil(length / 2);
  const fromPostions = pickArrayFraction(fractions, 0, fromLength - 1);
  const toPositions = pickArrayFraction(fractions, fromLength, length)
  return [arrayBitWiseAvg(fromPostions), arrayBitWiseAvg(toPositions)]
};

// console.log(arrayAvg([1,2,3,4,4]))
// console.log(arrayBitWiseSum([[1,2],[0,2],[7,7,7]]));
// console.log(arrayBitWiseAvg([[1,2],[0,2],[7,7,7]]));
// const positions = [
//   [0,0],
//   [1,0],
//   [2,0],
//   [3,0],
//   [4,0],
//   [5,0],
//   [6,0],
//   [7,0],
//   [8,0],
//   [9,0],
//   [10,0],
//   [11,0],
//   [12,0],
//   [13,0],
//   [14,0],
// ]
// console.log(getSmoothLine(positions))

// Turn the points returned from perfect-freehand into SVG path data.
const getSvgPathFromStroke = (stroke) => {
  if (!stroke.length) return '';

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ['M', ...stroke[0], 'Q']
  )

  d.push('Z');
  return d.join(' ');
};
// easing functions
const easingStrings = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - --t * t * t * t,
  easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => 1 + --t * t * t * t * t,
  easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeInExpo: (t) => (t <= 0 ? 0 : Math.pow(2, 10 * t - 10)),
  easeOutExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t) =>
    t <= 0
      ? 0
      : t >= 1
      ? 1
      : t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2,
};

module.exports = {
  getVersion,
  getIpAddresses,
  toggleWindowMaximize,
  // captureScreen,
  quitApp,
  isHlsStream,
  arrayBitWiseAvg,
  getSmoothLine,
  getSvgPathFromStroke,
  secondsToTime,
  easingStrings
};
