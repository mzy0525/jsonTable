(function ($) {
    
    $.fn.jsonTable = function (options) {
        let table = $('<table cellspacing="0" cellpadding="0" border="0" id="table" style="width:100%"></table>')
        let prompt = $('<div class="table-prompt"></div>')
        let thead = $("<thead><tr></tr></thead>")
        let tbody = $("<tbody></tbody>")
        let div = $('<div class="j-toble" style="overflow: auto"></div>')

        $.each(options, function (i, header) {
            if (header.width){
                thead.find("tr").append(`<th style="width:${header.width}">${header.name}</th>`);
            } else{
                thead.find("tr").append(`<th>${header.name}</th>`);
            }
        });
        this.data("options", options);
        table.append(thead)
        table.append(tbody)

        $(div).css('height',$(this).height())
        $(div).append(table)
        $(this).append(div)
        $(this).css('position', 'relative')
        $(this).append(prompt)
        return this;
    };
    $.fn.jsonTableUpdate = function (data) {
        let options = this.data("options")
        let tbody = $(this).find("tbody")
        tbody.empty()
        $.each(data, function (i, line) {
            let tableRow;
            let td;
            $.each(options, function (j, optionsItem) {
                if (optionsItem.value instanceof Function) {
                    console.log(optionsItem)
                    td += `<td>${optionsItem.value(line)}</td>`
                } else if (optionsItem.value === "*") {
                    td += `<td>${i + 1}</td>`
                } else td += `<td>${line[optionsItem.value]||''}</td>`
            });
            tableRow = `<tr>${td}</tr>`
            tbody.append(tableRow);
        });

        $(tbody).find('td').on('mouseover', (e) => {
          
            let { target } = e
            if (target.clientWidth <target.scrollWidth) {
                $(this).find('.table-prompt').text($(target).text());
                $(this).find('.table-prompt').show()
                $(this).find('.table-prompt').css({
                    bottom:$(this).height() - target.offsetTop + $(this).find('.j-toble').scrollTop(),
                    left:target.offsetLeft,
                    width:$(target).width()
                })
            }
        })
        $(tbody).find('td').on('mouseout', (e) => {
            $(this).find('.table-prompt').hide()
        })
        
    }

}(jQuery));