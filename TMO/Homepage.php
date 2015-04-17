<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	 <!-- FontAwesome 4.3.0 -->
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!-- Ionicons 2.0.0 -->
    <link href="http://code.ionicframework.com/ionicons/2.0.0/css/ionicons.min.css" rel="stylesheet" type="text/css" />  
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	
	<!--[if lte IE 8]><script language="javascript" type="text/javascript" src="bootstrap/plugins/js/flot/excanvas.min.js"></script><![endif]-->

   
	
    </head>

 
 <body>

     <div class="wrapper">

            <div class="container-fluid">

                
                <div class="row" >
                    <div class="col-md-12">
                        <h1 class="page-header">
                            Unlock Server- <small>Reporting Tool</small>
                        </h1>
                        
                    </div>
                </div> 
				</div>
				</div>
		  
    <div class="container">
	
	<form class="form-inline" role="form">
	<div class="row">
	<div  class="col-md-4">
      <div class="form-group">
		<label for="sel1" class="sr-only"> Select From list </label>
			<select class="form-control" id="sel1" datastyle="btn btn-flat" >
			<option>Search Tac Code Group </option>
			<option> All </option>
			<option> Production </option>
			<option> Test </option>
                                                                                                                              
			</select>
		</div>
		</div>
		<div class="col-md-4">
			<div class="form-group input-group">
                                <input type="text" class="form-control" id="serachByTacCode" placeholder="Search By Tac Code">
                                <span class="input-group-btn"><button class="btn btn-default" id= "search-btn" type="button"><i class="fa fa-search"></i></button></span>
                            </div>
		  </div>
		<div class="col-md-4">
			<a href="TacCodeList.HTML"> ManageTacCode </a>
			</div>
	
	</div>	
	</form>
	</div>
	
	
	
	<div class="container" id="tacCode1">
	
	</div>
	
	<div class="container" id="tacCodeSelect">
	<br><br>
			<div class="row">
                    <div class="col-md-5" >
					
					
                        
                     <label for="from" align="left">From</label>
						<input type="text" id="from" name="from">
						<label for="to">To</label>
						<input type="text" id="to" name="to">
						</div>
						
						<div  class="col-md-2">
							
						<button type='submit' name='submit' id='submit-btn' class="btn btn-default">Submit</button>
											
						</div>
							</div>
				<br><br>
				
				
							</div>
							
<script type="text/javascript" src="bootstrap/plugins/jQuery/jquery.js"></script>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
<script type="text/javascript" src="bootstrap/plugins/jquery-ui-1.11.3/jquery-ui.js"> </script>			  
<script type="text/javascript" src="bootstrap/plugins/js/flot/jquery.flot.min.js"></script>
<script type="text/javascript" src="bootstrap/plugins/js/flot/jquery.flot.time.js"></script>    
<script type="text/javascript" src="bootstrap/plugins/js/flot/jshashtable-3.0.js"></script>    
<script type="text/javascript" src="bootstrap/plugins/js/flot/jquery.numberformatter-1.2.3.min.js"></script>
<script type="text/javascript" src="bootstrap/plugins/js/flot/jquery.flot.symbol.js"></script>
<script type="text/javascript" src="bootstrap/plugins/js/flot/jquery.flot.axislabels.js"></script>



<script type="text/javascript" src="homepage.js "></script> 
			  
	 
	</body>
</html>
	