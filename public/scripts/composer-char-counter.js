$(document).ready(function(){
  // let numChar = Number($('.counter').val());
  $('#tweet-text').on('input', function() {
    let numChar = 140 - this.value.length;
    console.log($(this).parent().find('.counter'))
    const counter = $(this).parent().find('.counter')
    counter.text(numChar)
    if (numChar > 0) {
      counter.css('color', '#5C4B51')
    } else {
      counter.css('color', 'red')
    }
  })

});