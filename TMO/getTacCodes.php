<?php

error_reporting(E_ALL);

ini_set('display_errors', 'On');

#$value = $_POST['val'];

$db = "(DESCRIPTION=(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 5.65.17.53)(PORT = 1521)))(CONNECT_DATA=(SID=dsedw1)))";

$c1 = ocilogon("unlock_rpt","unl0ckx1rpt",$db); 
$stid = oci_parse($c1, 'select distinct(substr(IMEI,0,8)) from UNLOCK_CDR_FACT where day_key > 20150413');

$tacCodes = array();

oci_execute($stid);
$tempCounter = 0;
while (($row = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS)) != false) {
 
    foreach ($row as $item) {
        #echo "  <p>". $tempCounter . " space " .($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;")."</p>\n";
		if($item !== null ){
			$tacCodes[$tempCounter] = $item;
			
			$tempCounter++;
		}
		
    }
}

#$result = array_unique($tacCodes);


#echo " win end";

echo json_encode(array_values($tacCodes));


?>