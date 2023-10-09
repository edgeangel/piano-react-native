/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
} from 'react-native/Libraries/NewAppScreen';

import {pianoAnalytics} from 'piano-analytics-js';
import {firebase} from '@react-native-firebase/installations';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Piano Analytics Configuration
  pianoAnalytics.setConfigurations({
    site: 640265,
    collectDomain: "https://vfjnmjf.pa-cd.com",
  });

  // Piano Analytics Visitor ID
  const installationsForDefaultApp = firebase.installations();
  installationsForDefaultApp.getId().then((installationId) => {
    const visitorId = installationId;
    pianoAnalytics.setVisitorId(visitorId)

    pianoAnalytics.setProperty('user_status', 'premium', {
      'persistent': true
    });

    // Piano Analytics Page Display Event
    pianoAnalytics.sendEvent("page.display", {
      page: "home_screen"
    });
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Send events">
          <Button
            title="test_event (test_property: value1)"
            color="#0f4c81"
            onPress={() => { 
              // Piano Analytics Custom Event with Custom Properties
              let visitorId: string;
              firebase.installations().getId().then((installationId) => {
                visitorId = installationId;
                pianoAnalytics.setVisitorId(visitorId)
                pianoAnalytics.sendEvent("test_event", {
                  test_property: "value1"
                });
              });
            }}
          />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Firebase debug">
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
