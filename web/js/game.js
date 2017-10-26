var urlHelper = function ($route) {
    return window.location.pathname.replace(/[\w-]+\/[\w-]+\\*$/, $route);
};

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

var count = 0;

$(document).ready(function () {
    $('.game div').click(function () {
        var id = this.id;
        var i = 0;

        $.ajax({
            method: "POST",
            url: yiiOptions.getNeighbors,
            data: 'id=' + id,
            success: function (response) {
                var neighbors = response;
                $('.counter').html(++count);
                
                $('.game div').each(function () {
                    var id = this.id;
                    if (neighbors.includes(id)) {
                        if ($('.game #' + id).html() === '') {
                            $('.game #' + id).html('OK');
                            $('.game #' + id).addClass('select');
                        } else {
                            $('.game #' + id).html('');
                            $('.game #' + id).removeClass('select');
                        }
                    }
                    if ($(this).html() === 'OK') {
                        ++i;
                    }
                });

                if (randomInteger(0, 100) > 96) {
                   var rand = randomInteger(0, i);
                   var elems = $('.game .select');
                   
                   $(elems[rand]).html('');
                }

                if (yiiOptions.sizeField === i) {
                    alert('Congratulations! You win!');
                }
            },
            error: function () {

            }
        });
    });
});


