//from data.js
var tableData=data;
var headers=[];
var newtable=[];
var odd=true;

getHeaders(tableData[0]);
buildSelect(tableData);
buildTable(tableData);

function getHeaders(tData){

  Object.keys(tData).forEach((key) => {
    headers.push(key);
  });


}

function buildSelect(tData){

d3.select("#myright").remove();
var divform = d3.select("#mainForm").append("div").attr("id","myright").attr("class","form-group col-xs-1");
var myform=divform.append('form');


headers.forEach((key) => {
  if (odd==true){

    divrow = myform.append('div').attr("class","row");
    divcols = divrow.append('div').attr("class","col presence-cols")

  }
  else{

    divcols = divrow.append('div').attr("class","col presence-cols")

  }
  var label = divcols.append("label").attr("id","label-" + key).attr("for","select-key" + key).attr("class","presence-select-label").text(key);
  var select=divcols.append('select').attr('id','select-' + key);
  select.append('option').text("--"+key+"--");
  var optionArray = [];
    tData.forEach((item) => {
    Object.entries(item).forEach(([x,y]) => {
      if (key==x){
        if(optionArray.indexOf(y) == -1){
            optionArray.push(y)
            select.append('option').attr('value',y).text(y);
        }
        }
    });

  });
  if (odd==true){
    odd=false;
  }
  else{
    odd=true;
  }
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

d3.selectAll("#select-datetime").on('change', myOnChange());
d3.selectAll("#select-city").on('change', myOnChange());

function myOnChange(){
alert("Hi")
 // var finddate=d3.select("#dateInput").property('value');
 // newtable=[];
 // filterTable(tableData,"datetime",finddate);
 // buildTable(newtable);
}

function filterTable(tData,findkey,findvalue){

  tData.forEach((item, i) => {
    Object.entries(item).forEach(([key,value]) => {
      if(key == findkey){
        if (value == findvalue){
          newtable.push(item);}}
    });
  });
}
