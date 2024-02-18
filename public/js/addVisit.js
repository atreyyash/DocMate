$(() => {
    const addVisit = $('.patientVisit');
    const patientId = addVisit.attr('id');
    // console.log(patientId);
    addVisit.on('click', (ev) => {
        $.get(`/patient/addPatientVisit?patientId=${patientId}`, () => {
            console.log("success");
        }).done(() => {
            window.location.href = `/patient/addPatientVisit?patientId=${patientId}`;
            console.log(patientId);
        }).fail(() => {
            req.flash("error", "Cannot load the requested URL.");
        });
    });
})