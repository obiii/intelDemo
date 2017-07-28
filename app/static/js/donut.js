


var citySelected
var unselectCity
var displayAnalysis
$.getJSON("https://raw.githubusercontent.com/shahidammer/Intelligent-policing/master/pakistan.json", function(Pakistan) {
  $.getJSON("https://raw.githubusercontent.com/shahidammer/Intelligent-policing/master/crimeRate.json", function(crimeRates) {
    	
      var markerArray = new Array(); 


      var final = crimeRates.map(function(cr){
            
          return Pakistan['features'].filter(function (el) {
            if (el.properties.NAME_3 === cr.City){
              el.properties['CrimeRate'] = cr.CrimeRate
              el.properties['CrimeFutureRate'] = cr.CrimeFutureRate
                    
            }
          });
        });
        
        
        var map = L.map('map').setView([30.3753, 69.3451], 5.5);
          L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            id: 'mapbox.light',
          }).addTo(map);
          var geojson;
          
        function highlightFeature(e) {
          var layer = e.target;
          layer.setStyle({
            weight: 3,
            color: '#c0c0c0',
            dashArray: '',
            fillOpacity: 0.5
          });

          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
          }
          
          info.update(layer.feature.properties);
        }
        
        function resetHighlight(e) {
          geojson.resetStyle(e.target);
          info.update();
        }
        
        
        function getMarker(lat,lon,stname){	
		//if(lat !=='NA' || lon !=='NA'){
			var marker = L.marker([lat, lon])//.addTo(map).bindPopup(stname);
			marker.bindPopup(stname)
			markerArray.push(marker)
			map.addLayer(marker)
			
		//}
	}
          
        

        function zoomToFeature(e) {
          var layer = e.target;
        layer.setStyle({
            weight: 3,
            color: '#c0c0c0 ',
            dashArray: '',
            fillOpacity: 0.5
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        
        detials.update(layer.feature.properties);
          map.fitBounds(e.target.getBounds());
          layer = e.target;
          citySelected = layer.feature.properties.NAME_3
          displayAnalysis()
          
          
          var crimeLoc=""
          
          if (layer.feature.properties.NAME_3 === 'Islamabad'){
          
            $.getJSON("https://raw.githubusercontent.com/shahidammer/Intelligent-policing/master/IslamabadSt.json", function(json) {
              isbst = json 
              
              for (var i = 0; i < 150; i++) {
                getMarker(isbst[i].Latitude,isbst[i].Longitude,isbst[i].Street_name)
              }
            });	 
          
          }
          if (layer.feature.properties.NAME_3 === 'Lahore'){
          
            $.getJSON("https://raw.githubusercontent.com/shahidammer/Intelligent-policing/master/LahoreSt.json", function(json) {
            
              lhrst = json 
              
              for (var i = 0; i < 150; i++) {
                getMarker(lhrst[i].Latitude,lhrst[i].Longitude,lhrst[i].Street_name)
              } 
            });	 
          
          }
          if (layer.feature.properties.NAME_3.includes('Karachi')){
          
            $.getJSON("https://raw.githubusercontent.com/shahidammer/Intelligent-policing/master/KarachiSt.json", function(json) {
            
              khist = json 
              
              for (var i = 0; i < 150; i++) {
                getMarker(khist[i].Latitude,khist[i].Longitude,khist[i].Street_name)
              }
            });	 
          
          }

        }
        function onEachFeature(feature, layer) {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
          });
        }
          
        geojson = L.geoJson(Pakistan, {
          style: style,
          onEachFeature: onEachFeature
        }).addTo(map);
          
        function getColor(d) {
          if (d<=20){return '#58D68D';}
          else if (d>20 && d<=40){ return '#5DADE2';}
          else if (d>40 && d<=60){return '#F7DC6F';}
          else if (d>60 && d<=80) { return '#DC7633';}
          else if (d>80 ) { return '#EC7063' ;}
        }
          
        function style(feature) {
          return {
            fillColor: getColor(feature.properties.CrimeRate),
            weight: 2,
            opacity: 0.2,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5
          };
        }
        
        geojson = L.geoJson(Pakistan, {
          style: style,
          onEachFeature: onEachFeature
        }).addTo(map);

        
        var info = L.control();
        
        info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
          this.update();
          return this._div;
        };

          // method that we will use to update the control based on feature properties passed
        info.update = function (props) {
          this._div.innerHTML = '<h4>Pakistan Crime Rates</h4>' +  (props ?
            '<b>' + props.NAME_3 + '</b><br />Actual Rate: ' + props.CrimeRate + '%<br/>'+
            'Predicted Rate: '+props.CrimeFutureRate+'%'
            : 'Hover over a City');
        };

        info.addTo(map);
        var detials = L.control();
    
        detials.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };


	unselectCity = function(){
		map.setView([30.3753, 69.3451], 5.5);
		detials.update("");
		
		for(i=0;i<markerArray.length;i++) {
			map.removeLayer(markerArray[i]);
		}
    citySelected = ''
    displayAnalysis();
	}
//hee
		// method that we will use to update the control based on feature properties passed
	detials.update = function (props) {
		this._div.innerHTML = '<h4>City Selected</h4> ' +  (props ?
			'<b>' + props.NAME_3 + ' <img id="dismiss" onclick="unselectCity()"  src="https://raw.githubusercontent.com/shahidammer/Intelligent-policing/master/assets/images/cross3.png" title="Click to unselect the city"/>   </b><br />Actual Rate: ' + props.CrimeRate + '%<br/>'+
			'Predicted Rate: '+props.CrimeFutureRate+'%'
			: 'Select a city  ' );
	};
	

	info.addTo(map);
	detials.addTo(map);
          
        var legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {
          var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 20, 40, 60, 80,100]
        
          for (var i = 0; i < grades.length; i++)
          {
            div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
          }
          
          return div;
        };

        legend.addTo(map);

  });
});

displayAnalysis =function() {
  Plotly.d3.csv('https://raw.githubusercontent.com/shahidammer/Intelligent-policing/master/Crime.csv', function(err, rows){
    if(citySelected) {

      citySelected = citySelected.split(' ')[0]
      rows = rows.filter((row) => row.City === citySelected )
      let sum = rows.reduce((acc, val) => {
      return acc + parseInt(val.assaliants)
    }, 0)
    
      $('#assaliants').html(citySelected + ': ' + sum);
      sum = rows.reduce((acc, val) => {
        return acc + parseInt(val.casualties)
      }, 0)
      $('#casaulties').html(citySelected +': ' + sum);

      $('#crimes').html(citySelected +': ' + rows.length);

      let shootings = rows.filter((val) =>val.shooting === 'Yes')
      $('#shootings').html(citySelected +': ' + shootings.length);
    }
    else {
      $('#assaliants').html('');
      $('#casaulties').html('');
      $('#crimes').html('');
      $('#shootings').html('');
    }

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

  //console.log(myDict)
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


    title : 'Prediction by Crime type',
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
     // more about "layout.title": #layout-title
  
  
  xaxis: {
    title: 'YEAR',
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
    tickcolor: '#263959',
    tickfont:{
      family: 'Helvetica, sans-serif',
      size: 18,
      color: '#263959'
    }
  },

  yaxis: {
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 25,
      color: '#263959'
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
};

Plotly.newPlot('pageviews-visitors-chart', data, layout);


    hourCrimes = {}
    rows.map((row) => {
      !hourCrimes[row.Hour] ? hourCrimes[row.Hour] = [row.crime_type]: hourCrimes[row.Hour].push(row.crime_type)  
    })
    
    key = Object.keys(hourCrimes)
    key.map((k) => {
      hourCrimes[k].map((crime, index) => {
        hourCrimes[k][crime] ?  hourCrimes[k][crime]++ : hourCrimes[k][crime] = 1
        delete hourCrimes[k][index]
      })
    })
    myArray = Object.keys(hourCrimes).map((k) => hourCrimes[k])
    
    function getValues(index) {
        myKeys = Object.keys (myArray[index])

        const myValues= []

        for (var i = 0 ; i < myKeys.length ; i++) {
          myValues.push(myArray[index][myKeys[i]])
        }
        return myValues
    }
    function getKeys (index) {
      return Object.keys (myArray[index])
    }
  var trace1 = {
      x: getKeys(0),
      y: getValues(1),
      name: 'Summer',
      type: 'bar'
    };
    var trace2 = {
      x: getKeys(2),
      y: getValues(3),
      name: 'Spring',
      type: 'bar'
    };
    
  var trace4 = {
      x: getKeys(4),
      y: getValues(5),
      name: 'Autumn',
      type: 'bar'
    };
    var trace5 = {
      x: getKeys(1),
      y: getValues(5),
      name: 'Winters',
      type: 'bar'
    };

    var data = [trace1, trace2, trace4, trace5]
    var layout = {barmode: 'stack',
    title : 'Crime in Different Seasons',
    
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
     // more about "layout.title": #layout-title
  
  
  xaxis: {
    title: 'Crime',
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
    tickcolor: '#263959',
    tickfont:{
      family: 'Helvetica, sans-serif',
      size: 10,
      color: '#263959'
    }
  },

  yaxis: {
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
    tickcolor: '#263959',
    tickfont:{
      family: 'Arial, sans-serif',
      size: 16,
      color: '#263959'
    }
  }
  };

    Plotly.newPlot('realtime-network-stats', data, layout);

  var trace12 = {
      x: getKeys(0),
      y: getValues(1),
      name: 'Morning',
      type: 'bar'
    };
    var trace22 = {
      x: getKeys(0),
      y: getValues(3),
      name: 'Noon',
      type: 'bar'
    };
    
  var trace42 = {
      x: getKeys(2),
      y: getValues(6),
      name: 'Evening',
      type: 'bar'
    };
    var trace52 = {
      x: getKeys(1),
      y: getValues(5),
      name: 'Night',
      type: 'bar'
    };
  var data = [trace12, trace22, trace42, trace52]
    var layout = {
      barmode: 'group',
      title : 'Crime in Different Shifts',
    
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
     // more about "layout.title": #layout-title
  
  
  xaxis: {
    title: 'Crime',
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
    tickcolor: '#263959',
    tickfont:{
      family: 'Helvetica, sans-serif',
      size: 10,
      color: '#263959'
    }
  },

  yaxis: {
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
    tickcolor: '#263959',
    tickfont:{
      family: 'Arial, sans-serif',
      size: 16,
      color: '#263959'
    }
  }
    };
    Plotly.newPlot('pageviews-stats', data, layout);


    cityWiseCrime = {}
    rows.map((row) => {
      if (cityWiseCrime[row.City]=== undefined)
        cityWiseCrime[row.City] = [row.crime_type]
      else 
        cityWiseCrime[row.City].push(row.crime_type)
    })

  //   var data = [{
  //   values: Object.keys(cityWiseCrime).map((k) => cityWiseCrime[k].length),
  //   labels: Object.keys(cityWiseCrime),
  //   type: 'pie'
  // }];

  // var layout = {
  //   height: 400,
  //   width: 400
  // };
    myDict = {}
  rows.map((row) => {
    if (myDict[row.Year]=== undefined) {
      myDict[row.Year] = [row.crime_type]
    }
    else {
      myDict[row.Year].push(row.crime_type)
    }
  })
  //console.log(myDict)
  let crimeCount
  Years = Object.keys(myDict)
  Years.push("2018")
  //console.log(Years)
  crimeCount = Object.keys(myDict).map((key) => myDict[key].length)
  //console.log(crimeCount)

  //predict value for 2018
  var total = 0;
  for(var i = 0; i < crimeCount.length; i++) {
    total += crimeCount[i];
  }
  var predicted = total / crimeCount.length;

  crimeCount.push(predicted)
  crimeCount = crimeCount.map((val) => {
    if(val < 1000) {
      return val * 2 ;
    }
    return val
  });
  //console.log("sorted")
  //console.log(crimeCount)


  trace1 = {
    type: 'scatter',
    x: Years,
    y: crimeCount,
    mode: 'lines',
    name: 'Red',
    line: {
      color: '#7a68a0',
      width: 6
    }
  };

  //console.log("2018 y value")
  //console.log(crimeCount[crimeCount.length-1])
  layout = {                     // all "layout" attributes: #layout


    title : 'Total Crimes Over the Years',
    
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
     // more about "layout.title": #layout-title
  
  
  xaxis: {
    title: 'YEAR',
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
    tickcolor: '#263959',
    tickfont:{
      family: 'Helvetica, sans-serif',
      size: 18,
      color: '#263959'
    }
  },

  yaxis: {
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
    tickcolor: '#263959',
    tickfont:{
      family: 'Arial, sans-serif',
      size: 16,
      color: '#263959'
    }
  },
  annotations: [
    {
      text: 'Prediction for 2018',  
      font: {
        family: 'Arial, sans-serif',
        size: 20,
        color: '#263959'
      }, 
      opacity: 1,
      x: 2018,                        
      y: crimeCount[crimeCount.length-1],
      showarrow: true,
      arrowhead: 7,
      bgcolor: '#e9e6ef'
    }
  ]
}
var data = [trace1];


  Plotly.newPlot('pageviews-stats22', data, layout);
    

    
  crimeReportedCity = {}
    rows.map((row) => {
      if (crimeReportedCity[row.City]=== undefined) {
        crimeReportedCity[row.City] = [row.fir_filled_against_report]
      }
      else {
        crimeReportedCity[row.City].push(row.fir_filled_against_report)
      }
    })

    let yesCount
    let noCount
    let myCityDic = {}
    let myCityDic2 = {}

    Object.keys(crimeReportedCity).map((key) => {
      yesCount = crimeReportedCity[key].filter((filt) => filt === 'Yes')
      myCityDic[key] = yesCount.length
    })
    Object.keys(crimeReportedCity).map((key) => {
      noCount = crimeReportedCity[key].filter((filt) => filt === 'No')
      myCityDic2[key] = noCount.length
    })


    var No = {
      x: Object.keys(cityWiseCrime),
      y: Object.keys(myCityDic).map((k) => myCityDic[k]),

      type: 'bar',
      name: 'Yes'
  };
  var Yes = {
    x: Object.keys(cityWiseCrime),
          y: Object.keys(myCityDic2).map((k) => myCityDic2[k]),

        type: 'bar',
        name: 'No'
  };
  var data = [No,Yes];
  var layout = {
    barmode: 'group',
    title : 'FIR Reported Against Crime',
    
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
     color: '#263959'
    },
     // more about "layout.title": #layout-title
  
  
  xaxis: {
    title: 'City',
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
    tickcolor: '#263959',
    tickfont:{
      family: 'Helvetica, sans-serif',
      size: 10,
      color: '#263959'
    }
  },

  yaxis: {
    titlefont: {
      family: 'Dejavu Sans, sans-serif',
      size: 20,
      color: '#263959'
    },
    tickcolor: '#263959',
    tickfont:{
      family: 'Arial, sans-serif',
      size: 16,
      color: '#263959'
    }
  }
  };

  Plotly.newPlot('pageviews-stats2', data, layout);

  });

}
