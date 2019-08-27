<?php
$title = block_value( 'title' );
$type = block_value( 'type' );
$style = block_value( 'style' );
$content = block_value( 'content' );
$bonetext = block_value( 'button-one-text' );
$bonelinkref = block_value( 'button-one-linkref' );
$bonestyle = block_value( 'button-one-style' );
$btwotext = block_value( 'button-two-text' );
$btwolinkref = block_value( 'button-two-linkref' );
$btwostyle = block_value( 'button-two-style' );
?>

<style>
.wp-block-text-module {
  border: 1px dotted;
}
.wp-block-text-module > p {
  margin: 0!important;
}
</style>

<div class="wp-block-text-module"
  data-title="<?= $title; ?>"
  data-type="<?= $type; ?>"
  data-style="<?= $style; ?>"
  data-content="<?= htmlspecialchars($content); ?>"
  data-button-one-text="<?= $bonetext; ?>"
  data-button-one-linkref="<?= $bonelinkref; ?>"
  data-button-one-style="<?= $bonestyle; ?>"
  data-button-two-text="<?= $btwotext; ?>"
  data-button-two-linkref="<?= $btwolinkref; ?>"
  data-button-two-style="<?= $btwostyle; ?>"
  >
  <h3>Text Module</h3>
  <p>Title: <?= $title; ?></p>
  <p>Type: <?= $type; ?></p>
  <p>Style: <?= $style; ?></p>
  <p>Content: <?= $content; ?></p>
  <p>Button One - Text: <?= $bonetext; ?></p>
  <p>Button One - Link Reference: <?= $bonelinkref; ?></p>
  <p>Button One - Style: <?= $bonestyle; ?></p>
  <p>Button Two - Text: <?= $btwotext; ?></p>
  <p>Button Two - Link Reference: <?= $btwolinkref; ?></p>
  <p>Button Two - Style: <?= $btwostyle; ?></p>
</div>