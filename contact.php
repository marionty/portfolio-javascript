<?php
// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Récupérer les données du formulaire et les nettoyer
  $name = cleanInput($_POST["name"]);
  $email = cleanInput($_POST["email"]);
  $comment = cleanInput($_POST["comment"]);

  // Valider l'adresse e-mail
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "L'adresse e-mail n'est pas valide.";
    exit;
  }

  // Adresse e-mail à laquelle envoyer les données du formulaire
  $to = "marion.tytgat@icloud.com";

  // Sujet de l'e-mail
  $subject = "Nouveau message du formulaire de contact";

  // Corps de l'e-mail
  $message = "Nom: " . $name . "\n";
  $message .= "E-mail: " . $email . "\n";
  $message .= "Message: " . $comment;

  // En-têtes de l'e-mail
  $headers = "From: " . $email . "\r\n";
  $headers .= "Reply-To: " . $email . "\r\n";

  // Envoyer l'e-mail
  if (mail($to, $subject, $message, $headers)) {
    echo "Merci pour votre message, $name! Nous vous contacterons bientôt.";
  } else {
    echo "Une erreur s'est produite lors de l'envoi de l'e-mail.";
  }
}

// Fonction pour nettoyer les données du formulaire
function cleanInput($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>
