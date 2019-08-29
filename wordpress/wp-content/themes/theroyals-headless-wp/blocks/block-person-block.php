<?php
$type = block_value( 'type' );
$title = block_value( 'title' );
$name = block_value( 'name' );
$email = block_value( 'email' );
$phone = block_value( 'phone' );
$twitter = block_value( 'twitter' );
$shortBio = block_value( 'short-bio' );
?>

<style>
.wp-block-person-block {
  border: 1px dotted;
}
.wp-block-person-block > p {
  margin: 0!important;
}
</style>

<div class="wp-block-person-block"
  data-type="<?= $type; ?>"
  data-title="<?= $title; ?>"
  data-name="<?= $name; ?>"
  data-email="<?= $email; ?>"
  data-phone="<?= $phone; ?>"
  data-twitter="<?= $twitter; ?>"
  data-image="<? block_field( 'image' ); ?>"
  data-short-bio="<?= htmlspecialchars($shortBio); ?>"">
  <h3>Person Block</h3>
  <p>Type: <?= $type; ?></p>
  <p>Title: <?= $title; ?></p>
  <p>Name: <?= $name; ?></p>
  <p>Email: <?= $email; ?></p>
  <p>Phone: <?= $phone; ?></p>
  <p>Twitter: <?= $twitter; ?></p>
  <p>Short Bio: <?= $shortBio; ?></p>
  <img src="<? block_field( 'image' ); ?>" alt="<?= $name; ?>" />
</div>