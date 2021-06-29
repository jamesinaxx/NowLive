import React from 'react';
import ReactDOM from 'react-dom';
import '@styles/global.scss';
import Live from './pages/Live';
import SettingsButton from '@components/SettingsButton';
import ColorModeToggle from '@components/ColorModeToggle';
import styles from '@styles/layout.module.scss';
import { getStorage, setStorage } from './lib/chromeapi';
import NoAuthPage from './pages/NoAuth';
import validateToken from './lib/tokenValid';
import { Button, ButtonGroup } from '@material-ui/core';
import Loading from '@components/Loading';
import axios from 'axios';
import Error404 from './pages/404';

// eslint-disable-next-line no-undef
const client_id = process.env.DEVCLIENTID || process.env.CLIENTID;

interface MainState {
	userToken: string | undefined;
	tokenValid: boolean;
	showRUSure: boolean;
	colorMode: string;
	connected: true | false | null;
}

type connectionType = [boolean, any?];

class Main extends React.Component<any, MainState> {
	constructor(props: any) {
		super(props);

		this.state = {
			userToken: undefined,
			tokenValid: true,
			showRUSure: false,
			colorMode: 'dark',
			connected: null,
		};

		this.validateToken = this.validateToken.bind(this);
		this.showRUSure = this.showRUSure.bind(this);
		this.invalidateToken = this.invalidateToken.bind(this);
		this.toggleColorMode = this.toggleColorMode.bind(this);
	}

	componentDidMount() {
		const docBody = document.querySelector('body') as HTMLBodyElement;

		this.validateToken();

		getStorage('mode').then(colorMode => {
			this.setState({ colorMode });
			docBody.className = this.state.colorMode;
		});

		// eslint-disable-next-line no-undef
		chrome.storage.onChanged.addListener(() => {
			this.validateToken();
			getStorage('mode').then(colorMode => {
				this.setState({ colorMode });
				docBody.className = this.state.colorMode;
			});
		});
	}

	validateToken() {
		getStorage('twitchtoken').then(res =>
			validateToken(res).then(valid =>
				valid
					? this.setState({ userToken: res, tokenValid: valid })
					: this.setState({ userToken: 'invalid', tokenValid: valid })
			)
		);
	}

	showRUSure() {
		this.setState({ showRUSure: true });
	}

	invalidateToken() {
		getStorage('twitchtoken').then(token => {
			axios.post('https://id.twitch.tv/oauth2/revoke', null, {
				params: { client_id, token },
			});
		});
		setStorage('twitchtoken', '');
		this.validateToken();
		this.setState({
			showRUSure: false,
			userToken: undefined,
			tokenValid: false,
		});
	}

	toggleColorMode() {
		getStorage('mode').then(colorMode => {
			setStorage('mode', colorMode === 'light' ? 'dark' : 'light');
		});
	}

	checkConnection(): Promise<connectionType> {
		return new Promise((resolve, reject) => {
			axios
				.get('https://twitch.tv', { timeout: 1000 })
				.catch((error: any) => {
					reject([false, error]);
				})
				.then(res => {
					resolve([true, res]);
				});
		});
	}

	render() {
		if (this.state.showRUSure) window.scrollTo(0, 0);
		const docBody = document.querySelector('body') as HTMLBodyElement;

		docBody.style.backgroundColor =
			this.state.colorMode === 'dark' ? '#1e1f20' : '#fff';
		docBody.style.color = this.state.colorMode === 'dark' ? '#fff' : '#000';

		if (this.state.connected === false) {
			return (
				<>
					<Error404 />
					<ColorModeToggle
						toggleColor={this.toggleColorMode}
						shown={this.state.showRUSure}
						mode={this.state.colorMode}
					/>
				</>
			);
		}

		if (
			this.state.userToken === undefined ||
			this.state.connected === null
		) {
			if (this.state.connected === null) {
				this.checkConnection()
					.then((res: connectionType) => {
						this.setState({ connected: res[0] });
						console.log(
							'Failed to connect to twitch with error',
							res[1]
						);
					})
					.catch((res: connectionType) => {
						this.setState({ connected: res[0] });
					});
			}

			return (
				<Loading
					hidden={false}
					color={this.state.colorMode === 'dark' ? '#fff' : '#000'}
				/>
			);
		}

		window.addEventListener('scroll', () => {
			if (this.state.showRUSure) window.scrollTo(0, 0);
		});

		return (
			<div>
				{this.state.userToken && this.state.tokenValid ? (
					<>
						{this.state.showRUSure ? (
							<div
								className={styles.ruSure}
								style={{
									opacity: '100%',
								}}>
								<h1
									style={{
										opacity: '100%',
									}}>
									Are you sure you want to invalidate the
									Twitch token?{' '}
								</h1>
								<ButtonGroup variant='contained'>
									<Button onClick={this.invalidateToken}>
										Yes
									</Button>
									<Button
										color='primary'
										onClick={() =>
											this.setState({
												showRUSure: false,
											})
										}>
										No
									</Button>
								</ButtonGroup>
							</div>
						) : (
							<div>{null}</div>
						)}
						<Live
							color={
								this.state.colorMode === 'dark'
									? '#fff'
									: '#000'
							}
						/>
						<SettingsButton
							ruSure={this.showRUSure}
							shown={this.state.showRUSure}
							colorMode={this.state.colorMode}
						/>
					</>
				) : (
					<NoAuthPage colorMode={this.state.colorMode} />
				)}
				<ColorModeToggle
					toggleColor={this.toggleColorMode}
					shown={this.state.showRUSure}
					mode={this.state.colorMode}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));

export { client_id };
