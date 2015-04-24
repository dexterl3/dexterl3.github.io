//*******  Chart
/*var data1 = [
    [gd(2015, 1, 28), 2935], [gd(2015, 2, 4), 2913], [gd(2015, 2, 11), 3483], [gd(2015, 2, 25), 3399],
    [gd(2015, 3, 4), 4518], [gd(2015, 3, 11), 3566]
]; 

var data2 = [
    [gd(2015, 1, 28), 2198], [gd(2015, 2, 4), 2091], [gd(2015, 2, 11), 2509], [gd(2015, 2, 25), 2447],
    [gd(2015, 3, 4), 3236], [gd(2015, 3, 11), 2554]
];
/* var data3=[[gd(2015, 1, 28), 953], [gd(2015, 2, 4), 1013], [gd(2015, 2, 11), 1214], [gd(2015, 2, 25), 1186],
    [gd(2015, 3, 4), 1541], [gd(2015, 3, 11), 1209]];
	
var data4=[[gd(2015, 1, 28), 83], [gd(2015, 2, 4), 58], [gd(2015, 2, 11), 99], [gd(2015, 2, 25), 74],
    [gd(2015, 3, 4), 175], [gd(2015, 3, 11), 97]];
	 
	 */

 var tableData = [[" ", "10/9", "10/6","10/8"], //headers
                ["Temp", "2", "3","6"], 
                ["Perm", "4", "5","6"], 
                ["Error", "8", "9","6"],
				["Total","10","11","12"]
				]; 

				
var toDate ,fromDate;
var a,b;



/* var dataset2 = [
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
]; */







function gd(year, month, day) {

	
    return new Date(year,month-1,day).getTime();
	
	
	
}

var previousPoint = null, previousLabel = null;
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];




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
	// Might need to do call to file to get array of lab/ Production
	//if file is todays date use it #10:30am is when its created
	allTacCodes = new Array();
	getTacCodesTotal("total"); // Maybe return function
	
	//getTacCodesTotal("lab");
	//getTacCodesTotal("production");
  
});

/* Dexters Section*/
/*
Call at start of page
Ajax to getTacCodes
Store in array 
for each for Tac Code List
*/
function getTacCodesTotal(type){

	//read production and lab file. Create an Array. key value? Dname-> tac, or Tac -> Dname
	// maybe adjust 0's by amount of weeks
	registrationTotal = [0,0,0,0,0,0,0,0,0,0];
	registrationSuccess = [0,0,0,0,0,0,0,0,0,0];

	tempTotal = [0,0,0,0,0,0,0,0,0,0]; // for table
	tempSuccess = [0,0,0,0,0,0,0,0,0,0]; // temp Yes, for graph
	permTotal = [0,0,0,0,0,0,0,0,0,0]; // for table, perm Total
	permSuccess = [0,0,0,0,0,0,0,0,0,0]; // perm Yes, for graph

	permFail = [0,0,0,0,0,0,0,0,0,0]; // perm fail
	tempFail = [0,0,0,0,0,0,0,0,0,0]; // temp fail
	peFail = [0,0,0,0,0,0,0,0,0,0]; // PE error
	regFail = [0,0,0,0,0,0,0,0,0,0]; // reg fail PE error
	
	if(type == "total"){
			createTacCodeInfo("","20150315","20150415"); // 7 weeks total
			setTimeout(function () {
				createGraphs();
				}, 5500);
		
			// need to have it wait for the previous function to finish

	}else{ 
		$.post('getTacCodes.php', 'val=getTacCodes' , function (data) {
			console.log( data); 
			allTacCodes = data; // get Tac code List
			
			if(type == "production"){
				//length of production array
				for(var i = 0; i < data.length; i++){
					//console.log(data[i]);

					//createTacCodeInfo(data[i],"20150412","20150415");
				}
			}else if(type == "lab"){ //else  lab 
				for(var i = 0; i < data.length; i++){
					//console.log(data[i]);
					// IF new Tac Code add it to lab File
					// 
					createTacCodeInfo(data[i],"20150412","20150415");					
				}
			}
			createGraphs();
			
		},'json');		
	}
}	

// Create arrays of count from queries
function createTacCodeInfo(tacCode,dateStart,dateEnd){

	var arrayDateIndex = 0;
	// changes dates to length, might need -1

	for(var i = 0; i < 7; i++){
		
		// change
		$.post('queryScript.php', {val:"q1", imei: tacCode,startDate: actualDates[i],endDate: actualDates[i+1] } , function (data) {	
			console.log(data[0]  + " and  "+ data[9]);
			
			registrationTotal[arrayDateIndex] += parseInt(data[0]);	// Total
			registrationSuccess[arrayDateIndex] += parseInt(data[1]); // Success

			tempTotal[arrayDateIndex] += parseInt(data[2]);
			tempSuccess[arrayDateIndex] += parseInt(data[3]) 

			console.log(tempTotal + 'the index is ' + arrayDateIndex  );
			// console.log('the data is: ' + data + 'the index is ' + arrayDateIndex  );
			// console.log(actualDates[arrayDateIndex] + 'and the end date is  ' + actualDates[arrayDateIndex+1]  );
			
			permTotal[arrayDateIndex] += parseInt(data[4]) 
			permSuccess[arrayDateIndex] += parseInt(data[5]) 
			
			permFail[arrayDateIndex] += parseInt(data[6])
			tempFail[arrayDateIndex] += parseInt(data[7])
			peFail[arrayDateIndex] += parseInt(data[8]) 
			regFail[arrayDateIndex] += parseInt(data[9]) 
			
			arrayDateIndex++;
		
		},'json'); 
	}
}


function createTables(A1,A2,A3,A4,tacCode,location,dateStart,dateEnd){
	// alert("booyah Tables");

}

// maybe combine tables and graph into one?
var formattedDate=[];
var formateDt;

var data1 =[,];
var data2 = [,];
var  actualDates = ['20150304','20150311','20150318','20150325','20150401','20150408','20150415','20150422'];
var count_total =['6743','7918','8317','8660','7590','14976','15331'];
var count_sucess=['6714','7861','8274',	'8493',	'7567',	'14932','15289'];
 

function createGraphs(){

  convertToFormattedDate(actualDates);
 	data1 =  dataSet(formattedDate,registrationTotal);
	data2 =  dataSet(formattedDate,registrationSuccess);

	regDataset[0].data = data1;
	regDataset[1].data = data2;

	createContainer(regDataset,tableData);
	
}

// function to convert stringdate to formatted date for ploting

function convertToFormattedDate(actualDates){
	console.log("call to convertToFormatteddates");
	
	if(actualDates.length>0){
		for(var i=0;i<actualDates.length;i++){
			var year=actualDates[i].replace(/(\d{4})(\d{2})(\d{2})/g, '$1');
			var month=actualDates[i].replace(/(\d{4})(\d{2})(\d{2})/g, '$2');
			var dt=actualDates[i].replace(/(\d{4})(\d{2})(\d{2})/g, '$3');
			formattedDate[i]=gd(year,month,dt);
		}
	}
}


//function to create datasets
function dataSet(formattedDate,count_total){
	
	var year,month,dt;
	var plotData=[,];
	
	if(formattedDate.length >0 && count_total.length >0){
		for(var j=0;j<formattedDate.length;j++){
			var formatDt=parseInt(formattedDate[j]);
			var tot=parseInt(count_total[j]);
			plotData[j]=[formatDt,tot];
			console.log("plotData[j]"+plotData[j]);
		}

	}	
	return plotData	
	
}

	 
	 
	 var regDataset = [
     { label: "Total",
          data:data1 ,
          color: "#3c8dbc",
		  points: { symbol: "circle"} },
		  
		  { label:"Success",
		  data :data2,
		  color:"#7CFC00",
		  points:{symbol:"square"}
		 }];

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
    yaxis: {
			
            axisLabel: "",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 10,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 3,
            tickFormatter: function (v, axis) {
                return $.formatNumber(v, { format: "#,###"});
            }
        },
    legend: {
        noColumns: 1,
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


$.fn.UseTooltip = function () {
    $(this).bind("plothover", function (event, pos, item) {
		
		console.log("call to USetooltip"+item);
   if (item) {
            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
                $("#tooltip").remove();

                var x = item.datapoint[0];
				console.log("item.datapoint[0]"+item.datapoint[0]);
				
                var y = item.datapoint[1];
				console.log("item.datapoint[1]"+item.datapoint[1]);
                var color = item.series.color;
                var month = new Date(x).getMonth();
			     if (item.seriesIndex == 0) {
						showTooltip(item.pageX,
                            item.pageY,
                            color,
                            "<strong>" + item.series.label + "</strong><br>" + monthNames[month] +" : <strong>" + y);
                } else {
				
                    showTooltip(item.pageX,
                            item.pageY,
                            color,
                            "<strong>" + item.series.label + "</strong><br>" + monthNames[month] + " : <strong>" + y);
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
	 
	 function createContainer(regDataset,tableData){
				//	$("#tacCode1").empty();
					
	
	$("#tacCode1").append("<div class='panel panel-default'>"
	+"<div class='panel-heading'><b>"
	+"Registration"+"</b></div>"
	+ "<div class='panel-body'>"
	
	+"<div class='row'>"
	
	+"<div class='col-md-6'>"
	
	+"<div  id='flot-placeholder"+createGraphId()+"'style='height:300px ;width:500px'> </div>"
	+"</div>"
	+"<div class='col-md-4'>"
	+ "<div class='table-responsive' style='width:200px,height :100px'>"
	+"<br>"
	+"<br>"
	+"<br>"
	+"<table id='table-placeholder"+createTableId()+"'class='table table-bordered table-hover table-striped'>"
	
	
	);
	
	
			var graphCount = graphId;
			console.log("graphId"+graphCount)
			
			for(var j = 0; j < graphCount; j++){
			
				console.log("the value of j"+j);
				
				$.plot(("#flot-placeholder"+(j+1)),regDataset,options);
				$("#flot-placeholder"+(j+1)).UseTooltip();
				makeTable( tableData,$("#table-placeholder"+(j+1)));
				 
				
				
			}
			
			
 }
