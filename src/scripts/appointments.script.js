const selectDate = document.getElementById('selectDate')

document.addEventListener('DOMContentLoaded', () => {
    const weekdays = getAppointmentDays();

    // Obtén la fecha actual
    const actualDate = new Date();
    const actualMonth = actualDate.getMonth() + 1;

    selectDate.min = `${weekdays[0].getFullYear()}-${actualMonth.toString().padStart(2, '0')}-${weekdays[0].getDate().toString().padStart(2, '0')}`;
    console.log(`${weekdays[0].getFullYear()}-${actualMonth.toString().padStart(2, '0')}-${weekdays[0].getDate().toString().padStart(2, '0')}`)
    selectDate.max = `${weekdays[6].getFullYear()}-${actualMonth.toString().padStart(2, '0')}-${weekdays[6].getDate().toString().padStart(2, '0')}`;
    console.log(`${weekdays[6].getFullYear()}-${actualMonth.toString().padStart(2, '0')}-${weekdays[6].getDate().toString().padStart(2, '0')}`)
})


function getAppointmentDays() {
    const today = new Date();
    const weekdays = [];

    for (let i = 1; weekdays.length < 8; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);

        if (nextDay.getDay() !== 0 && nextDay.getDay() !== 6) {
            weekdays.push(nextDay);
        }
    }
    return weekdays
}