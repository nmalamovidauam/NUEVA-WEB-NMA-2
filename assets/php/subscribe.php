<?php
/* ..............................................................................
 * Author:--------------- Themearth Team
 * AuthorEmail:-----------themearth.info@gmail.com
 * Technical Support:---- http://themearth.com/
 * Websites:------------- http://themearth.com/
 * Copyright:------------ Copyright (C) 2015 logichunt.com. All Rights Reserved.
 * License:-------------- http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 * ..............................................................................
 * File:- subscribe.php (Modificado por NMA para usar Mailchimp con secrets)
 * .............................................................................. */

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["email"])) {

    $email = strtolower(trim($_POST["email"]));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Correo inválido."]);
        exit;
    }

    // Usar secrets de GitHub
    $apiKey = getenv('MAILCHIMP_API_KEY');
    $listId = getenv('MAILCHIMP_LIST_ID');
    $dataCenter = substr($apiKey, strpos($apiKey,'-')+1);

    $url = "https://$dataCenter.api.mailchimp.com/3.0/lists/$listId/members/";

    $json = json_encode([
        "email_address" => $email,
        "status"        => "subscribed"
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_USERPWD, "user:$apiKey");
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode == 200) {
        echo json_encode(["success" => true, "message" => "¡Gracias por unirte a NMA!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Este correo ya está suscrito o hubo un error."]);
    }

} else {
    echo json_encode(["success" => false, "message" => "No se recibió ningún correo."]);
}
