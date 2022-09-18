const { ipcRenderer } = require('electron');
const MEDIA_EXTENSIONS = ['MP4', 'OGG', 'WEBM'];

const getVersion = async () => {
  return ipcRenderer.invoke('getVersion');
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

module.exports = {
  getVersion,
  isHlsStream,
  getSvgPathFromStroke,
  secondsToTime
};
