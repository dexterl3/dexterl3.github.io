<?php

   $value = $_POST['val'];
   
   // Write to file here
   // Parse values? or send to different scripts.. substr(array($value),1, -1)
   
   echo "I got your value! array($value)";
	$file = fopen("TacCodeTest.txt","w");

   $results = array($value);
   $results = explode(",",$results[0]); // maybe trim whitespace. ERROR where i commas is passed in the text file it messes stuff up. 
   echo "$results blah";
   // Not iterating array properly
   
   foreach($results as &$cells){
	
		fputs($file, $cells); # maybe write as a JSON object
		
   }

	//fputcsv($file,array($value));

	fclose($file);
	
	
   //productionFile("TacCodeProduction.csv","","","");
   
   
function productionFile($target_file,$textbox,$tacCodeLocation,$checkbox){

	if(!file_exists($target_file)){
		
		$file = fopen($target_file,"w");
		fputcsv($file,array('Test','DeviceName','Location'));

		fclose($file);
	}

		$f = fopen($target_file, "r");
		$fr = fread($f, filesize($target_file));
		fclose($f);
		$lines = array();
		
		$lines = explode("\n",$fr); // IMPORTANT the delimiter here just the "new line" \r\n,
	   
		for($i=0;$i<count($lines)-1;$i++)
		{
			echo '<div class="Row">';
			$cells = array();
			// use the cell/row delimiter
			for($k=0;$k<2;$k++)
			{
				$cells = explode(",",$lines[$i]);
				
				if(($k==1)) {
				
					echo "<div class='Cell'><input type='textbox' id='textbox$i' value='$cells[$k]'/> </div>";
				}else{
					echo "<div class='Cell' id='tacCode$i'><p>$cells[$k]<p/> </div>";
				}
				
			}

			echo"<div><input type='checkbox' align='center' id='textbox$i' /> </div>";
		   echo "</div>";
		}
}

?>