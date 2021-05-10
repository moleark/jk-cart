import { CartPackRow } from "../store";

export function groupByProduct(packItems: any[]) {
    let result: any[] = [];
    for (let packItem of packItems.sort((a, b) => a.price - b.price)) {
        let { product, pack, quantity, price, retail, currency } = packItem;
        let packRow: CartPackRow = {
            pack: pack,
            price: price,
            retail: retail,
            quantity: quantity,
            currency: currency && currency.id
        }
        let cpi = result.find(e => e.product.id === product.id);
        if (cpi === undefined) {
            cpi = { product: product, packs: [] };
            result.push(cpi);
        }
        cpi.packs.push(packRow);
    }
    return result;
}

export function groupByProduct1(packItems: any[]) {
    let result: any[] = [];
    for (let packItem of packItems) {
        let { product, pack, quantity, price, retail, currency } = packItem;
        let packRow: CartPackRow = {
            pack: pack,
            price: price,
            retail: retail,
            quantity: quantity,
            currency: currency && currency.id
        }
        let cpi = { product: product, packs: [packRow] };
        result.push(cpi);
    }
    return result;
}