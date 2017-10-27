<?php
namespace app\controllers;

use Yii;
use yii\web\Response;
use yii\web\Controller;
use \app\models\Winner;

class GameController extends Controller
{
    
    /**
     * Генерация вида (index)
     * @return type
     */
    public function actionIndex()
    {
        $grid = Yii::$app->params['grid'];

        return $this->render('index', ['grid' => $grid]);
    }
    
    /**
     * Алгоритм, вычисляющей соседние значения элемента массива
     * @return type array Возвращает соседние значения элемента массива
     */
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
    
    /**
     * Сохранение имени победителя и его счёт в БД
     */
    public function actionSaveResults()
    {
        if (Yii::$app->request->isAjax) {
            $data = Yii::$app->request->post();
            $winnerName = $data['winner'];
            $winnerScore = $data['score'];

            $winner = new Winner();
            $winner->name = $winnerName;
            $winner->score = $winnerScore;
            $winner->date = date("Y-m-d H:i:s");
            $winner->insert();
        }
    }
    
    /**
     * @return type array Возвращает ТОП 10 лучших игроков из БД
     */
    public function actionTopPlayers()
    {
        if (Yii::$app->request->isAjax) {
            Yii::$app->response->format = Response::FORMAT_JSON;
            
            $topPlayers = Winner::find()
                ->select('name')
                ->orderBy(['score' => SORT_ASC])
                ->limit(10)
                ->asArray()
                ->all();
            
            return $topPlayers;
        }
    }
}
