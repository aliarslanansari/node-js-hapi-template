function compare(a, b) {
    return a.travelDistance - b.travelDistance;
}
const sortCabs = allCabs => {
    allCabs.sort(compare);
    return allCabs.lenght >= 5
        ? allCabs.slice(0, 5)
        : allCabs.slice(0, allCabs.lenght);
};
export default sortCabs;
