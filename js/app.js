(function() {
  $('button.counter').on('click', function(){
    // send info about click to server, and run next line
    $(this).blur().addClass('clear').text('Thank you!');
  })
})();