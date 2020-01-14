import React from 'react';
import { View } from 'tonva';
import { CHome } from './CHome';
import lab from "../images/lab.jpg";
import hebBirdsEye from "../images/HebBirdsEye.jpg";
import productSample from "../images/productSample.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export class VSlider extends View<CHome> {

    public render(param: any) {
        var setting = {
            dots: true,
            infinite: true,
            speed: 500,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return <Slider {...setting} className="bg-white my-2 px-2 py-1">
            <div>
                <img src={lab} className="d-block w-100" alt="..."></img>
            </div>
            <div>
                <img src={hebBirdsEye} className="d-block w-100" alt="..."></img>
            </div>
            <div>
                <img src={productSample} className="d-block w-100" alt="..."></img>
            </div>
        </Slider>
    }
}