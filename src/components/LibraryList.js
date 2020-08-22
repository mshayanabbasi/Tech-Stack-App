import React, {Component} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
} from 'react-native';
import {connect} from 'react-redux';
import {CardSection} from './common';
import * as actions from '../actions';

class LibraryList extends Component {
  UNSAFE_componentWillUpdate() {
    LayoutAnimation.spring();
  }
  render() {
    return (
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={this.props.libraries}
        renderItem={({item}) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => this.props.selectLibrary(item.id)}>
              <View>
                <CardSection>
                  <Text style={styles.titleStyle}>{item.title}</Text>
                </CardSection>
                {item.id === this.props.selectedLibraryId ? (
                  <Text style={styles.descriptionStyle}>
                    {item.description}
                  </Text>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  descriptionStyle: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    libraries: state.libraries,
    selectedLibraryId: state.selectedLibraryId,
  };
};

export default connect(mapStateToProps, actions)(LibraryList);
