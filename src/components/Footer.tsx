const Footer = () => {
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
            src: "https://img.icons8.com/color/48/000000/python--v1.png",
            alt: "Python icon",
            p: "Python"
        },
        {
            href: "https://www.youtube.com/channel/UCfgt4--XgLnHxYNDPOvYioA",
            src: "https://img.icons8.com/color/48/000000/youtube-play.png",
            alt: "YouTube icon",
            p: "YouTube"
        },
        {
            href: "https://wa.me/+5491139470383",
            src: "https://img.icons8.com/color/48/000000/whatsapp--v1.png",
            alt: "WhatsApp icon",
            p: "WhatsApp"
        }
    ]

    return (
        <footer className="flex justify-evenly bg-blue-400">
            {
                redes.map(red => (
                <div key={red.p}>
                    <a href={red.href} target="_blank" rel="noopener">
                        <img src={red.src} alt={red.alt}/>
                        <p>{red.p}</p>
                    </a>
                </div>
                ))
            }           
        </footer>
    );
}

export default Footer;
