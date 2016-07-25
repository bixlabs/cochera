'use strict';

angular.module('app.home').controller('HomeController', ['$scope',
  function ($scope) {

    var pricing_plans = [
        {
            name: "4GB RAM Plan",
            memory: "4GB",
            cpu: "1 CPU/Core",
            storage: "10GB SSD Storage",
            datatransfer: "25GB Data Transfer",
            price: '5'
        },
        {
            name: "8GB RAM Plan",
            memory: "8GB",
            cpu: "2 CPU/Core",
            storage: "25GB SSD Storage",
            datatransfer: "30GB Data Transfer",
            price: '15'
        },
        {
            name: "12GB RAM Plan ",
            memory: "12GB",
            cpu: "4 CPU/Core",
            storage: "48GB SSD Storage",
            datatransfer: "70GB Data Transfer",
            price: '25'
        },
        {
            name: "16GB RAM Plan",
            memory: "16GB",
            cpu: "6 CPU/Core",
            storage: "192GB SSD Storage",
            datatransfer: "100GB Data Transfer",
            price: '30'
        },
    ];

    $scope.slides = [
                {
                    img : 'modules/home/img/big/big1.jpg',
                    title : 'OPEN',
                    text: 'Open source technolsogy provides a range of deployment options with no restrictions.',
                    btnLabel : 'Sign Up',
                    btnHref : '#'
                },
                {
                    img : 'modules/home/img/big/big2.jpg',
                    title: 'ACCESIBLE',
                    text : 'Cloud-based platform for easy management of your developments projects with transparent pricing and usage without long approval cycles.',
                    btnLabel : 'Sign Up',
                    btnHref : '#'
                },
                {
                    img : 'modules/home/img/big/big3.jpg',
                    title: 'SIMPLE',
                    text : 'Anyone can create a DevOps enviroment with aesy one-clicks installs.',
                    btnLabel : 'Sign Up',
                    btnHref : '#'
                },
            ];

    $scope.slider_plan = {
            value: 0,
            options: {
                hideLimitLabels: true,
                showTicksValues: true,
                stepsArray: [
                  {value: 0, legend: '4GB'},
                  {value: 1, legend: '8GB'},
                  {value: 2, legend: '12GB'},
                  {value: 3, legend: '16GB'}
                ],
                translate: function(value) {
                  return '';
                },
                onChange: function () {
                    $scope.plan_info = pricing_plans[$scope.slider_plan.value];
                }
            }
        };

    $scope.plan_info = pricing_plans[0];

	/*$scope.top = {
		backstretch: [
			'modules/home/img/big/Startup-Garage.jpg',
			'modules/home/img/big/big-1.jpg',
			'modules/home/img/big/big-2.jpg',
			'modules/home/img/big/big-3.jpg',
			'modules/home/img/big/big-4.jpg',
		]
	};*/
	$scope.clients = [
		'modules/home/img/clients/logo-1.png',
        'modules/home/img/clients/logo-2.png',
        'modules/home/img/clients/logo-3.png',
        'modules/home/img/clients/logo-4.png',
        'modules/home/img/clients/logo-5.png',
        'modules/home/img/clients/logo-6.png',
        'modules/home/img/clients/logo-7.png',
        'modules/home/img/clients/logo-8.png',
        'modules/home/img/clients/logo-9.png',
        'modules/home/img/clients/logo-10.png'
	];
  }
]);
