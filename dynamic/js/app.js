// from data.js
var tableData = data;

var thead = d3.select("thead");
var tbody = d3.select("tbody");
var odd=true;
var divrow=""
var divcols=""
var functionText=[]
var headerarray=[]
var filtervalarray=[]
var filteredOutput = []
getHeaders(tableData[0]);

function getHeaders(tData)
{
  Object.keys(tData).forEach((key) => {
  headerarray.push(key);
  });
}
buildTableHeader(tableData[0],tableData)
buildTable(tableData)


function buildTableHeader(tDataHead,tData){
  d3.select("#filterdrop").remove();

  var divselect = d3.select('#myDynamicFilterTable').append('div')
                      .attr("id", "filterdrop")
                      .attr("class","form-group col-xs-1");




  thead = d3.select("thead");
  var row = thead.append("tr");

  Object.keys(tDataHead).forEach((key) => {
    var cell = row.append("th").attr("class","thlabel");

    var fkey=key;
    var optionvalue= []
    var optionflag=false;
    var optionhtml = '<option value="'+ key  +'">  --' +  key + '--  </option>'
    var selecthtml='<select class="form-control form-control-sm" d="select-key-'+ key +'" name="select-'+ key +'">'+ optionhtml +'</select>'

    if (odd==true){

      divrow = divselect.append('div').attr("class","row");
      divcols = divrow.append('div').attr("class","col presence-cols")
      functionText.push("d3.select('#select-"+ key+ "').on('change', function() {\nconsole.clear();\nfiltervalarray=[];\nfilterKey = '"+ key+ "';\nfilterData = d3.select(this).property('value');\n//alert(filterData);\nvar i;\nfor (i=0 ;i < headerarray.length ; i ++){ var fvalue=d3.select("+"'"+"#select-"+"'"+"+headerarray[i]).property('value');\nif (!!fvalue){filtervalarray.push(headerarray[i]+' : '+fvalue);}\n };\nfilteredOutput = [];\nhandleBuild();\n//tableData.filter(tableFilter);\n//buildTable(filteredOutput);\n});\n")

    }
    else{

      divcols = divrow.append('div').attr("class","col presence-cols")
      functionText.push("d3.select('#select-"+ key+ "').on('change', function() {\nconsole.clear();\nfiltervalarray=[];\nfilterKey = '"+ key+ "';\nfilterData = d3.select(this).property('value');\n//alert(filterData);\nvar i;\nfor(i=0 ; i < headerarray.length ; i ++){ var fvalue=d3.select("+"'"+"#select-"+"'"+"+headerarray[i]).property('value');\nif (!!fvalue){filtervalarray.push(headerarray[i]+' : '+fvalue);}\n  };\nfilteredOutput = [];\nhandleBuild();\n//tableData.filter(tableFilter);\n//buildTable(filteredOutput);\n});\n")

    }
    var label = divcols.append("label").attr("id","label-" + key).attr("for","select-key" + key).attr("class","presence-select-label").text(key);
    var selectoption = divcols.append('select').attr("class","presence-select").attr("id","select-"+key);

    var	optionlist = selectoption.append('option').attr("value","").text("--" + key + "--");

    Object.entries(tableData).forEach(([key, value]) => {
      Object.keys(value).forEach(key => {
        if (fkey==key){


          Object.entries(value).forEach(([key, value]) => {
          //console.log(value);
          if (fkey==key){
          var optionflag=false;
          for (i=0; i<optionvalue.length; i ++)
          {
            if (optionvalue[i] == value){
              optionflag=true
            }
          }
            if (optionflag != true)
            {
            optionvalue.push(value);
            optionhtml = optionhtml + '<option value="' + value +'">'+ value + '</option>'
            selecthtml='<select class="form-control form-control-sm" id="select-key-'+ key +'" name="select-key">' + optionhtml + '</select>'
            var htext= key+ '<br>' + selecthtml
            cell.html(htext);

            var	optionlist = selectoption.append('option').attr("value",value).text(value);
            optionflag=false;
            }
        }
        });
        }
      });});


    });
    }


function handleBuild()
{


  inputData = tableData;
  for (i=0;i<filtervalarray.length;i++){

    filterKey=filtervalarray[i].split(" : ")[0]
    filterData=filtervalarray[i].split(" : ")[1]


    inputData.filter(tableFilter);
    inputData=filteredOutput;
    filteredOutput=[];
  }

buildTable(inputData);
}

function buildTable(fData){
  d3.select("#myTable").remove();

  var table = d3.select('#myDynamicTable').append('table').attr("id", "myTable").attr("class","table table-striped");

  var thead = table.append('thead')
  var hrow = thead.append('tr')
  for (i=0;i<headerarray.length;i++){
    var hcell = hrow.append("th");
    hcell.text(headerarray[i]);

  }


  var	tbody = table.append('tbody');
  d3.select(".rowcountdiv").text("Total Rows: " + fData.length)


  var rowcount=0;
  fData.forEach((ufoReport) => {
    rowcount ++
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);

    });
  });
  //d3.select(".rowcountdiv").text("Total Rows: " + rowcount)
}




function tableFilter(tdata) {
      var output="null"


      var fvalue=filterData
      var fkey=filterKey



      Object.entries(tdata).forEach(([key, value]) => {

        if (key==fkey) {
          if (value == fvalue){
          filteredOutput.push(tdata)
        }}
        });
}
