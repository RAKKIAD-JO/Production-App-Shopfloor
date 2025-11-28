const ChangStationName = (Stationcode: number) => {
 if (Stationcode === 1) {
    return "แหล่งผลิต "
 } else if (Stationcode === 2) {
    return "ขึ้นรูป"
 }  else if (Stationcode === 3) {
    return "อบ"
 }
}
export default ChangStationName;
