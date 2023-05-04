
$(document).ready(function() {
  // select the textarea element and register an input event handler
  $('#tweet-text').on('input', function() {
  const charLength = $(this).val().length
 const remChar = 140 - charLength
 $('.counter').text(remChar)
 if(remChar < 0){
  $('.counter').addClass('exceeded')
 }
 else{
  $('.counter').removeClass('exceeded')
 }
  
})
});