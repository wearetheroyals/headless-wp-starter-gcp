<?php
$type = block_value( 'type' );
$content = block_value( 'content' );
$linkref = block_value( 'linkref' );
$style = block_value( 'style' );
?>

<style>
.wp-block-fluid-image {
  border: 1px dotted;
}
.wp-block-fluid-image > p {
  margin: 0!important;
}
</style>

<div class="wp-block-fluid-image"
  data-type="<?= $type; ?>"
  data-linkref="<?= $linkref; ?>"
  data-style="<?= $style; ?>"
  data-content="<?= htmlspecialchars($content); ?>"
  data-background-image="<? block_field( 'background-image' ); ?>"
  >
  <h3>Fluid Image</h3>
  <p>Type: <?= $type; ?></p>
  <p>Content: <?= $content; ?></p>
  <p>Link Reference: <?= $linkref; ?></p>
  <p>Style: <?= $style; ?></p>
  <img src="<? block_field( 'background-image' ); ?>" alt="<?= $type; ?>" />
</div>