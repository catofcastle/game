<?php
use yii\helpers\Url;
use yii\web\View;

$this->registerJsFile('@web/js/game.js', ['depends' => 'yii\web\JqueryAsset']);

$options = [
    'getNeighbors' => Url::to(['game/get-neighbors'], true)
];
$this->registerJs(
    "var yiiOptions = " . \yii\helpers\Json::htmlEncode($options) . ";", View::POS_HEAD, 'yiiOptions'
);

?>

<div class="container-fluid">
    <?php for ($i = 1; $i <= $grid['widht']; $i++): ?>
        <div class="row game">
            <?php for ($j = 1; $j <= $grid['height']; $j++): ?>
                <div class="col-md-1" id="<?= $i . '_' . $j ?>"></div>
            <?php endfor; ?>
        </div>
    <?php endfor; ?>
</div>    