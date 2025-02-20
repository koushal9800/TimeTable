import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, FlatList, SectionList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LoginManager } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

const { width } = Dimensions.get("window");

const getCurrentDateISO = () => new Date().toISOString().split("T")[0];

const getDayName = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const timetableData = {
  "2025-02-19": [
    { title: "MATH", time: "08:30 - 09:15" },
    { title: "SSC", time: "09:20 - 10:05" },
    { title: "Break", time: "10:05 - 10:20" },
    { title: "English", time: "10:20 - 11:05" },
    { title: "PHY", time: "11:10 - 11:55" },
    { title: "Break", time: "11:55 - 12:35" },
  ],
  "2025-02-20": [
    { title: "HINDI", time: "08:30 - 09:15" },
    { title: "English", time: "09:20 - 10:05" },
    { title: "Break", time: "10:05 - 10:20" },
    { title: "PHY", time: "10:20 - 11:05" },
  ],
};

const getCurrentWeekDates = (startDate = new Date()) => {
  const dayOfWeek = (startDate.getDay() + 6) % 7; // Adjust to make Monday = 0
  const startOfWeek = new Date(startDate);
  startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date.toISOString().split("T")[0];
  });
};

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
 
  const [dates, setDates] = useState(getCurrentWeekDates());
  const [selectedDate, setSelectedDate] = useState(getCurrentDateISO());
  const [showPicker, setShowPicker] = useState(false);
  const sectionListRef = useRef(null);
  const dateListRef = useRef(null);

  const [userEmail, setUserEmail] = useState('');
   

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);

    function onAuthStateChanged(user) {
      setUserEmail(user ? user.email=== null ? user.displayName : user.email  : '');
      
    }
  const handleLogout = () => {
    auth().signOut().then(() => {
      
      LoginManager.logOut();
    }).catch((error) => {
      Alert.alert('Logout Failed', error.message);
    });
  };

  

  

  const shiftWeek = (direction) => {
    const baseDate = new Date(dates[0]);
    baseDate.setDate(baseDate.getDate() + direction * 7);
    const newDates = getCurrentWeekDates(baseDate);
    setDates(newDates);
    setSelectedDate(newDates[0]);
    sectionListRef.current?.scrollToIndex({ index: 0, animated: true });
    dateListRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  const handleDateChange = (date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date.toISOString().split("T")[0]);
      setDates(getCurrentWeekDates(date));
    }
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    const index = dates.indexOf(date);
    if (index !== -1) {
      sectionListRef.current?.scrollToIndex({ index, animated: true });
      dateListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  const handleTimetableScroll = (event) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setSelectedDate(dates[pageIndex]);

    dateListRef.current?.scrollToIndex({ index: pageIndex, animated: true });
  };

  return (
    <View style={styles.container}>
       
       
      {/* <Text>Welcome, {user?.email}</Text> */}
       <Text>Welcome to the Home Screen, {userEmail}!</Text>
      <Button title="Logout" onPress={handleLogout} /> 


        

      {/* Week Navigation */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => shiftWeek(-1)}>
          <Text style={styles.arrow}>&lt;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Text style={styles.weekText}>
            {dates[0]} - {dates[6]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shiftWeek(1)}>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal isVisible={showPicker} mode="date" onConfirm={handleDateChange} onCancel={() => setShowPicker(false)} />

      {/* Horizontal Date Scroll */}
      <FlatList
        ref={dateListRef}
        horizontal
        data={dates}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.dateItem, selectedDate === item && styles.activeDate]}
            onPress={() => handleDateSelection(item)}
          >
            <Text style={{ color: selectedDate === item ? "#fff" : "black" }}>{getDayName(item)}</Text>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: selectedDate === item ? 100 : 0,
                backgroundColor: selectedDate === item ? "#fff" : "transparent",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text style={{ color: selectedDate === item ? "blue" : "black" }}>{item.split("-")[2]}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Horizontal Timetable Scroll */}
      <FlatList
        horizontal
        pagingEnabled
        ref={sectionListRef}
        data={dates}
        keyExtractor={(item) => item}
        onMomentumScrollEnd={handleTimetableScroll}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <SectionList
              sections={[{ title: item, data: timetableData[item] || [] }]}
              keyExtractor={(entry, index) => entry.title + index}
              renderItem={({ item }) => (
                <View style={styles.timetableItem}>
                  <Text style={styles.subject}>{item.title}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
  arrow: { fontSize: 24, fontWeight: "bold" },
  weekText: { fontSize: 16, fontWeight: "bold" },
  dateItem: { padding: 10, marginHorizontal: 6, borderRadius: 20, backgroundColor: "#ddd", justifyContent: "space-around", alignItems: "center" },
  activeDate: { backgroundColor: "#007bff" },
  timetableItem: { padding: 15, marginVertical: 5, backgroundColor: "#f0f0f0", borderRadius: 10 },
  subject: { fontWeight: "bold", fontSize: 16 },
  time: { fontSize: 14, color: "gray" },
});

export default HomeScreen;
