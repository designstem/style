import { deg2rad } from "../../fachwerk.js"

export const positionTransform = coords => {
  const c = parseCoords(coords);
  return `translate(${c[0][0]} ${c[0][1]})`;
};

export const positionTransform3 = coords => {
  const c = parseCoords(coords);
  if (c === null) {
    return {x: 1, y: 1, z: 1}
  }
  return {
    x: c[0][0],
    y: c[0][1],
    z: c[0][2]
  };
};

export const rotationTransform3 = coords => {
  const c = parseCoords(coords, normalizeRotation3);
  if (c === null) {
    return {x: 0, y: 0, z: 0}
  }
  return {
    x: deg2rad(c[0][0]),
    y: deg2rad(c[0][1]),
    z: deg2rad(c[0][2])
  };
};

export const scaleTransform3 = coords => {
  const c = parseCoords(coords, normalizeScale);
  if (c === null) {
    return {x: 1, y: 1, z: 1}
  }
  return {
    x: c[0][0],
    y: c[0][1],
    z: c[0][2]
  };
};

export const rotationTransform = coords => {
  const c = parseCoords(coords);
  return `rotate(${c[0][0]})`;
};

export const scaleTransform = coords => {
  const c = parseCoords(coords, normalizeScale);
  return `scale(${c[0][0]} ${c[0][1]})`;
};

const padArrayRight = (arr, length, fill) => {
  return [...arr, ...Array(length).fill(fill)].slice(0, length);
};

const isObject = object => typeof object == "object" && !Array.isArray(object);

export const normalizeDefault = arr => {
  if (arr == null) {
    return [0, 0, 0];
  }
  return padArrayRight(arr, 3, 0).map(value => makeNumber(value));
};

export const normalizeScale = arr => {
  if (arr === null || arr.length === 0) {
    return [1, 1, 1];
  }
  if (arr.length == 1) {
    return [arr[0], arr[0], arr[0]];
  }
  return normalizeDefault(arr);
};

export const normalizeRotation3 = arr => {
  if (arr === null) {
    return [[1, 1, 1]];
  }
  if (arr.length == 1) {
    return [0, 0, arr[0]];
  }
  return normalizeDefault(arr);
};

export const coordsTextToArray = (text, normalizer) => {
  if (text.trim().length === 0) {
    return [normalizer(null)]
  }
  return text
    .split(",")
    .map(t =>
      t
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map(value => makeNumber(value))
    )
    .map(normalizer);
};

export const coordsNumberToArray = (number, normalizer) => {
  return [normalizer([number])];
};

export const coordsArrayToArray = (arr, normalizer) => {
  const containsArrays = arr.length && arr.filter(a => Array.isArray(a)).length;
  const coords = arr.map(a => {
    if (Array.isArray(a)) {
      return normalizer(a);
    }
    if (typeof a == "string") {
      if (a.split(/\s+/g).length > 1) {
        return coordsTextToArray(a, normalizer)[0];
      }
      return containsArrays ? normalizer([a]) : makeNumber(a);
    }
    if (typeof a == "number") {
      return containsArrays ? normalizer([a]) : a;
    }
    if (isObject(a)) {
      return coordsObjectToArray(a, normalizer)[0];
    }
    // TODO How to fail?
    return a;
  });
  if (Array.isArray(coords[0])) {
    return coords;
  }
  return [normalizer(coords)];
};

export const coordsObjectToArray = (obj, normalizer = normalizeDefault) => {
  if (
    obj.hasOwnProperty("x") &&
    obj.hasOwnProperty("y") &&
    obj.hasOwnProperty("z")
  ) {
    return [normalizer([obj.x, obj.y, obj.z])];
  }
  if (
    obj.hasOwnProperty("x") &&
    obj.hasOwnProperty("y") &&
    !obj.hasOwnProperty("z")
  ) {
    return [normalizer([obj.x, obj.y, null])];
  }
  if (
    obj.hasOwnProperty("x") &&
    !obj.hasOwnProperty("y") &&
    obj.hasOwnProperty("z")
  ) {
    return [normalizer([obj.x, null, obj.z])];
  }
  if (
    !obj.hasOwnProperty("x") &&
    obj.hasOwnProperty("y") &&
    obj.hasOwnProperty("z")
  ) {
    return [normalizer([obj.x, null, obj.z])];
  }
  if (
    obj.hasOwnProperty("x") &&
    !obj.hasOwnProperty("y") &&
    !obj.hasOwnProperty("z")
  ) {
    return [normalizer([obj.x, null, null])];
  }
  if (
    !obj.hasOwnProperty("x") &&
    obj.hasOwnProperty("y") &&
    !obj.hasOwnProperty("z")
  ) {
    return [normalizer([null, obj.y, null])];
  }
  if (
    !obj.hasOwnProperty("x") &&
    !obj.hasOwnProperty("y") &&
    obj.hasOwnProperty("z")
  ) {
    return [normalizer([null, null, obj.z])];
  }
  return [normalizer([])];
};

export const makeNumber = value => {
  const float = parseFloat(value);
  if (isNaN(float)) {
    return 0;
  }
  return float;
};

export const parseCoords = (c, normalizer = normalizeDefault) => {
  if (typeof c == "string") {
    return coordsTextToArray(c, normalizer);
  }
  if (typeof c == "number") {
    return coordsNumberToArray(c, normalizer);
  }
  if (Array.isArray(c)) {
    return coordsArrayToArray(c, normalizer);
  }
  if (isObject(c)) {
    return coordsObjectToArray(c, normalizer);
  }
  return null;
};