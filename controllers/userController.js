const patient = require("../models/patients");
const user = require("../models/users");

function isDateInThisWeek(date) {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
}

module.exports.getDashboard = async (id) => {
    let dash = {
        revenue: 0,
        monthly_pat: 0,
        weekly_pat: 0,
    };
    try {
        const u = await patient.find({ doctorId: id });
        // console.log("Populated User: ", u);
        const date = new Date();
        // console.log("Current Month: ", date.getMonth());
        u.forEach((el, i) => {
            el.visits.forEach((v, i) => {
                if ((v.dov.getMonth() === date.getMonth()) && (v.dov.getFullYear() === date.getFullYear())) {
                    dash.revenue += v.payment;
                    dash.monthly_pat++;
                }
                console.log(isDateInThisWeek(v.dov));
                if (isDateInThisWeek(v.dov)) {
                    dash.weekly_pat++
                }
            });
        });
        // console.log(dash);
        return dash;
    }
    catch (err) {
        req.flash("error", err);
    }
}

module.exports.getProfile = (req, res, next) => {
    // console.log("User Profile: ", req.user);
    res.render('profile', {
        user: req.user
    });
}