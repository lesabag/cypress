

export class RideDetails {

    constructor(year_, month_, startDate, endDate, guestType, country_, second_country, isLocationExist) {
        this.year_ = year_;
        this.month_ = month_;
        this.startDate = startDate;
        this.endDate = endDate;
        this.guestType = guestType;
        this.country_ = country_;
        this.second_country = second_country;
        this.isLocationExist = isLocationExist;

    }
}
export const rideDetails = new RideDetails();