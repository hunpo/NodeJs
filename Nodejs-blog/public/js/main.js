$(document).ready(function () {
  $(".delete-article").on('click',function (e) {
    $target = $(e.target);
    console.log($target.attr("data-id"));
    var id = $target.attr("data-id");
    $.ajax({
        type:'DELETE',
        url:'/articles/'+ id,
        success:function(){
            alert("Deleting article");
            window.location.href="/";
        },
        error:function(err){
            console.log(ErrorEvent)
        }

    })
  });
});
