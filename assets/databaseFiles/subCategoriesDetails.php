<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');

require_once 'ApiFlickr.php';
$database = _DBConnectApi();

//fetch data passed
$data = json_decode(file_get_contents("php://input"));
//store data
$photosetid = $data->photoset_id;


$flickPhotosetsGetPhotos = _flickPhotosetsGetPhotos($database, $photosetid);
$data_flickPhotosetsGetPhotos= $flickPhotosetsGetPhotos;

//GET photoset info
$encode_flickPhotosetsGetPhotos = json_encode($data_flickPhotosetsGetPhotos['photoset']['photo']);
$decode_flickPhotosetsGetPhotos = json_decode($encode_flickPhotosetsGetPhotos);

//SET ARRAY COLLECTION DATA
$collection = array();

//EXPLORE PHOTOSETINFO AND GET URL IMAGE
foreach($decode_flickPhotosetsGetPhotos as $data){

   $flickShowPhoto = _flickShowPhoto($database, $data->id);
   $flickShowPhoto_data = $flickShowPhoto;
   
   $encode_show_flickr_photo = json_encode($flickShowPhoto_data['sizes']['size'][11]);
   $decode_show_flickr_photo = json_decode($encode_show_flickr_photo);
   

   //JSON SCHEMA DATA
   $title = $data->title;
   $url =  $decode_show_flickr_photo->source;

   $collection[] = array("title" => $title,"url" => $url);

}

echo json_encode($collection);



?>