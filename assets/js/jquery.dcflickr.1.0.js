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

function method_flickr_photosets_getPhotos(photoset_id){
	var defaults = {
		base: 'https://api.flickr.com/services/rest/',
		method: 'method=flickr.photosets.getPhotos',
		q: {
			api_key: '47d5e17b65350f9ef04d5ff26b6d865e',
			user_id: '161481192@N02', 
			format : 'json',
			photoset_id : photoset_id		
		}
	};

	var url = defaults.base + '?' + defaults.method;

	for(var key in defaults.q){			
		url += '&';
		url += key + '=' + defaults.q[key];
	}

	return flickr_json_object(url);
}

function get_image(farm_id,server_id, photo_id, o_secret){

	//image URL
// s	petit carré 75x75
// q	large square 150x150
// t	miniature, côté le plus long de 100
// m	petit, côté le plus long de 240
// n	small, 320 on longest side
// -	moyen, côté le plus long de 500
// z	Moyen 640, côté le plus long de 640
// c	moyen 800, 800 sur la longueur†
// b	grand, côté le plus long de 1 024*
// h	largeur 1 600, longueur 1 600†
// k	largeur 2 048, longueur 2 048†
// o	image d'origine, jpg, gif ou png selon le format source

	//query https://www.flickr.com/services/api/misc.urls.html
	var url = 'https://farm'+farm_id+'.staticflickr.com/'+server_id+'/'+photo_id+'_'+o_secret+'_c.png';
	return url;

}




(function($){

	$.fn.dcFlickrAlbum = function() {

		//Get album info 
		var json_album = method_flickr_photosets_getList();
		let album = new Album(json_album.photosets, json_album.stat);

		var $dcFlickrAlbum = this;

		if(album.stat == 'fail'){
			alert("Due to a technical problem, it is impossibe for the moment to browse into portfolio. This issue will be fixed soon.\nThank you !");
		}
		else{
			return $dcFlickrAlbum.each(function(options){
				var htmlString = "";	
				$.each(album.photosets.photoset, function(i,item){					
	
					htmlString +='<div class="col-sm-4"><div class="post bordered">';
					htmlString += '<h3 class="post-title text-center"><a href="#">'+item.title._content+'</a></h3>';
					htmlString += '<div class="meta text-center"><span class="categories">Photos: '+item.photos+', Videos: '+item.videos+'</a></span></div>';
					htmlString += '<figure class="full"><a href="portfolio.html"><div class="text-overlay"><div class="info">Show album</div></div>';
					htmlString += '<img src="'+get_image(item.farm,item.server,item.primary, item.secret)+'" alt="" /></a></figure>';
					htmlString += '<div class="post-content"><div class="footer-meta"><span><img src="assets/img/views-icon.png" style="height:5%; width:5%; margin-right: 3px;"/>'+ item.count_views+'</span></div></div>';
					htmlString += '</div></div>';
				});
			
				// append html to object
				$dcFlickrAlbum.html(htmlString);
	
			});
		}
	};

	$.fn.dcFlickrPortfolioFilter = function() {

		//Get album info 
		var json_album = method_flickr_photosets_getList();
		let album = new Album(json_album.photosets, json_album.stat);

		var $dcFlickrAlbum = this;
		var htmlString = "";	


		if(album.stat == 'fail'){
			alert("Due to a technical problem, it is impossibe for the moment to browse into portfolio. This issue will be fixed soon.\nThank you !");
		}
		else{
			htmlString +='<button class="all active" onclick="filterSelection(\'all\', \'all\')">View All</button>';				
			return $dcFlickrAlbum.each(function(options){
				$.each(album.photosets.photoset, function(i,item){	
					htmlString +='<button class="'+i+'" onclick="filterSelection(\''+item.title._content+'\', '+i+')">'+item.title._content+'</button>';
				});
			
				// append html to object
				$dcFlickrAlbum.html(htmlString);
	
			});
		}
	};

	$.fn.dcFlickrPortfolio = function(){
		//Get album info 
		var json_album = method_flickr_photosets_getList();
		let album = new Album(json_album.photosets, json_album.stat);

		var $dcFlickrPortfolio = this;

		if(album.stat == 'fail'){
			alert("Due to a technical problem, it is impossibe for the moment to browse into portfolio. This issue will be fixed soon.\nThank you !");
		}
		else{
			return $dcFlickrPortfolio.each(function(options){
				var htmlString = "";	
				$.each(album.photosets.photoset, function(i,albums){					
	
					var json_gallery = method_flickr_photosets_getPhotos(albums.id);
					let gallery = new Gallery(json_gallery.photoset, json_gallery.stat);

					$.each(gallery.photoset.photo, function(j, gallerie){

						htmlString += '<div class="column '+albums.title._content+' ">';
						htmlString += '<figure class="full"><div class="content zoom-gallery">';
						htmlString += '<a href="'+get_image(gallerie.farm,gallerie.server,gallerie.id, gallerie.secret)+'"><div class="text-overlay"><div class="info"><img src="assets/img/picture.png"></div></div>';
						htmlString += '<img src="'+get_image(gallerie.farm,gallerie.server,gallerie.id, gallerie.secret)+'" style="width:100%"></a></div></figure></div>';

					});

				});
			
				// append html to object
				$dcFlickrPortfolio.html(htmlString);
	
			});
		}
	}



})(jQuery);