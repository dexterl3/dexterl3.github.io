<?php

error_reporting(E_ALL);
ini_set('display_errors', 'On');

#$value = $_POST['val'];

// Connect to DB
$db = "(DESCRIPTION=(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 5.65.17.53)(PORT = 1521)))(CONNECT_DATA=(SID=dsedw1)))";
$c1 = ocilogon("unlock_rpt","unl0ckx1rpt",$db); 

//Get Unique Tac Codes
$stid = oci_parse($c1, 'select distinct(substr(IMEI,0,8)) from UNLOCK_CDR_FACT where day_key > 20150413');



// Test variables
$testDate = 20150413;
$testEndDate = 20150417;
$testIMEI = 35;
$query = "q1"; // Change

$tacCodes = array();
$tempCounter = 0;

oci_execute($stid);
while (($row = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS)) != false) {
 
    foreach ($row as $item) {
        #echo "  <p>".($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;")."</p>\n";
		$tacCodes[$tempCounter] = $item;
    }
}


// **************** Actual Query Code ***********************************
if($query == "q1"){
	echo "Registration: ";
	$queryString1 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(attestation_status) like '%' and day_key >=  ";
	
	$registrationQ1 = oci_parse($c1, $queryString1 . $testDate . 'AND day_key <' . $testEndDate ); 
	
	$queryString2 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(attestation_status) = 'true' and day_key >=  ";

	$registrationQ2 = oci_parse($c1,$queryString2 . $testDate . ' AND DAY_Key <' . $testEndDate  );
	
	$queryString3 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(attestation_status) = 'false' and day_key >=  ";
	$registrationQ3 = oci_parse($c1,$queryString3. $testDate . ' AND DAY_Key <' . $testEndDate );
	
	oci_execute($registrationQ1);
	printQueries($registrationQ1);
	

	oci_execute($registrationQ2);
	printQueries($registrationQ2);
	
	oci_execute($registrationQ3);
	printQueries($registrationQ3);
}

$query = "q2";// Delete

if($query == "q2"){
	echo "Temp unlocks: ";	
	
	$queryString1 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(REQUEST_TYPE) like 
'%unlockresponse%' AND unlockrequest_type = 1 and day_key >  ";
	
	$tempUnlock1 = oci_parse($c1, $queryString1 . $testDate . 'AND day_key <' . $testEndDate ); 
	
	$queryString2 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(REQUEST_TYPE) like'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'y' AND unlockrequest_type = 1  and day_key >  ";

	$tempUnlock2 = oci_parse($c1,$queryString2 . $testDate . ' AND DAY_Key <' . $testEndDate  );
	
	$queryString3 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(REQUEST_TYPE) like 
'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'n' AND unlockrequest_type = 1 and day_key >  ";
	$tempUnlock3 = oci_parse($c1,$queryString3. $testDate . ' AND DAY_Key <' . $testEndDate );
	
	$queryString4 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(REQUEST_TYPE) like 
'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'null' AND unlockrequest_type = 1 and day_key >  ";
	$tempUnlock4 = oci_parse($c1,$queryString4. $testDate . ' AND DAY_Key <' . $testEndDate );
	
	oci_execute($tempUnlock1);
	printQueries($tempUnlock1);
	oci_execute($tempUnlock2);
	printQueries($tempUnlock2);
	oci_execute($tempUnlock3);
	printQueries($tempUnlock3);
	oci_execute($tempUnlock4);
	printQueries($tempUnlock4);
}

$query = "q3"; // Delete


if($query == "q3"){
	echo "perm unlocks: ";
	$queryString1 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(REQUEST_TYPE) like 
'%unlockresponse%' AND unlockrequest_type = 2 and day_key >  ";
	
	$permUnlock1 = oci_parse($c1, $queryString1 . $testDate . 'AND day_key <' . $testEndDate ); 
	
	$queryString2 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(REQUEST_TYPE) like 
'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'y' AND unlockrequest_type = 2and day_key >  ";

	$permUnlock2 = oci_parse($c1,$queryString2 . $testDate . ' AND DAY_Key <' . $testEndDate  );
	
	$queryString3 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(REQUEST_TYPE) like 
'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'n' AND unlockrequest_type = 2 and day_key >  ";
	$permUnlock3 = oci_parse($c1,$queryString3. $testDate . ' AND DAY_Key <' . $testEndDate );
	
	$queryString4 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(REQUEST_TYPE) like 
'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'null' AND unlockrequest_type = 2 and day_key >  ";
	$permUnlock4 = oci_parse($c1,$queryString4. $testDate . ' AND DAY_Key <' . $testEndDate );
	
	
	oci_execute($permUnlock1);
	printQueries($permUnlock1);
	
	oci_execute($permUnlock2);
	printQueries($permUnlock2);
	
	oci_execute($permUnlock3);
	printQueries($permUnlock3);
	
	oci_execute($permUnlock4);
	printQueries($permUnlock4);
}


$query = "q4"; // Delete

if($query == "q4"){
	echo "Total unlocks: ";
	$queryString1 = "select  COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 'unlockreceipt%#2' and lower(IMEI) like  '$testIMEI%'and day_key >=  ";
	
	$totalUnlock = oci_parse($c1, $queryString1 . $testDate . 'AND day_key <' . $testEndDate ); 
	
	$queryString2 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 'unlockreceipt%#2' AND unlockrequest_type = 1 And lower(IMEI) like '$testIMEI%' AND  day_key >=  ";
	$totalTempUnlocks = oci_parse($c1,$queryString2 . $testDate . ' AND DAY_Key <' . $testEndDate );
	
	$queryString3 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND lower(REQUEST_TYPE) like 'unlockreceipt%#2' AND unlockrequest_type = 2 and day_key >=  ";
	$totalPermUnlocks = oci_parse($c1,$queryString3. $testDate . ' AND DAY_Key <' . $testEndDate );
	
	$queryString4 = "select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(IMEI) like  '$testIMEI%' AND REQUEST_TYPE like '%UnlockResponse%' AND pe_response_code = 102  and day_key >=  ";
	$totalErrors = oci_parse($c1,$queryString4. $testDate . ' AND DAY_Key <' . $testEndDate );

	
	
	oci_execute($totalUnlock);
	printQueries($totalUnlock);

	oci_execute($totalTempUnlocks);
	printQueries($totalTempUnlocks);
	
	oci_execute($totalPermUnlocks);
	printQueries($totalPermUnlocks);
	
	oci_execute($totalErrors);
	printQueries($totalErrors);
}

// Change to Post back ?
function printQueries($compiledQuery){

	while (($row = oci_fetch_array($compiledQuery, OCI_ASSOC+OCI_RETURN_NULLS)) != false) {
	 
		foreach ($row as $item) {
			echo "  <p>".($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;")."</p>\n";
		}
	}

}

#$result = array_unique($tacCodes);


#echo json_encode(array('status' => 'success','message'=> 'The group has been removed')
/*

Registration Queries
select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(attestation_status) like '%' and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;
select  COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(attestation_status) = 'true' and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;
select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(attestation_status) = 'false' and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;

Temp Unlocks(type 1)
select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 
'%unlockresponse%' AND unlockrequest_type = 1 and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;
select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like
'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'y' AND unlockrequest_type = 1 and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;
select   COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 
'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'n' AND unlockrequest_type = 1 and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;


select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 
'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'null' AND unlockrequest_type = 1 and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;


type 2 total  
select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 
'%unlockresponse%' AND unlockrequest_type = 2 and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;

type 2 eligble 
select  COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 
'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'y' AND unlockrequest_type = 2 and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3; 

type 2 ineligble  
select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 
'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'n' AND unlockrequest_type = 2 and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;

type 2 null   
select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 
'%unlockresponse%'and  lower(UNLOCK_ELIGIBLE) = 'null' AND unlockrequest_type = 2 and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;



 difference between eligieble and unlocked?, for TOTAL unlocks graph
select  COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 'unlockreceipt%#2' and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;
select / COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 'unlockreceipt%#2'and DAY_Key >= &value1 AND day_key < &value2 AND unlockrequest_type = 1 AND IMEI = &value3;
select  COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where lower(REQUEST_TYPE) like 'unlockreceipt%#2'and DAY_Key >= &value1 AND day_key < &value2 AND unlockrequest_type = 2 AND IMEI = &value3;

 Error 
select COUNT(DISTINCT IMEI) from UNLOCK_CDR_FACT where  REQUEST_TYPE like '%UnlockResponse%' AND pe_response_code = 102 and DAY_Key >= &value1 AND day_key < &value2 AND IMEI = &value3;
*/

?>