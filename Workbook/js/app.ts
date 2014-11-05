/// <reference path="../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../Scripts/typings/angularjs/angular-route.d.ts" />
/// <reference path="../Scripts/typings/angularfire/angularfire.d.ts" />
(function () {
    var app = angular.module("app", ["firebase", "ui.router"])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('index', {
                    url: '/',
                    template: 'partials/workbook/_index.html',
                    controller: 'WorkbookUsageCtrl',
                })
                .state('workbook', {
                    url: '/workbook',
                    template: 'partials/workbook/_list.html',
                    controller: 'WorkbookUsageCtrl',
                })
                .state('workbook.question', {
                    url: '/workbook/:workbookId',
                    template: 'partials/workbook/_question.html',
                    controller: 'WorkbookUsageCtrl',
                })

                .state('login', {
                    url: '/login',
                    template: 'partials/manage/_login.html',
                    controller: 'LoginCtrl',
                })
                .state('manage', {
                    url: '/manage',
                    template: 'partials/manage/_index.html',
                    controller: 'WorkbookManageCtrl',
                })
                .state('manage.workbook', {
                    url: '/manage/workbook',
                    template: 'partials/workbook/_list.html',
                    controller: 'WorkbookManageCtrl',
                })
                .state('manage.workbook.edit', {
                    url: '/manage/workbook/:id',
                    template: 'partials/workbook/_edit.html',
                    controller: 'WorkbookManageCtrl',
                });
            $urlRouterProvider.otherwise('/');
        }]);

    app.controller("WorkbookManageCtrl", ['$scope', '$firebase',
        function ($scope, $firebase: AngularFireService) {
            var ref = new Firebase("https://workbook.firebaseio.com/questions");
            var sync = $firebase(ref);

            $scope.questions = sync.$asArray();

            $scope.addQuestion = function (q: string, a: string, cArray: Array<string>) {
                $scope.questions.$add({ text: q, answer: a, choices: cArray });
            };
            //// download the data into a local object
            //var syncObject = sync.$asArray();

            //// synchronize the object with a three-way data binding
            //// click on `index.html` above to see it used in the DOM!
            //syncObject.$bindTo($scope, "data");
        }]);

    app.controller("WorkbookUsageCtrl", ['$scope', '$firebase',
        function ($scope: ng.IScope, $firebase: AngularFireService) {

        }]);
})();
