

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function round(value, decimals) {
  if (!decimals) decimals = 0;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// return two decimal places rounded number
function ratio(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return round(width / height, 2);
}

// takes the Gallery's photos prop object, width of the container,
// margin between photos Gallery prop, and columns Gallery prop.
// calculates, sizes based on columns and returns the photos object with new height/width props
function computeSizes(_ref2) {
  var photos = _ref2.photos,
      columns = _ref2.columns,
      width = _ref2.width,
      margin = _ref2.margin;

  if (!width) {
    return [];
  }
  // divide photos over rows, max cells based on `columns`
  // effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]
  var rows = photos.reduce(function (acc, cell, idx) {
    var row = Math.floor(idx / columns);
    acc[row] = acc[row] ? [].concat(_toConsumableArray(acc[row]), [cell]) : [cell]; // eslint-disable-line no-param-reassign
    return acc;
  }, []);

  // calculate total ratio of each row, and adjust each cell height and width
  // accordingly.
  var lastRowIndex = rows.length - 1;
  var rowsWithSizes = rows.map(function (row, rowIndex) {
    var totalRatio = row.reduce(function (result, photo) {
      return result + ratio(photo);
    }, 0);
    var rowWidth = width - row.length * (margin * 2);

    // assign height, but let height of a single photo in the last
    // row not expand across columns so divide by columns
    var height = rowIndex !== lastRowIndex || row.length > 1 ? // eslint-disable-line
    rowWidth / totalRatio : rowWidth / columns / totalRatio;

    return row.map(function (photo) {
      return _extends({}, photo, {
        height: round(height, 1),
        width: round(height * ratio(photo), 1)
      });
    });
  });
  return rowsWithSizes.reduce(function (acc, row) {
    return [].concat(_toConsumableArray(acc), _toConsumableArray(row));
  }, []);
}

const computeImage = {
  computeSizes: computeSizes
}

export default computeImage