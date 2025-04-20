import "./page-title-banner.css";

const PageTitleBanner = ({ title }: { title: string }) => {
    return (
        <div className="banner">
            <div className="banner-images">
                <div className="bg-img img1"></div>
                <div className="bg-img img2"></div>
                <div className="bg-img img3"></div>
                <div className="bg-img img4"></div>
            </div>
            <h1 className="banner-title">{title}</h1>
        </div>

    );
}

export default PageTitleBanner;