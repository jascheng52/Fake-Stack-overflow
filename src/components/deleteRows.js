// THIS FUNCTION DELETE ALL ADDED ROWS

export default function DeleteRows(){
    let questions = document.getElementsByClassName("insertedRow");
    while (questions.length > 0){
        questions[0].remove();
    }
}