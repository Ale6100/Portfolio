import React from 'react';

const Footer = () => {
    return (
        <footer className="flex justify-evenly bg-blue-400">
            <div>
                <a href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank">
                    <img src="https://img.icons8.com/fluency/48/000000/linkedin.png"/>
                    <p>Linkedin</p>
                </a>
            </div>
            <div>
                <a href="https://github.com/Ale6100" target="_blank">
                    <img src="https://img.icons8.com/ios-glyphs/48/undefined/github.png" />
                    <p>GitHub</p>
                </a>
            </div>
            <div>
                <a className="hoverr "href="https://colab.research.google.com/drive/1e9pqVIkt6J1LK7uxsK_IE-i5rx4NJiME?usp=sharing"  target="_blank">
                    <img src="https://img.icons8.com/color/48/000000/python--v1.png"/>
                    <p>Python</p>
                </a>
            </div>
            <div>
                <a href="https://www.youtube.com/channel/UCfgt4--XgLnHxYNDPOvYioA" target="_blank">
                    <img src="https://img.icons8.com/color/48/000000/youtube-play.png" />
                    <p>YouTube</p>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
