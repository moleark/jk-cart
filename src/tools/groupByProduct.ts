
export function groupByProduct(packItems: any[]) {
    let result: any[] = [];
    for (let packItem of packItems.sort((a, b) => a.price - b.price)) {
        let { product, pack, quantity, price, currency } = packItem;
        let packRow: any = {
            pack: pack,
            price: price,
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