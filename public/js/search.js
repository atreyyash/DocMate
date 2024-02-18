$(() => {
    const srcText = $(".search-txt");
    const srcBtn = $('.search-btn');
    const search = $(".search");
    const entry = $(".entry");
    // search.hide();
    srcBtn.on("click", (e) => {
        console.log("e.which: ", e.which);
        let searchText = srcText.val();
        console.log(searchText);
        if (searchText == "") {
            alert("Input can't be Empty");
            return;
        }

        $.ajax({
            url: `/patient/search?text=${searchText}`,
            type: 'GET',
            success: function (data) {
                console.log(data);
                entry.hide();
                search.css('visibility', 'visible');
                search.empty();
                if (data.length == 0) {
                    search.append(`<img src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/animasi-emptystate.gif" style="height: 200px; margin: auto">`);
                }
                data.forEach((d, i) => {
                    let dateOnly = new Date(d.dov).toISOString().substring(0, 10);
                    search.append(`<td><h3>${i}</h3></td>
                <td><h3><a class="entryLink" href="/patient/details?patientId=${d._id}}">${d.name}</a></h3></td>
                <td><h3>${dateOnly}</h3></td>
                <td><h3>${d.phoneNo}</h3></td>`);
                });
                srcText.width(0);
            },
            error: function (err) {
                console.error(err);
            }
        });
    })
    
    srcText.on("keypress", (e) => {
        if (e.which === 13) {
            srcBtn.trigger("click");
        }
    })

    srcText.on("click", () => {
        srcText.css("width", "240px");
        srcText.css("padding", "0 6px");
    });

    srcText.on('focusout', function () {
        $(this).animate({ width: '0px' }, 1000); // Animate the width to 0px over 500 milliseconds
        // srcText.removeAttr("style");
        srcText.css("width", "");
        srcText.css("padding", "");
    });
});