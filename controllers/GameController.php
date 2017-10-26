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
            Yii::$app->response->format = Response::FORMAT_JSON;
            $id = Yii::$app->request->post('id');

            $position = explode('_', $id);
            $neighbors = [];
            $grid = Yii::$app->params['grid'];

            for ($i = -1; $i <= 1; $i++) {
                for ($j = -1; $j <= 1; $j++) {
                    $rowIndex = $position[0] + $i;
                    $colIndex = $position[1] + $j;
                    if (($rowIndex == 0 || $colIndex == 0) || ($rowIndex > $grid['widht'] || $colIndex > $grid['height'])) {
                        continue;
                    }
                    $neighbors[] = $rowIndex . '_' . $colIndex;
                }
            }

            return json_encode($neighbors);
        }
    }

    public function actionSaveResults()
    {
        if (Yii::$app->request->isAjax) {
            
        }
    }
}
