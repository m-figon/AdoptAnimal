(function($) {
      
    var app = $.sammy('#main', function() {
  
      this.get('#/', function(context) {
        $(".app").append("<ul class='rslides'></ul>");
        $(".app ul").append("<li><img src='imgs/dog1.jpg' alt=''></li>");
        $(".app ul").append("<li><img src='imgs/dog2.jpg' alt=''></li>");
        $(".app ul").append("<li><img src='imgs/dog3.jpg' alt=''></li>");
      });
      this.get('#/dogs', function(context) {
        console.log('dogs');
      });
      this.get('#/cats', function(context) {
        console.log('cats');
      });
      this.get('#/rabbits', function(context) {
        console.log('rabbits');
      });
    });
  
    $(function() {
      app.run('#/');
    });
  
  })(jQuery);