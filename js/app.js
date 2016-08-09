/*
 * Google Maps API - Distance Matrix Service:
 *
 * https://developers.google.com/maps/documentation/javascript/distancematrix
 *
 */

(function () {

    'use strict';

    angular

        .module('commuteApp', [])

        .controller('commuteController', ['$scope', function ($scope) {

            var service = new google.maps.DistanceMatrixService();

            $scope.origin = "Milwaukee WI 53207";
            $scope.destination = "Bryn Mwr, PA USA";
            
            $scope.myObj = {
                origin: "Milwaukee WI 53207",
                destination: "Bryn Mwr, PA USA",
                calcCommute: calcCommute
            };

            function callback(response, status) {

                if (status === "OK") {
                    
                    $scope.myObj.distance = response.rows[0].elements[0].distance.text;
                    $scope.myObj.duration = response.rows[0].elements[0].duration.text;
                    $scope.myObj.responseObject = JSON.stringify(response, null, '  ');
                    
                    console.log($scope.myObj.distance);
                    console.log($scope.myObj.duration);
                    console.log(response);
                } else {
                    alert("Error: " + status);
                }
            }

            function calcCommute() {
                // method taks request object & callback
                return service.getDistanceMatrix({
                    origins: [$scope.origin],
                    destinations: [$scope.destination],
                    travelMode: google.maps.TravelMode.DRIVING,
                    avoidHighways: false,
                    avoidTolls: false,
                    unitSystem: google.maps.UnitSystem.IMPERIAL
                }, callback);
            };
        
        }]);
})();