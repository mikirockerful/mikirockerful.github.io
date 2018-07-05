// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Subscriber Mapping Visualization
// https://youtu.be/Ae73YY_GAU8

//Adapted by Miguel Gamallo 5 July 2018

let sensorData;
let estaciones;
let info=[];

const mappa = new Mappa('Leaflet');
let trainMap;
let canvas;
let maximo;

let data = [];

const options = {
  lat: 40.46,
  lng: -3.695,
  zoom: 13,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload() {
  sensorData = loadTable('horario.csv', 'header');
  estaciones = loadJSON('estaciones.json');
}

function setup() {
  canvas = createCanvas(800, 600);
  trainMap = mappa.tileMap(options);
  trainMap.overlay(canvas);

  maximo=40;

  horario = createSlider(1, 21, 1);
  horario.position(830,20);
  
//Codigos de las estaciones
var keys=Object.getOwnPropertyNames(estaciones);
//console.log(keys);
//Para cada lectura
for (let row of sensorData.rows){
  if (row.arr[3]==10){
   // console.log(row.arr[4]);
  }
  //Recorro todas las estaciones
  keys.forEach(function(code){
   //Si tengo esa estacion y la lectura es 10 (particulas de mas de 10 micras)
      if (row.arr[4].includes(code) && row.arr[3]==10){
      //console.log(row.arr[4]+" "+row.arr[3]+" "+row.arr[7]+" "+row.arr[6]+" "+row.arr[5]);
      info.push([estaciones[code].position[0],estaciones[code].position[1],
        row.arr[8],row.arr[10],row.arr[12],row.arr[14],row.arr[16],row.arr[18],
        row.arr[20],row.arr[22],row.arr[24],row.arr[26],row.arr[28],row.arr[30],
        row.arr[32],row.arr[34],row.arr[36],row.arr[38],row.arr[40],row.arr[42],
        row.arr[46],row.arr[48],row.arr[50],row.arr[52]
        ]);
  }});
  }

}

function draw() {
  var hora=horario.value();
  clear();
  for (let item of info) {
    const pix = trainMap.latLngToPixel(item[0], item[1]);
    var variable=item[hora+1];
    if (variable > maximo){
      var variable=maximo;
    }
    let color_seleccionado=map(variable,0,maximo,90,0);
    fill(color('hsl('+Math.round(color_seleccionado)+', 100%, 50%)'));
    ellipse(pix.x, pix.y, 30, 30);
    fill(255,255,255);
    rect(90,15,500,90);
    fill(0,0,0);
    textSize(15);
    text(("0" + parseInt(item[hora+1])).slice(-2),pix.x-10,pix.y+5);
    textSize(30);
    text("Particulas > 10 micras (ug/m3)", 100, 50);
    text(("0" + hora).slice(-2)+" h 05-07-2018", 100, 100);

     }

}
