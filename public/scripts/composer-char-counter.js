$(document).ready(function() {
  // --- our code goes here ---
  const text = $('#tweet-text')[0];
  //console.log(text);
  $(text).on('keyup', function() {
    //textarea jQuery with .val()
    const counter = $(this).val().length;
    const val = 140 - counter;
    //console.log(val);
    const parent = $(this).parent()[0];
    const child = $(parent).find('.counter')[0];
    const newCounter = $(child).text(val);
    //console.log(newCounter);
    if (val < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "#545149");
    }
  })
});

