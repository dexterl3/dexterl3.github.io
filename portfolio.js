

$(document).ready(function() {

	$('#bemployers').click(function(event) { expand(event, 'employers'); });
	$('#bprojects').click(function(event) { expand(event, 'projects'); });
	$('#buw').click(function(event) { expand(event, 'uw'); });
	$('#brs').click(function(event) { expand(event, 'rs'); }); 
	
});

function expand(event,id){

   $('#'+id).toggle();
   if($('#b'+id).text() == 'Expand'){
   
		$('#b'+id).text('Hide');
   }else if($('#b'+id).text() == 'Hide'){
		$('#b'+id).text('Expand');
   }

}


