export const priceFormatter = (price: number) => {
    if (price > 999 && price < 1000000) {
        return (price / 1000).toFixed(1) + "K";
    } else if (price > 1000000) {
        return (price / 1000000).toFixed(1) + "M";
    } else if (price < 900) {
        return price;
    }
};

const convertNumbThousand = (x?: number): string => {
    if (!x) {
        return "0";
    }
    return x.toLocaleString("en-US");
};
export default convertNumbThousand;
