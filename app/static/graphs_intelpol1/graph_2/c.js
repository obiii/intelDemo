var trace3 = {
  x: ['Mugging','Robbery', 'Homicide', 'Rape', 'Kidnapping', 'Child Abuse', 'Burglury', 'Narcotics', 'Vandalism','Terrorism', 'Assualt', 'Corruption and Bribery', 'Car stolen','Theft'], 
  y: [553,708, 359, 331, 531, 516, 262, 1013, 445, 1096, 2195, 630, 685, 2293], 
  name: 'Peshawar', 
  type: 'bar', 
  marker: {
     color: 'red',
  },
};

var data = [trace3];
var layout = {
    xaxis: {title: 'Crime Description'},
    yaxis: {title: 'Crime Frequency'},
    barmode: 'group',
    title: 'Frequency of crimes from 2012-2017'};

Plotly.newPlot('myDiv', data, layout);