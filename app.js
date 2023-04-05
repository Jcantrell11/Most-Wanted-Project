/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            let personInfo = displayPerson(person[0]);
            break;
        case "family":
            let personFamily = findPersonFamily(person[0], people);
            break;
        case "descendants":
            let personDescendants = findPersonDescendants(person[0], people);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people, person) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `ID #${person.id}\n`;
    alert(personInfo);
    app(person);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
function findSpouse (person, people) {
    let returnSpouse = data.filter(function(el) {
        if (el.id === person.currentSpouse) {
            return true;
        } else {
            return false;
        }
    })
    return returnSpouse;
}

function findParents (person, people) {
    let returnParents = data.filter(function(el) {
        try {
        if (el.id === person.parents[0] || el.id === person.parents[1]) {
            return true;
        }} catch (error) {
            return false;
        } 
    })
    return returnParents;
}

function findSiblings (person, people) {
    let returnSiblings = data.filter(function(el) {
        if (el.parents.length === 0) {
            return false;
        } else if(el.id === person.id){
            return false;
        } else if (el.parents[0] === person.parents[0] || el.parents[1] === person.parents[1]) {
            return true;
        } else {
            return false;
        }
    })
    return returnSiblings;
}


function findPersonFamily(person, people) {
    let foundSpouse = findSpouse(person, people)
    let foundParents = findParents(person)
    let foundSiblings = findSiblings(person)
    let returnFamily = `Spouse: ${foundSpouse[0]?.firstName} ${foundSpouse[0]?.lastName}\n`;
    returnFamily += `Parents: ${[foundParents[0]?.firstName]} ${[foundParents[0]?.lastName]} \n`;
    returnFamily += `Parents: ${[foundParents[1]?.firstName]} ${[foundParents[1]?.lastName]} \n`;
    returnFamily += `Siblings: ${foundSiblings[0]?.firstName} ${foundSiblings[0]?.lastName}\n`;
    returnFamily += `Siblings: ${[foundSiblings[1]?.firstName]} ${[foundSiblings[1]?.lastName]}\n`;
    returnFamily += `Siblings: ${[foundSiblings[2]?.firstName]} ${[foundSiblings[2]?.lastName]}\n`;

    alert(returnFamily);
    app(people);
}

function findPersonDescendants(person, people) {
    let personDescendants = data.filter(function(el) {
        if (el.parents[0] === person.id || el.parents[1] === person.id) {
            return true;
        } else {
            return false;
        }
    })

    displayPeople(personDescendants);
    app(people);
}

function searchByTraits(people) {
    let traitPrompt = promptFor("Would you like to search by a single trait or multiple traits? Enter single or multiple", chars);
    if (traitPrompt === "single") {
        let singlePrompt = promptFor("What trait would you like to search for?\n eyeColor\n dob\n gender\n height\n weight\n occupation", chars);
            if (singlePrompt === "gender") {
                let genderPrompt = prompt("Please enter a gender to search by: male or female?  ");
                let personGender = data.filter(function(el) {
                        if (el.gender === genderPrompt) {
                            return true;
                        } else {
                            return false;
                        }
                    }) 
                    displayPeople(personGender);
                    app(people);
                
                }
            if (singlePrompt === "eyeColor") {
                let eyeColorPrompt = prompt("Please select what eye color to search for:\n blue\n brown\n green\n hazel\n black");
                let eyeColor = data.filter(function(el) {
                        if (el.eyeColor === eyeColorPrompt) {
                            return true;
                        } else {
                            return false;
                        }  
                    })
                    displayPeople(eyeColor);
                    app(people);
            }
            if (singlePrompt === "occupation") {
                let occupationPrompt = prompt("Please select what occupation to search for:\n programmer\n assistant\n landscaper\n nurse\n student\n architect\n doctor\n politician");
                let occupationSearch = data.filter(function(el) {
                        if (el.occupation === occupationPrompt) {
                            return true;
                        } else {
                            return false;
                        }  
                    })
                    displayPeople(occupationSearch);
                    app(people);
            }
            if (singlePrompt === "dob") {
                let dobPrompt = prompt("Please enter the four digit year of the birthdate you are looking for:  ");
                let dobSearch = data.filter(function(el) {
                        if (el.dob.includes(dobPrompt)) {
                            return true;
                        } else {
                            return false;
                        }  
                    })
                    displayPeople(dobSearch);
                    app(people);
            }
            if (singlePrompt === "weight") {
                let weightPrompt = prompt("Please enter the weight to search for: ");
                let weightSearch = data.filter(function(el) {
                        if (el.weight === parseInt(weightPrompt)) {
                            return true;
                        } else {
                            return false;
                        }  
                    })
                    displayPeople(weightSearch);
                    app(people);
            }
            if (singlePrompt === "height") {
                let heightPrompt = prompt("Please enter the height to search for: ");
                let heightSearch = data.filter(function(el) {
                        if (el.height === parseInt(heightPrompt)) {
                            return true;
                        } else {
                            return false;
                        }  
                    })
                    displayPeople(heightSearch);
                    app(people);
            }


    } 
    
    if (traitPrompt === "multiple") {
        let multipleTraitPrompt = promptFor("How many traits would you like to use in your search? Enter: two or three", chars);
        if (multipleTraitPrompt === 'two') {
            let firstPrompt = promptFor("What trait would you like to search for first?\n eyeColor\n dob\n gender\n height\n weight\n occupation", chars);
            let firstChoice = promptFor("Enter the trait value: \n gender: male or female\n eyeColor: blue, green, black, hazel, brown\n dob: 4 digit year\n height: 58-76\n weight: 100-256\n occupation: programmer, assistant, landscaper, nurse, student, architect, doctor, politician", chars);
            let secondPrompt = promptFor("What trait would you like to search for next?\n eyeColor\n dob\n gender\n height\n weight\n occupation", chars);
            let secondChoice = promptFor("Enter the trait value: \n gender: male or female\n eyeColor: blue, green, black, hazel, brown\n dob: 4 digit year\n height: 58-76\n weight: 100-256\n occupation: programmer, assistant, landscaper, nurse, student, architect, doctor, politician", chars);
            let foundPeople = data.filter(function(el) {
                try {
                    if(el[firstPrompt]===(firstChoice) && el[secondPrompt]===(secondChoice)){
                        return true;
                    }
                } catch (error) {
                    console.log(error);
                }
                finally{
                    if(el[firstPrompt]===parseInt(firstChoice) && el[secondPrompt]===parseInt(secondChoice)){
                        return true;
                    } if(el[firstPrompt]===(firstChoice) && el[secondPrompt]===parseInt(secondChoice)){
                        return true;
                    } if(el[firstPrompt]===parseInt(firstChoice) && el[secondPrompt]===(secondChoice)){
                        return true;
                }   
            }});
            displayPeople(foundPeople);
            app(people);
        }
        if (multipleTraitPrompt === 'three') {
            let firstPrompt = promptFor("What trait would you like to search for first?\n eyeColor\n dob\n gender\n height\n weight\n occupation", chars);
            let firstChoice = promptFor("Enter the trait value: \n gender: male or female\n eyeColor: blue, green, black, hazel, brown\n dob: 4 digit year\n height: 58-76\n weight: 100-256\n occupation: programmer, assistant, landscaper, nurse, student, architect, doctor, politician", chars);
            let secondPrompt = promptFor("What trait would you like to search for next?\n eyeColor\n dob\n gender\n height\n weight\n occupation", chars);
            let secondChoice = promptFor("Enter the trait value: \n gender: male or female\n eyeColor: blue, green, black, hazel, brown\n dob: 4 digit year\n height: 58-76\n weight: 100-256\n occupation: programmer, assistant, landscaper, nurse, student, architect, doctor, politician", chars);
            let thirdPrompt = promptFor("What trait would you like to search for next?\n eyeColor\n dob\n gender\n height\n weight\n occupation", chars);
            let thirdChoice = promptFor("Enter the trait value: \n gender: male or female\n eyeColor: blue, green, black, hazel, brown\n dob: 4 digit year\n height: 58-76\n weight: 100-256\n occupation: programmer, assistant, landscaper, nurse, student, architect, doctor, politician", chars);
            let foundPeople = data.filter(function(el) {
                try {
                    if(el[firstPrompt]===(firstChoice) && el[secondPrompt]===(secondChoice) && el[thirdPrompt]===(thirdChoice)){
                        return true;
                    }
                } catch (error) {
                    console.log(error);
                }
                finally{
                    if(el[firstPrompt]===parseInt(firstChoice) && el[secondPrompt]===parseInt(secondChoice) && el[thirdPrompt]===parseInt(thirdChoice)){
                        return true;
                    } if(el[firstPrompt]===(firstChoice) && el[secondPrompt]===parseInt(secondChoice) && el[thirdPrompt]===parseInt(thirdChoice)){
                        return true;
                    } if(el[firstPrompt]===(firstChoice) && el[secondPrompt]===(secondChoice) && el[thirdPrompt]===parseInt(thirdChoice)){
                        return true;
                    } if(el[firstPrompt]===(firstChoice) && el[secondPrompt]===parseInt(secondChoice) && el[thirdPrompt]===(thirdChoice)){
                        return true;
                    } if(el[firstPrompt]===parseInt(firstChoice) && el[secondPrompt]===(secondChoice) && el[thirdPrompt]===(thirdChoice)){
                        return true;
                    } if(el[firstPrompt]===parseInt(firstChoice) && el[secondPrompt]===parseInt(secondChoice) && el[thirdPrompt]===(thirdChoice)){
                        return true;
                    } if(el[firstPrompt]===parseInt(firstChoice) && el[secondPrompt]===(secondChoice) && el[thirdPrompt]===parseInt(thirdChoice)){
                        return true;
                    }
                }   
            });
            displayPeople(foundPeople);
            app(people);
        }
    if (traitPrompt != "single" || traitPrompt != "multiple") {
        alert("I am sorry that input is invalid. You will now be returned to the Main Menu");
        return app(people);
    }   
}

}

