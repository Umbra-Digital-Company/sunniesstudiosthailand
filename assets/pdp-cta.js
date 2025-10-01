$(window).scroll(function() {
  if ($(window).scrollTop() + $(window).height() == $(document).height()) {
      $(".new-prescription-toggle-container").hide();
      $(".product-add-to-bag-container").hide();
      $(".join-waitlist-container").hide();
  }else{
       $(".new-prescription-toggle-container").show();
       $(".product-add-to-bag-container").show();
      $(".join-waitlist-container").show();
  }
});