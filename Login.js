'use strict';

var React = require('react-native');
var buffer = require('buffer');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS,
  View,
  Image
} = React;

class Login extends Component{
	constructor(props) {
		super(props);

		this.state = {
			showProgress: false
		}
	}

	render(){

		var errorCtrl = <View />

		if(this.state.badCredentials) {
			errorCtrl = <Text style={styles.error}>
				That username and password combination didn't work
			</Text>
		}

		if(this.state.unknownError) {
			errorCtrl = <Text style={styles.error}>
				We experienced an unexpected issue
			</Text>
		}

		return (
				<View style={styles.container}>
					<Image style={styles.logo}
					source={require('image!Octocat')} />
					<Text style={styles.heading}>
						Github Browser
					</Text>
					<TextInput
						onChangeText={(text)=> this.setState({username: text})} 
						style={styles.input} 
						placeholder="Github Username" />
					<TextInput 
						onChangeText={(text)=> this.setState({password: text})}
						style={styles.input} 
						placeholder="Github Password" 
						secureTextEntry="true" />

						<TouchableHighlight
							onPress={this.onLoginPressed.bind(this)}
							style={styles.button}>
							<Text style={styles.buttonText}>
								Log In
							</Text>
						</TouchableHighlight>
						
						{errorCtrl}

						<ActivityIndicatorIOS
							animating={this.state.showProgress}
							size="large" 
							style={styles.loader}
						/>
				</View>
		);
	}

	onLoginPressed (){
		console.log('Attempting to log in with username ' + this.state.username);
		this.setState({showProgress: true});

		var authService = require('./AuthService');
		authService.login({
			username: this.state.username,
			password: this.state.password
		}, (results)=> {
			this.setState(Object.assign({
				showProgress: false
			}, results));

			if(results.success && this.props.onLogin) {
				this.props.onLogin();
			}
		});
	}
}

var styles = React.StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 40,
		alignItems: 'center',
		padding: 10
	},
	logo: {
		width: 66,
		height: 55
	},
	heading: {
		fontSize: 30,
		marginTop: 10
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
		borderRadius: 5,
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center'
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

module.exports = Login; 