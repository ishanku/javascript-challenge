//from data.js
var tableData=data;
var headers=[];
var newtable=[];

getHeaders(tableData[0]);
buildTable(tableData);

function getHeaders(tData){

  Object.keys(tData).forEach((key) => {
    headers.push(key);
  });


}



function buildTable(tData){

  d3.select("#myTable").remove();

  var table = d3.select('#myDynamicTable').append('table').attr("id", "myTable").attr("class","table table-striped");

  var thead = table.append('thead')
  var hrow = thead.append('tr')
  hrow.selectAll('th').data(headers).enter().append('th').text(d=>d);

  var tbody = table.append('tbody');


tData.forEach((item) => {
    var row = tbody.append('tr');

    Object.values(item).forEach((value) => {
      row.append('td').text(value);
    });


});
d3.select(".rowcountdiv").text("Total Rows: " + tData.length)
}

d3.select("#DateSubmit").on('click', function(){
  var finddate=d3.select("#dateInput").property('value');
  newtable=[];
  filterTable(tableData,"datetime",finddate);
  buildTable(newtable);
});

function filterTable(tData,findkey,findvalue){

  tData.forEach((item, i) => {
    Object.entries(item).forEach(([key,value]) => {
      if(key == findkey){
        if (value == findvalue){
          newtable.push(item);}}
    });
  });
}
