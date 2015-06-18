(function() {
  $('button.counter').on('click', function(){
    $(this).find("span").text(parseInt($(this).text()) + 1);
  })
})();