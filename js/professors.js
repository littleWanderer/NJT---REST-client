/* PROFESSORS */

$(document).ready(function(){


	$(".professors").on('click','.professor', function(){

		console.log('clicked');
		var $card = $(this);
	    if ($card.hasClass("professor-flipped")) {
	    	$('.front').css('display', 'block');
	    	$('.back').css('display', 'none');
	        $card.removeClass('professor-flipped');
	    } else {
	    	$('.front').css('display', 'none');
	    	$('.back').css('display', 'block');
	        $card.addClass('professor-flipped');
	    }

	});



})

	




