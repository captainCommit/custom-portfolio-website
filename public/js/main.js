(function($) {

	"use strict";
	document.getElementById('items').innerHTML = document.getElementById('items').innerHTML+'<p class="text text-left mx-3" style="color:white !important;">Made By : <a href="https://github.com/Suparno1998" target="_blank" class="link white" > Suparno Karmakar<a></p>'
	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);

