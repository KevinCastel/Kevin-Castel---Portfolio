'use client'
import 'next';
import { useSearchParams } from 'next/navigation';
import { getProjectByIndex } from '../api/json/project';
import { useEffect, useState } from 'react';
import { link } from 'fs';
import { get, validateHeaderName } from 'http';
import { hasCustomGetInitialProps } from 'next/dist/build/utils';
import { error, log } from 'console';


// FIXME Trouver un moyen de connecter un enum-tag par un identifiant
export default function Page(){
    const [description, setDescription] = useState(Object);

    const searchParamContext = useSearchParams();

    const i = searchParamContext.get('i');

    let project = null;
    if (i){
        project = getProjectByIndex(i);
        // TODO Manage lorsque projet est vide
    }

    console.log("project :", project);

    // loadDescription(project); //FIXME Réactiver la fonction

    
    return (
        <main className='w-full h-auto flex flex-col pt-22 relative'>
            <h1 className='h-full min-h-20 w-full flex justify-center items-center'>{project["name"]}</h1>
            <div className='h-full w-full p-10 pt-0'>
                <div className='h-auto w-auto bg-red-200 p-4 flex flex-col gap-2'>
                    {/* TODO Fait une iteration sur l'introduction afin d'afficher le composant */}
                    {/* <p className='h-auto w-full text-[120%]'>{`${description}`}</p> */}
                    <DescriptionProject project={project}/>

                    <hr/>
                    <div className='h-auto w-auto min-h-100 p-3 pl-4 bg-blue-200'>
                        <h2>Démonstration du projet :</h2>
                        <div>
                            {/* TODO Vérifier s'il y a des images si oui afficher les */}
                            {/* TODO Si pas d'image de trouver, afficher un message 'pas d'images disponible'*/}
                        </div>
                    </div>
                </div>
                {/* TODO Liens vers le projet */}
            </div>
        </main>
    )
}

function DescriptionProject({project}:{project:Object}) : []{
    project["description"] = parseEnumTag(
                                parseProjectDescription(
                                    project["description"],
                                    project,
                                    ["<enum-sub-type>"]
                                )
                            );
    const elements = convertDescriptionInElements(project);
    const copyElements = elements;
    retrieveElementsByIndex(copyElements);
    
    // console.log("keys :", keys);
    // console.log("values :", values);

    //REFACTOR Réactive ce code ci-dessous
    // const maxElementsLoad = values.length-1;
    // const maxTry = 300//maxElementsLoad + 50;
    // let countTries = 0; 

    // let iElementLoadded = 0;
    // while(iElementLoadded < maxElementsLoad){
    //     if (countTries >= maxTry){
    //         console.warn(`Max try exceed (${countTries}>${maxTry}) to load description`);
    //         break
    //     }
    //     key = keys[iElementLoadded];
    //     value = values[iElementLoadded];
    //     const iKey = getIndexFromKey(key);
    //     console.log("ikeys :", iKey, " ielem :", iElementLoadded);
    //     console.log("value :", value);
    //     if (iElementLoadded == iKey){
    //         countTries = 0;
    //         if (!value.startsWith("<") && !value.endsWith(">")){
    //             elements.push(`<p>${value}`)
    //         } else {
    //             // TODO Iterate on enum tag from the tag (value) in the project
    //             elements.push(`<li>${value}`)

    //         }
    //         iElementLoadded++;
    //     } else {
    //         countTries++;
    //     }
    // }

    // console.log("elements :", elements);
    return (<div>
        {/* {Object.entries(elements).map((e)=>{
            console.log("e :",e );
        })} */}
        
    </div>);
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
function retrieveElementsByIndex(o:Object):Object[]{
    let elements = [];

    console.log("Triage par index");
    console.log("description before triage:", o);
    const values = Object.values(o);
    const keys = Object.keys(o);
    const lengthValues = values.length;
    let indexTarget = 0;
    console.log("o:",o)
    //TODO Première boucle sur toutes les valeurs for
    for(let i = 0; i < lengthValues; i++){
        // TODO Seconde boucle permettant
        console.log(`>>Nouveau tour pour ${indexTarget}`)
        for(let indexElementToCheck = 0; indexElementToCheck < lengthValues; indexElementToCheck++){
            // TODO vérifier si l'index de l'élément actuelle correspond à l'index attendu
            const value = values[indexElementToCheck];
            const key = keys[indexElementToCheck];

            const indexKey = parseFloat(key);

            console.log(`\t\t(indexElementToCheck) ${indexElementToCheck} == (indexKey)${indexKey}`)
            if (indexTarget == indexKey){

                const newOb = {};
                newOb[key] = value;
                elements.push(newOb)
                console.log(`\t\t>>Ajout de (value) ${value} et ${key}`);
                console.log("\t\t>>elements during :",elements)
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
    console.log("elements :", elements);
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
        console.error(`Erreur parce-que ${indexActual} > ${lengthKeys}`);
        return -1;
    }
    let indexToReach = 0;
    let nextTheoricalIndex = 0;
    console.log("\tTentative pour obtenir le prochain index depuis (indexActual):", indexActual);
    if (isRecursive){
        nextTheoricalIndex =indexActual; //FIXME Peut-être un problème si indexActual est un integer ou float?
        console.log(`\t\t>>Appel recusrive donc utilisation de nextTheoricalIndex :${nextTheoricalIndex}`);
    }
    for(let i = 0; i < lengthKeys; i++){
        let key = descriptionKeys[i];
        if (!isRecursive){
            console.log(`\t\t>>Appelle non recursif donc `)
            nextTheoricalIndex = getFloatWithDecimal((indexActual+0.1).toString(),2);
        }
        console.log(`\t\t  --test avec key : ${key} ;  valeur théorique à atteindre (+0.1): ${nextTheoricalIndex}`);
        if (key.endsWith("_p")){
            key = key.replace("_p","");
        } else if (key.endsWith("_enum")){
            key = key.replace("_enum","");
        }

        console.log(`\t\t-est ce que (key) ${key} est un float ${isFloat(key)}`);

        if (isFloat(key)){
            const indexFromKey = parseFloat(key);
            console.log(`\t\t test indexFromKey : ${indexFromKey} == (nextTheoricalIndex) ${(nextTheoricalIndex).toString()} ? ${indexFromKey == nextTheoricalIndex}`)
            if (indexFromKey == nextTheoricalIndex){
                // console.log(`\t\t\tSWITCH INDEX :(float) indexFromKey : ${indexFromKey} === actualIndex+0.1 ${(parseFloat(indexActual)).toString()}`);
                console.log(`\t\t Switch from (indexFromKey) ${indexFromKey} to (nextTheoricalIndex) ${nextTheoricalIndex}`);
                return nextTheoricalIndex;
            }
        } else { // key is an int
            const indexFromKey = parseInt(key);
            console.log(`\t\t-est ce que (nextTheoricalIndex) ${nextTheoricalIndex} (indexFromKey) ${indexFromKey} ? ${indexFromKey == nextTheoricalIndex}`);
            if (indexFromKey == nextTheoricalIndex) {
                console.log(`\t\t\tNouveau index int définis sur ${indexFromKey}`);
                if (isRecursive){
                    return indexFromKey;
                } else {
                    return indexFromKey+0.1;
                }
            }
        }
    }
    // arrive ici s'il n'a pas trouver d'index
    console.log(`Rien à était trouvé pour ${nextTheoricalIndex} donc tentative avec ${Math.floor(nextTheoricalIndex)+1}`);
    console.log("description keys :",descriptionKeys)
    return getNextIndexToReachedToRetrieveElements(
        Math.floor(indexActual)+1,
        descriptionKeys,
        lengthKeys,
        true
    )
    console.log("round :", Math.round(indexActual));


    

    // REMIND pourrait utiliser un appel récursif getNextIndexToReachedToRetrieveElements(indexActual+1)
    // REMIND Si c'est possible alors voir pour protéger les float soit augmenté la décimal jusqu'à 9 avant
    // REMIND de repartir sur un entier par exemple parcours la plage : 1.0 jusqu'à 1.9 et passe à 2 si rien n'est trouvé
    return -1;
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
                console.log("\t\tnum :", num)
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
            )

        }
        lastIndexLine += 1;
        // console.log(lastIndexLine, "<lastindexline i:", i)
    }
    return description;
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
    console.log("after reaffecting key :", o);

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
// Return a string 'description parsed'
function parseProjectDescription(description:string[], jsonDatas:Object, tagsIgnored:string[]) : Object{
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