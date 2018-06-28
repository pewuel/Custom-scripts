/*!
 * CountdownJE! 0.0.1
 * Script to make countdown.
 * -------------------------
 * Author: http://pewuel.com
 * -------------------------
 */


/**
 * Represents a Countdown.
 * @constructor
 * @param {string} endDate - supported format: 'YYYY/MM/DD xx:xx'.
 */

class Countdown {

    constructor(endDate) {
        this.endDate = this.convertDateToTimestamp(endDate);
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;

        this.interval = setInterval(() => {
            this.calculateRemainingTime();
            this.renderTime();
        }, 1000);
    }


    convertDateToTimestamp(date) {
        return new Date(date).getTime();
    }


    calculateRemainingTime() {

        const now = Math.floor(new Date().getTime()),
              remainingTime = this.endDate - now;
        
        if (remainingTime < 0) {

            clearInterval(this.interval);

            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;
            this.days = 0;

        } else {

            this.seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            this.minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            this.hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

        }


    }


    renderTime() {

        const countdown = document.querySelector('.countdown');

        const days = countdown.querySelector('.days'),
              hours = countdown.querySelector('.hours'),
              minutes = countdown.querySelector('.minutes'),
              seconds = countdown.querySelector('.seconds');


        days.textContent = this.days;
        hours.textContent = this.hours;
        minutes.textContent = this.minutes;
        seconds.textContent = this.seconds;
    }


}