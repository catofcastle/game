<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "winners".
 *
 * @property int $id
 * @property string $name
 * @property int $score
 * @property string $date
 */
class Winner extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'winners';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'score', 'date'], 'required'],
            [['score'], 'integer'],
            [['date'], 'safe'],
            [['name'], 'string', 'max' => 1000],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'score' => 'Score',
            'date' => 'Date',
        ];
    }
}
