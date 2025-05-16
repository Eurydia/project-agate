import { PlayingCardCarousel } from "@/components/PlayingCardCarousel";
import { useSolitaire } from "@/hooks/useSolitaire";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React, { useEffect, useMemo } from "react";
import {
  Alert,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

export default function RegalRankScreen() {
  const {
    gameState: {
      deck,
      drawnPiles,
      weaponKillPile,
      health,
      weapon,
      isEscapeBlocked,
    },
    escapeRoom,
    restartRun,
    selectCard,
  } = useSolitaire();

  const swipeStartX = React.useRef(0);
  const { width } = Dimensions.get("window");
  const handleSwipeStart = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    swipeStartX.current = event.nativeEvent.contentOffset.x;
    console.log("swipeStartX", swipeStartX.current);
  };

  const handleSwipeEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const swipeEndX = event.nativeEvent.contentOffset.x;
    const delta = swipeStartX.current - swipeEndX;
    if (delta > width * 0.7) {
      restartRun();
    }
  };

  const characterData = useMemo(() => {
    const weaponValue =
      weapon > 0 ? weapon.toString() : "-";

    const lastFight = weaponKillPile.at(-1);
    const lastFightValue = lastFight ? lastFight.rank : "-";

    return [
      [
        ["heart-multiple", health.toString()],
        ["cards", deck.length.toString()],
      ],
      [
        ["shield", weaponValue],
        ["skull", lastFightValue],
      ],
    ] as [
      keyof typeof MaterialCommunityIcons.glyphMap,
      string
    ][][];
  }, [weapon, health, weaponKillPile, deck.length]);

  useEffect(() => {
    if (health <= 0) {
      Alert.alert(
        "Game Over!",
        "You lost your last heart. Let's not do that again.",
        [
          {
            text: "OK",
            onPress: restartRun,
            style: "default",
          },
        ]
      );
      restartRun();
    }
  }, [health, restartRun]);

  useEffect(() => {
    if (drawnPiles.length === 0 && deck.length === 0) {
      Alert.alert(
        "You did it!",
        "You have escaped the dungeon!",
        [
          {
            text: "OK",
            onPress: restartRun,
            style: "default",
          },
        ]
      );
      restartRun();
    }
  }, [drawnPiles.length, restartRun, deck.length]);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#000" }}
      >
        <ScrollView
          style={{ flex: 1, flexGrow: 1, flexBasis: 0 }}
          onScrollBeginDrag={handleSwipeStart}
          onScrollEndDrag={handleSwipeEnd}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <StatusBar backgroundColor="#000" />
          <View
            style={{
              flex: 1,
            }}
          >
            <Pressable
              style={{
                flex: 1,
                margin: 2,
                borderRadius: 12,
                backgroundColor: "#fff",
              }}
              onPress={restartRun}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="replay"
                  size={60}
                />
              </View>
            </Pressable>
          </View>
          <View>
            {characterData.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 2,
                  marginTop: 2,
                }}
              >
                {row.map(([icon, value], colIndex) => (
                  <View
                    key={colIndex}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      borderRadius: 12,
                      marginRight: 2,
                      marginLeft: 2,
                    }}
                  >
                    <MaterialCommunityIcons
                      name={icon}
                      size={30}
                    />
                    <Text style={{ fontSize: 24 }}>
                      {value}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
            }}
          >
            <PlayingCardCarousel
              cards={drawnPiles}
              onPress={selectCard}
            />
          </View>
          <Pressable
            style={{
              height: "auto",
              flex: 1,
              margin: 2,
              borderRadius: 12,
              backgroundColor:
                isEscapeBlocked || drawnPiles.length < 4
                  ? "#888"
                  : "#fff",
            }}
            disabled={
              isEscapeBlocked || drawnPiles.length < 4
            }
            onPress={escapeRoom}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
              }}
            >
              {isEscapeBlocked || drawnPiles.length < 4 ? (
                <MaterialCommunityIcons
                  name="alert"
                  size={40}
                />
              ) : (
                <MaterialCommunityIcons
                  name="run"
                  size={50}
                />
              )}
            </View>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

