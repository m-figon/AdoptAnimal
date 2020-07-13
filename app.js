(function ($) {

  var app = $.sammy('#main', function () {

    this.get('#/', function (context) {
      $(".app").append("<ul class='rslides'></ul>");
      $(".app ul").append("<li><img src='imgs/dog1.jpg' alt=''></li>");
      $(".app ul").append("<li><img src='imgs/dog2.jpg' alt=''></li>");
      $(".app ul").append("<li><img src='imgs/dog3.jpg' alt=''></li>");
    });
    this.get('#/:type', function (context) {
      console.log(context.params.type);
      let animals = [];
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          console.log(animals);
          $(".app").append("<div class='animals'></div>");
          let id=0;
          for (let item of animals) {
            console.log(item.type);
            if (item.type === context.params.type) {
              $(".app .animals").append("<div class='animal'></div>");
              $(".app .animal:eq("+id+")").append("<h2>"+item.name+" "+item.age+"</h2");
              $(".app .animal:eq("+id+")").append("<img src="+item.img+">");
              $(".app .animal:eq("+id+")").append("<h1>"+item.description+"</h1");
              id++;
            }
          }
        })
    });
    
  });

  $(function () {
    app.run('#/');
  });

})(jQuery);