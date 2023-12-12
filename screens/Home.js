import React, { useEffect, useState } from 'react';

import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, FlatList, Alert, Image, TouchableWithoutFeedback } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { Icon, Product } from '../components/';

const { width } = Dimensions.get('screen');
import products from '../constants/products';
import axios from 'axios';

const Home = () => {

  renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = <Icon size={16} color={theme.COLORS.MUTED} name="zoom-in" family="material" />

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate('Pro')}
      />
    )
  }

  renderTabs = () => {
    const { navigation } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Categories</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon size={16} name="camera-18" family="GalioExtra" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>Best Deals</Text>
          </Block>
        </Button>
      </Block>
    )
  }


 const renderItem = ({ item }) => {

    return (
      // <Block>
      //     <Product product={item} full />
      // </Block>
      <Block horizontal card flex style={[styles.product, styles.shadow]}>
      <TouchableWithoutFeedback>
        <Block flex style={[styles.imageContainer, styles.shadow]}>
          <Image style={{width:'100%', height:150}} source={{ uri: "https://source.unsplash.com/Ws4wd-vJ9M0/840x840"}}  />
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Block flex space="between" style={styles.productDescription}>
          <Text size={14} style={styles.productTitle}>{item.title}</Text>
          {
            item.description !== null && item.description !== "" ?
              <Text size={14} style={styles.productTitle}>{item.description}</Text>
              :
              null
          }
        </Block>
      </TouchableWithoutFeedback>
    </Block>
    )
  }


  const renderProducts = (data) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          <Product product={products[0]} horizontal />
          <Block flex row>
            <Product product={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Product product={products[2]} />
          </Block>
          <Product product={products[3]} horizontal />
          <Product product={products[4]} full />
          {
            console.log(products[4])
          }

          <Text>Here we need the inster the listing of community </Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          {/* <View style={{ position: 'absolute', top: "40%", right: 0, left: 0 }}>
            <ActivityIndicator animating={loading} size="large" color="green" />
            {error ? <Text style={{ textAlign: 'center', fontSize: 18 }}>An Error has occurred, Please try after sometime.</Text> : null}
          </View> */}
        </Block>
      </ScrollView>
    )
  }

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://qa-community-services.whitecoats.com/api/feed-management/v1/feeds"
          );
          setData(response.data.data);
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    return (
      <Block flex center style={styles.home}>
        {renderProducts(data)}
      </Block>
    );
  }
export default Home

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },

  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
