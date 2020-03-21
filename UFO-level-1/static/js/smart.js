// from app.js
var functionText=functionText

//d3.select("#autoscript").remove();

//var divscript = d3.select('#myscript').append('div').attr("id", "autoscript");
var script = d3.select('body').append('script').attr("type","text/javascript");
//var startscript='<script type="text/javascript">';
//var endscript='</script>'
//var buildscripthtml=""
var functionsappend=""

var i;
for (i = 0; i < functionText.length; i++) {
  //buildscripthtml=buildscripthtml + startscript+ "console.log("+i+");\n" + functionText[i] + endscript;
  functionsappend = functionsappend + "\n" + functionText[i];
}
script.html(functionsappend);
//divscript.html(buildscripthtml);
