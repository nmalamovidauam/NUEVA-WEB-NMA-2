    <?php
/* ..............................................................................
 * Author:--------------- Themearth Team
 * AuthorEmail:-----------themearth.info@gmail.com
 * Technical Support:---- http://themearth.com/
 * Websites:------------- http://themearth.com/
 * Copyright:------------ Copyright (C) 2015 logichunt.com. All Rights Reserved.
 * License:-------------- http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 * ..............................................................................
 * File:- subscribe.php (Modificado por NMA para usar MongoDB Atlas)
 * .............................................................................. */

require 'vendor/autoload.php'; // Requiere Composer y la librería MongoDB

use MongoDB\Client;

// Configura tu conexión MongoDB Atlas
$uri = "mongodb+srv://NMA-Nuestromundoqueseavecina:NMAcomunidad25@cluster0.cucv1nu.mongodb.net/nma_subscribers?retryWrites=true&w=majority&appName=Cluster0";
$client = new Client($uri);
$collection = $client->nma_subscribers->emails;

// Respuesta base
$response = [
    "success" => false,
    "message" => "Correo inválido."
];

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["email"])) {
    $email = strtolower(trim($_POST["email"]));

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Comprobamos si ya está suscrito
        $exists = $collection->findOne(["email" => $email]);

        if ($exists) {
            $response = [
                "success" => false,
                "message" => "Este correo ya está suscrito."
            ];
        } else {
            // Insertar nuevo suscriptor
            $collection->insertOne([
                "email" => $email,
                "fecha" => date("Y-m-d H:i:s")
            ]);

            $response = [
                "success" => true,
                "message" => "¡Gracias por unirte a NMA!"
            ];
        }
    }
}

// Devolver JSON
header("Content-Type: application/json");
echo json_encode($response);
