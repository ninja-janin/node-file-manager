$(".js-button-expand").on("click", function() {
  let btnWrapper =  $(this).parents(".expand-button");
  let btnTarget = btnWrapper.siblings(".expand-button-target");

  btnWrapper.toggleClass("is-expanded");
  btnTarget.toggleClass("is-expanded");
  $(this).toggleClass("is-expanded");
  
  if($(this).hasClass("is-expanded")) {
    $(this).text("閉じる");
  } else {
    $(this).text($(this).data("text"));
  }
});