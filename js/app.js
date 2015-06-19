(function() {
  $('button.counter').on('click', function(ev){
  	var featureName = $(ev.target).closest('button').attr('data-id');
  	var self = this;
  	$.ajax({
    	url: "https://app.updateimpact.com/rest/features/"+featureName,
    	jsonp: "callback",
	    dataType: "jsonp",
	    success: function( response ) {
    	    voted($(self));
    	    $.cookie('feature-'+featureName, 'voted', { expires: 7 });
    	}
	});
  });

  function voted(el) {
  	el.blur().addClass('clear').text('Thank you!');
  }  

  if ($.cookie('feature-browse')) voted($("#browse button.counter"));
  if ($.cookie('feature-analyze')) voted($("#analyze button.counter"));
  if ($.cookie('feature-define')) voted($("#define button.counter"));
  if ($.cookie('feature-notify')) voted($("#notify button.counter"));
  if ($.cookie('feature-compare')) voted($("#compare button.counter"));
})();