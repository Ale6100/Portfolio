const redes = [
    {
        href: "https://www.linkedin.com/in/alejandro-portaluppi/",
        src: "https://img.icons8.com/fluency/48/000000/linkedin.png",
        alt: "Linkedin icon",
        p: "Linkedin"
    },
    {
        href: "https://github.com/Ale6100",
        src: "https://img.icons8.com/ios-glyphs/48/undefined/github.png",
        alt: "GitHub icon",
        p: "GitHub"
    },
    {
        href: "https://colab.research.google.com/drive/1e9pqVIkt6J1LK7uxsK_IE-i5rx4NJiME?usp=sharing",
        src: "https://img.icons8.com/color/48/000000/google-colab.png",
        alt: "Google Colab icon",
        p: "Colab"
    },
    {
        href: "https://www.youtube.com/channel/UCfgt4--XgLnHxYNDPOvYioA",
        src: "https://img.icons8.com/color/48/000000/youtube-play.png",
        alt: "YouTube icon",
        p: "YouTube"
    }
]

const Footer = () => {
    return (
        <footer className="flex justify-evenly bg-blue-600">
            {
            redes.map(red => (
            <div key={red.p}>
                <a href={red.href} target="_blank" rel="noopener noreferrer" className="my-1 p-1 no-underline flex flex-col items-center border border-black rounded bg-white md:transition-all md:duration-500 md:hover:bg-gray-400 max-md:my-1 max-md:mx-0 max-md:p-1">
                    <img loading="lazy" src={red.src} alt={red.alt} className="w-12 h-12"/>
                    <p className="m-0 inline-block font-semibold max-md:hidden">{red.p}</p>
                </a>
            </div>
            ))
            }
        </footer>
    );
}

export default Footer;
