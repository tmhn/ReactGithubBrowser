'use strict';

var React = require('react-native');

var {
  Text,
  TextInput,
  TouchableHighlight,
  Component,
  View,
} = React;

var SearchResults = require('./SearchResults');

class Search extends Component{
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render(){

		return (
				<View style={styles.container}>
					<TextInput
						onChangeText={(text)=> this.setState({
							searchQuery: text
						})} 
						style={styles.input} 
						placeholder="Search Query"></TextInput>

						<TouchableHighlight
							onPress={this.onSearchPressed.bind(this)}
							style={styles.button}>
							<Text style={styles.buttonText}>
								Search
							</Text>
						</TouchableHighlight>

				</View>
		);
	}

	onSearchPressed (){
		this.props.navigator.push({
			component: SearchResults,
			title: 'Results',
			passProps: {
				searchQuery: this.state.searchQuery
			}
		});
	}
}

var styles = React.StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 100,
		alignItems: 'center',
		padding: 10
	},
	logo: {
		width: 66,
		height: 55
	},
	heading: {
		fontSize: 30,
		marginTop: 10,
		marginBottom: 20
	},
	input: {
		height: 50,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48bbec',
		borderRadius: 5
	},
	button: {
		height: 50,
		backgroundColor: "#48BBEC",
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center',
		borderRadius: 5
	},
	buttonText: {
		fontSize: 22,
		color: '#FFF',
		alignSelf: 'center'
	},
	loader: {
		marginTop: 20
	},
	error: {
		color: 'red',
		paddingTop: 10
	}
});

module.exports = Search; 