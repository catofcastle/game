<?php
use yii\helpers\Url;
use yii\helpers\Html;
use yii\web\View;

$this->registerJsFile('@web/js/game.js', ['depends' => 'yii\web\JqueryAsset']);

$options = [
    'getNeighbors' => Url::to(['game/get-neighbors'], true),
    'saveResults' => Url::to(['game/save-results'], true),
    'topPlayers' => Url::to(['game/top-players'], true),
    'sizeField' => $grid['widht'] * $grid['height'],
];
$this->registerJs(
    "var yiiOptions = " . \yii\helpers\Json::htmlEncode($options) . ";", View::POS_HEAD, 'yiiOptions'
);

?>

<nav class="navbar navbar-default navbar-fixed-top" id="nav">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="">MY GAME</a>
        </div>
        <form class="navbar-form navbar-right"> 
            <div class='btn-group'>    
                <?= Html::button('Лучшие игроки', ['class' => 'btn btn-primary', 'id' => 'top-players']); ?>
            </div>
            <div class='btn-group'>
                <?= Html::button('Новая игра', ['class' => 'btn btn-warning', 'id' => 'new-game']); ?>
            </div>
        </form>    
    </div>
</nav>

<div class="container-fluid center">
    <?php for ($i = 1; $i <= $grid['widht']; $i++): ?>
        <div class="row game">
            <?php for ($j = 1; $j <= $grid['height']; $j++): ?>
                <div class="col-md-1" id="<?= $i . '_' . $j ?>"></div>
            <?php endfor; ?>
        </div>
    <?php endfor; ?>
    <div class="row counter">
        0
    </div>    
</div>  

<div class="modal fade" id="winners" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Победитель!</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="winner">Введите ваше имя</label>
            <input type="text" class="form-control" required id="winner">
        </div>
      </div>
      <div class="modal-footer">
         <button type="button" class="btn btn-primary" id="save-results">Сохранить</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Закрыть</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modalTopPlayers" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">ТОП 10 Игроков</h4>
      </div>
      <div class="modal-body" id="list">
          <ol>
              
          </ol>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Закрыть</button>
      </div>
    </div>
  </div>
</div>