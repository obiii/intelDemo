var data = [{
  values: [126, 77, 34, 28, 72, 91, 54, 244, 42, 6, 137, 149, 139],
  labels: ['Mugging','Robbery', 'Homicide', 'Rape', 'Kidnapping', 'Child Abuse', 'Burglury', 'Narcotics', 'Vandalism','Terrorism', 'Assualt', 'Car stolen','Theft'],
  domain: {
    x: [0, .5]
  },
  name: 'Islamabad',
  textposition: 'inside',
  hoverinfo: 'label+percent+name',
  hole: .4,
  type: 'pie'
},
{
  values: [156, 177, 62, 54, 172, 64, 101, 174, 54, 11, 197, 109, 180],
  labels: ['Mugging','Robbery', 'Homicide', 'Rape', 'Kidnapping', 'Child Abuse', 'Burglury', 'Narcotics', 'Vandalism','Terrorism', 'Assualt', 'Car stolen','Theft'],
  text: 'Lahore',
  textposition: 'inside',
  domain: {x: [.52, 10]},
  name: 'Lahore',
  hoverinfo: 'label+percent+name',
  hole: .4,
  type: 'pie'
},
           ];

var layout = {
  title: 'Crime Percentage of Major Cities',
  annotations: [
    {
      font: {
        size: 20
      },
      showarrow: false,
      text: 'Islamabad',
      x: 0.10,
      y: 0.20
    },
       {
      font: {
        size: 20
      },
      showarrow: false,
      text: 'Lahore',
      x: 0.86,
      y: 0.2
    }
  ],
  height: 600,
  width: 600
};

Plotly.newPlot('myDiv', data, layout);
