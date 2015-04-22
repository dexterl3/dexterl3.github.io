//*******  Chart
var data1 = [
    [gd(2015, 1, 28), 2935], [gd(2015, 2, 4), 2913], [gd(2015, 2, 11), 3483], [gd(2015, 2, 25), 3399],
    [gd(2015, 3, 4), 4518], [gd(2015, 3, 11), 3566]
];

var data2 = [
    [gd(2015, 1, 28), 2198], [gd(2015, 2, 4), 2091], [gd(2015, 2, 11), 2509], [gd(2015, 2, 25), 2447],
    [gd(2015, 3, 4), 3236], [gd(2015, 3, 11), 2554]
];
var data3=[[gd(2015, 1, 28), 953], [gd(2015, 2, 4), 1013], [gd(2015, 2, 11), 1214], [gd(2015, 2, 25), 1186],
    [gd(2015, 3, 4), 1541], [gd(2015, 3, 11), 1209]];
	
var data4=[[gd(2015, 1, 28), 83], [gd(2015, 2, 4), 58], [gd(2015, 2, 11), 99], [gd(2015, 2, 25), 74],
    [gd(2015, 3, 4), 175], [gd(2015, 3, 11), 97]];
	
	

var tableData = [[" ", "10/9", "10/6","10/8"], //headers
                ["Temp", "2", "3","6"], 
                ["Perm", "4", "5","6"], 
                ["Error", "8", "9","6"],
				["Total","10","11","12"]
				];

				
	var toDate ,fromDate;
var dataset = [
     { label: "Total",
          data: data1,
          color: "#3c8dbc",
		  points: { symbol: "circle"} },
		  
		  { label:"Success",
		  data :data3,
		  color:"#7CFC00",
		  points:{symbol:"square"}
		 },
		 { label:"Null",
		  data :data4,
		  color:"#00c0ef",
		  points:{symbol:"circle"}
		 },
    { label: "Fail",
          data: data2,
          color: "#DC143C",
		  points: { symbol: "triangle"} 
		  
		  }
];

var dataset2 = [
     { label: "Total",
          data: data1,
          color: "#3c8dbc",
		  points: { symbol: "circle"} },
		  
		  { label:"Temporary",
		  data :data3,
		  color:"#7CFC00",
		  points:{symbol:"square"}
		 },
		 { label:"Permanent",
		  data :data4,
		  color:"#00c0ef",
		  points:{symbol:"circle"}
		 },
    { label: "Errors",
          data: data2,
          color: "#DC143C",
		  points: { symbol: "triangle"} 
		  
		  }
];

var options = {
    series: {
        shadowSize: 0,
            lines: {
              show: true
            },
            points: {
              show: true
            }
    },
    xaxis: {
	    
        mode: "time",
        tickSize: [7,"day"],        
        tickLength: 0,
        axisLabel: "",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 10,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 10
    },
    yaxes: [{
			
            axisLabel: "",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 10,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 3,
            tickFormatter: function (v, axis) {
                return $.formatNumber(v, { format: "#,###", locale: "us" });
            }
        }],
    legend: {
        noColumns: 0,
        labelBoxBorderColor: "#000000",
        position: "nw-resize"
   },
	lines: {
            fill: false,
            color: ["#3c8dbc", "#f56954"]
          },
    grid: {
            hoverable: true,
            borderColor: "#633200",
            borderWidth: 1,
            tickColor: "#f3f3f3"
			
			
    },
    colors: ["#FF0000", "#0022FF"]
};






function gd(year, month, day) {

	
    return new Date(year, month-1, day).getTime();
	
	
	
}

var previousPoint = null, previousLabel = null;
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


$.fn.UseTooltip = function () {
    $(this).bind("plothover", function (event, pos, item) {
   if (item) {
            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
                $("#tooltip").remove();

                var x = item.datapoint[0];
				
				
                var y = item.datapoint[1];

                var color = item.series.color;
                var month = new Date(x).getMonth();
			     if (item.seriesIndex == 0) {
						showTooltip(item.pageX,
                            item.pageY,
                            color,
                            "<strong>" + item.series.label + "</strong><br>" + monthNames[month] + " : <strong>" + y + "</strong>(USD)");
                } else {
				
                    showTooltip(item.pageX,
                            item.pageY,
                            color,
                            "<strong>" + item.series.label + "</strong><br>" + monthNames[month] + " : <strong>" + y + "</strong>(%)");
                }
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        } 
         
    });
 };

function showTooltip(x, y, color, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
        position: 'absolute',
        display: 'none',
        top: y - 40,
        left: x - 120,
        border: '2px solid ' + color,
        padding: '3px',
        'font-size': '9px',
        'border-radius': '5px',
        'background-color': '#fff',
        'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
        opacity: 0.9
    }).appendTo("body").fadeIn(200);
}

// *********** Table Fill
function makeTable(tableData,ntableId) {

    $.each(tableData, function(rowIndex, r) {
		var row = $("<tr/>");
        $.each(r, function(colIndex, c) { 
            row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(c));
        });
       ntableId.append(row);
		
    });
	
	
   
}


// *********Date Picker


 $(function() {
    $( "#from" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
	 
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  });
  
  
   // **************** Submit button Function
 $("#submit-btn").click(function (){
 toDate=$("#to").val();
 fromDate=$("#from").val();
		if(toDate == null || fromDate == null){
		alert("Please enter the date");
		}
		
		
		if(toDate!=null&& fromDate!=null){
			if($("#sel1").val() == "All" ||$("#sel1").val()=="Production"||$("#sel1").val()=="Test"||$("#search-btn").val()!=null){
 
				//method to pass the selected date values
					// document.location.reload();
			}
		}
 
 
 });
var tacCode=[12345678,45678901,34567890];
		var count=1;
		var countTable=1;
		var graphId;
		var tableId;
		var tacCodeVal=[];
		
function createGraphId(){
	graphId=count++
	return graphId ;
}
		
function createTableId(){
	tableId=countTable++;
	return tableId;
}

	//************ Search TacCode button
$("#search-btn").click(function(){

	tacCodeVal[0]=$("#serachByTacCode").val();

	if(tacCodeVal[0].length==8){
		count=1;
		countTable=1;
		createContainer(tacCodeVal,dataset,tableData);
	}else{
		window.alert("Enter a valid TacCode");
	}
});

//**** Drop down Click
$("#sel1").click(function(){
			
		// getTacCodes();
		
		if($("#sel1").val() == "All" ||$("#sel1").val()=="Production"||$("#sel1").val()=="Test"){
			count=1;
			countTable=1;
			createContainer(tacCode,dataset,tableData);
	}
});


// happens when page loads
$( document ).ready(function() {
  getTacCodesTotal("total"); // need to call function to
  
  
  
  
});

/* 			Dexters Section*/
/*
Call at start of page
Ajax to getTacCodes
Store in array ?
for each for Tac Code List
*/
function getTacCodesTotal(type){

	
	//read production and lab file. Create an Array. key value? Dname-> tac, or Tac -> Dname
	var allTacCodes = new Array();
	$.post('getTacCodes.php', 'val=getTacCodes' , function (data) {
		console.log( data); // clear tables or run function
		allTacCodes = data;
		
		if(type == "total"){
			createTacCodeInfo("","");
		}else{
		
			for(var i = 0; i < data.length; i++){
				//console.log(data[i]);
				// If/else depending on what option was checked. Compare values to ones in lab/production array. 
				
				// IF new add it to lab
				
				// need array for lab and array for production
				createTacCodeInfo(data[i],"");
			}

	},'json');
	
	console.log(allTacCodes);
}	


function createTacCodeInfo(tacCode,dateRange){

	console.log(tacCode + " I was called");
	
	// get date range ***
	// get array back [ 20150707,20150711 ]
	// Ajax call for X many weeks, Array of dates
	
	//for(var i = 0; i < date array.length; i++){ // not by data length, thats too many times.
	
	$.post('queryScript.php', {val:"q1", imei: tacCode,startDate: "20150407",endDate: "20150417"} , function (data) {
		console.log( data); // clear tables or run function		
		
		
		// check if its in lab or production?
		// need array for lab and array for production	
		
	}); //,'json'); // add this later
	
	
	// array of count
	// array of dates/weeks
	
	
	// create graph/table
	
	
	/*
	for each week in array{

		Ajax call each?
		query1
		query2
		query3
	
		
		createGraphs(query1)
		createTables(query1)
		
		createGraphs(query2)
		createTables(query2)
		
		createGraphs(query3)
		createTables(query3)


	}
*/

}

// maybe combine tables and graph into one?
function createGraphs(){
	/*
		Pass in tac code
		Call createGraphId// need to create Id from tac Code to target ?
		
		Pass in Array of 7 weeks
		pass in array of Count from Ajax
		
		Pass into flot
		Add to ID generated
	*/
}

function createTables(){

}





	
	
 //*** Creation of the container
function createContainer(tacCode,dataset,tableData){
					$("#tacCode1").empty();
					for(var i=0;i<tacCode.length;i++){
					
					
					$("#tacCode1").append("<section class='content-header'>"+"<h4><b style='color:blue' >TacCode:" +tacCode[i]+"</b></h4>");
					
					$("#tacCode1").append("<div class='row'>"+"<div class='col-md-4'>"
					+"<div class='box box-primary'>"
					+"<div class='box-header'>"
					+"<h4 class='box=title'align='center'> Total Unlocks </h4>"
					+"</div>"
					+"<div class='box-body'>"
					+"<div  id='flot-placeholder"+createGraphId()+"'style='height:300px'> </div>"
					+"</div>"
					+"</div>"
					+"</div>"
					+"<div class='col-md-2'>"
					+"<div class='box box-primary'>"
					+"<div class='box-body'>"
					+"<table id='table-placeholder"+createTableId()+"' class='table table-bordered table-hover' style='margin-bottom:50px;'>"
					+"<br>"
					+"<br>"
					+"<br>"
					+"</table>"
					+"</div>"
					+"</div>"
					+"</div>"	
					+"<div class='col-md-4'>"
					+"<div class='box box-primary'>"
					+"<div class='box-header'>"
					+"<h4 class='box=title'align='center'>Permanent Unlocks </h4>"
					+"</div>"
					
					+"<div class='box-body'>"
					+"<div  id='flot-placeholder"+createGraphId()  +"'style='height:300px'> </div>"
					+"</div>"
					+"</div>"
					+"</div>"
					+"<div class='col-md-2'>"
					+"<div class='box box-primary'>"
					+"<div class='box-body'>"
					+"<table id='table-placeholder"+createTableId()+"' class='table table-bordered table-hover' style='margin-bottom:50px;'>"
					+"<br>"
					+"<br>"
					+"<br>"
					);
					
					$("#tacCode1").append("<div class='row'>"+"<div class='col-md-4'>"
					+"<div class='box box-primary'>"
					+"<div class='box-header'>"
					+"<h4 class='box=title'align='center'>Unlock Request </h4>"
					+"</div>"
					+"<div class='box-body'>"
					+"<div  id='flot-placeholder"+createGraphId()+"'style='height:300px'> </div>"
					+"</div>"
					+"</div>"
					+"</div>"
					+"<div class='col-md-2'>"
					+"<div class='box box-primary'>"
					+"<div class='box-body'>"
					+"<table id='table-placeholder"+createTableId()+"' class='table table-bordered table-hover' style='margin-bottom:50px;'>"
					+"<br>"
					+"<br>"
					+"<br>"
					+"</table>"
					+"</div>"
					+"</div>"
					+"</div>"	
					+"<div class='col-md-4'>"
					+"<div class='box box-primary'>"
					+"<div class='box-header'>"
					+"<h4 class='box=title'align='center'>Temporary Unlocks </h4>"
					+"</div>"
					
					+"<div class='box-body'>"
					+"<div  id='flot-placeholder"+createGraphId()  +"'style='height:300px'> </div>"
					+"</div>"
					+"</div>"
					+"</div>"
					+"<div class='col-md-2'>"
					+"<div class='box box-primary'>"
					+"<div class='box-body'>"
					+"<table id='table-placeholder"+createTableId()+"' class='table table-bordered table-hover' style='margin-bottom:50px;'>"
					+"<br>"
					+"<br>"
					+"<br>"
					);
						
	}
			var graphCount = graphId;
			
			for(var j = 0; j < graphCount; j++){
					
				if((j==0 )|| ((j%4)==0)){
				
				$.plot(("#flot-placeholder"+(j+1)),dataset2,options);
				$("#flot-placeholder"+(j+1)).UseTooltip();
				makeTable( tableData,$("#table-placeholder"+(j+1)));
				}
				else {
				
				
				$.plot(("#flot-placeholder"+(j+1)),dataset,options);
				$("#flot-placeholder"+(j+1)).UseTooltip();
				makeTable( tableData,$("#table-placeholder"+(j+1)));
				 }
				
				
			}
			
			
 }
	
