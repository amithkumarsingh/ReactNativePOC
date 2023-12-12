import React, { useState, useEffect } from 'react';

class ExampleComponent  {
 
  


  render() {
    return (
      <View>
        <Text>Count: {this.state.count}</Text>
        <Button title="Increment" onPress={() => this.setState({ count: this.state.count + 1 })} />
      </View>
    );
  }
}

export default ExampleComponent;