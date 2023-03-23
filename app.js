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
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
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
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            console.log(personDescendants)
            alert(personDescendants);
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
function displayPeople(people) {
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
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
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

function findPersonFamily(person) {
    let personFamily = `Spouse: ${person.currentSpouse}.\n`;
    personFamily += `Parents: ${person.parents}\n`;
    // personFamily += `Children: ${person.children}`
    alert(personFamily);
}

function findPersonDescendants(person, people) {
    let personDescendants = data.filter(function(el) {
        if (el.parents[0] === person.id) {
            return true;
        } else {
            return false;
        }
    })

    alert(personDescendants);
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
                    console.log(personGender)
                    alert(displayPeople(personGender).join('\n'))
                    
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
                    alert(displayPeople(eyeColor).join('\n'))
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
                    alert(displayPeople(occupationSearch).join('\n'))
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
                    alert(displayPeople(dobSearch).join('\n'))
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
                    alert(displayPeople(weightSearch).join('\n'))
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
                    alert(displayPeople(heightSearch).join('\n'))
            }


    } else(traitPrompt === "multiple"); {
        let traitOne = prompt("Please enter a gender to search by: male or female? ");
        let traitTwo = prompt("Please select what eye color to search for:\n blue\n brown\n green\n hazel\n black");
        let foundItems = data.filter(function(el){
            if(el.gender === traitOne && el.eyeColor === traitTwo) {
                return true;
            } else {
                return false;
            }
        })
        alert(displayPeople(foundItems).join('\n'))
        
            };
        

}



