'use strict';

angular.module('app.home').controller('HomeController', ['$scope',
  function ($scope) {

    var pricing_plans = [
        {
            memory:"512MB",
            cpu:"1 CPU/Core",
            storage:"5GB SSD Storage",
            datatransfer:"25GB Data Transfer",
            price:"5"
        },
        {
            memory:"1GB",
            cpu:"1 CPU/Core",
            storage:"5GB SSD Storage",
            datatransfer:"150GB Data Transfer",
            price:"25"
        },
        {
            memory:"2GB",
            cpu:"1 CPU/Core",
            storage:"10GB SSD Storage",
            datatransfer:"300GB Data Transfer",
            price:"50"
        },
        {
            memory:"3GB",
            cpu:"1 CPU/Core",
            storage:"15GB SSD Storage",
            datatransfer:"450GB Data Transfer",
            price:"75"
        },
        {
            memory:"4GB",
            cpu:"1 CPU/Core",
            storage:"20GB SSD Storage",
            datatransfer:"600 GB Data Transfer",
            price:"100"
        },
        {
            memory:"5GB",
            cpu:"2 CPU/Core",
            storage:"25GB SSD Storage",
            datatransfer:"750GB Data Transfer",
            price:"125"
        },
        {
            memory:"6GB",
            cpu:"2 CPU/Core",
            storage:"30GB SSD Storage",
            datatransfer:"900GB Data Transfer",
            price:"150"
        },
        {
            memory:"7GB",
            cpu:"2 CPU/Core",
            storage:"35GB SSD Storage",
            datatransfer:"1,050GB Data Transfer",
            price:"175"
        },
        {
            memory:"8GB",
            cpu:"2 CPU/Core",
            storage:"40GB SSD Storage",
            datatransfer:"1,200GB Data Transfer",
            price:"200"
        },
        {
            memory:"9GB",
            cpu:"3 CPU/Core",
            storage:"45GB SSD Storage",
            datatransfer:"1,350GB Data Transfer",
            price:"225"
        },
        {
            memory:"10GB",
            cpu:"3 CPU/Core",
            storage:"50GB SSD Storage",
            datatransfer:"1,500GB Data Transfer",
            price:"250"
        },
        {
            memory:"11GB",
            cpu:"3 CPU/Core",
            storage:"55GB SSD Storage",
            datatransfer:"1,650GB Data Transfer",
            price:"275"
        },
        {
            memory:"12GB",
            cpu:"3 CPU/Core",
            storage:"60GB SSD Storage",
            datatransfer:"1,800GB Data Transfer",
            price:"300"
        },
        {
            memory:"13GB",
            cpu:"4 CPU/Core",
            storage:"65GB SSD Storage",
            datatransfer:"1,950GB Data Transfer",
            price:"325"
        },
        {
            memory:"14GB",
            cpu:"4 CPU/Core",
            storage:"70GB SSD Storage",
            datatransfer:"2,100GB Data Transfer",
            price:"350"
        },
        {
            memory:"15GB",
            cpu:"4 CPU/Core",
            storage:"75GB SSD Storage",
            datatransfer:"2,250GB Data Transfer",
            price:"375"
        },
        {
            memory:"16GB",
            cpu:"4 CPU/Core",
            storage:"80GB SSD Storage",
            datatransfer:"2,400GB Data Transfer",
            price:"400"
        },
        {
            memory:"17GB",
            cpu:"5 CPU/Core",
            storage:"85GB SSD Storage",
            datatransfer:"2,550GB Data Transfer",
            price:"425"
        },
        {
            memory:"18GB",
            cpu:"5 CPU/Core",
            storage:"90GB SSD Storage",
            datatransfer:"2,700GB Data Transfer",
            price:"450"
        },
        {
            memory:"19GB",
            cpu:"5 CPU/Core",
            storage:"95GB SSD Storage",
            datatransfer:"2,850GB Data Transfer",
            price:"475"
        },
        {
            memory:"20GB",
            cpu:"5 CPU/Core",
            storage:"100GB SSD Storage",
            datatransfer:"3,000GB Data Transfer",
            price:"500"
        }
    ];

    $scope.slides = [
                {
                    img : 'modules/home/img/big/big1.jpg',
                    title : 'OPEN',
                    text: 'No lock in. No lock out. Open source technology provides a range of deployment options with no restrictions.',
                    btnLabel : 'GO/CODE',
                    btnHref : '#'
                },
                {
                    img : 'modules/home/img/big/big2.jpg',
                    title: 'ACCESSIBLE',
                    text : 'Cloud-based platform with transparent pricing and usage allows for easy management of projects without long approval cycles.',
                    btnLabel : 'GO/CODE',
                    btnHref : '#'
                },
                {
                    img : 'modules/home/img/big/big3.jpg',
                    title: 'SIMPLE',
                    text : 'Anyone can create a DevOps environment with easy one-click installs.',
                    btnLabel : 'GO/CODE',
                    btnHref : '#'
                },
            ];

    $scope.slider_plan = {
            value: 0,
            options: {
                hideLimitLabels: true,
                showTicksValues: true,
                stepsArray: [
                  {value: 0, legend: '512MB'},
                  {value: 1},
                  {value: 2},
                  {value: 3},
                  {value: 4, legend: '4GB'},
                  {value: 5},
                  {value: 6},
                  {value: 7},
                  {value: 8, legend: '8GB'},
                  {value: 9},
                  {value: 10},
                  {value: 11},
                  {value: 12, legend: '12GB'},
                  {value: 13},
                  {value: 14},
                  {value: 15},
                  {value: 16, legend: '16GB'},
                  {value: 17},
                  {value: 18},
                  {value: 19},
                  {value: 20, legend: '20GB'}
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
