(function($){
  $(function(){
	  
	var sectionTemplate = '<div class=\"col s12 m4\"><h5>{title}</h5><ul class="collection"><ul></div>';
	var lisItemTempllate = '<a href="{url}" class="collection-item"><img src="https://www.google.com/s2/favicons?domain={url}" /><span>{name}</span></a>';
	
	var containerElement = $(".section > .row");//.append("<div class=\"col s12 m4\">cla</div>")
	$.getJSON( "config.json", function( data ) {
		$.each(data.links, function(name, links) {
			var sectionElement = $(sectionTemplate.replace(/{title}/g, name));

			$.each(links, function(name,link ){
				var listItem = lisItemTempllate.replace(/{url}/g, link).replace(/{name}/g, name);
				sectionElement.find('.collection').append(listItem);
			});
			containerElement.append(sectionElement)
		});
	}).error(function(xhr) {
                    console.log(xhr)
                });
  }); // end of document ready
})(jQuery); // end of jQuery name space