// Application module
angular.module('crudApp',['ui.router'])

.factory('myFactory', function(){
    var savedData = {};

    function set(data) {
        savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }
})

.config(['$qProvider', function ($qProvider,) {
    $qProvider.errorOnUnhandledRejections(false);
}])


.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('Album', {
        url: '/Album',
        templateUrl: 'albumCollection.html'
    })
    .state('Photo', {
        url: '/Photo',
        templateUrl: 'photo.html'
    })
    
})

/*
.controller("DbController",['$scope','$http', function($scope, $http){

    // Function to get album details from the database
    album();

    function album(){
        // Sending request to albumDetails.php files
        $http.post("databaseFiles/albumDetails.php", $scope.session).then(function(data, status) {
            $scope.albums = data.data;
            //console.log("Sucessfully getting data : " + JSON.stringify(data));
        });
    };

    //persistObject.set('objectName', "OK"); 

}])
*/

.controller("CtrlAlbum", function($location, $http, $scope){
    $location.path('/Album');
    album();

    function album(){
        // Sending request to albumDetails.php files
        $http.post("databaseFiles/albumDetails.php", $scope.session).then(function(data, status) {
            $scope.albums = data.data;
            //console.log("Sucessfully getting data : " + JSON.stringify(data));
        });
    };
})


.controller("CtrlPhotoPass", function($location, $http, $scope, myFactory){
    
    $scope.QueryCategory = function(data){
        myFactory.set(data);
        $location.path('/Photo');
    }
    
})

.controller("CtrlPhoto", function($location, $http, $scope, myFactory){

    $scope.category = myFactory.get();
    console.log("OKOKOKOK " + myFactory.get());
        
    
});


