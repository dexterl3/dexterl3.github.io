
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	 <!-- FontAwesome 4.3.0 -->
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!-- Ionicons 2.0.0 -->
    <link href="http://code.ionicframework.com/ionicons/2.0.0/css/ionicons.min.css" rel="stylesheet" type="text/css" />  
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.js"></script>
	
	
	
	
    </head>
<body>
<div class="wrapper">

            <div class="container-fluid">

               
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">
                            Tac Codes List
                        </h1>
                        
                    </div>
                </div> 
				</div>
				</div>
					 
					<div class="row">
                    <div class="col-lg-2">
                        
                        <div class="table-responsive">
							<table id="testTable" class="table table-bordered table-hover"  style="height:500 width:500" >
							<h4 class="table-caption">Test Tac Codes</h4>
                                <thead>
                                    <tr>
                                        <th>Tac Code</th>
                                        <th>Device Name</th>
                                        <th>Move to Test</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
								<?php
								
								$list = array
(
"12345678,Samsung,1","23456789,,1","90876543,,1"
);
$target_file= "TacCodeTest.csv";
if(file_exists($target_file)){
	
//$username= $_GET['username'];
//echo $username;
}else {
$file = fopen("TacCodeTest.csv","w");
fputcsv($file,array('TacCode','DeviceName','Location'));
foreach ($list as $values)
  {
 fputcsv($file,explode(',',$values));
  }
  fclose($file); 
}
	

								
								if(file_exists($target_file)){
								$f = fopen("TacCodeTest.csv", "r");
								$fr = fread($f, filesize("TacCodeTest.csv"));
								fclose($f);
								$lines = array();
								
								$lines = explode("\n",$fr); // IMPORTANT the delimiter here just the "new line" \r\n, 
									
								for($i=1;$i<count($lines)-1;$i++)
								{
										echo "<tr>";
										$cells = array(); 
										 // use the cell/row delimiter 
								for($k=0;$k<2;$k++)
									{
										$cells = explode(",",$lines[$i]);
										
										if(($k==1) && ($cells[1]== "")) {
										echo "<td><input type='textbox' name='devicename'/> </td>";	
										}else{
											echo "<td>$cells[$k]</td>";
										}
										
									} 
									
									
									echo"<td><input type='checkbox'  align='center'/> </td>";
									
									}
									
									echo "</tr>";
									
								
								}
								?>
									</tbody>
							     </table>
					         </div>		
					         </div>
						     </div>	
						
						<div class="button">
									<button type='submit' name='submit' id='submit-btn1' class="btn btn-default">Submit</button>
						</div>
						
						<div class="row">
                    <div class="col-lg-2">
                        
                        <div class="table-responsive">
							<table id="productionTable" class="table table-bordered table-hover"  style="height:500 width:500" >
							<h4 class="table-caption">Test Tac Codes</h4>
                                <thead>
                                    <tr>
                                        <th>Tac Code</th>
                                        <th>Device Name</th>
                                        <th>Move to Test</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
								<?php
								
								$list = array
(
"12345678,Samsung,2","23456789,,2","90876543,,2"
);
$target_file= "TacCodeProduction.csv";
if(file_exists($target_file)){
	
//$username= $_GET['username'];
//echo $username;
}else {
$file = fopen("TacCodeProduction.csv","w");
fputcsv($file,array('TacCode','DeviceName','Location'));
foreach ($list as $values)
  {
 fputcsv($file,explode(',',$values));
  }
  fclose($file); 
}
	

								
								if(file_exists($target_file)){
								$f = fopen("TacCodeProduction.csv", "r");
								$fr = fread($f, filesize("TacCodeProduction.csv"));
								fclose($f);
								$lines = array();
								
								$lines = explode("\n",$fr); // IMPORTANT the delimiter here just the "new line" \r\n, 
									
								for($i=1;$i<count($lines)-1;$i++)
								{
										echo "<tr>";
										$cells = array(); 
										 // use the cell/row delimiter 
								for($k=0;$k<2;$k++)
									{
										$cells = explode(",",$lines[$i]);
										
										if(($k==1) && ($cells[1]== "")) {
										echo "<td><input type='textbox' id='devicename'/> </td>";	
										}else{
											echo "<td>$cells[$k]</td>";
										}
										
									} 
									
									
									echo"<td><input type='checkbox'  align='center'/> </td>";
									
									}
									
									echo "</tr>";
									
								
								}
								?>
									</tbody>
							     </table>
					         </div>		
					         </div>
						     </div>	
							 
							 <div class="button">
									<button type='submit' name='submit' id='submit-btn2' class="btn btn-default">Submit</button>
						</div>
	
						
	
	
		<script>
		$("#submit-btn1").click(function eachCell(){
    var cellInnerText = [];
    var cellValue = [];
    
	
    // iterate over each row in table with id t2 in the table-body (tbody)
	
	
    $('#testTable tbody tr').each(function(index){     
       // copy the text into an array
	   // Static values, has trouble getting dynamic values
	   
	   console.log("$(this)).text()"+ $(this).text());
	    
       cellInnerText.push($(this).text());
     
    });
    
   
});

		</script>
</body>
</html>