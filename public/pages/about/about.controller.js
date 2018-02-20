import moment from 'moment';

function AboutController($scope, $route, $interval, timefilter, createNotifier, navMenu, globalNavState, COMMON, sentinlConfig) {
  'ngInject';

  $scope.appName = sentinlConfig.appName;
  $scope.title = COMMON.about.title;
  $scope.description = COMMON.description;
  timefilter.enabled = false;

  const notify = createNotifier({
    location: COMMON.about.title,
  });

  $scope.topNavMenu = navMenu.getTopNav('about');
  $scope.tabsMenu = navMenu.getTabs('about');
  navMenu.setKbnLogo(globalNavState.isOpen());
  $scope.$on('globalNavState:change', () => navMenu.setKbnLogo(globalNavState.isOpen()));

  if (!$scope.notified) {
    $scope.notified = true;
  }

  var currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  var utcTime = moment.utc($route.current.locals.currentTime);
  $scope.utcTime = utcTime.format('HH:mm:ss');
  var unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
    $scope.utcTime = utcTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);
};

export default AboutController;
