$(() => {
    const logout = $('.logout');
    logout.on('click', (ev) => {
        $.post('/logout', () => {
            alert("You will be logged out");
        }).done(() => {
            window.location.href='/';
        })
    });
})