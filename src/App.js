import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import BgParticles from './components/Particles/BgParticles';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import { Component } from 'react';

const initialState = {
    input: '',
    imageUrl: '',
    isInputBlank: false,
    box: [],
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
    },
};

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    // heroku endpoint url
    endPoint = () => {
        return 'https://secret-tor-52418.herokuapp.com';
    };

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined,
            },
        });
    };

    calculateFaceLocation = (data) => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        const clarifaiFace =
            data.outputs[0].data.regions[0].region_info.bounding_box;

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottomRow: height - clarifaiFace.bottom_row * height,
        };
    };

    displayFaceBox = (box) => {
        this.setState({ box: box });
    };

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    };

    onPictureSubmit = () => {
        if (this.state.input === '') {
            this.setState({ isInputBlank: true });
            return;
        }
        this.setState({ imageUrl: this.state.input });
        this.setState({ isInputBlank: false });
        fetch(this.endPoint() + '/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: this.state.input,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    fetch(this.endPoint() + '/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id,
                        }),
                    })
                        .then((res) => res.json())
                        .then((count) => {
                            this.setState(
                                Object.assign(this.state.user, {
                                    entries: count,
                                })
                            );
                        })
                        .catch(console.log());
                }
                this.displayFaceBox(this.calculateFaceLocation(res));
            })
            .catch((err) => {
                console.log('error using clarifai api: ', err);
            });
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route: route });
    };

    render() {
        const { isSignedIn, imageUrl, route, box, isInputBlank } = this.state;
        return (
            <div className="App">
                <BgParticles />
                <Navigation
                    onRouteChange={this.onRouteChange}
                    isSignedIn={isSignedIn}
                />
                {route === 'home' ? (
                    <div>
                        <Logo />
                        <Rank
                            name={this.state.user.name}
                            entries={this.state.user.entries}
                        />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onPictureSubmit={this.onPictureSubmit}
                            isInputBlank={isInputBlank}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div>
                ) : route === 'signin' ? (
                    <SignIn
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                        endPoint={this.endPoint}
                    />
                ) : (
                    <Register
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                        endPoint={this.endPoint}
                    />
                )}
            </div>
        );
    }
}
export default App;
