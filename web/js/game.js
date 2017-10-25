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
                var neighbors = response;
                
                $('.game div').each(function () {
                    var id = this.id;
                    if (neighbors.includes(id)) {
                        if ($('.game #' + id).html() === '') {
                            $('.game #' + id).html('OK');
                        } else {
                            $('.game #' + id).html('');
                        }    
                    }
                });
            },
            error: function () {

            }
        });
    });
});


