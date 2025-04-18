import "./carousel.css";
import {ReactNode, useRef, useState} from "react";


interface Props {
    items: Array<ReactNode>
}


const Carousel = ({ items }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const items_infinite = [...items, items[0], items[1], items[2]];

    const [active, setActive] = useState<number>(0);

    const handleScroll = () => {
        if (ref.current) {
            const offset = ref.current.scrollLeft;

            let offsetIndex = 0;

            for (let i = 0; i < items_infinite.length; i++) {
                const next = ref.current.children[i+1] as HTMLElement;
                if (next.offsetLeft > offset) {
                    offsetIndex = i;
                    break;
                }
            }

            if (offsetIndex === items.length) {
                ref.current.scrollTo({left: 0, behavior: 'instant'});
                setActive(0);
            } else {
                setActive(offsetIndex);
            }
        }
    }

    const scrollToIndex = (index: number) => {
        if (ref.current) {
            const child = ref.current.children[index] as HTMLElement;
            const offset = child.offsetLeft;
            ref.current.scrollTo({ behavior: 'smooth', left: offset });
        }
    }


    return (
        <div className="carousel-wrapper">
            <div className="carousel" ref={ref} onScroll={handleScroll}>
                {items_infinite.map((item, index) => (
                    <div
                        className="carousel-item"
                        key={`carousel-item-${index}`}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <div className="dots">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${active === index ? 'dot-active' : ''}`}
                        onClick={() => scrollToIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
