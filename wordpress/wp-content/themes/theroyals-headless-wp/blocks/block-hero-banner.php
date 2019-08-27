<?php
$title = block_value( 'title' );
$subtitle = block_value( 'subtitle' );
$content = block_value( 'content' );
$bonetext = block_value( 'button-one-text' );
$bonelinkref = block_value( 'button-one-linkref' );
$bonestyle = block_value( 'button-one-style' );
$btwotext = block_value( 'button-two-text' );
$btwolinkref = block_value( 'button-two-linkref' );
$btwostyle = block_value( 'button-two-style' );
?>

<style>
.wp-block-hero-banner {
  border: 1px dotted;
}
.wp-block-hero-banner > p {
  margin: 0!important;
}
</style>

<div class="wp-block-hero-banner"
  data-title="<?= $title; ?>"
  data-subtitle="<?= $subtitle; ?>"
  data-content="<?= htmlspecialchars($content); ?>"
  data-background-image="<? block_field( 'background-image' ); ?>"
  data-button-one-text="<?= $bonetext; ?>"
  data-button-one-linkref="<?= $bonelinkref; ?>"
  data-button-one-style="<?= $bonestyle; ?>"
  data-button-two-text="<?= $btwotext; ?>"
  data-button-two-linkref="<?= $btwolinkref; ?>"
  data-button-two-style="<?= $btwostyle; ?>"
  >
  <h3>Hero Banner</h3>
  <p>Title: <?= $title; ?></p>
  <p>Subtitle: <?= $subtitle; ?></p>
  <p>Content: <?= $content; ?></p>
  <p>Button One - Text: <?= $bonetext; ?></p>
  <p>Button One - Link Reference: <?= $bonelinkref; ?></p>
  <p>Button One - Style: <?= $bonestyle; ?></p>
  <p>Button Two - Text: <?= $btwotext; ?></p>
  <p>Button Two - Link Reference: <?= $btwolinkref; ?></p>
  <p>Button Two - Style: <?= $btwostyle; ?></p>
  <img src="<? block_field( 'background-image' ); ?>" alt="<?= $title; ?>" />
</div>