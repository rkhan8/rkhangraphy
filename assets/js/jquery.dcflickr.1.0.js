function flickr_json_object(url){

	var response; 

	//Flickr Api has syntax error on json, so it had to fail 
	$.ajax({
		async: false,
		type: "GET", 
		url: url,
		error : function(data)
		{
			var response_str = JSON.stringify(data.responseText);
			//correction of error
			response = JSON.parse(JSON.parse(response_str.replace("jsonFlickrApi(", "").replace(response_str.slice(-2), '"')));
		}	  
	});
	return response;

}


function method_flickr_photosets_getList(){
	var defaults = {
		base: 'https://api.flickr.com/services/rest/',
		method: 'method=flickr.photosets.getList',
		q: {
			api_key: '47d5e17b65350f9ef04d5ff26b6d865e',
			user_id: '161481192@N02', 
			format : 'json'		
		}
	};

	var url = defaults.base + '?' + defaults.method;

	for(var key in defaults.q){			
		url += '&';
		url += key + '=' + defaults.q[key];
	}

	return flickr_json_object(url);
}

// function method_flickr_photos_getInfo(photo_id, secret){
// //get photo info
// 	//exemple : https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&
// 	//api_key=47d5e17b65350f9ef04d5ff26b6d865e&photo_id=41475168244&secret=40c24a60c4
// 	var defaults = {
// 		base: 'https://api.flickr.com/services/rest/',
// 		method: 'method=flickr.photos.getInfo',
// 		q: {
// 			api_key: '47d5e17b65350f9ef04d5ff26b6d865e',
// 			photo_id: photo_id,
// 			secret : secret, 
// 			format : 'json'		
// 		}
// 	};

// 	var url = defaults.base + '?' + defaults.method;

// 	for(var key in defaults.q){			
// 		url += '&';
// 		url += key + '=' + defaults.q[key];
// 	}

// 	return flickr_json_object(url);
// }

function get_image(farm_id,server_id, photo_id, o_secret){

	//image URL
	//query https://www.flickr.com/services/api/misc.urls.html
	var url = 'https://farm'+farm_id+'.staticflickr.com/'+server_id+'/'+photo_id+'_'+o_secret+'_b.png';
	return url;

}




(function($){

		//exemple of flickr feed
	// 	$.fn.dcFlickr = function(options) {
	// 	//set default options
	// 	var defaults = {
	// 		base: 'http://api.flickr.com/services/feeds/',
	// 		api: 'photos_public.gne',
	// 		limit: 20,
	// 		q: {
	// 			lang: 'en-us',
	// 			format: 'json',
	// 			jsoncallback: '?'
	// 		},
	// 		onLoad : function() {}
	// 	};

	// 	//call the default otions
	// 	var options = $.extend(defaults, options);
	// 	var url = defaults.base + defaults.api + '?';
	// 	var qfirst = true;

	// 	for(var key in defaults.q){
	// 		if(!qfirst)
	// 			url += '&';
	// 		url += key + '=' + defaults.q[key];
	// 		qfirst = false;
	// 	}
		
	// 	var $dcFlickr = this;

	// 	return $dcFlickr.each(function(options){

	// 		var htmlString = "";
	// 		limit = defaults.limit;
		
	// 		$.getJSON(url, function(data){
			
	// 			// Cycle each flickr image
	// 			$.each(data.items, function(i,item){
	// 				if(i < limit){
	// 					// var source = item.media.m.replace(/_m\.jpg$/, ".jpg");
	// 					var sourceSquare = (item.media.m).replace('_m.jpg', '_q.jpg');
	// 					htmlString += '<div class="item"><figure>';
	// 					htmlString += '<img src="' + sourceSquare + '" alt="" />';
	// 					htmlString += '<a href="' + item.link + '" target="_blank" class="fli-link"><i class="icon-link"></i></a></figure></div>';
	// 				}
	// 			});
			   
	// 			// append html to object
	// 			$dcFlickr.html(htmlString);
				
	// 		}).success(function() {
	// 			// onLoad callback;
	// 			defaults.onLoad.call(this);
	// 		});
	// 	});
	// };


	$.fn.dcFlickrAlbum = function() {

		//Get album info 
		var json_album = method_flickr_photosets_getList();
		let album = new Album(json_album.photosets, json_album.stat);

		var $dcFlickrAlbum = this;

		return $dcFlickrAlbum.each(function(options){
			var htmlString = "";

			$.each(album.photosets.photoset, function(i,item){					

					// htmlString += '<img src="' + get_image(item.farm,item.server,item.primary, item.secret) + '" alt="" />';
				console.log(item);
				htmlString +='<div class="col-sm-4"><div class="post bordered">';
				htmlString += '<h3 class="post-title text-center"><a href="#">'+item.title._content+'</a></h3>';
				htmlString += '<div class="meta text-center"><span class="categories">Photos: '+item.photos+', Videos: '+item.videos+'</a></span></div>';
				htmlString += '<figure class="full"><a href="#"><div class="text-overlay"><div class="info">Show album</div></div>';
				htmlString += '<img src="'+get_image(item.farm,item.server,item.primary, item.secret)+'" alt="" /></a></figure>';
				htmlString += '<div class="post-content"><div class="footer-meta"><span><img src="assets/img/views-icon.png" style="height:5%; width:5%; margin-right: 3px;"/>'+ item.count_views+'</span></div></div>';
				htmlString += '</div></div>';
			});
		
			// append html to object
			$dcFlickrAlbum.html(htmlString);

		});

	};



})(jQuery);