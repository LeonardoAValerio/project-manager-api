export class Time {
    constructor(
        public minutes: number,
        public hours: number
    ) {}
    
    get fullTime(): number {
        const minutes = this.minutes/60
        const fullTime = this.hours + minutes;

        return fullTime;
    }
}