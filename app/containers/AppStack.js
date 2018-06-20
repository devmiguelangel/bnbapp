import {
  Text,
  View
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import HomeStack from './home/HomeStack';
import ReportStack from './reports/ReportStack';
import InsuranceStack from './insurance/InsuranceStack';
import NotificationStack from './notifications/NotificationStack';
import UserStack from './user/UserStack';

export default createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Reports: { screen: ReportStack },
    Insurance: { screen: InsuranceStack },
    Notifications: { screen: NotificationStack },
    Settings: { screen: UserStack },
  },
  {
    swipeEnabled: true,
    tabBarOptions: {
      inactiveTintColor: '#4A4A4A',
      activeTintColor: '#66BB6A',
      tabStyle: {
        backgroundColor: 'white',
        paddingTop: 0,
        paddingBottom: 2,
      },
    }
  }
);