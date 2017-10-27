var urlHelper = function ($route) {
    return window.location.pathname.replace(/[\w-]+\/[\w-]+\\*$/, $route);
};

/**
 * Рандомайзер
 * @param {type} min Минимальное число
 * @param {type} max Макисмальное число
 * @returns {Number} Случайное число
 */
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

/**
 * При повторном входе в игру, все результаты будут сохранены.
 */
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
            $('.game #' + id).css('background-color', '#efec23');
        }
    });
});

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
                        if ($('.game #' + id).css('background-color') === 'rgb(48, 226, 45)') {
                            $('.game #' + id).css('background-color', '#efec23');

                            localStorage.setItem('id_' + id, id);
                        } else {
                            $('.game #' + id).css('background-color', '');

                            localStorage.removeItem('id_' + id, id);
                        }
                    }
                    if ($(this).css('background-color') === 'rgb(239, 236, 35)') {
                        ++activeFields;
                    }
                });
                
                /**
                 * Данный блок отвечает за случайное отключение любой лампочки
                 * с шансом при каждом ходе 1 к 25
                 */
                if (randomInteger(0, 100) > 96) {
                    var rand = randomInteger(0, activeFields);
                    var idStorage = [];
                    
                    for (var i = 0; i < localStorage.length; i++) {
                        if (localStorage.key(i).substr(0, 3) === 'id_') {
                            idStorage.push(localStorage.getItem(localStorage.key(i)));
                        }
                    }
                    
                    var idRand = idStorage[rand];
                    $('.game #' + idRand).css('background-color', '');
                    localStorage.removeItem('id_' + idRand, idRand);
                }
            },
            error: function () {

            },
            complete: function () {
                localStorage.setItem('score', count);
                $('#count').html(count);
                
                if (yiiOptions.sizeField === activeFields) {
                    $('#winners').modal('show');
                    if (localStorage.getItem('winner')) {
                        var storageWinner = localStorage.getItem('winner');
                        $('#winner').val(storageWinner);
                    }
                }
            }
        });
    });
    
    /**
     * Сохрание имени победителя и его счёта.
     */
    $('#save-results').on('click', function () {
        var winner = $('#winner').val();
        localStorage.setItem('winner', winner);

        $.ajax({
            method: "POST",
            url: yiiOptions.saveResults,
            data: {winner: winner, score: count},
            success: function () {
                $('#winners').modal('hide');
                alert('Ваше имя вписано в анналы победителей!');
            },
            error: function () {
                alert('Opps! Something wrong!');
            }
        });
    });
    
    /**
     * Начало новой игры
     */
    $('#new-game').on('click', function () {
        for (var i = localStorage.length - 1; i >= 0; i--) {
            if (localStorage.key(i) === 'winner') {
                continue;
            }
            localStorage.removeItem(localStorage.key(i));
        }
        location.reload();
    });
    
    /**
     * ТОП Игроков
     */
    $('#top-players').on('click', function () {
        $.ajax({
            method: "POST",
            url: yiiOptions.topPlayers,
            success: function (response) {
                var topPlayers = response;

                topPlayers.forEach(function (item, i, arr) {
                    $("#list ol").append('<li>' + arr[i]['name'] + '</li>');
                });

                $('#modalTopPlayers').modal('show');
            },
            error: function () {
                alert('Opps! Something wrong!');
            }
        });
    });
});


