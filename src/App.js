import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import BgParticles from './components/Particles/BgParticles';

function App() {
    return (
        <div className="App">
            <BgParticles />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm />
            {/*
            
            <FaceRecognition /> */}
        </div>
    );
}
export default App;
