<?php get_header(); ?>

<?php
while (have_posts()) : the_post();
    $form_html = get_post_meta(get_the_ID(), '_airtable_form_html', true);
    $newformHTML = get_the_content();

    $newformHTML =str_replace('< form', '<form class="airtable-form"', $newformHTML);
    $newformHTML =str_replace('< input', '<input', $newformHTML);

?>

    <div id="testing-airtable post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h1 class="entry-title"><?php the_title(); ?></h1>
        <div class="entry-content airtable-WP">
            <div class="airtable-WP--form-container hidden-only-if-sent">
                <?php echo $newformHTML; ?>
            </div>
            <div class="airtable-WP--form-container visible-only-if-sent">
                
            </div>
        </div>
    </div>


    contactFormContainer = contactFormBlock.querySelector('.hidden-only-if-sent');
        contactFormSuccess = contactFormBlock.querySelector('.visible-only-if-sent');
        contactFormError = contactFormBlock.querySelector('.visible-only-if-error');
        contactFormSending = contactFormBlock.querySelector('.visible-only-if-sending');
<?php endwhile; ?>

<?php get_footer(); ?>
