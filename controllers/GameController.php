<?php
namespace app\controllers;

use Yii;
use yii\web\Controller;

class GameController extends Controller
{

    public function actionIndex()
    {
        $grid = Yii::$app->params['grid'];
        
        return $this->render('index', ['grid' => $grid]);
    }
}
