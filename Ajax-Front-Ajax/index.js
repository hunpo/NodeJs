//前端代码
function ServerFunction() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8888/ServerFunc",
        data: { "name": $("#serverRet").val() },
        dataType: 'json',
        success: function (data) {
            $('#serverRet').val(data.name);
        },
        error: function (xhr) {
            alert("error");
        }
    });
}
function FunctionFileFunction() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8888/FunctionFileFunc",
        data: { "name": $("#FileRet").val() },
        dataType: 'json',
        success: function (data) {
            $('#FileRet').val(data.name);
        },
        error: function (xhr) {
            alert("error");
        }
    });
}