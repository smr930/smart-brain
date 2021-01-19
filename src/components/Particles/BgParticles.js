import Particles from 'react-particles-js';
import './Particles.css';

const BgParticles = () => {
    const particlesOptions = {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 400,
            },
        },
    };
    
    return (
        <div className="particles">
            <Particles params={particlesOptions} />
        </div>
    );
};

export default BgParticles;
