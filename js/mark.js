function questionId(i)
{
    return "Q" + i;
}

function answerId(i)
{
    return "A" + i;
}

function responseId(i)
{
    return "R" + i;
}

function quAndA(i)
{
    return myQaData[i];
}

function numQuestions()
{
    return myQaData.length;
}

function markQuestions()
{
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;    
    for(i = 0; i < numQuestions(); ++i)
    {
        let ansElt = document.getElementById(answerId(i))
        let ansGiven = ansElt.valueAsNumber;
        let ansTrue = Number(quAndA(i)["A"]);      

        //TODO: do numeric comparison        
        isCorrect = (ansGiven == ansTrue);

        resElt = document.getElementById(responseId(i));
        if(isNaN(ansGiven))
        {
            resElt.innerHTML = "";
            numUnanswered += 1;
        }
        else if(isCorrect)
        {
            resElt.innerHTML = "\&#x2705";
            numCorrect += 1;
        }
        else
        {
            resElt.innerHTML = "\&#x274C";
            numIncorrect += 1;
        }
    } 
    let summaryElt = document.getElementById("summaryId");
    let photoElt = document.getElementById("photoLink");
    let uTubeElt = document.getElementById("youtubeLink");

    fractionCorrect = numCorrect/numQuestions();
    comment = ""
    img = ""
    if(fractionCorrect < 0.5)
    {
        comment = "Keep on trying !!!";
        uTubeElt.src = "";
        photoElt.src = images[0];
    }
    else if(fractionCorrect < 0.75)
    {
        comment = "Good";
        uTubeElt.src = "";
        photoElt.src = images[1];
    }
    else if(fractionCorrect < 1.0)
    {
        comment = "Very Good";
        uTubeElt.src = "";
        photoElt.src = images[2];
    }
    else
    {
        comment = "!!Perfect!!";
        uTubeElt.src = video;
        photoElt.src = "";
    }

    summaryElt.innerHTML = comment + ": " + numCorrect + " out of " + numQuestions();
}

function drawQuestions()
{
    for(i = 0; i < numQuestions(); ++i)
    {
        let ip1 = i + 1;        
        let elt = document.createElement("div");
        elt.className = "question"
        elt.id = questionId(i);
        elt.innerHTML = "Q" + (i+1) + ": " + quAndA(i)["Q"];
        document.body.appendChild(elt);

        let elt2 = document.createElement("input");
        elt2.className = "answer"
        elt2.id = answerId(i);
        elt2.type = "number";
        elt2.min = "1";
        elt2.max = "20";
        elt2.setAttribute("onchange", "markQuestions()");
        //<Q: why is setAttributed needed for onchange but not for min?
        //elt2.onchange = "markQuestions()";

        document.body.appendChild(elt2);

        let elt3 = document.createElement("div");
        elt3.id = responseId(i);
        document.body.appendChild(elt3);
    }
}
