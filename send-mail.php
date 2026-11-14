<?php
/* AEVUM | Contact form mail handler
   contact.html posts the form here; this emails the message to customer care.
   Needs a web host with PHP and a working mail() function. */

define('TO_EMAIL',   'designs@kesardesigns.com');  // every message is delivered here (the address shown on the Contact Us page)
define('FROM_EMAIL', 'noreply@kesardesigns.com');  // sender address: use one on the domain this site is hosted on
$TOPICS = array('Order status', 'Returns', 'A watch I love', 'Care and warranty');

date_default_timezone_set('Asia/Kolkata');

function clean($s) { return trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $s)); }
function one_line($s) { return trim(preg_replace('/\s+/', ' ', clean($s))); }
function text_len($s) { return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s); }
function post($k) { return isset($_POST[$k]) && is_string($_POST[$k]) ? $_POST[$k] : ''; }

$ajax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'fetch';

function finish($ok, $error, $status, $ajax) {
    if ($ajax) {                                   // contact.html sends in the background and shows the popup
        http_response_code($status);
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(array('ok' => $ok, 'error' => $error));
    } elseif ($ok) {                               // plain form post: go back to the page, which shows the popup
        header('Location: contact.html?sent=1', true, 303);
    } else {
        http_response_code($status);
        echo '<!doctype html><meta charset="utf-8"><title>Message not sent</title><p style="font:16px sans-serif;padding:24px">'
           . htmlspecialchars($error, ENT_QUOTES, 'UTF-8') . ' <a href="contact.html">Go back</a></p>';
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: contact.html', true, 303); exit; }

$name    = one_line(post('name'));
$email   = one_line(post('email'));
$phone   = one_line(post('phone'));
$message = str_replace(array("\r\n", "\r"), "\n", clean(post('message')));
$t       = one_line(post('topic'));
$topic   = in_array($t, $TOPICS, true) ? $t : 'General query';

if (one_line(post('hp_url')) !== '') finish(true, '', 200, $ajax);   // hidden trap field filled in: a bot. Pretend it worked, send nothing.

if (text_len($name) < 2 || text_len($name) > 100)                          finish(false, 'Please enter your full name.', 422, $ajax);
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || text_len($email) > 254)  finish(false, 'Please enter a valid email address.', 422, $ajax);
if ($phone !== '' && !preg_match('/^[0-9]{10}$/', $phone))                 finish(false, 'Phone number must be exactly 10 digits.', 422, $ajax);
if (text_len($message) < 5 || text_len($message) > 5000)                   finish(false, 'Please write a message (up to 5000 characters).', 422, $ajax);

$subject = 'AEVUM enquiry: ' . $topic;
$body = "New message from the AEVUM Contact Us page\n\n"
      . "Name:  $name\n"
      . "Email: $email\n"
      . 'Phone: ' . ($phone !== '' ? $phone : '-') . "\n"
      . "Topic: $topic\n\n"
      . "Message:\n$message\n\n"
      . "--\nSent " . date('d M Y, H:i T') . ' from IP ' . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown') . "\n";
$headers = implode("\r\n", array(
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: AEVUM Website <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,                         // replying in your mail app goes straight to the customer
    'X-Mailer: PHP/' . PHP_VERSION,
));

if (!@mail(TO_EMAIL, $subject, str_replace("\n", "\r\n", $body), $headers)) {
    error_log('AEVUM contact form: mail() failed for message from ' . $email);
    finish(false, 'Sorry, we could not send your message right now. Please write to ' . TO_EMAIL . ' instead.', 500, $ajax);
}
finish(true, '', 200, $ajax);
