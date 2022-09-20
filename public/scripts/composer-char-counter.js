$(document).ready(function() {
  const text = $('#tweet-text')[0];
  //CHANGED FROM 'KEYUP' TO 'INPUT'
  $(text).on('input', function() {
    
    const counter = $(this).val().length;
    const val = 140 - counter;
    
    const parent = $(this).parent()[0];
    const child = $(parent).find('.counter')[0];
    const newCounter = $(child).text(val);
    
    if (val < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "#545149");
    }
  })
});

