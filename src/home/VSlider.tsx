/* eslint-disable */
import { View } from 'tonva-react';
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
    arrows: false,
    isArrows: true,
    isDots: true
};

export class VSlider extends View<CHome> {

    public render(param: any) {

        let { banners } = this.controller;
        if (banners.length > 0) {
            let random = Math.floor(Math.random() * 10 % banners.length);
            return <img src={banners[random].path} className="d-block w-100" alt="..."></img>
        }

        /**
        return <Slider {...sliderSetting} className="bg-white" >
            {this.controller.banners.map((banner, index) => <div key={index} >
                <img src={banner.path} className="d-block w-100" alt="..."></img>
            </div>)}
        </Slider>
        **/
    }
}
