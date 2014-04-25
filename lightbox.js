// lightbox.js
// Skeleton JavaScript file for Lab 5: Lightbox
// INFO 343, Autumn 2012
// Morgan Doocy

var IMAGES = [
	{ file: 'p1.gif',    caption: 'page 1' },
	{ file: 'p2.gif',    caption: 'page 2' },
	{ file: 'p3.gif',    caption: 'page 3' },
	{ file: 'p4.gif',    caption: 'page 4' },
	{ file: 'p6.gif',    caption: 'page 5' },
	{ file: 'p7.gif',    caption: 'page 6' },
	{ file: 'p9.gif',    caption: 'page 7' },
	{ file: 'p11.gif',    caption: 'page 8' },
	{ file: 'p12.gif',    caption: 'page 9' },
	
	
	/*{ file: 'http://info343.ischool.uw.edu/labs/5/beach.jpg',      caption: 'Beach' },
	{ file: 'http://info343.ischool.uw.edu/labs/5/biebs.jpg',      caption: 'Biebs' },
	{ file: 'http://info343.ischool.uw.edu/labs/5/bling.jpg',      caption: 'Bling' },
	{ file: 'http://info343.ischool.uw.edu/labs/5/cat.jpg',        caption: 'Cat' },
	{ file: 'http://info343.ischool.uw.edu/labs/5/dew.jpg',        caption: 'Dew' },
	{ file: 'http://info343.ischool.uw.edu/labs/5/fall.jpg',       caption: 'Fall' },
	{ file: 'http://info343.ischool.uw.edu/labs/5/freeway.jpg',    caption: 'Freeway' },
	{ file: 'http://info343.ischool.uw.edu/labs/5/hongkong.jpg',   caption: 'Hong Kong' },
	{ file: 'http://info343.ischool.uw.edu/labs/5/leaves.jpg',     caption: 'Leaves' },
	{ file: 'http://info343.ischool.uw.edu/labs/5/reflection.jpg', caption: 'Reflection' },
	{ file: 'http://info343.ischool.uw.edu/labs/5/tuners.jpg',     caption: 'Tuners' }*/
];

	$(document).ready(function() {
   // Create and inject images into #gallery.
   $.each(IMAGES, function(i, image) {
      // Create the image with appropriate attributes.
      var $img = $('<img>').attr('src', image.file).attr('alt', image.caption);
      
      // Create a link whose href is the image file itself - but attach a click
      // handler to show the lightbox and prevent the browser from visiting the
      // image's URL. (Here we introduce an anonymous intermediary function to
      // pass i from here into the enlarge function.)
      var $a = $('<a>').attr('href', image.file).click(function(event) { enlarge(event, i); });
      
      // Inject the image into the link, and the link into the gallery.
      $img.appendTo($a);
      $a.appendTo('#gallery');
   });
   
   // Clear the lightbox when it’s clicked.
   $('#lightbox').click(clear);
   
   // Listen for all keypresses in the document for keyboard navigation.
   $(document.body).keyup(keypress);
});
 
// Show the lightbox, enlarging the ith image in the list.
function enlarge(event, i) {
   // Prevent the browser from visiting the clicked link.
   event.preventDefault();
   
   // Create and inject an image into the lightbox with the source and alt of the
   // ith image in the list.
   $('<img>').attr('src', IMAGES[i].file).attr('alt', IMAGES[i].caption).appendTo('#container');
   
   // Set the previous and next links to go to the appropriate images.
   setNavigation(i);
   
   // Special effect: make the lightbox fade in using a jQuery effect.
   $('#lightbox').fadeIn(200).focus();
   
   // Remember that the lightbox is enabled for keyboard navigation.
   enlarged = true;
}
 
// Set the lightbox navigation links to go to the next/previous images.
function setNavigation(index) {
   var prev = index > 0 ? index - 1 : IMAGES.length - 1;
   var next = (index + 1) % IMAGES.length;
   
   // Set the next/prev links to new hrefs, and attach new click handlers (making
   // sure to unbind the previous one).
   $('#prev').attr('href', IMAGES[prev].file).unbind('click').click(function(event) { load(event, prev) });
   $('#next').attr('href', IMAGES[next].file).unbind('click').click(function(event) { load(event, next) });
}
 
// Load the image at the given index into the lightbox.
function load(event, index) {
   // Prevent the browser from viewing the clicked link.
   event.preventDefault();
   
   // Create and inject a new image into the lightbox, initially hidden. Make it
   // fade in, then remove the previous image.
   var $oldimg = $('#container img');
   var $newimg = $('<img>').attr('src', IMAGES[index].file).attr('alt', IMAGES[index].caption);
   $newimg.hide().appendTo('#container').fadeIn(200, function() {
      $oldimg.remove();
   });
   
   // Reset the navigation links.
   setNavigation(index);
}
 
// Clear the lightbox (fading out) if it was clicked.
function clear(event) {
   if (event.target == document.getElementById('lightbox')) {
      $('#lightbox').fadeOut(200, function() {
         $('#lightbox img').remove();
         enlarged = false;
      });
   }
}
 
// If the lightbox is being shown, make left/right arrow keys navigate through
// lightbox, and ESC dismiss it.
function keypress(event) {
   if (enlarged) {
      // console.log('keyCode: ' + event.which);
      switch (event.which) {
         case 27: // ESC
            $('#lightbox').click(); // simulate a click on the lightbox
            break;
         
         case 37: // left arrow
            $('#prev').click(); // simulate a click on #prev
            break;
            
         case 39: // right arrow
            $('#next').click(); // simulate a click on #next
            break;
      }
   }
}