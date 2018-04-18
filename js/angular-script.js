// Application module
var crudApp = angular.module('crudApp',[]);

crudApp.controller("DbController",['$scope','$http', function($scope,$http){



// Function to get album details from the database
getInfo();

function getInfo(){
// Sending request to albumDetails.php files

/*
$http.post('databaseFiles/albumDetails.php').success(function(data){
    // Stored the returned data into scope
    $scope.details = data;
    });
    */


    $http.post("databaseFiles/albumDetails.php", $scope.session).then(function(data, status) {

        $scope.details = data.data;
               console.log("Sucessfully getting data" + JSON.stringify(data.data));
   })
}

}])