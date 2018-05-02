<?php
// Including database connections
require_once 'database_connection.php';
//fetch data passed
$data = json_decode(file_get_contents("php://input"));
//store data
$category = mysqli_real_escape_string($con, $data->category);

// mysqli query to fetch all data from database
$query = "SELECT * from subcategories where category = '$category'";
$result = mysqli_query($con, $query);
$arr = array();
if(mysqli_num_rows($result) != 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $arr[] = $row;
    }
}
// Return json array containing data from the databasecon
echo $json_info = json_encode($arr);
?>