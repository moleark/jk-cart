import React from 'react';
import { View } from 'tonva';
import { CHome } from './CHome';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
};

export class VSlider extends View<CHome> {

    public render(param: any) {
        return <Slider {...sliderSetting} className="bg-white" >
            {this.controller.banners.map((banner, index) => <div key={index} >
                <a href={banner.src} >
                    <img src={banner.path} className="d-block w-100" alt="..."></img>
                </a>
            </div>)}
        </Slider>
    }
}
