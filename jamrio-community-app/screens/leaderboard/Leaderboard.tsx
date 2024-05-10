import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {colorsobject} from '../../assets/ProjectColors/Colorsobject';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Leadercard from '../../components/LeaderboardCards/Leadercard';
import {userleaderboard} from '../../assets/dummyleaderboarddata';
import Protags_dropdown from '../../assets/json/Protags_dropdown';
import Cities_dropdown from '../../assets/json/Cities_dropdown';

const Leaderboard = ({navigation}) => {
  const [firstUserData, secondUserData, thirdUserData, ...otherUsersData] =
    userleaderboard;
  const [selectedCategory, setSelectedCategory] = useState('Influencer');
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState(Protags_dropdown);
  const [selectedCity, setSelectedCity] = useState('Pune');
  const [isClickedCity, setIsClickedCity] = useState(false);
  const [dataCity, setDataCity] = useState(Cities_dropdown);

  console.log('first user data', firstUserData);
  console.log('second user data', secondUserData);
  console.log('third user data', thirdUserData);
  console.log('other user data', otherUsersData);

  const resetData = () => {
    setData(Protags_dropdown);
  };
  const resetCityData = () => {
    setData(Cities_dropdown);
  };
  return (
    <View style={styles.container}>
      {isClicked ? (
        <View style={styles.dropdownarea}>
          {/* <TextInput
            ref={searchRef}
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={txt => {
              onSearch(txt);
            }}
          /> */}
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.categoriesitem}
                  onPress={() => {
                    setSelectedCategory(item.category);
                    // setSelectedImage(item.path);
                    setIsClicked(false);
                    // searchRef.current.clear();
                  }}>
                  {/* <Image
                    source={item.path}
                    style={{
                      width: horizontalScale(40),
                      aspectRatio: 1,
                      resizeMode: 'contain',
                      marginRight: horizontalScale(5),
                      alignSelf: 'center',
                    }}
                  /> */}
                  <Text
                    style={{color: colorsobject.black, alignSelf: 'center'}}>
                    {item.category}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      {isClickedCity ? (
        <View style={styles.dropdownarea}>
          {/* <TextInput
            ref={searchRef}
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={txt => {
              onSearch(txt);
            }}
          /> */}
          <FlatList
            data={dataCity}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.categoriesitem}
                  onPress={() => {
                    setSelectedCity(item.category);
                    // setSelectedImage(item.path);
                    setIsClickedCity(false);
                    // searchRef.current.clear();
                  }}>
                  {/* <Image
                    source={item.path}
                    style={{
                      width: horizontalScale(40),
                      aspectRatio: 1,
                      resizeMode: 'contain',
                      marginRight: horizontalScale(5),
                      alignSelf: 'center',
                    }}
                  /> */}
                  <Text
                    style={{color: colorsobject.black, alignSelf: 'center'}}>
                    {item.category}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        locations={[0, 0.25, 0.45]}
        colors={[
          colorsobject.themecolor,
          colorsobject.violet,
          colorsobject.darkgrey,
        ]}
        style={{flex: 1, paddingHorizontal: responsiveWidth(4)}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.arrowContainer}>
            <Image
              source={{
                uri: 'https://img.icons8.com/ios-filled/100/FFFFFF/left.png',
              }}
              style={styles.arrow}
            />
          </TouchableOpacity>

          <Text style={styles.headertitlestyle}>Leaderboard</Text>
        </View>
        <View style={styles.choosecity}>
          <TouchableOpacity
            style={styles.cityContainer}
            onPress={() => {
              setIsClicked(!isClicked);
              if (!isClicked) {
                resetData(); // Reset data when dropdown is opened
              }
            }}>
            <Image
              source={
                isClicked
                  ? require('../../assets/images/dropup.png')
                  : require('../../assets/images/dropdown.png')
              }
              style={styles.icon}
            />
            <Text style={styles.dropdownmenufont}>{selectedCategory}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cityContainer}
            onPress={() => {
              setIsClickedCity(!isClickedCity);
              if (!isClickedCity) {
                resetCityData(); // Reset data when dropdown is opened
              }
            }}>
            <Image
              source={
                isClickedCity
                  ? require('../../assets/images/dropup.png')
                  : require('../../assets/images/dropdown.png')
              }
              style={styles.icon}
            />
            <Text style={styles.dropdownmenufont}>{selectedCity}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.first3rank}>
          <View style={styles.rank2container}>
            <Text
              style={[
                styles.points123name,
                {marginBottom: responsiveHeight(5)},
              ]}>
              {secondUserData?.name}
            </Text>
            <Text style={styles.points123}> {secondUserData?.points} </Text>
            {secondUserData?.profileImage ? (
              <Image
                source={{uri: secondUserData.profileImage}}
                style={styles.rank1Image}
              />
            ) : (
              <Image
                source={require('../../assets/images/user.jpeg')}
                style={styles.rank1Image}
              />
            )}
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rank123style}>2</Text>
              <Text style={styles.st}>nd</Text>
            </View>
          </View>
          <View style={styles.rank1container}>
            <Text style={styles.points123name}> {firstUserData?.name} </Text>
            <Text style={styles.points123}> {firstUserData?.points} </Text>
            {firstUserData?.profileImage ? (
              <Image
                source={{uri: firstUserData.profileImage}}
                style={styles.rank1Image}
              />
            ) : (
              <Image
                source={require('../../assets/images/user.jpeg')}
                style={styles.rank1Image}
              />
            )}

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rank123style}>1</Text>
              <Text style={styles.st}>st</Text>
            </View>
          </View>
          <View style={styles.rank3container}>
            <Text
              style={[
                styles.points123name,
                {marginBottom: responsiveHeight(5)},
              ]}>
              {thirdUserData?.name}
            </Text>
            <Text style={styles.points123}> {thirdUserData?.points} </Text>
            {thirdUserData?.profileImage ? (
              <Image
                source={{uri: thirdUserData.profileImage}}
                style={styles.rank1Image}
              />
            ) : (
              <Image
                source={require('../../assets/images/user.jpeg')}
                style={styles.rank1Image}
              />
            )}
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.rank123style}>3</Text>
              <Text style={styles.st}>rd</Text>
            </View>
          </View>
        </View>

        <View style={styles.otherranks}>
          {/* {user.map((item, index) => (
            <Leadercard key={index} />
          ))} */}
          <FlatList
            data={otherUsersData}
            renderItem={({item, index}) => {
              return (
                <Leadercard
                  name={item?.name}
                  points={item?.points}
                  profileImage={item?.profileImage}
                  rank={index + 4}
                />
              );
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsobject.darkgrey,
  },
  header: {
    flex: 0.07,
    flexDirection: 'row',
    alignItems: 'center',
  },
  choosecity: {
    flex: 0.052,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  first3rank: {
    flex: 0.45,
    flexDirection: 'row',
    gap: responsiveWidth(1),
  },
  otherranks: {
    flex: 0.53,
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(4),
  },
  arrow: {
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    tintColor: colorsobject.white,
  },
  arrowContainer: {
    left: 0,
    height: responsiveWidth(10),
    width: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertitlestyle: {
    color: colorsobject.white,
    fontSize: responsiveHeight(3.4),
    marginLeft: responsiveWidth(3),
    fontWeight: '700',
  },
  cityContainer: {
    height: responsiveHeight(5),
    width: responsiveWidth(35),
    borderRadius: responsiveWidth(10),
    backgroundColor: colorsobject.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(4),
  },
  dropdownmenufont: {
    color: colorsobject.black,
    fontSize: responsiveHeight(2.2),
    fontWeight: '600',
  },
  rank1container: {
    flex: 0.39,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  rank2container: {
    flex: 0.3,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  rank3container: {
    flex: 0.3,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  rank1Image: {
    width: responsiveWidth(33),
    height: responsiveWidth(33),
    borderRadius: responsiveWidth(18),
    alignSelf: 'center',
  },
  rank2Image: {
    width: responsiveWidth(28),
    height: responsiveWidth(28),
    borderRadius: responsiveWidth(18),
    alignSelf: 'center',
  },
  points123: {
    color: colorsobject.white,
    fontSize: responsiveHeight(4),
  },
  points123name: {
    color: colorsobject.white,
    opacity: 0.7,
    fontSize: responsiveHeight(2),
  },
  rank123style: {
    color: colorsobject.white,
    fontWeight: '900',
    fontSize: responsiveHeight(4),
  },
  st: {
    color: colorsobject.white,
    alignSelf: 'center',
    fontSize: responsiveHeight(2),
    fontWeight: '600',
  },
  rank4container: {
    width: '100%',
    height: responsiveHeight(10),
    backgroundColor: colorsobject.darkgrey7,
    borderRadius: responsiveWidth(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4.5),
    marginVertical: responsiveHeight(1),
  },
  rank: {
    color: colorsobject.pink,
    fontSize: responsiveFontSize(2.7),
  },
  points: {
    color: colorsobject.white,
    fontSize: responsiveHeight(2.7),
  },
  otherrankimage: {
    height: responsiveWidth(13),
    width: responsiveWidth(13),
    borderRadius: responsiveWidth(9),
    marginHorizontal: responsiveWidth(2.5),
  },
  name: {
    color: colorsobject.white,
    marginHorizontal: responsiveWidth(1),
    fontSize: responsiveHeight(2),
  },
  icon: {
    width: responsiveWidth(3),
    height: responsiveHeight(2),
    tintColor: colorsobject.black,
    resizeMode: 'contain',
    padding: responsiveHeight(1),
    margin: responsiveWidth(1),
  },
  dropdownarea: {
    width: '70%',
    height: 500,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    top: responsiveHeight(9),
  },
  categoriesitem: {
    width: '85%',
    height: 40,
    borderBottomWidth: 0.2,
    borderBottomColor: '#8e8e8e',
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
