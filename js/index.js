/*   DEPARTMENT    */

//fetch all

//   /department/returnALL
//		id: department name



function ulExists(id){
	var ul;
	if($(id).length == 0) {
	  		ul=document.createElement('ul');
		  	ul.setAttribute('class','row align-items-center');
		  	ul.setAttribute('id','ul-departments');
	  		$(ul).appendTo( $("#departments") );

		}

	  	else {
	  		ul=$(id);
	  	}

	  	return ul;

}



$(document).ready(function(){

	$.getJSON( "https://jsonplaceholder.typicode.com/posts", function() {
	  
	  format: "json";


	})
	  .done(function(data){

	  	var ul=ulExists('#ul-departments');
	  	

		$.each( data, function( key, val ) {

			console.log(val.title);
	  		var li=document.createElement('li');
	  		li.setAttribute('class','col-sm-3 department');
	  		li.setAttribute('id','department-'+key);
		   	li.innerHTML=`<div class="department-wrapper">
							   	<img src="assets/images/cover.jpg">
							   	<i class="delete_icon fa fa-trash" aria-hidden="true"></i>
								<i class="edit_icon"></i>
								<div class="department-text">
						   			<h5>${key}</h5>
								</div>
						  
		   			</div`;
			$(li).appendTo($(ul));					

		});


	  

	  })
	    .fail(function(){
	    	console.log("Error");
	    })


	// save department


	$("#department_form").submit(function(){

		e.preventDefault();
        e.stopPropagation();

		var name=$('#dep_name');
		var data=JSON.stringify($(this).serializeArray());
		console.log(data);

		$.ajax({
			  type: "POST",
			  url: 'localhost:5000/departement/save',
			  dataType: "json",
			  data: data,

			  success: function(){

	  			var ul=ulExists('#ul-departments');
	  			var li=document.createElement('li');
		  		li.setAttribute('class','col-sm-3 department');
		  		li.setAttribute('id','department-'+key);
			   	li.innerHTML=`<h4>"${val.title}"</h4>
									<i class="delete_icon fa fa-trash" aria-hidden="true"></i>
									<i class="edit_icon"></i>`;
	  			$(li).appendTo($(ul));
			  		
			  },
			  error: function(){
			  	console.log("error while deleting department");
			  }



		});



	})


	// delete department

	// /departement/delete/{id}



	$(".delete_icon").on('click', function(){
		var id=$(this).parent.attr('id').split('-')[1];

		$.ajax({
		  type: "DELETE",
		  url: 'localhost:5000/departement/delete/'+id,
		  data: {
		      "id": id
		    },

		  success: function(){
		  	var dep="departement-"+id;
		  	$(dep).remove();
		  },
		  error: function(){
		  	console.log("error while deleting department");
		  }

		});




	})




})


