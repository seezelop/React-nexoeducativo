import React, { Component } from "react";

class Carousel extends Component {
    render() {
        return (
            <div id="carouselExampleControls" classNameName="carousel slide" data-bs-ride="carousel">
                <div classNameName="carousel-inner">
                    <div classNameName="carousel-item active">
                        <img src="imageduca.JPG" classNameName="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="Captura2.JPG" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="..." className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        );
    }
}

export default Carousel;

