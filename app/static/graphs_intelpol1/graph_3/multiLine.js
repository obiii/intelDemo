Plotly.d3.csv('Intelpol.csv', function(err, rows){  
  myDict = {}
  rows.map((row) => {
    !myDict[row.Year] ? myDict[row.Year] = [row.crime_type]: myDict[row.Year].push(row.crime_type)  
  })
  key = Object.keys(myDict)
  crimeFreq = {}
  key.map((k) => {
    myDict[k].map((crime, index) => {
      myDict[k][crime] ?  myDict[k][crime]++ : myDict[k][crime] = 1
      delete myDict[k][index]
    })
  })

  let assault = []
  let AttemptedMurder = []
  let carTheft = []
  let domesticViolence = []
  let hitandrun = []
  let homicide = []
  let kidnapping = []
  let mugging = []
  let rape = []
  let snatching = []
 let vandalism = []

  console.log(myDict)
  for (var i=0; i < key.length; i++) {
        assault.push(myDict[key[i]]['Assualt'])
        AttemptedMurder.push(myDict[key[i]]['Attempted Murder'])
        domesticViolence.push(myDict[key[i]]['Domestic Voilence'])
        hitandrun.push(myDict[key[i]]['Hit and Run'])
        homicide.push(myDict[key[i]]['Homocide'])
        kidnapping.push(myDict[key[i]]['Kidnapping'])
        mugging.push(myDict[key[i]]['Mugging'])
        rape.push(myDict[key[i]]['Rape'])
        snatching.push(myDict[key[i]]['Snatching'])
        carTheft.push(myDict[key[i]]['Car Theft'])
        vandalism.push(myDict[key[i]]['Vandalism'])



  }
var total = 0;
for(var i = 0; i < assault.length; i++) {
    total += assault[i];
  }
var predicted_assault = total / assault.length;
assault.push(Math.round(predicted_assault));

total = 0;
for(var i = 0; i < AttemptedMurder.length; i++) {
    total += AttemptedMurder[i];
  }
var predicted_AttemptedMurder = total / AttemptedMurder.length;
AttemptedMurder.push(Math.round(predicted_AttemptedMurder));

total = 0;
for(var i = 0; i < domesticViolence.length; i++) {
    total += domesticViolence[i];
  }
var predicted_domesticViolence = total / domesticViolence.length;
domesticViolence.push(Math.round(predicted_domesticViolence));

total = 0;
for(var i = 0; i < hitandrun.length; i++) {
    total += hitandrun[i];
  }
var predicted_hitandrun = total / hitandrun.length;
hitandrun.push(Math.round(predicted_hitandrun));

total = 0;
for(var i = 0; i < homicide.length; i++) {
    total += homicide[i];
  }
var predicted_homicide = total / homicide.length;
homicide.push(Math.round(predicted_homicide));

total = 0;
for(var i = 0; i < kidnapping.length; i++) {
    total += kidnapping[i];
  }
var predicted_kidnapping = total / kidnapping.length;
kidnapping.push(Math.round(predicted_kidnapping));

total = 0;
for(var i = 0; i < mugging.length; i++) {
    total += mugging[i];
  }
var predicted_mugging = total / mugging.length;
mugging.push(Math.round(predicted_mugging));

total = 0;
for(var i = 0; i < rape.length; i++) {
    total += rape[i];
  }
var predicted_rape = total / rape.length;
rape.push(Math.round(predicted_rape));

total = 0;
for(var i = 0; i < snatching.length; i++) {
    total += snatching[i];
  }
var predicted_snatching = total / snatching.length;
snatching.push(Math.round(predicted_snatching));

total = 0;
for(var i = 0; i < carTheft.length; i++) {
    total += carTheft[i];
  }
var predicted_carTheft = total / carTheft.length;
carTheft.push(Math.round(predicted_carTheft));

total = 0;
for(var i = 0; i < vandalism.length; i++) {
    total += vandalism[i];
  }
var predicted_vandalism = total / vandalism.length;
vandalism.push(Math.round(predicted_vandalism));









var trace1 = {
  x: ["2012", "2013", "2014", "2015", "2016", "2017","2018"],
  y: assault,
  mode: 'lines+markers',
  name: 'Assaults',
  line: {shape: 'linear'},
  type: 'scatter'
};

var trace2 = {
  x: ["2012", "2013", "2014", "2015", "2016", "2017","2018"],
  y: AttemptedMurder,
  mode: 'lines+markers',
  name: 'Attempted Murder',
  //text: ['tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object'],
  line: {shape: 'linear'},
  type: 'scatter'
};

var trace3 = {
  x: ["2012", "2013", "2014", "2015", "2016", "2017","2018"],
  y: domesticViolence,
  mode: 'lines+markers',
  name: 'Domestic Violence',
  line: {shape: 'linear'},
  type: 'scatter'
};

var trace4 = {
  x: ["2012", "2013", "2014", "2015", "2016", "2017","2018"],
  y: hitandrun,
  mode: 'lines+markers',
  name: 'Hit and Run',
  line: {shape: 'linear'},
  type: 'scatter'
};

var trace5 = {
  x: ["2012", "2013", "2014", "2015", "2016", "2017","2018"],
  y: homicide,
  mode: 'lines+markers',
  name: 'Homicide',
  line: {shape: 'linear'},
  type: 'scatter'
};

var trace6 = {
  x: ["2012", "2013", "2014", "2015", "2016", "2017","2018"],
  y: kidnapping,
  mode: 'lines+markers',
  name: 'Kidnapping',
  line: {shape: 'linear'},
  type: 'scatter'
};

var trace7 = {
  x: ["2012", "2013", "2014", "2015", "2016", "2017","2018"],
  y: mugging,
  mode: 'lines+markers',
  name: 'Mugging',
  line: {shape: 'linear'},
  type: 'scatter'
};

var trace8 = {
  x: ["2012", "2013", "2014", "2015", "2016", "2017","2018"],
  y: rape,
  mode: 'lines+markers',
  name: 'Rape',
  line: {shape: 'linear'},
  type: 'scatter'
};

var trace9 = {
  x: ["2012", "2013", "2014", "2015", "2016", "2017","2018"],
  y: snatching,
  mode: 'lines+markers',
  name: 'Snatching',
  line: {shape: 'linear'},
  type: 'scatter'
};

var trace10 = {
  x: ["2012", "2013", "2014", "2015", "2016", "2017","2018"],
  y: carTheft,
  mode: 'lines+markers',
  name: 'Car Theft',
  line: {shape: 'linear'},
  type: 'scatter'
};

var trace11 = {
  x: ["2012", "2013", "2014", "2015", "2016", "2017","2018"],
  y: vandalism,
  mode: 'lines+markers',
  name: 'Vandalism',
  line: {shape: 'linear'},
  type: 'scatter'
};
var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10, trace11];
layout = {                     // all "layout" attributes: #layout


    title : 'Crime Trend in Pakistan',
    width: 800,
    height: 500,
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 27,
      color: '#4c478e'
    },
     // more about "layout.title": #layout-title
  
  
  xaxis: {
    title: 'YEAR',
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 25,
      color: '#6e6f72'
    },
    tickcolor: '#263959',
    tickfont:{
      family: 'Helvetica, sans-serif',
      size: 18,
      color: '#263959'
    }
  },

  yaxis: {
    title: 'COUNT',
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 25,
      color: '#6e6f72'
    },
    tickcolor: '#263959',
    tickfont:{
      family: 'Arial, sans-serif',
      size: 16,
      color: '#263959'
    }
  },
  legend: {
    y: 0.5,
    traceorder: 'reversed',
    font: {size: 16},
    yref: 'paper'
  }
  // annotations: [
  //   {
  //     text: 'Prediction for 2018',  
  //     font: {
  //       family: 'Arial, sans-serif',
  //       size: 20,
  //       color: '#56283c'
  //     }, 
  //     opacity: 1,
  //     x: 2018,                        
  //     y: crimeCount[crimeCount.length-1],
  //     showarrow: true,
  //     arrowhead: 7,
  //     bgcolor: '#e9e6ef'
  //   }
  // ]
};

Plotly.newPlot('myDiv', data, layout);

});






