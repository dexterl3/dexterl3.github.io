

 
			
var toDate=0,fromDate=0,count=0,countTable=0;
var dateVal=[] , regTable=[];
var graphId,tableId;
var previousPoint = null, previousLabel = null;
var data1 =[,];
var data2 = [,];
var data3=[,];
var data4=[,];

var reg_total =['6743','7918','8317','8660','7590','14976','15331','15382'];
var reg_success=['6714','7861','8274',	'8493',	'7567',	'14932','15289','15380'];
 
var unlock_perm =['6787','7918','8317','8660','7590','14976'];
var unlock_temp=['6752','7861','8274',	'8493',	'7567',	'14932'];
var unlock_perm_eligible;
var unlock_temp_eligible;

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 var regDataset = [
     { label: "Total",
          data:data1 ,
          color: "#3c8dbc",
		  points: { symbol: "square"} },
		  
		  { label:"Success",
		  data :data2,
		  color:"#7CFC00",
		  points:{symbol:"circle"}
		 }];
		 
var unlockDataset = [
     { label: "Perm",
          data:data3 ,
          color: "#3c8dbc",
		  points: { symbol: "triangle"} },
		  
		  { label:"Temp",
		  data :data4,
		  color:"#7CFC00",
		  points:{symbol:"circle"}
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
	    
        mode: 'time',
		//tick: ticks,
		tickSize: [7,'day'],        
       //tickLength: 3,
		axisLabel:"" ,
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
// ***********function to create table dataSet
function createTable(dateVal){
	var regSuccess=[],regTotal=[],dateTable=[];
	
dateTable[0]='';
for(var i=0;i<dateVal.length;i++){
	var d=new Date(dateVal[i]);
	var day=d.getDate();
	var month=d.getMonth()+1;
	var dt=day+'/'+month;
	dateTable[i+1]=dt.toString();
console.log('dateTable[i]'+dateTable[i+1]);
}	


regSuccess[0]='Success';
for(var j=0;j <dateVal.length ;j++){
	regSuccess[j+1]=reg_success[j];
}

regTotal[0]='Total';
for(var j=0;j <dateVal.length ;j++){
	regTotal[j+1]=reg_total[j];
}


regTable[0]=dateTable;
regTable[1]=regSuccess;
regTable[2]=regTotal;
}


// *********Date Picker


 $(function() {
    $( "#from" ).datepicker({
      defaultDate: "-1w",
      changeMonth: true,
      numberOfMonths: 2,
	 
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 2,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  });
  
  
   // **************** Submit button Function
 $("#submit-btn").click(function (){
 toDate=$("#to").val();
 fromDate=$("#from").val();
 console.log("toDate"+toDate);
		console.log("fromDate"+fromDate);
		
		if(toDate == '' || fromDate == ''){
			console.log('value is null');
		alert("Please enter the date");
		}
		
		
		if(toDate!= '' && fromDate!= ''){
			
			if($("#sel1").val() == 'All' ||$("#sel1").val()=='Production'||$("#sel1").val()=='Test'||$("#serachByTacCode").val()!= ''){
					console.log("into if loop of submit button");
					dateVal=createDate(fromDate,toDate);
					createTable(dateVal);
					createGraphs();
			 }
		}
 
 
 });

		
		
		
function createGraphId(){
		graphId=++count;
		return graphId ;
}
		
function createTableId(){
		tableId=++countTable;
		return tableId;
}

	//************ Search  button
$("#search-btn").click(function(){

	/* tacCodeVal[0]=$("#serachByTacCode").val();

	if(tacCodeVal[0].length==8){
		count=1;
		countTable=1;
		createContainer(tacCodeVal,dataset,tableData);
	}else{
		window.alert("Enter a valid TacCode");
	} */
});

//**** Drop down Click
$("#sel1").click(function(){
			
		// getTacCodes();
		
		if($("#sel1").val() == "All" ||$("#sel1").val()=="Production"||$("#sel1").val()=="Test"){
			
			dateVal=createDate(fromDate,toDate);
	
			createTable(dateVal);
			createGraphs();
			
	}
});

<<<<<<< HEAD
 /* var ticks = [];
for (var i = 0; i < dateVal.length; i++) {
	console.log( new Date(dateVal[i]));
  ticks.push(dateVal[i]); 
}
  */
// happens when page loads
$( document ).ready(function() {
 // getTacCodesTotal("total"); // need to call function to
			
});

//function to create dates for a range of 7 weeks

function createDate(fromDate,toDate){
	
	var today=new Date() ;
	var newEndDate,newStartDate;
	var  formattedDate=[];	
	console.log('fromDate'+fromDate);
	console.log('toDate'+toDate);

	if((fromDate != '' && toDate != '')|| (fromDate != 0 && toDate != 0)) {
		
		today=new Date(fromDate);
		endDate= new Date(toDate);
		newStartDate=calculateWednesday(today);
		newEndDate= calculateWednesday(endDate);
		var i=0;
		 while(newStartDate <= newEndDate){
			
			 formattedDate[i]=newStartDate.getTime();
			console.log('formattedDate[i]'+formattedDate[i]);
			newStartDate=new Date(newStartDate.getTime()+ 7*24*60*60*1000);
			console.log('newStartDate'+newStartDate);
			i++;
			} 
		}else{
		
		for(var i=7;i>=0;i--){
		var dateVal=calculateWednesday(today);
		formattedDate[i]=dateVal.getTime();
		today=new Date(dateVal.getTime() - 7*24*60*60*1000 );
		console.log('formattedDate[i]'+formattedDate[i]);
		}
	}
	
	return formattedDate ;
}


function subtractDays(myDate,days) {
	if(days <3){
	    return new Date(myDate.getTime() - (days+4)*24*60*60*1000);
	}else {
		return new Date(myDate.getTime() - (days-3)*24*60*60*1000);
	}
}

function calculateWednesday(date){
	var lastWednesday;
	if(date.getDay() < 3){
		lastWednesday = subtractDays(date, date.getDay());
		console.log('lastWednesday'+lastWednesday);
		}else if(date.getDay() > 3){
		 lastWednesday = subtractDays(date, date.getDay());
		console.log('lastWednesday'+lastWednesday);	
		}else{
			console.log("today.getDate()"+date.getDate());
		 lastWednesday=date;	
		}
	
	return lastWednesday;
	
}

/* 			Dexters Section*/
=======



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
>>>>>>> origin/master
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

<<<<<<< HEAD

function createGraphs(){
	 
 	data1 =  dataSet(dateVal,reg_total);
	data2 =  dataSet(dateVal,reg_success);
=======
var data1 =[,];
var data2 = [,];
var  actualDates = ['20150304','20150311','20150318','20150325','20150401','20150408','20150415','20150422'];
var count_total =['6743','7918','8317','8660','7590','14976','15331'];
var count_sucess=['6714','7861','8274',	'8493',	'7567',	'14932','15289'];
 

function createGraphs(){

  convertToFormattedDate(actualDates);
 	data1 =  dataSet(formattedDate,registrationTotal);
	data2 =  dataSet(formattedDate,registrationSuccess);
>>>>>>> origin/master

	regDataset[0].data = data1;
	regDataset[1].data = data2;
	
	data3 =dataSet(dateVal,unlock_perm);
	data4=dataSet(dateVal,unlock_temp);
	
	unlockDataset[0].data=data3;
	unlockDataset[1].data=data4;

<<<<<<< HEAD
createContainer();
=======
	createContainer(regDataset,tableData);
>>>>>>> origin/master
	
}

// function to convert stringdate to formatted date for plotting

/* function convertToFormattedDate(actualDates){
	
	if(actualDates.length>0){
		for(var i=0;i<actualDates.length;i++){
			var year=actualDates[i].replace(/(\d{4})(\d{2})(\d{2})/g, '$1');
			var month=actualDates[i].replace(/(\d{4})(\d{2})(\d{2})/g, '$2');
			var dt=actualDates[i].replace(/(\d{4})(\d{2})(\d{2})/g, '$3');
			formattedDate[i]=gd(year,month,dt);
		}
	}
} */


//function to create datasets
function dataSet(formattedDate,count_val){
	var year,month,dt;
	var plotData=[,];
	
<<<<<<< HEAD
	if(formattedDate.length > 0 && count_val.length > 0){
	for(var j=0;j<formattedDate.length;j++){
	var formatDt=formattedDate[j];
	var tot=count_val[j];
	plotData[j]=[formatDt,tot];
	console.log('plotData[j]'+plotData[j]);
=======
	if(formattedDate.length >0 && count_total.length >0){
		for(var j=0;j<formattedDate.length;j++){
			var formatDt=parseInt(formattedDate[j]);
			var tot=parseInt(count_total[j]);
			plotData[j]=[formatDt,tot];
			console.log("plotData[j]"+plotData[j]);
>>>>>>> origin/master
		}

	}	
	return plotData	
	
}


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
	 
	 function createContainer(){
					
		$("#tacCode1").empty();			
	
	$("#tacCode1").append("<br>"
	+"<div class='panel panel-default'>"
	+"<div class='panel-heading'><b>"
	+"Registration"+"</b></div>"
	+ "<div class='panel-body'>"
	
	+"<div class='row'>"	
	+"<div class='col-md-7'>"
	
	+"<div  id='flot-placeholder"+createGraphId()+"'style='height:300px ;width:500px'> </div>"
	+"</div>"
	
	+"<div class='col-md-3'>"
	+ "<div class='table-responsive' style='width:200px,height :400px'>"
	+"<br>"
	+"<br>"
	+"<br>"
	+"<table id='table-placeholder"+createTableId()+"'class='table table-bordered table-hover table-striped'>"
	
	+"</table>"
	+"</div> </div> </div> </div> </div> </div>"
	
	+"<br>"
	+"<div class='panel panel-default'>"
	+"<div class='panel-heading'><b>"
	+"Unlock"+"</b></div>"
	+ "<div class='panel-body'>"
	
	+"<div class='row'>"	
	+"<div class='col-md-7'>"
	
	+"<div  id='flot-placeholder"+createGraphId()+"'style='height:300px ;width:500px'> </div>"
	+"</div>"
	
	+"<div class='col-md-3'>"
	+ "<div class='table-responsive' style='width:200px,height :400px'>"
	+"<br>"
	+"<br>"
	+"<br>"
	+"<table id='table-placeholder"+createTableId()+"'class='table table-bordered table-hover table-striped'>"
	
	);
	
	
			var graphCount = graphId;
			
			for(var j =1; j <= graphCount; j++){
			
				console.log("the value of j"+j);
				if(j==1){
				$.plot(("#flot-placeholder"+(j)),regDataset,options);
				$("#flot-placeholder"+(j)).UseTooltip();
				makeTable( regTable,$("#table-placeholder"+(j)));
				 
				}/*else if(j==2){
					$.plot(("#flot-placeholder"+(j)),unlockDataset,options);
				$("#flot-placeholder"+(j)).UseTooltip();
				makeTable( regTable,$("#table-placeholder"+(j)));
					
				} else if( j==2){
					$.plot(("#flot-placeholder"+(j+1)),regDataset,options);
				$("#flot-placeholder"+(j+1)).UseTooltip();
				makeTable( regTable,$("#table-placeholder"+(j+1)));	
					
				} */
				
			}
			
			count=0;
			countTable=0;
 }
