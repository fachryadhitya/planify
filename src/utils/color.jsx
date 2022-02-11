/**
 * kudos to this guy: https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
 */
function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

export function invertColor(hex, bw) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

/**
 * @param {string[]} array
 */

export function configureBackgroundColor(array) {
  const event = array[0]?.event;
  if (event?.length === 1) {
    return `linear-gradient(110deg, #${event[0]?.color} 100%, #ffed4b 60%);`;
  } else if (event?.length === 2) {
    return `linear-gradient(110deg, #${event[0]?.color} 60%, #${event[1]?.color} 60%)`;
  } else if (event?.length === 3) {
    return `linear-gradient(70deg, #${event[0]?.color}  30%, rgba(0,0,0,0) 30%), linear-gradient(30deg, #${event[1]?.color} 60%, #${event[2]?.color} 60%)`;
  } else {
    return `linear-gradient(110deg, #fff} 100%, #fff 60%)`;
  }
}
