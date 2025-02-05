
    //Select the div
    const div = document.getElementById('myDiv');

    //1. Check if the "red" class is present
    document.getElementById('checkClass').addEventListener('click', function(){
        if(div.classList.contains('red')){
            alert('The box is red.');
        }else {
            alert('THe box is not red.');
      }
    });

    //2. Add the "green" class
    document.getElementById('addGreen').addEventListener('click', function(){
        div.classList.add('green');
    });

    //3. Remove the "red" class
    document.getElementById('removeRed').addEventListener('click',function(){
        div.classList.remove('red');
    });

    //4. Replace the "red" class with "blue"
    document.getElementById('replaceRedWithBlue').addEventListener('click',function(){
        div.classList.replace('red', 'blue');
    });

    //5. Toggle the "hidden" class to show/hide the div
    document.getElementById('toggleHidden').addEventListener('click', function(){
        div.classList.toggle('hidden');
    })
