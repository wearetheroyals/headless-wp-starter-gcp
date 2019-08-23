<?php
$videoName = block_value( 'video-name' );
$videoId = block_value( 'video-id' );
?>

<style>
.wp-block-vimeo-modal {
  border: 1px dotted;
  text-align: center;
}
</style>

<div class="wp-block-vimeo-modal" data-video-placeholder="<? block_field( 'video-plc-img' ); ?>" data-video-name="<?= $videoName; ?>" data-video-id="<?= $videoId; ?>">
  <p>Vimeo Modal: <?= $videoId ?></p>
  <img src="<? block_field( 'video-plc-img' ); ?>" alt="<?= $videoName; ?>" />
</div>