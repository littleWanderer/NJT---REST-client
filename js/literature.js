/* LITERATURE */



function ulExists(id){
	var ul;
	if($(id).length == 0) {
	  		ul=document.createElement('ul');
		  	ul.setAttribute('class','row align-items-center');
		  	ul.setAttribute('id', 'ul-literature');
	  		$(ul).appendTo( $("#literature") );

		}

	  	else {
	  		ul=$(id);
	  	}

	  	return ul;

}


function createLiteratureElement(data, ul){


	var divDown=document.createElement('div');
	divDown.setAttribute('class','book-down');


	for(var i=0; i<data.authorEntities.length; i++){
		var h6=document.createElement('h6');
		if(i==0){
			$(h6).text("Autors/ "+data.authorEntities[i].name +" "+ data.authorEntities[i].surname);

		}

		else{
			$(h6).text(data.authorEntities[i].name +" "+ data.authorEntities[i].surname);
			
		}

		$(h6).appendTo($(divDown));

	}

	var li=document.createElement('li');
	  		li.setAttribute('class','col-sm-3 book');
	  		li.setAttribute('id','book-'+data.id);

	var wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'book-wrapper');
		wrapper.innerHTML=`<div class="book-upper">
								<img src="assets/images/cover.jpg"><div class="book-text">
						   		<h5>${data.name}</h5>
								
						   	</div>`;

		$(divDown).appendTo($(wrapper)); 	
		$(wrapper).appendTo($(li));		
		$(li).appendTo($(ul));	
}

$(document).ready(function(){
	

	// return all literature

	const URLbooks="http://localhost:9005/literature/returnAll";
	$.ajax({
	  headers: { 
	        'Accept': 'application/json',
	        'Content-Type': 'application/json' 
	  },
	  url : URLbooks,
	  type: 'GET',
      dataType: 'json',
      crossOrigin: true,
      crossDomain: true,

	   error: function(xhr, status, errorThrown){
	            console.log("xhr:", xhr);
	            console.log("status:", status);
	            console.log("error:", errorThrown);
	    }
	})
	.then(function(data, status, xhr){
		console.log("data:", data);
        console.log("status:", status);
	    console.log("xhr:", xhr);

	    var ul=ulExists('#ul-literature');
	  	

		$.each(data, function( key, val ) {

	  		createLiteratureElement(data[key], ul);				

		}); 

	})


	//save a book


	const URLsaveBook="http://localhost:9005/literature/save";

	$("#literature_form").submit(function(e){

		e.preventDefault();
        e.stopPropagation();

		var name=$('#literature_name').val();
		var auth1name=$('#name-1').val();
		var auth1surname=$('#surname-1').val();

		
		
		var jsonData = {};
		var authors=[];

		jsonData["name"]=name;

		authors.push({"name": auth1name, "surname": auth1surname});

		if($('#name-2').length && $('#surname-2').length){
			var auth2name=$('#name-2').val();
			var auth2surname=$('#surname-2').val();
			authors.push({"name": auth2name, "surname": auth2surname});
		}

		if($('#name-3').length && $('#surname-3').length){
			var auth2name=$('#name-3').val();
			var auth2surname=$('#surname-3').val();
			authors.push({"name": auth2name, "surname": auth2surname});
		}

		jsonData["authorEntities"]=authors;


		console.log(jsonData);

		$.ajax({
			headers: { 
			    'Accept': 'application/json',
			    'Content-Type': 'application/json' 
			  },
			  type: "POST",
			  url: URLsaveBook,
			  dataType: "json",
			  data: JSON.stringify(eval(jsonData)),

			  success: function(data){ //mora se vratiti generisani kljuc

			  	var form=document.getElementById('literature_form');
			  	form.reset();

	  			var ul=ulExists('#ul-literature');
	  			createLiteratureElement(data, ul);
			  		
			  },
			  error: function(){
			  	console.log("error while saving literature");
			  }



		});



	});





})

	




