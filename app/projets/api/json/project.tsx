import Projects from "./projects.json"

import { useState } from "react";


export function DescriptionProject({project}:{project:Object}) : []{
    if(!project.hasOwnProperty("description")){
        return (<h3 className="w-full text-center text-cyan">Pas de description de trouver</h3>);
    }
    project["description"] = parseEnumTag(
                                parseProjectDescription(
                                    project["description"],
                                    project,
                                    ["<enum-sub-type>",
                                    ]
                                )
                            );
    console.log("project description :", project["description"])
    
    project["description"] = removeDuplicateValue(project["description"]);


    const elementsO = convertDescriptionInElements(project);
    const copyElements = elementsO;
    const elements = retrieveElementsByIndex(copyElements);
    
    const [T, setT] = useState(elements);


    // const [i, setI] = useState(0);

    // return (garbageFucked ? garbageFucked.map((e)=>(<p>test</p>)): null)
    return (<>
        {
            T.map((e, index)=>{
                let jsxElement = null;
                Object.entries(e).map((arrayE, i)=>{
                    const key = arrayE[0];
                    if (key.endsWith(`enum`)){
                        jsxElement = (<li className='ml-6 text-cyan text-[85%]' key={i+index}>{arrayE[1]}</li>)
                    } else {
                        let className = ``;
                        if (index > 0){
                            className = `mt-6`;
                        }
                        jsxElement = (<p className={`w-auto h-auto ${className} text-cyan text-[95%]`} key={i+index}>{arrayE[1]}</p>)
                    }
                })
                return jsxElement;
            })
        }
        </>)
}

// Add 1 to each index to avoid that the key is existing 
// Take args as :
// o represent the object, 
function refreshAllIndexInDescription(o:Object,
                                    startFromKey:string,
                                    lengthObject:number,
                                    keys:string[],
                                    values:string[]){
    // console.log(`o :`,o)
    let nextValue = null;
    let nextKey = null;
    let canParse = false;
    for(let i = 0; i< lengthObject; i++){
        // console.log(`${i} < ${lengthObject}`);
        const key = keys[i];
        const value = values[i];

        if (key == startFromKey){
            canParse = true;
        } else if(!canParse) {
            continue;
        }

        if (canParse){
            // console.log(`\tkey : ${key} value :${value}`);
            // console.log(`\t est ce que (nextKey) ${nextKey} est 'null' ? ${nextKey === null}`);
            if (nextKey === null){
                // console.log("\tchangement pour la clé :", keys[i]);
                // console.log(`effacement de '${key}' pour '${i+1}_p'`);
                o[`${i+1}_p`] = value;
                o = deleteKey(o, `${i}_p`)
            } else {
                // console.log(`remplacement de la clé '${o[i]}' par (nextKey) ${nextKey}`);
                o[`${i+1}_p`] = nextValue;
            }
            if (i < lengthObject-1){
                nextKey = keys[i+1]
                nextValue = values[i+1]
                // console.log("prochain élément sauvegarder ", nextKey, " ", nextValue);
            }
            // console.log("o pendant la manipulation :", o);
        }
    }
    // console.log("o après la manipulation :",o);
    return o;
    // for (let i = lengthObject-1; i >= 0; i--){
    //     const key = keys[i];
    //     const value = values[i];

    //     const indexKey = getIndexFromKey(key);
    //     const newKey = `${(indexKey+1).toString()}_p`;

    //     // console.log("index key to delete :", indexKey);
    //     // console.log("new key :", newKey);
    //     // console.log("value :", value);

    //     console.log(`deleting ${key} but creating ${newKey}`);
    //     console.log("description :", o)

    //     o[newKey] = value;

    //     delete o[key];
    //     if (key == startFromKey){
    //         break;
    //     }
    // }
    // console.log("after reaffecting key :", o);

    // let canParse = false // true when the startFromKey is reached
    // let indexKey = 0;
    // for(let i = 0; i < lengthObject; i++){
    //     // TODO Vérifie si l'index actuelle est diffèrent de i
    //     const key = keys[i];
    //     if (!canParse){
    //         if (startFromKey == key){
    //             canParse = true;
    //         } else {
    //             continue;
    //         }
    //     }
    //     indexKey = getIndexFromKey(key);
    //     console.log(`(indexKey) :${indexKey} from (key) ${key} pour (i) :`,i);
    //     if (indexKey == null){
    //         throw new Error(`An error has occurred because indexKey is 'null'`);
    //     }

    //     if (i == indexKey){ //if equal it means that index of the key isn't fine, should be +1
    //         // TODO réinjecte la nouvelle clé avec la valeur
    //         o[]

    //         // TODO supprime l'ancienne clé
    //         console.log("changement nécessaire pour :", key, " : ", values[i]);
    //     }
    // }
}

function deleteKey(o:Object, keyToDelete){
    let newObject = Object();
    const keys = Object.keys(o);
    const values = Object.values(o);
    let lengthKeys = keys.length;
    for(let i = 0; i < lengthKeys; i++){
        if (keys[i] != keyToDelete){
            newObject[keys[i]] = values[i];
        }
    }
    return newObject;
}

//Called to check if the key is a number if it is add p as prefix
// function getNewKeyDescription(k:any){
//     console.log("type of k :", typeof k);
//     if (typeof k !== "string"){
//         return `p_${k.toString()}`;
//     }

//     return k
    
// }

//push a key (k) with his value (v) in the object (o) as specifi index (i)
function pushInObjectAtSpecificIndex(o:Object, index:number, newV:any, newK:any) : Object{
    const valuesObject = Object.values(o);
    const keysObject = Object.keys(o);
    const lengthValuesObject = valuesObject.length;
    const newObject = Object();
    // if (index < 0 || index > lengthValuesObject+2){
    //     throw new Error(`Impossible to add '${newK}' with '${newV}' at ${index} in '${o}' because i (${index}) isn't in the range of length of o`);
    // }
    for(let i = 0; i < lengthValuesObject; i++){
        if (i < index || i > index){
            newObject[keysObject[i]] = valuesObject[i];
        } else if (i == index ){
            newObject[newK] = newV;
            newObject[keysObject[i]] = valuesObject[i];
        }
    }
    return newObject;
}


// Parse the text to replace sub-text like '<something>'
// by value that can be find in the same json.
// ignore some tags from 'tagsIgnored'
// Take string 'description' and json object
// Return a string 'description parsed' or null if errors are found
function parseProjectDescription(description:string[], jsonDatas:Object, tagsIgnored:string[]){
    if (description == null){
        return null;
    }
    const pattern = /((\<)([^\>]*)(\>)*)/g;
    let linesData = Object();

    for (let iLine = 0; iLine < description.length; iLine++) {
        let line = description[iLine];
        const matches = [...line.matchAll(pattern)];
        if (matches.length > 0){
            matches.map((matchGroups)=>{
                matchGroups.map((match)=>{
                    if (match != ">" && match != "<" && !tagsIgnored.includes(match)){
                        const tagToSearch = match.replaceAll("<","").replaceAll(">",""); 
                        if (jsonDatas.hasOwnProperty(tagToSearch)){
                            line = line.replace(match,jsonDatas[tagToSearch]);
                            linesData[`${iLine}_p`] = line;
                        } else {
                            linesData[`${iLine}_p`] = line;
                            console.warn(`An error has occurred because no '${match}' found`)
                        }
                    }
                });
            });
        } else {
            linesData[`${iLine}_p`] = line;
        }
    };

    return linesData;
}

// Parse the text to split where the <enum-sub-type> is found
function parseEnumTag(description:Object) : Object{
    if (description === null){
        console.error(`Impossible to parse description because it's equal to 'null'`);
        return description;
    }

    const pattern = /(\<enum-)(?<tag>[\w-]*)(\>)*/g;
    let newLines : string[];
    let newLine : string;

    const descriptionKeys = Object.keys(description);
    const descriptionValues = Object.values(description);
    const lengthDescription = descriptionKeys.length;
    let lastIndexLine = 0;
    for(let i = 0; i<lengthDescription; i++){
        newLine = descriptionValues[i];
        const match = newLine.match(pattern);
        // console.log("nouveau tour :",i);
        if (match !== null){ // if is a <enum> tag
            newLines = newLine.split(match[0],match.toString().length);
            //FIXME Erreur sur la dernière enum
            description[descriptionKeys[i]] = newLines[0];
            // console.log("data :", description);
            // console.log("last index :", lastIndexLine);
            // console.log("value :", descriptionValues[i]);
            // lastIndexLine+=1;
            description = pushInObjectAtSpecificIndex(description, lastIndexLine+1, match.toString().replace("enum-",""), `${lastIndexLine+1}_enum`);
        } else {
            const badKey = descriptionKeys[i];
            // const indexKey = getIndexFromKey(badKey);
            // console.log('\tkey à changer :',descriptionKeys[i]);
            // console.log(`\tlastindexline :`, lastIndexLine, " indexKey:",indexKey);
            // if (lastIndexLine == indexKey){
            //     //TODO Refresh directement tout les index dans un loop ci-dessous
            //     description[`${(lastIndexLine+1).toString()}_p`] = descriptionValues[i];
            //     const keyDelete = `${indexKey.toString()}_p`;
            //     description = deleteKey(description, keyDelete);
            //     console.log("description after delete :", description);
            // }

            // FIXME Tour 2, supprime l'élément 2p <- potentiellement réglé
            // FIXME Tour 5 et 4 pas de suppression de 4_p 
            // if (lastIndexLine > indexKey){
            //     description[`${lastIndexLine.toString()}_p`] = descriptionValues[i];
            //     const keyDelete = `${indexKey.toString()}_p`;

            //     console.log("\t\tbefore suppression à ",description);
            //     description = deleteKey(description, keyDelete);
            //     console.log("\t\tsuppression de",keyDelete," à ",indexKey);
            //     console.log(`\tafter :`, description);
            //     console.log("\tlastindex:",lastIndexLine);
            // } else {
            //     console.log("are equal ? lastIndexLine :", lastIndexLine, " indexKey:",indexKey);
            // }
            // const keyDelete = `${indexKey.toString()}_p`;
            refreshAllIndexInDescription(description,
                badKey,
                lengthDescription,
                descriptionKeys,
                descriptionValues
            );
        }
        lastIndexLine += 1;
        // console.log(lastIndexLine, "<lastindexline i:", i)
    }
    return description;
}


export function getCanRenderImagesProject(o:Object) : boolean{
    if (o.hasOwnProperty("image")){
        if (o["image"].length > 0){
            return true
        }
    }
    return false
}

// Clean object from duplicate value
function removeDuplicateValue(o:object) : Object{
    const keys = Object.keys(o);
    const values = Object.values(o);
    const lengthO = Object.keys(o).length
    let valuesKnown = [];
    let newObject = new Object;
    for(let i = 0; i<lengthO; i++){
        const key = keys[i];
        const value = values[i];
        if (!valuesKnown.includes(value)) {
            newObject[key] = value;
            valuesKnown.push(value);
        }
    }
    return newObject
}


//Return a Object of string (type), string (value/innerText)
function convertDescriptionInElements(project) : object{
    let newObject = Object();
    const descr = project["description"];
    const values = Object.values(descr);
    const keys = Object.keys(descr);
    const lengthDescr = keys.length;
    for(let i = 0; i < lengthDescr; i++) {
        const key = keys[i];
        let value = values[i];
        if (key.endsWith("p")){
            newObject[key] = value;
        } else if (key.endsWith("enum")){
            value = value.replace("<","").replace(">","");
            if (project.hasOwnProperty(value)){
                project[value].map((e,i)=>{
                    newObject[`${((getIndexFromKey(key.replace("_enum",""))-1).toString())}.${(i+1).toString()}-enum`] = e
                })
            } else{
                console.warn(`Impossible de trouver '${value}'`)
            }

        }
    }
    return newObject;
}

//Retrieve elements (in Object 'o') by index in an array
function retrieveElementsByIndex(o:Object):[]{
    let elements = [];

    // console.log("Triage par index");
    // console.log("description before triage:", o);
    const values = Object.values(o);
    const keys = Object.keys(o);
    const lengthValues = values.length;
    let indexTarget = 0;
    // console.log("o:",o)
    //TODO Première boucle sur toutes les valeurs for
    for(let i = 0; i < lengthValues; i++){
        // TODO Seconde boucle permettant
        // console.log(`>>Nouveau tour pour ${indexTarget}`)
        for(let indexElementToCheck = 0; indexElementToCheck < lengthValues; indexElementToCheck++){
            // TODO vérifier si l'index de l'élément actuelle correspond à l'index attendu
            const value = values[indexElementToCheck];
            const key = keys[indexElementToCheck];

            const indexKey = parseFloat(key);

            // console.log(`\t\t(indexElementToCheck) ${indexElementToCheck} == (indexKey)${indexKey}`)
            if (indexTarget == indexKey){

                const newOb = {};
                newOb[key] = value;
                elements.push(newOb)
                // console.log(`\t\t>>Ajout de (value) ${value} et ${key}`);
                // console.log("\t\t>>elements during :",elements)
                indexTarget = getNextIndexToReachedToRetrieveElements(
                    indexTarget,
                    keys,
                    lengthValues,
                    false
                )
                break;
            }
        }
    }
    // console.log("elements :", elements);
    return elements;


        // const keys = Object.keys(o);
    // const values = Object.values(o);
    // let countElement = 0;
    // let countElementDecimalsFixed = 0.0; //Used when countElement isn't longer respecting her decimals
    // let indexElementToReached = 0;
    // const lengthValues = values.length;

    // const MAX_TRIES = lengthValues*2;
    // let countTries = 0;


    // while(countElement < lengthValues){
    //     if (countTries == MAX_TRIES){
    //         console.error(`Une erreur est survenue, le nombre de tentative est dépassé :${countTries}/${MAX_TRIES}`);
    //         return elements;
    //     }
    //     if (elements.length > lengthValues){
    //         throw new Error(`Surchage d'éléments : `,elements);
    //     }
    //     console.log(`Tour ${countElement} / ${lengthValues} ; valeur à atteindre durant ce tour :${indexElementToReached}`)
    //     const value = values[countElement];
    //     const key = keys[countElement];
    //     const indexKey = parseFloat(key);
    //     console.log(`\tkey : ${key} pour value : ${value}`)
    //     console.log(`\t convertion integer de l'index de la clé :${parseInt(key)}`);
    //     console.log(`\t convertion integer de l'index de la clé float :${parseFloat(key)}`)
    //     console.log(`\tcountElementFixed :${countElementDecimalsFixed} ; indextoreached ${indexElementToReached}`);

    //     if (indexKey == indexElementToReached){
    //         countTries = 0;
    //         // TODO défini le numéro suivant à atteindre
    //         const newo = Object();
    //         newo[key] = value; // <- JavaScript is garbage because I cannot push it directly in elements
    //         console.log(`\t\tAjout de '${key}' pour l'index :${countElementDecimalsFixed}`)
    //         elements.push(newo);
    //         console.log("\t\telements après rajout :",elements);
    //         indexElementToReached = getNextIndexToReachedToRetrieveElements(countElementDecimalsFixed,
    //                                                 keys,
    //                                                 lengthValues,
    //                                                 false
    //                                 );
    //         if (isFloat(indexElementToReached.toString())){
    //             indexElementToReached=getFloatWithDecimal(indexElementToReached.toString(),2);
    //         } else {
    //             countElementDecimalsFixed = indexElementToReached-0.1;
    //             console.log("Tu devrais passer en mode integer... :",countElementDecimalsFixed)
    //         }
    //         console.log(`\tProchain index d'élément cible :${indexElementToReached}`);
    //     } else {
    //         console.log("impossible donc tentative :",countTries);
    //         countTries ++;
    //     }


    //     if (countElement >= lengthValues){
    //         countElement=0;
    //         countTries++;
    //     }
    //     countElement+=1;
    //     // countElement = getFloatWithDecimal(countElement.toString(), 2)
    //     console.log(`\t${countElementDecimalsFixed} before the ccalcul +0.1`);
    //     countElementDecimalsFixed+=0.1;
    //     console.log(`\t${countElementDecimalsFixed} after the ccalcul +0.1`);
    //     if (isFloat(countElementDecimalsFixed.toString())){
    //         countElementDecimalsFixed = parseFloat(getFloatWithDecimal(countElementDecimalsFixed.toString(), 2).toString());
    //     }
    //     //FIXME Problème de chiffre décimaux après la virgule dont la longueur se transforme en exposant...
    //     console.log(`end of the boucle countDecimals :`,countElementDecimalsFixed)
    // }
}

function getNextIndexToReachedToRetrieveElements(indexActual:number,
                                                descriptionKeys:string[],
                                                lengthKeys:number,
                                                isRecursive:boolean) : Number{
    if (indexActual > lengthKeys){
        // console.error(`Erreur parce-que ${indexActual} > ${lengthKeys}`);
        return -1;
    }
    let nextTheoricalIndex = indexActual;
    if (!isRecursive){
        if (isFloat(indexActual.toString())){
            indexActual = getFloatWithDecimal(parseFloat(indexActual.toString()).toString(), 2);
            // console.log(`\tFlotat indexActual ${indexActual}`);
            // nextTheoricalIndex = getFloatWithDecimal(indexActual.toString(),2);
            nextTheoricalIndex = parseFloat(indexActual.toString());
            // console.log(`\tFloat assign on nextNextTheoricalIndex :${nextTheoricalIndex}`)
        } else {
            nextTheoricalIndex = parseFloat(indexActual.toString());

        }
        nextTheoricalIndex += 0.1;
        if (isFloat(nextTheoricalIndex.toString())){
            nextTheoricalIndex = getFloatWithDecimal(nextTheoricalIndex.toString(), 2);
        }
    }

    // console.log("\tTentative pour obtenir le prochain index depuis (indexActual):", indexActual);

    for(let i = 0; i < lengthKeys; i++){
        //Javascript is so a garbage that I have to handle some value 
        if (indexActual == 4.1){
            return 4.2;
        } else if (indexActual == 5.1){
            return 5.2;
        }

        // console.log(`\t>>Nouvelle recherche pour trouver 'nextTheoricalIndex' ${nextTheoricalIndex}`);
        let key = descriptionKeys[i];
        let indexKey = -1;
        if (isFloat(key.toString())){
            indexKey = getFloatWithDecimal(key.toString(), 2);
        } else {
            indexKey = parseFloat(key.toString());
        }
        // console.log(`\t>>>La clé '${key}' à pour index :${indexKey}`);

        if (indexKey == nextTheoricalIndex){
            // console.log(`\t>>>>Une égalité entre indexKey et nextTheoricalIndex soit ${indexKey} & ${nextTheoricalIndex}`);
            return indexKey;
        }
        
    }
    // arrive ici s'il n'a pas trouver d'index
    // console.log(`Rien à était trouvé pour ${nextTheoricalIndex} donc tentative avec ${Math.floor(nextTheoricalIndex)+1}`);
    // console.log("description keys :",descriptionKeys)
    return getNextIndexToReachedToRetrieveElements(
        Math.floor(indexActual)+1,
        descriptionKeys,
        lengthKeys,
        true
    )
}


//get specific project
export function getProjectByIndex(i:string) : Object{
    return Projects.projects[i];
}

// Returns all projects from the json file
export function getProjects() : Object{
    return Projects.projects;
}

// Return link if the project have one, otherwise return null
export function getHyperlinkProject(o:Object){
    if (!o.hasOwnProperty("link")){
        return null
    }
    let links = {};
    const keys = Object.keys(o["link"]);
    const values = Object.values(o["link"])
    const lengthLinks = keys.length;
    for(let i = 0; i<lengthLinks; i++){
        const value = values[i];
        const key = keys[i];
        links[key] = value;
    }
    return links
}

export function getImagesProject(o:Object){
    const imagesJson = o["image"];
    let images = {};
    
    const lengthImage = imagesJson.length;
    for(let i = 0; i<lengthImage; i++){
        const anImageData = imagesJson[i];
        if (anImageData == null){
            continue;
        }
        // console.log("an image data :", anImageData);
        const newKey = Object.keys(anImageData)[0];
        const newValue = Object.values(anImageData)[0];
        // console.log("new key :", newKey);
        // console.log("new value :",newValue)
        images[newKey] = newValue;        
    }
    // console.log("images :", images)
    return images
}


//Return the num with decimal limited for example:
// receive (0.2334, 2) so it returns 0.23 
function getFloatWithDecimal(num:string, decimal:number){
    let result = "";
    const lengthNum = num.length;
    if (decimal > lengthNum){
        throw new Error(`Error occurred because decimal > lengthNum (${decimal}>${lengthNum})`)
    }
    if (!num.includes(".")){
        throw new Error(`Erreur, impossible de convertir puisque il n'y'a pas de '.' dans ${num}`);
    }
    const integer = num.split(".")[0];
    const lengthInteger = integer.length;
    for(let i=0; i<lengthNum; i++){
        if (i == decimal+lengthInteger){
            return parseFloat(result);
        }
        result += num[i];
    }
    return result
}

//Return if the string is a float or not (boolean)
// string should include '.' for being defined as boolean
function isFloat(s:string) : boolean{
    // console.log(`isFloat>>s :'${s}' donc est ce qu'elle contient un '.' ?`, s.includes("."))
    return s.includes('.');
}

//Return the number from the key (s:string) for example if you have '1_p', return 1
function getIndexFromKey(s:string){
    const pattern = /(\d)*/g;
    const match = s.match(pattern);
    if (match !== null){
        return parseInt(match[0].toString());
    }
    return null;
}


// parseFloat seem buggy so to avoid to have two dots in my number,
// this return until the second dot
function parseFloatFixed(s:string) : number{
    const legnthString = s.length;
    let countDot = 0;
    // let newStr = "";
    let integerPart = "";
    let decimalPart = "";
    let isCapturingIntegerChars = true;
    let num = 0;
    for(let i = 0; i < legnthString; i++){
        const c = s[i];
        if (c == '.'){
            countDot += 1;
            if (countDot == 1){
                isCapturingIntegerChars = false;
                num = parseInt(integerPart);
            } else if (countDot == 2){
                num += parseInt(decimalPart)/10;
                // console.log("\t\tnum :", num)
                return num
            }
        }

        if (isCapturingIntegerChars){
            integerPart += c;
        } else {
            decimalPart += c;
        }
    }
    return num;
}

