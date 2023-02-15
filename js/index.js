import './jquery-3.5.1.min.js'
import './jsonTable.js'


$(function(){
  $('#table').jsonTable([
    {
      name: '表头',
      value: 'name',
    },
    {
      name: '表头',
      value: 'model',
      value: function (row) {
        let  span = `<span class="a successColor" onclick="amI(1)">点我</span>`
        return span
      },
    },
  ])
  $('#table').jsonTableUpdate([{name:'1'}])
})

function amI(){
  console.log(1)
}