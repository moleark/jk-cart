export function randomColor() {
    let arr = ['#ad2031', '#239ab7', '#80a040', '#811f63', '#1B12AC'];
    let i = Math.floor(Math.random() * arr.length);
    return arr[i];
    // return '#' + Math.random().toString(16).substr(-6);
}