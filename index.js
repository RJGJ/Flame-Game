$('#inputs input:text').keyup(ev => {
  const inputEl = $(ev.target);
  
  const displayEl = $(`#${inputEl.attr('id')}-display`);       
  displayEl.html('');
  displayEl.data('value', '');
  
  // update the data and the UI
  inputEl
    .val()
    .split()
    .forEach((letter) => {
      
      // add data value to display element
      const data = displayEl.data('value');
      const cleanLetter = letter
        .replace(/ /g, '')
        .toLowerCase();
      console.log(cleanLetter)
        
      displayEl.data('value', data + cleanLetter);
      
      // append letters to display
      displayEl.append(() => {
        return $('<span>')
          .text(letter)
          .addClass([cleanLetter, 'display-letter']);
      });
    });
  
  updateResult();
});

const updateResult = () => {
  let allNames = "";
  $('.names h2')
    .each((idx, item) => {
      allNames += $(item).data('value');
    });
  
  const countRecords = {};
  allNames
    .split('')
    .forEach((i) => {
      if (i in countRecords) {
        countRecords[i]++;
        return;
      } else {
        countRecords[i] = 1;
      }
    });
    
  // $('#debug').text(JSON.stringify(countRecords));
  
  const resultIdx = Object
    .entries(countRecords) //
    .filter(([_, count]) => count <= 1) //
    .length % 5 - 1; //

  
  $('.results h3').each((idx, item) => {
    const newIdx = resultIdx < 0 ? 4 : resultIdx;
    
    idx === newIdx
      ? $(item).removeClass('hidden') 
      : $(item).addClass('hidden');
  });
};