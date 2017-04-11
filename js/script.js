$(document).ready(function(){
  $('.first-name, .last-name').css('border', '1px solid black');
  $('form').on('submit', function(e){
    e.preventDefault();
    getRandomJoke();
    moveOld();
  })
});

function moveOld(){
  var oldJoke = $('#new-jokes').html();
  $('#old-jokes').prepend(oldJoke);
  $('#new-jokes').html('');
}

function getRandomJoke(){
  var apiUrl = "http://api.icndb.com/jokes/random";
  var data = {};

  if ($('#number-jokes').val()){
    var jokeNumber = $('#number-jokes').val()
    apiUrl = apiUrl + "/" + jokeNumber;
    console.log(apiUrl);
  }

  var firstName = $('.first-name').val(), lastName = $('.last-name').val();

  if($('.use-name').prop('checked')==true){
      data.firstName = firstName;
      data.lastName = lastName;
      console.log('form data', data);
  };

  $.ajax({
    url : apiUrl,
    data : data
  })
  .done(function(response){
    console.log('success', response);
    console.log(response.value);
    for(var i=0; i<response.value.length; i++){
      var joke = response.value[i].joke;
      $('#new-jokes').append('<li>'+joke+'</li>');
    }
  })
  .fail(function(error){
    console.log('oops', error);
  })
  .always(function(){
    console.log('Ajax call ran');
  });

}
