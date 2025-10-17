$('[lang="en"]').hide();

$('#switch-lang').click(function() {
  $('[lang="es"]').toggle();
  $('[lang="en"]').toggle();
});
