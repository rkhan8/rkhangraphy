<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');

require_once 'ApiFlickr.php';
$database = _DBConnectApi();

$flickPhotosetsGetList = _flickPhotosetsGetList($database);
$data_flickPhotosetsGetList = $flickPhotosetsGetList;

//GET photoset info
$encode_flickPhotosetsGetList = json_encode($data_flickPhotosetsGetList['photosets']['photoset']);
$decode_flickPhotosetsGetList = json_decode($encode_flickPhotosetsGetList);

//SET ARRAY COLLECTION DATA
$collection = array();

//EXPLORE PHOTOSETINFO AND GET URL IMAGE
foreach($decode_flickPhotosetsGetList as $data){

   $flickShowPhoto = _flickShowPhoto($database, $data->primary);
   $flickShowPhoto_data = $flickShowPhoto;
   
   $encode_show_flickr_photo = json_encode($flickShowPhoto_data['sizes']['size'][4]);
   $decode_show_flickr_photo = json_decode($encode_show_flickr_photo);
   

   //JSON SCHEMA DATA
   $photoset_id = $data->id;
   $nb_photos = $data->photos;
   $nb_videos = $data->videos;
   $title = $data->title->_content;
   $url =  $decode_show_flickr_photo->source;

   $collection[] = array("photoset_id" => $photoset_id, "title" => $title, "photos" => $nb_photos, "videos" => $nb_videos, "url" => $url);

}

echo json_encode($collection);


?>