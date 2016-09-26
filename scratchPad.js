import chroma from 'chroma-js'

let dataClusters;
let colorScale;
let blueColorScale;

const calcPolyPoints = ({lat, lon}) => {
  let radius = 0.008;
  let latitude =  lat;
  let longitude = lon;
  const d2r = Math.PI / 180;
  const r2d = 180 / Math.PI;
  const cLat = (radius / 3963) * r2d;
  const cLng = cLat / Math.cos(latitude * d2r);
  let points = [];

  for(let i = 0; i < 360; i += 360/8) {
      let theta = Math.PI * (i / 180);
      let circleY = parseFloat(longitude) + (cLng * Math.cos(theta))
      let circleX = parseFloat(latitude) + (cLat * Math.sin(theta))
      points.push([circleX, circleY]);
  }

  return points

};

const genColors = ({pixels}) => {
  let data = pixels.map(({ eta }) => eta);
  dataClusters = chroma.limits(data, 'k', 7);
  colorScale = chroma.scale(['white', 'yellow', 'red', 'black']).colors(dataClusters.length);
  blueColorScale = chroma.scale(['green', 'blue']).colors(dataClusters.length)
  colorScale.reverse();
}

const calcColorValue = ({ eta }) => {
  let selectedColor;
  let count = 0;
  for (let data of dataClusters) {
    if (!(eta > data)) {
      selectedColor = colorScale[count];
      break;
    }
    count++
  }
  return selectedColor
}

const blueColorValue = ({ eta }) => {
  let selectedColor;
  let count = 0;
  for (let data of dataClusters) {
    if (!(eta > data)) {
      selectedColor = blueColorScale[count];
      break;
    }
    count++
  }
  return selectedColor
}

let pointInterface = {
  calcPolyPoints,
  genColors,
  calcColorValue,
  blueColorValue
}

export default pointInterface
