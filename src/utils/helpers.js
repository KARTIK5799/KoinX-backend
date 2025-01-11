const GetStandardDeviation = (prices) => {
    const n = prices.length;
    if (n <= 1) return 0; 

    const mean = prices.reduce((acc, price) => acc + price, 0) / n;

    const variance = prices.reduce((acc, price) => acc + (price - mean) ** 2, 0) / (n - 1);

    return Math.sqrt(variance);
};

export { GetStandardDeviation };

  