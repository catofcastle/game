var urlHelper = function ($route) {
    return window.location.pathname.replace(/[\w-]+\/[\w-]+\\*$/, $route);
};

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

var count = 0;

$(window).on('load', function () {
    var idStorage = [];

    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === 'score') {
            $('.counter').html(localStorage.getItem(localStorage.key(i)));
        }

        if (localStorage.key(i).substr(0, 3) === 'id_') {
            idStorage.push(localStorage.getItem(localStorage.key(i)));
        }
    }

    $('.game div').each(function () {
        var id = this.id;
        if (idStorage.includes(id)) {
            $('.game #' + id).html('OK');
            $('.game #' + id).addClass('select');
        }
    });
});

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

                            localStorage.setItem('id_' + id, id);
                        } else {
                            $('.game #' + id).html('');
                            $('.game #' + id).removeClass('select');

                            localStorage.removeItem('id_' + id, id);
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
                localStorage.setItem('score', count);

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

    $('#new-game').on('click', function () {
        for (var i = localStorage.length - 1; i >= 0; i--) {
            if (localStorage.key(i) === 'winner') {
                continue;
            }
            console.log(localStorage.key(i));
            localStorage.removeItem(localStorage.key(i));
        }
        location.reload();
    });
});


