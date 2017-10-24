var urlHelper = function ($route) {
    return window.location.pathname.replace(/[\w-]+\/[\w-]+\\*$/, $route);
};

$(document).ready(function () {
    $('.game div').click(function () {
        var id = this.id;
        
        $.ajax({
            method: "POST",
            url: yiiOptions.getNeighbors,
            data: 'id=' + id,
            success: function (response) {
                console.log(response);
            },
            error: function () {

            }
        });
    });
});


