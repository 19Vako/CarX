import { useEffect } from "react";
import {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export function WaitingModalViewModel() {
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

  const boxAnimation = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  const boxElemrentsAnimation = useAnimatedStyle(() => ({
    margin: dropMove.value,
  }));

  return {
    boxElemrentsAnimation,
    boxAnimation,
  };
}
