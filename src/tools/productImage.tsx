import * as React from 'react';
import { Image } from 'tonva-react';

const imagePath = "https://www.jkchemical.com/static/Structure/";
const pointProductImagePath = "https://www.jkchemical.com/static/images/pointshop";
const altimagePath = "https://www.jkchemical.com/static/Structure/999.png";

interface ProductImageProps {
    className?: string;
    style?: React.CSSProperties;
    chemicalId: string;
}

export function ProductImage(props: ProductImageProps) {

    let { style, className, chemicalId } = props;
    return <Image src={chemicalId && (imagePath + chemicalId.substr(0, 3) + '/' + chemicalId + '.png')}
        style={style} className={className} altImage={altimagePath} />;
}

// export function PointProductImage(props: ProductImageProps) {

//     let { style, className, chemicalId } = props;
//     return <Image src={chemicalId && (pointProductImagePath + '/' + chemicalId + '.png')}
//         style={style} className={className} altImage={altimagePath} />;
// }

export function PointProductImage(props: ProductImageProps) {

    let { style, className, chemicalId } = props;
    if (chemicalId && /[0-9]$/.test(chemicalId))
        chemicalId = pointProductImagePath + '/' + chemicalId + '.png';

    return <Image src={chemicalId && chemicalId}
        style={style} className={className} altImage={altimagePath} />;
}