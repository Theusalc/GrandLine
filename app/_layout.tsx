import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from '../assets/components/authContext';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const Layout: React.FC = () => {
  useEffect(() => {
    const configureNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para notificações não concedida!');
        return;
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.HIGH,
        });
      }
    };

    configureNotifications();

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificação recebida:', notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Resposta à notificação:', response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default Layout;