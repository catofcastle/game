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
        var activeFields = 0;

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
                        ++activeFields;
                    }
                });

                if (randomInteger(0, 100) > 96) {
                    var rand = randomInteger(0, activeFields);
                    var elems = $('.game .select');

                    $(elems[rand]).html('');
                }
            },
            error: function () {

            },
            complete: function () {
                if (yiiOptions.sizeField === activeFields) {
                    $('#myModal').modal('show');
                    if (localStorage.getItem('winner')) {
                        var storageWinner = localStorage.getItem('winner');
                        $('#winner').val(storageWinner);
                    }
                }
            }
        });
    });
    
    $('#save-results').on('click', function () {
        var winner = $('#winner').val();        
        localStorage.setItem('winner', winner);
        
        $.ajax({
            method: "POST",
            url: yiiOptions.saveResults,
            data: {winner: winner, score: count},
            success: function () {
                $('#myModal').modal('hide');
                alert('Ваше имя вписано в анналы победителей!');
            },
            error: function () {
                alert('Opps! Something wrong!');
            }
        });
    });
});


