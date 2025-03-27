import "./carousel.css";


interface Props {
    items: Array<{item: number, bgcolor: string}>
}

// TODO: set up infinite scroll


const Carousel = ({ items }: Props) => {

    return (
        <div className="carousel-wrapper">
            <div className="carousel">
                {items.map((item) => (
                    <div className="carousel-item" key={item.item} style={{backgroundColor: item.bgcolor}}></div>
                ))}
            </div>

            <div className="dots">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`dot`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
