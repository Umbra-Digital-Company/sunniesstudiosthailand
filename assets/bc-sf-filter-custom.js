$(".left-filter-wrapper").click(function(){
    var sidebarContainer = $(".sidebar-filter-container");
    var backgroundOverlay = $(".background-overlay");

    if (sidebarContainer.css("right") === "0px") {
        sidebarContainer.animate({right: "-510px"}, "easeInOut");
        backgroundOverlay.css("display", "none");
    } else {
        sidebarContainer.animate({right: "0px"}, "easeInOut");
        backgroundOverlay.css("display", "block");
    }
});

$(document).click(function(event) {
    var target = $(event.target);
    var sidebarContainer = $(".sidebar-filter-container");
    var backgroundOverlay = $(".background-overlay");

    if (!target.closest(".left-filter-wrapper").length && !target.closest(".sidebar-filter-container").length) {
        sidebarContainer.animate({right: "-510px"}, "easeInOut");
        backgroundOverlay.css("display", "none");
    }
});

$(".sidebar-title-wrapper").click(function(){
    var sidebarSvgFilterOut = $(".sidebar-filter-container");
    var backgroundOverlay = $(".background-overlay");

    sidebarSvgFilterOut.animate({right: "-510px"}, "easeInOut");
    backgroundOverlay.css("display", "none");
});