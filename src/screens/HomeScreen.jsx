import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {LoginManager} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const {width} = Dimensions.get('window');

const getCurrentDateISO = () => new Date().toISOString().split('T')[0];

const getDayName = dateStr => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {weekday: 'short'});
};

const timetableData = {
  '2025-02-19': [
    {title: 'MATH', time: '08:30 - 09:15'},
    {title: 'SSC', time: '09:20 - 10:05'},
    {title: 'Break', time: '10:05 - 10:20'},
    {title: 'English', time: '10:20 - 11:05'},
    {title: 'PHY', time: '11:10 - 11:55'},
    {title: 'Break', time: '11:55 - 12:35'},
  ],
  '2025-02-20': [
    {title: 'English', time: '08:30 - 09:15'},
    {title: 'Break', time: '09:20 - 10:05'},
    {title: 'CHEM', time: '10:05 - 10:20'},
    {title: 'MATH', time: '10:20 - 11:05'},
    {title: 'SSC', time: '11:10 - 11:55'},
    {title: 'Break', time: '11:55 - 12:35'},
  ],
  '2025-02-21': [
    {title: 'MATH', time: '08:30 - 09:15'},
    {title: 'SSC', time: '09:20 - 10:05'},
    {title: 'Break', time: '10:05 - 10:20'},
    {title: 'English', time: '10:20 - 11:05'},
    {title: 'PHY', time: '11:10 - 11:55'},
    {title: 'Break', time: '11:55 - 12:35'},
  ],
  '2025-02-22': [
    {title: 'English', time: '08:30 - 09:15'},
    {title: 'Break', time: '09:20 - 10:05'},
    {title: 'CHEM', time: '10:05 - 10:20'},
    {title: 'MATH', time: '10:20 - 11:05'},
    {title: 'SSC', time: '11:10 - 11:55'},
    {title: 'Break', time: '11:55 - 12:35'},
  ],
  '2025-02-23': [
    {title: 'MATH', time: '08:30 - 09:15'},
    {title: 'SSC', time: '09:20 - 10:05'},
    {title: 'Break', time: '10:05 - 10:20'},
    {title: 'English', time: '10:20 - 11:05'},
    {title: 'PHY', time: '11:10 - 11:55'},
    {title: 'Break', time: '11:55 - 12:35'},
  ],
  '2025-02-24': [
    {title: 'English', time: '08:30 - 09:15'},
    {title: 'Break', time: '09:20 - 10:05'},
    {title: 'CHEM', time: '10:05 - 10:20'},
    {title: 'MATH', time: '10:20 - 11:05'},
    {title: 'SSC', time: '11:10 - 11:55'},
    {title: 'Break', time: '11:55 - 12:35'},
  ],
};

const getCurrentWeekDates = (startDate = new Date()) => {
  const dayOfWeek = (startDate.getDay() + 6) % 7;
  const startOfWeek = new Date(startDate);
  startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
  return Array.from({length: 7}, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date.toISOString().split('T')[0];
  });
};

const HomeScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [dates, setDates] = useState(getCurrentWeekDates());
  const [selectedDate, setSelectedDate] = useState(getCurrentDateISO());
  const [showPicker, setShowPicker] = useState(false);
  const dateListRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [user, setUser] = useState(null);

  const navigation = useNavigation()

  const getRandomColor = () => {
    const colors = [
      '#FFADAD',
      '#FFD6A5',
      '#FDFFB6',
      '#CAFFBF',
      '#9BF6FF',
      '#A0C4FF',
      '#BDB2FF',
      '#FFC6FF',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber;
    getUserData()
  }, []);

  const getUserData = async ()=>{
    try{
      const storedUser = await AsyncStorage.getItem('user')
      if(storedUser){
        setUser(JSON.parse(storedUser))
      }
    }catch(error) {
      console.log(error)
    }
  }

  const handleLogout = async ()=>{
    try{
      await auth().signOut()
      await AsyncStorage.removeItem('user')
      LoginManager.logOut()
      navigation.navigate('Login')
    }catch(error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return subscriber;
  }, []);

  function onAuthStateChanged(user) {
    setUserEmail(
      user ? (user.email === null ? user.displayName : user.email) : '',
    );
  }
  // const handleLogout = () => {
  //   auth()
  //     .signOut()
  //     .then(() => {
  //       LoginManager.logOut();
  //     })
  //     .catch(error => {
  //       Alert.alert('Logout Failed', error.message);
  //     });
  // };

  useEffect(() => {
    const today = getCurrentDateISO();
    const newWeekDates = getCurrentWeekDates(new Date());

    setDates(newWeekDates);
    setSelectedDate(today);

    setTimeout(() => {
      const todayIndex = newWeekDates.indexOf(today);
      if (todayIndex !== -1) {
        dateListRef.current?.scrollToIndex({index: todayIndex, animated: true});
        scrollViewRef.current?.scrollTo({
          x: todayIndex * width,
          animated: true,
        });
      }
    }, 100);
  }, []);

  const shiftWeek = direction => {
    const baseDate = new Date(dates[0]);
    baseDate.setDate(baseDate.getDate() + direction * 7);
    const newWeekDates = getCurrentWeekDates(baseDate);

    const today = getCurrentDateISO();

    const newSelectedDate = newWeekDates.includes(today)
      ? today
      : newWeekDates[0];

    setDates(newWeekDates);
    setSelectedDate(newSelectedDate);

    setTimeout(() => {
      dateListRef.current?.scrollToIndex({
        index: newWeekDates.indexOf(newSelectedDate),
        animated: true,
      });
      scrollViewRef.current?.scrollTo({
        x: newWeekDates.indexOf(newSelectedDate) * width,
        animated: true,
      });
    }, 100);
  };

  const handleDateChange = date => {
    setShowPicker(false);
    if (date) {
      const newSelectedDate = date.toISOString().split('T')[0];
      const newWeekDates = getCurrentWeekDates(date);

      setDates(newWeekDates);
      setSelectedDate(newSelectedDate);

      setTimeout(() => {
        const newIndex = newWeekDates.indexOf(newSelectedDate);
        dateListRef.current?.scrollToIndex({index: newIndex, animated: true});
        scrollViewRef.current?.scrollTo({x: newIndex * width, animated: true});
      }, 100);
    }
  };

  const handleScroll = event => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setSelectedDate(dates[pageIndex]);

    if (dateListRef.current) {
      const offset = Math.max(0, pageIndex * 60 - width / 2 + 30);
      dateListRef.current.scrollToOffset({offset, animated: true});
    }
  };

  const handleDateSelection = date => {
    setSelectedDate(date);
    const index = dates.indexOf(date);
    if (index !== -1) {
      scrollViewRef.current?.scrollTo({x: index * width, animated: true});

      const offset = Math.max(0, index * 60 - width / 2 + 30);
      dateListRef.current?.scrollToOffset({offset, animated: true});
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>WELCOME,</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user?.displayName || user?.email || 'User'}!</Text>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          style={{padding: 6, backgroundColor: 'red', borderRadius: 4}}>
          <Text style={{color: '#fff'}}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Week Navigation */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={{
            flex: 1,
            borderRightWidth: 1,
            alignItems: 'center',
            paddingVertical: 6,
          }}
          onPress={() => shiftWeek(-1)}>
          <MaterialIcons name="chevron-left" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 10, alignItems: 'center', paddingVertical: 6}}
          onPress={() => setShowPicker(true)}>
          <Text style={styles.weekText}>
            {dates[0]} - {dates[6]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            borderLeftWidth: 1,
            alignItems: 'center',
            paddingVertical: 6,
          }}
          onPress={() => shiftWeek(1)}>
          <MaterialIcons name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={() => setShowPicker(false)}
      />

      {/* Horizontal Date Scroll */}
      <FlatList
        ref={dateListRef}
        horizontal
        data={dates}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.dateItem,
              selectedDate === item && styles.activeDate,
            ]}
            onPress={() => handleDateSelection(item)}>
            <Text style={{color: selectedDate === item ? '#fff' : 'black'}}>
              {getDayName(item)}
            </Text>
            <View
              style={[
                styles.dateItemSelector,
                {
                  borderRadius: selectedDate === item ? 100 : 0,
                  backgroundColor:
                    selectedDate === item ? '#fff' : 'transparent',
                },
              ]}>
              <Text style={{color: selectedDate === item ? 'blue' : 'black'}}>
                {item.split('-')[2]}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Horizontal Timetable Scroll */}

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        snapToInterval={width}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}>
        {dates.map(date => (
          <View
            key={date}
            style={{width: width, alignItems: 'center', flex: 1}}>
           
            {timetableData[date]?.map((item, index) => {
              const randomColor = getRandomColor();
              return (
                <View
                  key={index}
                  style={[
                    styles.timetableItem,
                    {backgroundColor: randomColor},
                  ]}>
                  <Text style={styles.subject}>{item.title}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={16}
                      color="gray"
                    />
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>
              );
            }) || (
              <Text style={{textAlign: 'center', marginTop: 20}}>
                Holiday/No Data
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#fff'},
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 4,
  },
  
  weekText: {fontSize: 16, fontWeight: 'bold'},
  dateItem: {
    padding: 10,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 120,
  },
  dateItemSelector: {
    width: 24,
    height: 24,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  activeDate: {backgroundColor: '#007bff'},
  timetableItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  subject: {fontWeight: 'bold', fontSize: 16},
  time: {fontSize: 14, color: 'gray', marginLeft: 12},
});

export default HomeScreen;
