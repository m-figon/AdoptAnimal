
import $ from 'jquery';
import { router, route } from 'jqueryrouter';

route('/', ({ route }) => {
    $('section').removeClass('active');
    $(`section[data-route="${route}"]`).addClass('active');
});
route('/dogs', ({ route }) => {
    $('section').removeClass('active');
    $(`section[data-route="${route}"]`).addClass('active');
});
route('/cats', ({ route }) => {
    $('section').removeClass('active');
    $(`section[data-route="${route}"]`).addClass('active');
});
route('/rabbits', ({ route }) => {
    $('section').removeClass('active');
    $(`section[data-route="${route}"]`).addClass('active');
});
$('.middle h1').click(function () {
    console.log('clicked');
    router.set($(this).data('route'));
});
router.init(); // Hydrates current application
//https://medium.com/@contactsachinsingh/routing-using-jquery-router-part-1-50ebc9d5de6d
