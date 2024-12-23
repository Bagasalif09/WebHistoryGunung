<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "raf123", "gunung");

if ($conn->connect_error) {
    die(json_encode(["error" => $conn->connect_error]));
}

$action = $_GET['action'] ?? '';

if ($action === 'volcanoes') {
    $query = "
        SELECT v.id, v.name, v.lat, v.lng, v.status, 
               GROUP_CONCAT(h.eruption_year ORDER BY h.eruption_year DESC) AS history
        FROM volcanoes v
        LEFT JOIN volcano_history h ON v.id = h.volcano_id
        GROUP BY v.id
    ";
    $result = $conn->query($query);
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}

$conn->close();
?>
