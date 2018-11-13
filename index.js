$('#go').click(function() {
    localStorage.setItem('formType', $('#form-type option:checked').prop('id')); // Save the ID of the selected <option> tag
    window.location.href = '../start.html';
});