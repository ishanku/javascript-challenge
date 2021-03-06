//from data.js
var tableData=data;
var headers=[];
var newtable=[];
var findkey="";
var findvalue="";
var fkeyvalue=[]
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


d3.select("#select-datetime").on('change',function () {

  collectValues();
  myOnChange();
});
d3.select("#select-city").on('change',function () {

collectValues()
myOnChange();
});
d3.select("#select-state").on('change',function () {
collectValues()
myOnChange();
});
d3.select("#select-country").on('change',function () {
collectValues()
myOnChange();
});
d3.select("#select-shape").on('change',function () {
  collectValues()
myOnChange();
});
d3.select("#select-durationminutes").on('change',function () {
  collectValues()
myOnChange();
});
d3.select("#select-comments").on('change',function () {
  collectValues()
myOnChange();
});

function collectValues(){
  fkeyvalue=[]
  findkey="datetime"
  findvalue=d3.select('#select-datetime').property('value');
  if (!/^--/.test(findvalue)){fkeyvalue.push(findkey+" : "+findvalue);};
  findkey="city"
  findvalue=d3.select('#select-city').property('value');
  if (!/^--/.test(findvalue)){fkeyvalue.push(findkey+" : "+findvalue);};
  findkey="state"
  findvalue=d3.select('#select-state').property('value');
  if (!/^--/.test(findvalue)){fkeyvalue.push(findkey+" : "+findvalue);};
  findkey="country"
  findvalue=d3.select('#select-country').property('value');
  if (!/^--/.test(findvalue)){fkeyvalue.push(findkey+" : "+findvalue);};
  findkey="shape"
  findvalue=d3.select('#select-shape').property('value');
  if (!/^--/.test(findvalue)){fkeyvalue.push(findkey+" : "+findvalue);};
  findkey="durationMinutes"
  findvalue=d3.select('#select-durationMinutes').property('value');
  if (!/^--/.test(findvalue)){fkeyvalue.push(findkey+" : "+findvalue);};
  findkey="comments"
  findvalue=d3.select('#select-comments').property('value');
  if (!/^--/.test(findvalue)){fkeyvalue.push(findkey+" : "+findvalue);};

}

function myOnChange(){
  storedData=tableData
   for (i=0;i<fkeyvalue.length;i++){
     findkey=fkeyvalue[i].split(" : ")[0];
     findvalue=fkeyvalue[i].split(" : ")[1];
     filterTable(storedData,findkey,findvalue);
    }
   buildTable(newtable);
}

function filterTable(tData,findkey,findvalue){
  storedData=newtable;
  newtable=[];
  tData.forEach((item, i) => {
    Object.entries(item).forEach(([key,value]) => {
      if(key == findkey){
        if (value == findvalue){
          newtable.push(item);}}
    });
  });
}
