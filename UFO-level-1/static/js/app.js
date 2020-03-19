// from data.js
var tableData = data;

var tbody = d3.select("tbody");

tableData.forEach((weatherReport) => {
  var row = tbody.append("tr");
  Object.entries(weatherReport).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
});
