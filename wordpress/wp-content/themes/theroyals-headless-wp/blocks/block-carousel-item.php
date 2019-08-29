<?php
$type = block_value( 'type' );
$content = block_value( 'content' );
$linkref = block_value( 'linkref' );
$style = block_value( 'style' );
?>

<style>
.wp-block-carousel-item {
  border: 1px dotted;
}
.wp-block-carousel-item > p {
  margin: 0!important;
}`
</style>

<div class="wp-block-carousel-item"
  data-type="<?= $type; ?>"
  data-linkref="<?= $linkref; ?>"
  data-style="<?= $style; ?>"
  data-content="<?= htmlspecialchars($content); ?>"
  data-desktop-image="<? block_field( 'desktop-image' ); ?>"
  data-mobile-image="<? block_field( 'mobile-image' ); ?>"
  >
  <h3>Carousel Item</h3>
  <b>Note that these components must be in a 'Group Block' in order to be rendered</b>
  <p>Type: <?= $type; ?></p>
  <p>Content: <?= $content; ?></p>
  <p>Link Reference: <?= $linkref; ?></p>
  <p>Style: <?= $style; ?></p>
  <img src="<? block_field( 'mobile-image' ); ?>" alt="<?= $linkref; ?>" />
  <img src="<? block_field( 'desktop-image' ); ?>" alt="<?= $linkref; ?>" />
</div>