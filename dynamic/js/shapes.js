var dataArray  = [{x:5,y:5},{x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10}];

var svg = d3.select("body").append("svg").attr("height","20%").attr("width","100%");


var line=d3.line()
                .x(function(d,i){ return d.x*6 })
                .y(function(d,i){ return d.y*6 })
                .curve(d3.curveCardinal);

svg.append("path")
    .attr("fill","none")
    .attr("stroke","blue")
    .attr("d",line(dataArray));


var dataArray  = [145,142,144,144,434,434,414,146,145,145,142,122,234,112,434,224,234,221];
var dataYears = ['2001','2002','2003','2004','2005','2006','2007','2008','2009','20010','2011','2012','2013','2014','2015','2015','2017','2018']

var height = 200;
var width = 500;

var area = d3.area()
            .x(function(d,i){ return i*20; })
            .y0(height)
            .y1(function(d){ return height - d; });

var areasvg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

areasvg.append("path").attr("d",area(dataArray))
.attr("fill","yellow")
.attr("stroke","pink");
