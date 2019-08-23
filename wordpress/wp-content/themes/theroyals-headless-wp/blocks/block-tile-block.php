<?php
$type = block_value( 'type' );
$title = block_value( 'title' );
$subtitle = block_value( 'subtitle' );
$content = block_value( 'content' );
$linkref = block_value( 'link-reference' );
?>

<style>
.wp-block-tile-block {
  border: 1px dotted;
}
.wp-block-tile-block > p {
  margin: 0!important;
}
</style>

<div class="wp-block-tile-block"
  data-type="<?= $type; ?>"
  data-title="<?= $title; ?>"
  data-subtitle="<?= $subtitle; ?>"
  data-link-reference="<?= $linkref; ?>"
  data-hero-image="<? block_field( 'hero-image' ); ?>"
  data-content="<?= htmlspecialchars($content); ?>"">
  <h3>Tile Block</h3>
  <p>Type: <?= $type; ?></p>
  <p>Title: <?= $title; ?></p>
  <p>Subtitle: <?= $subtitle; ?></p>
  <p>Content: <?= $content; ?></p>
  <p>Link Reference: <?= $linkref; ?></p>
  <img src="<? block_field( 'hero-image' ); ?>" alt="<?= $title; ?>" />
</div>