import React from 'react';
import { View } from 'tonva';
import { CHome } from './CHome';
import lab from "../images/lab.jpg";
import hebBirdsEye from "../images/HebBirdsEye.jpg";
import productSample from "../images/productSample.jpg";
import banner1 from '../images/20200306_banner-01.jpg';
import banner3 from '../images/20200306_banner-03.jpg';
import banner5 from '../images/20200306_banner-05.jpg';
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
                <img src={banner1} className="d-block w-100" alt="..."></img>
            </div>
            <div>
                <img src={banner3} className="d-block w-100" alt="..."></img>
            </div>
            <div>
                <img src={banner5} className="d-block w-100" alt="..."></img>
            </div>
        </Slider>
    }
}