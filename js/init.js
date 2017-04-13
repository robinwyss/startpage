(function($){
  $(function(){

	var sectionTemplate = '<div class=\"col s12 m4\"><h5>{title}</h5><ul class="collection"><ul></div>';
	var lisItemTempllate = '<a href="{url}" class="collection-item"><img src="https://www.google.com/s2/favicons?domain={url}" /><span>{name}</span></a>';
  var sampleSettingsJson = "https://robinwyss.cloudant.com/startpagedemo/55db3d2870c5860664574d157a05b01f"
  var settingsJson = "https://robinwyss.cloudant.com/startpage/4b18fb01bdd5f8d4cd38e5d3f225ff00"
  var url = settingsJson;
	var containerElement = $(".section > .row");//.append("<div class=\"col s12 m4\">cla</div>")
  // TODO claudant authentication
	$.getJSON( sampleSettingsJson, function( data ) {
    var content = data.content;
		$.each(content.links, function(name, links) {
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
