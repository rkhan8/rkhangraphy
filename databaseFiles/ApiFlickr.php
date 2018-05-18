<?php


function _DBConnectApi(){

    // Including database connections
    require_once 'database_connection.php';

    
    // Check connection
    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    // mysqli query to fetch all data from database
    $query = "SELECT * FROM api WHERE 1";
    $result = mysqli_query($con, $query);
    
    $arr = array();
    if(mysqli_num_rows($result) > 0){
    
        while($row = mysqli_fetch_assoc($result)) {
            $arr[] = $row;
        }
    }

    mysqli_close($con);
    
    return $arr;
};




function _flickPhotosetsGetList($database){

    #GET API info
    $encode =  json_encode($database[0]);
    $api = json_decode($encode);
    
    # CREATE PARAMETERS
    $params = array(
        //'api_key'	=> '47d5e17b65350f9ef04d5ff26b6d865e',
        'api_key'   => $api->id_key,
        'method'	=> 'flickr.photosets.getList',
        'user_id'	=> '161481192@N02',
        'format'	=> 'php_serial',
        //'format'	=> 'json',
        //'nojsoncallback' => '1',
    );
    $encoded_params = array();
    foreach ($params as $k => $v){
        $encoded_params[] = urlencode($k).'='.urlencode($v);
    }

    # Call API AND DECODE RESPONSE

    $url = "https://api.flickr.com/services/rest/?".implode('&', $encoded_params);
    $rsp = file_get_contents($url);
    $rsp_obj = unserialize($rsp);

    return $rsp_obj;
};


function _flickPhotosetsGetPhotos($database, $photoset_id){

    #GET API info
    $encode =  json_encode($database[0]);
    $api = json_decode($encode);

    # CREATE PARAMETERS
    $params = array(
        'api_key'	=> $api->id_key,
        'photoset_id'=> $photoset_id,
        'method'	=> 'flickr.photosets.getPhotos',
        'user_id'	=> '161481192@N02',
        'format'	=> 'php_serial',
    );
    $encoded_params = array();
    foreach ($params as $k => $v){
        $encoded_params[] = urlencode($k).'='.urlencode($v);
    }

    # Call API AND DECODE RESPONSE

    $url = "https://api.flickr.com/services/rest/?".implode('&', $encoded_params);
    $rsp = file_get_contents($url);
    $rsp_obj = unserialize($rsp);

    return $rsp_obj;

};



function _flickShowPhoto($database, $photo_id){

    #GET API info
    $encode =  json_encode($database[0]);
    $api = json_decode($encode);

    # CREATE PARAMETERS
    $params = array(
        'api_key'	=> $api->id_key,
        'method'	=> 'flickr.photos.getSizes',
        'photo_id'	=> $photo_id,
        'format'	=> 'php_serial',
    );
    $encoded_params = array();
    foreach ($params as $k => $v){
        $encoded_params[] = urlencode($k).'='.urlencode($v);
    }

    # Call API AND DECODE RESPONSE

    $url = "https://api.flickr.com/services/rest/?".implode('&', $encoded_params);
    $rsp = file_get_contents($url);

    $rsp_obj = unserialize($rsp);

    return $rsp_obj;


};

?>
