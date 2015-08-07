'use strict';

/**
 * @ngdoc function
 * @name jMeterlyser.controller:summaryCtrl
 * @description
 * # summaryCtrl
 * Controller of the jMeterlyser
 */
angular.module('jMeterlyser')
  .controller('summaryCtrl', [ '$scope', '$location', '$log', 'services', 'interData', 'navlocation', function ($scope, $location, $log, services, interData, navlocation) {

    $scope.init = function(){
        $scope.orden = "";
        $scope.location.locURL = $location.path();
    }
	
	$scope.location = navlocation;
	
	$scope.formcontent = interData;
	
	$scope.modalmanager = function(mtitle, mmessage){
		$scope.modaltitle = mtitle;
		$scope.modalmessage = mmessage;
		$('#myModal').modal('show');
	}
	
    $scope.summarytable = function(){ 
        services.summary($scope.formcontent.InitialTime, $scope.formcontent.FinalTime)
        .then(function(res){
            // success
            switch(res.code) {
                case "000":
                    //ok location
                    $scope.dataset=res.message;
                    $log.log("Successful summay query");
                    break;
                case "001":
                    //Error de conexión a la base de datos
                    $log.log("DB connection error. " + res.message);
					$scope.modalmanager("Error", "DB connection error");
                    break;
                case "002":
                    //Error en el query
                    $log.log("Query error. " + res.message);
                    $scope.modalmanager("Error", "Query error.");
                    break;
                case "003":
                    //Error no test selected
                    $log.log("No test selected. " + res.message);
                    $scope.modalmanager("Error", "There is no test selected, please go to Home and select one.");
                    break;
                default:
                    $log.log("Unknown error. Message:" + res.message);
					$scope.modalmanager("Error", "Unknown error, check the log to see more information");
            }
        }, function(err){
            // error
            $log.log("Error in the promise");
			$scope.modalmanager("Error", "Error in the promise");
        })
    }

	$scope.iconT  = "glyphicon glyphicon-sort-by-attributes";
    $scope.iconM  = "glyphicon glyphicon-sort";

/*	
    $scope.sort = function(tipo){
        switch ($scope.orden){
            case "":
                switch(tipo){
                    case "titulo":
                        $scope.orden = "titulo";
                        $scope.sortUI("TituloA");
                        break;
                    case "modificacion":
                        $scope.orden = "modificacion";
                        $scope.sortUI("ModificacionA");
                        break;
                    default:;
                }
                break;
            case "Request":
                switch(tipo){
                    case "Request":
                        $scope.orden = "-Request";
                        $scope.sortUI("RequestD");
                        break;
                    case "modificacion":
                        $scope.orden = "modificacion";
                        $scope.sortUI("ModificacionA");
                        break;
                    default:;
                }
                break; 
            case "-Request":
                switch(tipo){
                    case "titulo":
                        $scope.orden = "titulo";
                        $scope.sortUI("TituloA");
                        break;
                    case "modificacion":
                        $scope.orden = "modificacion";
                        $scope.sortUI("ModificacionA");
                        break;
                    default:;
                }
                break; 
            case "modificacion":
                switch(tipo){
                    case "titulo":
                        $scope.orden = "titulo";
                        $scope.sortUI("TituloA");
                        break;
                    case "modificacion":
                        $scope.orden = "-modificacion";
                        $scope.sortUI("ModificacionD");
                        break;
                    default:;
                }
                break;
            case "-modificacion":
                switch(tipo){
                    case "titulo":
                        $scope.orden = "titulo";
                        $scope.sortUI("TituloA");
                        break;
                    case "modificacion":
                        $scope.orden = "modificacion";
                        $scope.sortUI("ModificacionA");
                        break;
                    default:;
                }
                break;
            default:;
        }
    }	
*/
	
	
	
	$scope.init();
  }]);
