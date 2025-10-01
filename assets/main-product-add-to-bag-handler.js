// $('form[action$="/cart/add"]').on('submit', function(e){
//   e.preventDefault();

//   // Add product
//   jQuery.post(window.Shopify.routes.root + 'cart/add.js',$('form[action$="/cart/add"]').serialize())
//     .done(function(){
//       reloadMiniCartAjax()    
//     });
// })


$('#MainContent').on('submit', 'form[action$="/cart/add"]', function (e) {
  e.preventDefault();

  // Add product
  $.post(window.Shopify.routes.root + 'cart/add.js', $(this).serialize())
    .done(function (response) {
      // Check the structure of the response
      console.log(response);

      // Assuming the response is JSON, you can directly access its properties
      var productId = response.id;
      var productTitle = response.title;

      // Do something with the data
      console.log(productId, productTitle);

      // Continue with your logic, for example, reloading the mini cart
      reloadMiniCartAjax();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // Handle AJAX request failure here
      console.error('AJAX request failed:', textStatus, errorThrown);
    });
});
