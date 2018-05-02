// Application module
angular.module('crudApp',['ui.router'])

.factory('myCategory', function(){
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

.factory('mySubCategory', function(){
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
    .state('Subcategory', {
        url: '/Subcategory',
        templateUrl: 'subCategory.html'
    })
    .state('Photo', {
        url: '/Photo',
        templateUrl: 'photo.html'
    })
    
})

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


//PASS CATEGORY FOR QUERY
.controller("CtrlCategoryPass", function($location, $http, $scope, myCategory){
    
    $scope.QueryCategory = function(data){
        myCategory.set(data);
        $location.path('/Subcategory');
    }
    
})

.controller("CtrlSubCategory", function($location, $http, $scope, myCategory, mySubCategory){

    $scope.category = myCategory.get();
    
    subCategory($scope.category);

    function subCategory(category){
        // Sending request to albumDetails.php files
        //console.log("Sucessfully getting category : " + JSON.stringify(category));

        $http.post("databaseFiles/subCategoriesDetails.php", {"category": category},$scope.session).then(function(data, status) {
            $scope.subcategories = data.data;
        });
    };

    $scope.QuerySubCategory = function(subCategory){
        mySubCategory.set(subCategory);
        $location.path('/Photo');
    }
    

    
})

.controller("CtrlPhoto", function($location, $http, $scope, myCategory, mySubCategory){
    
    $scope.category = myCategory.get();
    $scope.subcategory = mySubCategory.get();
    //console.log("Sucessfully getting data : " + JSON.stringify($scope.subcategory));

    photo($scope.category, $scope.subcategory);

    function photo( category,subcategory){
        // Sending request to albumDetails.php files
        //console.log("Sucessfully getting subcategory : " + JSON.stringify(subcategory));

        $http.post("databaseFiles/photoDetails.php", {"category": category, "subcategory": subcategory},$scope.session).then(function(data, status) {
            $scope.photos = data.data;
            //console.log("Sucessfully getting data : " + JSON.stringify(data));

        });
    };

    
});


