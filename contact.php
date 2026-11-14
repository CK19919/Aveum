<?php
/* AEVUM | Contact Us page
   Shows the page and, when the form is posted, emails the message to customer care. */

const TO_EMAIL   = 'designs@kesardesigns.com';  // every message is delivered here (the address shown on the page)
const FROM_EMAIL = 'noreply@kesardesigns.com';  // sender address: use one on the domain this site is hosted on
const TOPICS     = ['Order status', 'Returns', 'A watch I love', 'Care and warranty'];

date_default_timezone_set('Asia/Kolkata');

function clean(string $s): string { return trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $s)); }
function one_line(string $s): string { return trim(preg_replace('/\s+/', ' ', clean($s))); }
function text_len(string $s): int { return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s); }
function esc($s): string { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
function post(string $k): string { return isset($_POST[$k]) && is_string($_POST[$k]) ? $_POST[$k] : ''; }

$v      = ['name' => '', 'email' => '', 'phone' => '', 'topic' => TOPICS[0], 'message' => ''];
$error  = '';
$status = 200;
$sent   = isset($_GET['sent']) && $_GET['sent'] === '1';   // show the thank-you popup after a successful send
$ajax   = ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'fetch';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $v['name']    = one_line(post('name'));
    $v['email']   = one_line(post('email'));
    $v['phone']   = one_line(post('phone'));
    $v['message'] = str_replace(["\r\n", "\r"], "\n", clean(post('message')));
    $t            = one_line(post('topic'));
    $v['topic']   = in_array($t, TOPICS, true) ? $t : 'General query';

    if (one_line(post('hp_url')) !== '') {
        // Hidden trap field filled in: this is a bot. Pretend it worked, send nothing.
    } elseif (text_len($v['name']) < 2 || text_len($v['name']) > 100) {
        $error = 'Please enter your full name.'; $status = 422;
    } elseif (!filter_var($v['email'], FILTER_VALIDATE_EMAIL) || text_len($v['email']) > 254) {
        $error = 'Please enter a valid email address.'; $status = 422;
    } elseif ($v['phone'] !== '' && !preg_match('/^[0-9]{10}$/', $v['phone'])) {
        $error = 'Phone number must be exactly 10 digits.'; $status = 422;
    } elseif (text_len($v['message']) < 5 || text_len($v['message']) > 5000) {
        $error = 'Please write a message (up to 5000 characters).'; $status = 422;
    } else {
        $subject = 'AEVUM enquiry: ' . $v['topic'];
        $body = "New message from the AEVUM Contact Us page\n\n"
              . "Name:  {$v['name']}\n"
              . "Email: {$v['email']}\n"
              . 'Phone: ' . ($v['phone'] !== '' ? $v['phone'] : '-') . "\n"
              . "Topic: {$v['topic']}\n\n"
              . "Message:\n{$v['message']}\n\n"
              . "--\nSent " . date('d M Y, H:i T') . ' from IP ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";
        $headers = implode("\r\n", [
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'From: AEVUM Website <' . FROM_EMAIL . '>',
            'Reply-To: ' . $v['email'],          // replying in your mail app goes straight to the customer
            'X-Mailer: PHP/' . PHP_VERSION,
        ]);
        if (!@mail(TO_EMAIL, $subject, str_replace("\n", "\r\n", $body), $headers)) {
            error_log('AEVUM contact form: mail() failed for message from ' . $v['email']);
            $error = 'Sorry, we could not send your message right now. Please write to ' . TO_EMAIL . ' instead.';
            $status = 500;
        }
    }

    if ($ajax) {                                   // the page's script posts in the background and shows the popup
        http_response_code($status);
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['ok' => $error === '', 'error' => $error]);
        exit;
    }
    if ($error === '') {                           // plain form post (no JavaScript): redirect, then show the popup
        header('Location: contact.php?sent=1', true, 303);
        exit;
    }
    http_response_code($status);                   // otherwise fall through and show the page with the error
}
?><!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Contact AEVUM customer care: order status, returns, warranty and care advice for your 925 silver watch.">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="assets/images/favicon-192.png">
<link rel="apple-touch-icon" href="assets/images/favicon-180.png">
<meta name="theme-color" content="#e0bddb">
<title>Contact Us | AEVUM</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Michroma&display=swap">
<link rel="stylesheet" href="css/styles.css">
</head><body id="top">

<div class="top"><div class="wrap">
 <div class="r1"><div></div>
  <a class="brand" href="index.html" aria-label="Aevum home"><img alt="AEVUM" src="assets/images/logo.png"></a>
  <div></div></div>
 <nav aria-label="Main"><a href="index.html#watches">Our Watches</a><a href="index.html#about">About Us</a><a href="retailers.html">Find a Retailer</a><a href="contact.php" class="on" aria-current="page">Contact Us</a></nav>
</div></div>

<main>
<div class="view show" id="v-contact"><div class="wrap"><div class="crumbs"><a href="index.html">Home</a>–<b>Contact Us</b></div></div><div class="ct"><div class="wrap">
 <header class="cth"><span class="lab" style="color:var(--accent)">Contact us</span><h1>We’d love to hear <em>from you.</em></h1><p>Questions about an order, a return, caring for your silver, or a piece you love. Our customer care team is happy to help.</p></header>
 <div class="cgrid">
  <aside class="cinfo"><h2>Customer care</h2>
   <a class="ci" href="mailto:designs@kesardesigns.com"><span class="ic"><svg class="i" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></span><span class="lab">Write to us</span><b>designs@kesardesigns.com</b><small>Order status, returns and general queries</small></a>
   <a class="ci" href="tel:+919035139301"><span class="ic"><svg class="i" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg></span><span class="lab">Call us</span><b>+91 90351 39301</b><small>Kesar Watch Designs customer care</small></a>
   <a class="ci" href="retailers.html"><span class="ic"><svg class="i" viewBox="0 0 24 24"><path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9a3 3 0 006 0 3 3 0 006 0 3 3 0 004 0M9 20v-6h6v6"/></svg></span><span class="lab">Visit a store</span><b>Find a retailer near you</b><small>Browse authorised stores and their details</small></a>
   <div class="ci"><span class="ic"><svg class="i" viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></span><span class="lab">Head office</span><b>Kesar Watch Designs Pvt. Limited</b><small>Jay Lake View, #506, 4th Floor, Muddinapalya Main Road, Bengaluru, Karnataka 560091<br>www.kesardesigns.com</small></div>
  </aside>
  <form class="cform" id="cf" method="post" action="contact.php"><h2>Send us a message</h2>
   <div class="frow"><label class="fld"><span>Full name</span><input name="name" required maxlength="100" autocomplete="name" placeholder="Your name" value="<?= esc($v['name']) ?>"></label><label class="fld"><span>Email</span><input name="email" type="email" required maxlength="254" autocomplete="email" placeholder="you@example.com" value="<?= esc($v['email']) ?>"></label></div>
   <label class="fld"><span>Phone (optional)</span><input name="phone" type="tel" inputmode="numeric" maxlength="10" pattern="[0-9]{10}" title="Enter exactly 10 digits, numbers only" autocomplete="tel-national" placeholder="10-digit mobile number" value="<?= esc($v['phone']) ?>"></label>
   <div class="fgrp"><span>I’m writing about</span><div class="chips" id="topics"><?php foreach (TOPICS as $t): ?><button type="button" class="chip<?= $t === $v['topic'] ? ' on' : '' ?>"><?= esc($t) ?></button><?php endforeach; ?></div></div>
   <input type="hidden" name="topic" value="<?= esc($v['topic']) ?>">
   <div style="position:absolute;left:-9999px" aria-hidden="true"><label>Leave this empty<input name="hp_url" tabindex="-1" autocomplete="off"></label></div>
   <label class="fld"><span>Message</span><textarea name="message" rows="5" required minlength="5" maxlength="5000" placeholder="Tell us a little more…"><?= esc($v['message']) ?></textarea></label>
   <button class="btn dark" type="submit">Send message</button><p class="fnote">Your message goes straight to our customer care team and we’ll reply to the email address you give us.</p><div class="ok" id="ok" role="alert"><?= esc($error) ?></div>
  </form>
 </div>
 <div class="cassure"><div><b>12-month warranty</b><small>On the movement, from the date of purchase.</small></div><div><b>Real 925 sterling silver</b><small>BIS hallmarked, with a certificate of authenticity.</small></div><div><b>Made in India</b><small>Designed and handcrafted by Kesar Watch Designs, Bengaluru.</small></div></div>
</div></div>
</div>
</main>

<div class="mdl" id="thanks" role="dialog" aria-modal="true" aria-labelledby="thanks-t"<?= $sent ? '' : ' hidden' ?>>
 <div class="mbox">
  <span class="tick" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
  <p id="thanks-t">Your response is been Sent! Thank you for your response</p>
  <button class="btn dark" type="button" id="thanks-ok">OK</button>
 </div>
</div>

<footer><div class="wrap"><div class="fgrid"><div><img alt="AEVUM" src="assets/images/logo.png"><p class="t" style="margin-top:16px">Specially handcrafted watches for the new woman, in real 925 sterling silver and brilliant cut stones.</p></div>
<div><h5>Explore</h5><a href="index.html#watches">Our Watches</a><a href="index.html#about">About Us</a><a href="retailers.html">Find a retailer</a><a href="contact.php">Contact Us</a></div>
<div><h5>Our promise</h5><p>BIS Hallmarked 925 silver</p><p>12 month movement warranty</p><p>Handcrafted in India</p></div>
<div><h5>Get in touch</h5><a href="mailto:designs@kesardesigns.com">designs@kesardesigns.com</a><a href="tel:+919035139301">+91 90351 39301</a><p>Jay Lake View, #506, 4th Floor, Muddinapalya Main Road, Bengaluru, Karnataka 560091</p></div></div>
<div class="fbot"><span>Aevum by Kesar Watch Designs Pvt. Limited</span><span>Made in India</span></div></div></footer>
<script src="js/common.js"></script>
<script src="js/contact.js"></script>
</body></html>
