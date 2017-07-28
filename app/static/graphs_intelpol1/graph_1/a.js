var trace1 = {
  x: ['Mugging','Robbery', 'Homicide', 'Rape', 'Kidnapping', 'Child Abuse', 'Burglury', 'Narcotics', 'Vandalism','Terrorism', 'Assualt', 'Corruption and Bribery', 'Car stolen','Theft'], 
  y: [37, 53, 142, 19, 212, 218, 42, 87, 51, 11, 187, 21, 297, 120], 
  name: 'Peshawar', 
  type: 'bar'
};

var trace2 = {
x: ['Mugging','Robbery', 'Homicide', 'Rape', 'Kidnapping', 'Child Abuse', 'Burglury', 'Narcotics', 'Vandalism','Terrorism', 'Assualt', 'Corruption and Bribery', 'Car stolen','Theft'],  
y: [156, 177, 62, 54, 172, 64, 101, 174, 54, 11, 197, 97, 109, 180], 
  name: 'Lahore', 
  type: 'bar'
};

var trace3 = {
x: ['Mugging','Robbery', 'Homicide', 'Rape', 'Kidnapping', 'Child Abuse', 'Burglury', 'Narcotics', 'Vandalism','Terrorism', 'Assualt', 'Corruption and Bribery', 'Car stolen','Theft'],   
y: [126, 77, 34, 28, 72, 91, 54, 244, 42, 6, 137, 27, 149, 139], 
  name: 'Islamabad', 
  type: 'bar'
};

var trace4 = {
 y: [142, 154, 97, 139, 62, 73, 54, 83, 97, 3, 193, 141, 121, 174], 
 x: ['Mugging','Robbery', 'Homicide', 'Rape', 'Kidnapping', 'Child Abuse', 'Burglury', 'Narcotics', 'Vandalism','Terrorism', 'Assualt', 'Corruption and Bribery', 'Car stolen','Theft'],  
  name: 'Multan', 
  type: 'bar'
};

var data = [trace1, trace2, trace3, trace4];

var layout = {
    xaxis: {title: 'Crime Description'},
    yaxis: {title: 'Crime Frequency'},
    barmode: 'group',
    title: 'Crime trends in Cities'};

Plotly.newPlot('myDiv', data, layout);