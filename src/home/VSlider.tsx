import React from 'react';
import { View } from 'tonva';
import { CHome } from './CHome';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
};

export class VSlider extends View<CHome> {

    public render(param: any) {
        return <Slider {...sliderSetting} className="bg-white" >
            {this.controller.banners.map((banner, index) => <div key={index} >
                <img src={banner.path} className="d-block w-100" alt="..."></img>
            </div>)}
        </Slider>
    }
}
