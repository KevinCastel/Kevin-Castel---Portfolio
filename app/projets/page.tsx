'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import {getProjects, getProjectByIndex} from './api/json/project'

import {useRouter} from 'next/navigation';

//Function that represent the page
export default function Page(){
    const [projects, setProjects] = useState(Object);
    useEffect(()=>{
        setProjects(getProjects());
    },[setProjects, projects]);
    return (<main className="w-full h-auto flex flex-col pt-22 pb-11 relative">
        <SearchBar/>
        <SearchFilter/>
        <div className="h-auto w-auto p-4">
            <button className="bg-dark-blue p-1 pl-6 pr-6 rounded-lg text-[90%] text-white hover:bg-medium-blue focus:bg-darkened-blue transition delay-150 duration-300 ease-in-out">Rechercher</button>
        </div>
        <div className="grid grid-cols-4 gap-4 p-2">
            {Object.entries(projects).map((project:Object)=>{
                if (Object.keys(project).length <= 1) {
                    return null;
                }
                return <ProjectCard key={project[0]} index={project[0]} propsProject={project[1]}/>
            })}
        </div>
    </main>)
}



// REFACTOR Déplacer ce composant avec son interface dans fichier à part

export interface ProjectCardInterface{
    index:string,
    propsProject:Object,
}

// Represent a project card for 
function ProjectCard({index, propsProject}:ProjectCardInterface){
    const router = useRouter();
    const [defaultName, setDefaultName] = useState("Sans Nom");
    const [defaultDate, setDefaultDate] = useState("");
    const [defaultProjectLanguage, setDefaultProjectLanguage] = useState("");
    const [defaultProjectType, setDefaultProjectType] = useState("");

    useEffect(()=>{
        if (propsProject.hasOwnProperty("name")){
            setDefaultName(propsProject["name"].toString());
        }

        if (propsProject.hasOwnProperty("date")){
            const dateObj  = propsProject["date"];
            let date = "";
            if (dateObj.hasOwnProperty("from")){
                date = "De: "+dateObj["from"].toString();
            }
            if (dateObj.hasOwnProperty("until")){
                date = date+" à "+dateObj["until"];
            }
            setDefaultDate(date);
        };
        if (propsProject.hasOwnProperty("type")){
            setDefaultProjectType("Type: "+propsProject.type);
        }
        if (propsProject.hasOwnProperty("stacks")){
            let stacks = "";
            if (propsProject["stacks"].length > 0){
                stacks = "Techno: "+propsProject["stacks"][0];
            }
            setDefaultProjectLanguage(stacks);
        }
    }, [defaultDate, setDefaultDate,
        setDefaultProjectType,
        setDefaultProjectLanguage
    ]);

    /* TODO Utilisation d'un id pour charger un projet 
        Le projet à l'id sera chargé
    */


    return (<div className="h-auto w-auto min-w-30 bg-blue-filters rounded-lg border-1 bordre-dark-blue p-3 flex flex-col justify-center items-center">
            <h2 className="h-auto w-auto min-w-30 text-[90%] text-white mb-2">{defaultName}</h2>
            <h3 className="h-auto w-auto text-[70%] text-white">{defaultProjectLanguage}</h3>
            <h3 className="h-auto w-auto text-[70%] text-white">{defaultProjectType}</h3>
            <h3 className="h-auto w-auto text-[70%] text-white">{defaultDate}</h3>
            <div className="h-full w-full flex justify-center items-center pt-3 pb-1">
                <button className="h-auto w-auto text-[70%] bg-dark-blue text-white p-1 pl-2 pr-2 rounded-lg" onClick={()=>{
                    router.push(`projets/projet?i=${index}`)
                }}>Découvrir</button>
                {/* FIXME Cacher la query */}
                {/* <Link
                href={{ pathname: "/projets/projet", query: {email:"bonjour@gmail.com"}}}>Link</Link> */}
                {/* <Link href={'/projets/projet?email=abcm'} as={'/projets/projet'}>ICi</Link> */}
            </div>
        </div>
    )
}


// Component for searching projects by a name
function SearchBar(){
    return (
        <div className="h-auto min-h-10 w-full flex justify-center items-center">
            <div className="w-auto min-w-[100%] h-auto flex flex-col p-10 gap-2">
                <label className="h-auto w-full text-[150%]" htmlFor="search-project-name">Rechercher un projet ?</label>
                <input className="h-auto w-full border-2 border-solid border-blue rounded-lg p-2 pl-4 pr-4 text-[70%]" name="search-project-name" type="text" placeholder="Taper un nom de projet ici"/>
            </div>
        </div>
    )
}

// REFACTOR Ranger ce qui est dédié pour le filtre dans un fichier pour.

//Components for all filters
function SearchFilter(){
    const [isFilterDeployed, setIsFilterDeployed] = useState(false);

    let component = SearchFiltersDeployed(setIsFilterDeployed);
    if (!isFilterDeployed){
        component = SearchFilterUnDeployed(setIsFilterDeployed);
    }
    return component
}

// Component when all filters are hidden
function SearchFilterUnDeployed(setIsFilterDeployed:Dispatch<SetStateAction<boolean>>){
    return (
        <div className="h-auto min-h-30 w-full flex justify-center items-center p-12 pb-0 pt-0">
            <div className="w-full min-w-[100%] h-auto flex flex-col p-4 bg-blue-filters rounded-lg border-2">
                <h2 className="w-full h-auto text-center text-white">Utiliser les filtres ?</h2>
                <ButtonDeployibilityFilter setIsFilterDeployed={setIsFilterDeployed} deployed={true}/>
            </div>
        </div>
    )
}


// Component when all filters are visible
function SearchFiltersDeployed(setIsFilterDeployed:Dispatch<SetStateAction<boolean>>){
    return (
        <div className="h-auto min-h-30 w-full flex justify-center items-center p-12 pt-0">
            <div className="w-full min-w-[100%] h-auto flex flex-col p-4 bg-blue-filters rounded-lg border-2">
                <h2 className="text-white h-auto w-full text-[70%">Utiliser les filtres</h2>
                <div className="w-full h-auto flex p-2 pl-0">
                    <div className="w-full h-auto max-w-50 flex flex-col gap-1">
                        <label className="w-auto h-auto text-[90%] text-cyan" htmlFor="date">Date :</label>
                        <div className="w-auto h-full flex justify-center p-1">
                            <input className="w-[50%] h-auto text-[70%] bg-cyan pl-2 rounded-l-lg" name="date" type="text" placeholder="A partir de"/>
                            <div className="border-1 border-blue-gray" />
                            <input className="w-[50%] h-auto text-[70%] bg-cyan pl-1 rounded-r-lg" name="date" type="text" placeholder="Jusqu'à"/>
                        </div>
                    </div>
                    <div className="w-full h-auto flex flex-col p-1 gap-1">
                        <label className="text-[90%] h-auto w-full text-cyan" htmlFor="filter-techno">Technos</label>
                        <input className="text-[70%] h-full bg-cyan p-1 rounded-lg" name="filter-techno" type="text" placeholder="Filtrer à partir d'une techno"/>
                    </div>
                    <div className="w-full h-auto flex flex-col p-1 gap-1">
                        <label className="h-auto w-full text-[90%] text-cyan" htmlFor="filter-type">Type</label>
                        <input className="h-full w-full text-[70%] bg-cyan p-1 rounded-lg" name="filter-type" type="text" placeholder="Filter à partir du type du projet"/>
                    </div>
                </div>
                <ButtonDeployibilityFilter setIsFilterDeployed={setIsFilterDeployed} deployed={false}/>
            </div>
        </div>
    )
}

// Represents the data sets to handle deployability of the filters
interface ButtonFilterInterface {
    setIsFilterDeployed : Dispatch<SetStateAction<boolean>>,
    deployed : boolean
}


// Button componant to handle visibility for the all filters fields
function ButtonDeployibilityFilter({setIsFilterDeployed, deployed}:ButtonFilterInterface){
    const [textButton, setTextButton] = useState("+");
    useEffect(()=>{
        if (deployed == false){
            setTextButton("-");
        }
    },[setTextButton])
    return (<div className="w-full h-auto min-h-10 flex justify-center items-center pt-2">
                <button className="w-8 h-8 rounded-lg bg-dark-blue text-white hover:bg-medium-blue focus:bg-darkened-blue transision delay-100 duration-300 ease-in-out" onClick={()=>{
                    setIsFilterDeployed(deployed);
                    setTextButton("-");
                    }
                }>{textButton}</button>
            </div>)
}
