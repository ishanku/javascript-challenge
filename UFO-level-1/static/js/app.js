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

    //var label = divselect.append("label").attr("id","label-" + key).attr("for","select-key" + key).text(key);
    //var selectoption = divselect .append('select').attr("class","form-control").attr("id","select-"+key);
    var quotesmanager="'"+'"'+"'"
    if (odd==true){

      divrow = divselect.append('div').attr("class","row");
      divcols = divrow.append('div').attr("class","col presence-cols")
      functionText.push("d3.select('#select-"+ key+ "').on('change', function() {\nfilterKey = '"+ key+ "';\nfilterData = d3.select(this).property('value');\nalert(filterData);\nvar i;\nfor (i=0 ;i < headerarray.length ; i ++){ var fvalue=d3.select("+"'"+"#select-"+"'"+"+headerarray[i]).property('value');\nif (!!fvalue){filtervalarray.push(headerarray[i]+' : '+fvalue);alert(headerarray[i]+' : '+fvalue);}\n };\nfilteredOutput = [];\ntableData.filter(tableFilter);\nbuildTable(filteredOutput);\n});\n")

    }
    else{

      divcols = divrow.append('div').attr("class","col presence-cols")
      functionText.push("d3.select('#select-"+ key+ "').on('change', function() {\nfilterKey = '"+ key+ "';\nfilterData = d3.select(this).property('value');\nalert(filterData);\nvar i;\nfor(i=0 ; i < headerarray.length ; i ++){ var fvalue=d3.select("+"'"+"#select-"+"'"+"+headerarray[i]).property('value');\nif (!!fvalue){filtervalarray.push(headerarray[i]+' : '+fvalue);alert(headerarray[i]+' : '+fvalue);}\n  };\nfilteredOutput = [];\ntableData.filter(tableFilter);\nbuildTable(filteredOutput);\n});\n")

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
      if (odd==true){
        odd=false;
      }
      else{
        odd=true;
      }

    });
    }


function buildTable(fData){

  d3.select("#myTable").remove();

  var table = d3.select('#myDynamicTable').append('table').attr("id", "myTable").attr("class","table table-striped");

  var thead = table.append('thead')
  var hrow = thead.append('tr')
  Object.keys(fData[0]).forEach((key) => {
    var hcell = hrow.append("th");
    hcell.text(key);
  });

  var	tbody = table.append('tbody');
  //tbody = d3.select("tbody");

  var rowcount=0;
  fData.forEach((ufoReport) => {
    rowcount ++
    //var row = tbody.append("tr").attr("class","mytablerows");
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      //Object.entries(value).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    //});
    });
  });
  d3.select(".rowcountdiv").text("Total Rows: " + rowcount)
}
// Select the button



function tableFilter(tdata) {
  var output="null"

  //var fkey=d3.select("#findkey").property("value");
  //var fvalue=d3.select("#findvalue").property("value");

  var fvalue=filterData
  var fkey=filterKey



  Object.entries(tdata).forEach(([key, value]) => {
    if (filtervalarray.length > 0){

      for (i=0;i<filtervalarray.length;i++){
        gkey=filtervalarray[i].split(" : ")[0];
        gvalue=filtervalarray[i].split(" : ")[1];
        // if ( gkey ==fkey ){
        //
        //   if ((key == gkey) && (key==fkey)){
        //     if (value == gvalue){
        //       filteredOutput.push(tdata)
        //     }
        //   }
        //
        // }



      }

      if (key==fkey) {
        if (value == fvalue){
        filteredOutput.push(tdata)
        console.log(gkey)
        console.log("----")
        console.log(gvalue)
    }}
  }
  });
}

var filteredOutput = []
var button = d3.select("#button");

button.on("click", function() {


  tableData.filter(tableFilter)
  buildTable(filteredOutput)
  //console.log(filteredOutput);

});
var filterKey = "datetime"
var filterData = ""


d3.select('#select-key-datetime1')
  .on('change', function() {
    filterKey = "datetime"
    filterData = d3.select(this).property('value');
    alert(filterData);
    //alert(d3.select("#select-comments").property('value'));
    filteredOutput = []
    tableData.filter(tableFilter)
    buildTable(filteredOutput)

});
