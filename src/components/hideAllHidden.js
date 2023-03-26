// this function is to make parts of the code hidden 

export default function HideAllHidden(){
    let hiddenPages = document.getElementsByClassName("hidden");
    for(let i = 0; i < hiddenPages.length; i++)
    {
        hiddenPages[i].style.display = "none";
    }
}