export default function sumArray(arr) {
    var sum = 0;
    arr.map((num) => {
        sum += num;
    });

    return sum;
}