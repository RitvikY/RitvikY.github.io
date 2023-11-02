<?php
$response = array('status' => 'error', 'message' => 'There was a problem with your submission, please try again.');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST["message"]));

    // Check that data was sent to the mailer.
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        $response['message'] = "Oops! There was a problem with your submission. Please complete the form and try again.";
    } else {
        // Set the recipient email address.
        $recipient = "ry.work0@gmail.com";

        // Set the email subject.
        $subject = "New contact from $name";

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            http_response_code(200);
            $response['status'] = 'success';
            $response['message'] = "Thank You! Your message has been sent.";
        } else {
            http_response_code(500);
            $response['message'] = "Oops! Something went wrong and we couldn't send your message.";
        }
    }
} else {
    http_response_code(403);
}

echo json_encode($response);
?>
