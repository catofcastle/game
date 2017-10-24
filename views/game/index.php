
<div class="container-fluid">
    <?php for ($i = 0; $i <= $grid['widht']; $i++): ?>
        <div class="row game">
            <?php for ($j = 0; $j <= $grid['height']; $j++): ?>
                <div class="col-md-1"></div>
            <?php endfor; ?>
        </div>
    <?php endfor; ?>
</div>    