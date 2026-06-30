import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { WaitingModalViewModel } from "../viewModels/WaitingModalViewModel";

interface WaitingModalProps {
  visible: boolean;
  onCancel: () => void;
  etaSeconds?: number;
}

export default function WaitingModal({
  visible = false,
  onCancel,
  etaSeconds,
}: WaitingModalProps) {
  const { boxElemrentsAnimation, boxAnimation } = WaitingModalViewModel();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.card, boxAnimation]}>
          <Animated.View style={[styles.drop, boxElemrentsAnimation]} />
          <Animated.View style={[styles.drop2, boxElemrentsAnimation]} />
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
