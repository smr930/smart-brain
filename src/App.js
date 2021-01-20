import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import BgParticles from './components/Particles/BgParticles';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import { Component } from 'react';
import Clarifai from 'clarifai';

// Clarifai API configuration
const apiKey = process.env.REACT_APP_CLARIFAI_API_KEY;
const clarifai = new Clarifai.App({
    apiKey: { apiKey },
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
        };
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
        console.log(process.env.CLARIFAI_API_KEY);
    };

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });

        clarifai.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then((res) => {
                console.log(
                    res.outputs[0].data.regions[0].region_info.bounding_box
                );
            })
            .catch((err) => {});
    };

    render() {
        return (
            <div className="App">
                <BgParticles />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition imageUrl={this.state.imageUrl} />
            </div>
        );
    }
}
export default App;
