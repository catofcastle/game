<?php
namespace app\controllers;

use Yii;
use yii\web\Response;
use yii\web\Controller;

class GameController extends Controller
{

    public function actionIndex()
    {
        $grid = Yii::$app->params['grid'];

        return $this->render('index', ['grid' => $grid]);
    }

    public function actionGetNeighbors()
    {
        if (Yii::$app->request->isAjax) {
            //Yii::$app->response->format = Response::FORMAT_JSON;
            $json = Yii::$app->request->post('id');
            $data = json_decode($json, TRUE);
            return $data;
        }
    }
}
