import React, { useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface WaitingModalProps {
  visible?: boolean;
  onCancel?: () => void;
  driverName?: string;
  etaSeconds?: number;
}

export default function WaitingModal({
  visible = true,
  onCancel,
  driverName = "X",
  etaSeconds,
}: WaitingModalProps) {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const dropMove = useSharedValue(50);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
      ),
      -1,
      false,
    );
    rotate.value = withRepeat(
      withSequence(withDelay(1000, withTiming(180, { duration: 1000 }))),
      -1,
      false,
    );

    dropMove.value = withRepeat(
      withSequence(
        withDelay(500, withTiming(-30, { duration: 500 })),
        withDelay(500, withTiming(50, { duration: 500 })),
      ),
      -1,
      false,
    );

    return () => {
      cancelAnimation(scale);
      cancelAnimation(rotate);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Animated.View style={[styles.drop, { marginBottom: dropMove }]} />
          <Animated.View style={[styles.drop2, { marginTop: dropMove }]} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(10, 12, 18, 0.66)",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#FFD13C",
  },
  drop: {
    width: 60,
    height: 60,
    backgroundColor: "#303641",
    transform: [{ rotate: "45deg" }],
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 30,
  },
  drop2: {
    width: 60,
    height: 60,
    backgroundColor: "#303641",
    transform: [{ rotate: "-45deg" }],
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
});
