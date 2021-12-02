import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';
import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timings';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const interval = React.useRef(null);

  const [isStarted, setIsStarted] = useState(false);

  const [progress, setProgress] = useState(1);

  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 5000);
      setTimeout(() => clearInterval(interval), 5000);
    } else {
      Vibration.vibrate(5000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing On :</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.md }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 5 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="Pause"
            onpress={() => {
              setIsStarted(false);
            }}
          />
        ) : (
          <RoundedButton
            title="Start"
            onpress={() => {
              setIsStarted(true);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title="-"
          size={50}
          onpress={() => {
            clearSubject();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize:fontSizes.mdlg,
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontSize:fontSizes.mdlg,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject:{
    paddingBottom:spacing.md,
    paddingLeft:spacing.md
  }
});
