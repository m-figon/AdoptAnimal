(function ($) {

  var app = $.sammy('#main', function () {
    this.get('#/', function (context) {
      $('.left h1').on('click', () => {
        context.app.setLocation('#/');
        location.reload();
      })
      $('.middle h1:eq(0)').on('click', () => {
        context.app.setLocation('#/dogs');
        location.reload();
      })
      $('.middle h1:eq(1)').on('click', () => {
        context.app.setLocation('#/cats');
        location.reload();
      })
      $('.middle h1:eq(2)').on('click', () => {
        context.app.setLocation('#/rabbits');
        location.reload();
      })
      $(".app").append("<ul class='rslides'></ul>");
      $(".app ul").append("<li><img src='imgs/dog1.jpg' alt=''></li>");
      $(".app ul").append("<li><img src='imgs/dog2.jpg' alt=''></li>");
      $(".app ul").append("<li><img src='imgs/dog3.jpg' alt=''></li>");
      $(".app").append("<div class='quote'><h1>Saving one dog will not change the world, but surely for that one dog, the world will change forever.</h1></div>");
    });
    this.get('#/:type', function (context) {
      $('.left h1').on('click', () => {
        context.app.setLocation('#/');
        location.reload();
      })
      $('.middle h1:eq(0)').on('click', () => {
        context.app.setLocation('#/dogs');
        location.reload();
      })
      $('.middle h1:eq(1)').on('click', () => {
        context.app.setLocation('#/cats');
        location.reload();
      })
      $('.middle h1:eq(2)').on('click', () => {
        context.app.setLocation('#/rabbits');
        location.reload();
      })
      console.log(context.params.type);
      let animals = [];
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          console.log(animals);
          $(".app").append("<div class='animals'></div>");
          let id = 0;
          for (let item of animals) {
            console.log(item.type);
            if (item.type === context.params.type) {
              $(".app .animals").append("<div class='animal'></div>");
              $(".app .animal:eq(" + id + ")").append("<h2>" + item.name + " " + item.age + "</h2>");
              $(".app .animal:eq(" + id + ")").append("<img src=" + item.img + ">");
              $('.animal h2:eq(' + id + ')').on('click', () => {
                context.app.setLocation("#/" + item.type + "/" + item.id);
                location.reload();
              })
              id++;
            }
          }
        })
    });
    this.get('#/:type/:id', function (context) {
      $('.left h1').on('click', () => {
        context.app.setLocation('#/');
        location.reload();
      })
      $('.middle h1:eq(0)').on('click', () => {
        context.app.setLocation('#/dogs');
        location.reload();
      })
      $('.middle h1:eq(1)').on('click', () => {
        context.app.setLocation('#/cats');
        location.reload();
      })
      $('.middle h1:eq(2)').on('click', () => {
        context.app.setLocation('#/rabbits');
        location.reload();
      })
      console.log(context.params.type);
      let animals = [];
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          console.log(animals);
          $(".app").append("<div class='animal-details'></div>");
          console.log(context.params.id);
          for (let item of animals) {
            if (parseInt(item.id) === parseInt(context.params.id) && item.type === context.params.type) {
              $(".animal-details").append("<div class='content'></div");
              $(".content").append("<h2>" + item.name + "</h2");
              $(".content").append("<img src=" + item.img + ">");
              $(".content").append("<h1> Age: " + item.age + "</h1");
              $(".content").append("<h1> Gender: " + item.gender + "</h1");
              $(".content").append("<h1> Charcter: " + item.description + "</h1");
              $(".content").append("<button>ADOPT</button>");
              $('.content button').on('click', () => {
                context.app.setLocation("#/" + item.type + "/" + item.id + "/adoption");
                location.reload();
              })
              id++;
            }
          }
        })
    });
    this.get('#/:type/:id/adoption', function (context) {
      $('.left h1').on('click', () => {
        context.app.setLocation('#/');
        location.reload();
      })
      $('.middle h1:eq(0)').on('click', () => {
        context.app.setLocation('#/dogs');
        location.reload();
      })
      $('.middle h1:eq(1)').on('click', () => {
        context.app.setLocation('#/cats');
        location.reload();
      })
      $('.middle h1:eq(2)').on('click', () => {
        context.app.setLocation('#/rabbits');
        location.reload();
      })
      fetch('https://rocky-citadel-32862.herokuapp.com/AdoptAnimal/animals')
        .then(response => response.json())
        .then(data => {
          animals = data.slice();
          $(".app").append("<div class='adoption-form'></div");
          $(".adoption-form").append("<div class='adoption-content'></div>");
          $(".adoption-content").append("<h2>Adoption form</h2>");
          $(".adoption-content").append("<input value='First Name' type='text'>");
          $(".adoption-content").append("<input value='Last Name' type='text'>");
          $(".adoption-content").append("<input value='City' type='text'>");
          $(".adoption-content").append("<input value='Street' type='text'>");
          $(".adoption-content").append("<input value='Phone Number' type='text'>");
          $(".adoption-content").append("<input value='Email' type='text'>");
          $(".adoption-content").append("<input value='" + animals[context.params.id].name + "' type='text' readonly>");
          $(".adoption-content").append("<input value='" + animals[context.params.id].type.substr(0, animals[context.params.id].type.length - 1) + "' type='text' readonly>");
          $(".adoption-content input:lt(6)").on('focus',(e)=>{
            if(e.target.value==="First Name" || e.target.value==="Last Name" || e.target.value==="City" || e.target.value==="Street" || e.target.value==="Email" || e.target.value==="Phone Number"){
              e.target.value=""
            }
          });
          $(".adoption-content input:lt(6)").on('focus',(e)=>{
            if(e.target.value==="First Name" || e.target.value==="Last Name" || e.target.value==="City" || e.target.value==="Street" || e.target.value==="Email" || e.target.value==="Phone Number"){
              e.target.value=""
            }
          });
          $(".adoption-content input:gt(5)").css({'background-color': '#b5c7a3'});
          $(".adoption-content input:eq(0)").on('blur',(e)=>{
            if(e.target.value==="" || e.target.value===" "){
              e.target.value="First Name"
            }
          });
          $(".adoption-content input:eq(1)").on('blur',(e)=>{
            if(e.target.value==="" || e.target.value===" "){
              e.target.value="Last Name"
            }
          });
          $(".adoption-content input:eq(2)").on('blur',(e)=>{
            if(e.target.value==="" || e.target.value===" "){
              e.target.value="City"
            }
          });
          $(".adoption-content input:eq(3)").on('blur',(e)=>{
            if(e.target.value==="" || e.target.value===" "){
              e.target.value="Street"
            }
          });
          $(".adoption-content input:eq(4)").on('blur',(e)=>{
            if(e.target.value==="" || e.target.value===" "){
              e.target.value="Email"
            }
          });
          $(".adoption-content input:eq(5)").on('blur',(e)=>{
            if(e.target.value==="" || e.target.value===" "){
              e.target.value="Phone Number"
            }
          });
          $(".adoption-content").append("<button>ADOPT</button>");
          $(".adoption-content button").on('click',()=>{
            alert('adoption request sent');
          })
        })
    });
  });

  $(function () {
    app.run('#/');
  });

})(jQuery);
