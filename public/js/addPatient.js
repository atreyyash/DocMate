$(() => {
    const addBtn = $('.addBtn');
    addBtn.on('click', (ev) => {
        $.get('/patient/addpatient', (data, status) => {
            console.log("Done with status code ", status);
        }).done(() => {
            window.location.href = '/patient/addpatient';
        }).fail((jqXHR, textStatus, err) => {
            console.log("Status: ", textStatus, " Error: ", err);
        })
    });
})