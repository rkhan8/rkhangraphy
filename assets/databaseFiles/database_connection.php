<?php
// Connecting to database as mysqli_connect("hostname", "username", "password") ;
$con = mysqli_connect("localhost", "root", "root");

//select database (connection_statement, "database name")
mysqli_select_db($con, "rkhangraphy")
or die("Could not select database");


// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}


?>