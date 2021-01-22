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
    apiKey: {apiKey},
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
        };
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace =
            data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log('width: ' + width + ', height: ' + height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottowmRow: height - clarifaiFace.bottowm_row * height,
        };
    };

    displayFaceBox = (box) => {
        console.log('box: ' + box);
        this.setState({ box: box });
    };

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    };

    onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input });

        clarifai.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then((res) => {
                this.displayFaceBox(this.calculateFaceLocation(res));
                // console.log(res.outputs[0].data.regions[0].region_info.bounding_box);
                // sample image
                // https://samples.clarifai.com/face-det.jpg
            })
            .catch((err) => {
                console.log('error using clarifai api: ', err);
            });
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
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
        );
    }
}
export default App;
