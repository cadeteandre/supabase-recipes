import heroImg from '/images/hero-img.jpeg';

const Banner = () => {
    return (  
        <section>
                    <div
                        className="hero min-h-80"
                        style={{
                            backgroundImage: `url(${heroImg})`,
                        }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-neutral-content text-center">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-3xl font-bold text-white tracking-wide">Be inspired, cook with passion and experience unforgettable moments at the table.</h1>
                            </div>
                        </div>
                    </div>
        </section>
    );
}

export default Banner;